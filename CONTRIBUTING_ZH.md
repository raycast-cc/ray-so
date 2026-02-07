# Ray.so 中文版贡献指南

## 如何贡献中文 Prompt

### 方式一：提交 GitHub Pull Request

1. Fork 本仓库
2. 创建分支：`git checkout -b add-my-prompt`
3. 修改 `app/(navigation)/prompts/prompts.ts` 添加你的 Prompt
4. 提交：`git commit -m "Add: xxx Prompt"`
5. Push 并创建 PR

### 方式二：提交 Issue

在 GitHub Issues 中提交你想添加的 Prompt 建议。

### Prompt 数据结构

```typescript
{
  id: 'unique-id',
  title: '英文标题',
  titleZh: '中文标题',
  description: '英文描述',
  descriptionZh: '中文描述',
  content: '英文 Prompt 内容',
  contentZh: '中文 Prompt 内容',
  author: { name: '你的名字' },
  tags: ['tag1', 'tag2'],
  category: 'coding', // writing, coding, analysis, creative, productivity
  icon: 'code', // 图标名称
  date: '2026-02-06',
}
```

### 分类说明

| 分类 | 说明 | 示例 |
|:---|:---|:---|
| `writing` | 写作 | 作文润色、翻译 |
| `coding` | 编程 | 代码审查、Bug 修复 |
| `analysis` | 分析 | 内容摘要、数据分析 |
| `creative` | 创意 | 头脑风暴、故事生成 |
| `productivity` | 效率 | 任务管理、日程规划 |

### 图标名称

参考 Raycast 图标：`@raycast/icons`
