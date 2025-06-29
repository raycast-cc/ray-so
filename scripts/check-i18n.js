#!/usr/bin/env node

/**
 * 简单的国际化功能测试脚本
 * 验证翻译键的完整性和一致性
 */

const fs = require("fs");
const path = require("path");

// 读取翻译文件
const i18nPath = path.join(__dirname, "..", "utils", "i18n.ts");
const content = fs.readFileSync(i18nPath, "utf8");

// 提取翻译对象
const match = content.match(/export const translations = ({[\s\S]*?}) as const;/);
if (!match) {
  console.error("❌ 无法解析翻译对象");
  process.exit(1);
}

let translations;
try {
  // 简单的对象解析 (生产环境应使用更严格的解析)
  const objectStr = match[1]
    .replace(/readonly /g, "")
    .replace(/'/g, '"')
    .replace(/(\w+):/g, '"$1":');

  translations = JSON.parse(objectStr);
} catch (error) {
  console.error("❌ 翻译对象解析失败:", error.message);
  process.exit(1);
}

// 验证翻译完整性
console.log("🔍 检查翻译完整性...");

const enKeys = Object.keys(translations.en);
const zhKeys = Object.keys(translations.zh);

console.log(`📊 英文翻译键数量: ${enKeys.length}`);
console.log(`📊 中文翻译键数量: ${zhKeys.length}`);

// 检查缺失的翻译
const missingInZh = enKeys.filter((key) => !zhKeys.includes(key));
const missingInEn = zhKeys.filter((key) => !enKeys.includes(key));

if (missingInZh.length > 0) {
  console.log("⚠️  中文缺失的翻译键:");
  missingInZh.forEach((key) => console.log(`   - ${key}`));
}

if (missingInEn.length > 0) {
  console.log("⚠️  英文缺失的翻译键:");
  missingInEn.forEach((key) => console.log(`   - ${key}`));
}

if (missingInZh.length === 0 && missingInEn.length === 0) {
  console.log("✅ 所有翻译键都有对应的翻译");
}

// 检查空翻译
const emptyTranslations = [];
[...enKeys, ...zhKeys].forEach((key) => {
  if (translations.en[key] && translations.en[key].trim() === "") {
    emptyTranslations.push(`en.${key}`);
  }
  if (translations.zh[key] && translations.zh[key].trim() === "") {
    emptyTranslations.push(`zh.${key}`);
  }
});

if (emptyTranslations.length > 0) {
  console.log("⚠️  空翻译:");
  emptyTranslations.forEach((key) => console.log(`   - ${key}`));
} else {
  console.log("✅ 没有空翻译");
}

// 统计信息
console.log("\n📈 统计信息:");
console.log(`   总翻译键数: ${enKeys.length}`);
console.log(`   导航相关: ${enKeys.filter((k) => k.startsWith("nav.")).length}`);
console.log(`   通用词汇: ${enKeys.filter((k) => k.startsWith("common.")).length}`);
console.log(`   代码相关: ${enKeys.filter((k) => k.startsWith("code.")).length}`);
console.log(`   导出相关: ${enKeys.filter((k) => k.startsWith("export.")).length}`);
console.log(`   说明相关: ${enKeys.filter((k) => k.startsWith("instructions.")).length}`);

console.log("\n🎉 国际化检查完成!");
