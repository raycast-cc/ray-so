export type Language = "en" | "zh";

export const translations = {
  en: {
    // Navigation
    "nav.codeImages": "Code Images",
    "nav.codeImages.desc": "Create beautiful images of your code",
    "nav.iconMaker": "Icon Maker",
    "nav.iconMaker.desc": "Create beautiful icons",
    "nav.prompts": "Prompts",
    "nav.prompts.desc": "Explore AI Prompts for Raycast",
    "nav.presets": "Presets",
    "nav.presets.desc": "Explore AI Presets for Raycast",
    "nav.quicklinks": "Quicklinks",
    "nav.quicklinks.desc": "Explore Raycast Quicklinks",
    "nav.snippets": "Snippets",
    "nav.snippets.desc": "Browse and import Raycast Snippets",
    "nav.themes": "Themes",
    "nav.themes.desc": "Browse and import Raycast Themes",

    // Common
    "common.about": "About",
    "common.shortcuts": "Shortcuts",
    "common.contribute": "Contribute",
    "common.language": "Language",
    "common.autoDetect": "Auto-Detect",
    "common.categories": "Categories",
    "common.size": "Size",
    "common.position": "Position",
    "common.undo": "Undo",
    "common.format": "Format Code",
    "common.download": "Download",
    "common.copy": "Copy",
    "common.save": "Save",
    "common.export": "Export",
    "common.share": "Share",
    "common.search": "Search",
    "common.select": "Select",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.open": "Open",
    "common.loading": "Loading",
    "common.error": "Error",

    // Presets
    "presets.about.title": "About",
    "presets.about.desc1": "Preset Explorer is a tool to easily browse, share, and add presets to Raycast.",
    "presets.about.desc2":
      'Open a preset and click the "Add to Raycast" button to import the preset directly into Raycast. You can also download the preset as a JSON file, or copy the URL to share with others.',
    "presets.about.contribute": "The project is Open Source and available on GitHub.",
    "presets.about.feedback": "If you have any questions or feedback, please write to us on 𝕏 or send us an email.",
    "presets.shortcuts": "Shortcuts",
    "presets.shortcuts.addToRaycast": "Add to Raycast",
    "presets.shortcuts.downloadJSON": "Download JSON",
    "presets.shortcuts.copyJSON": "Copy JSON",
    "presets.shortcuts.toggleExportMenu": "Toggle export menu",
    "presets.shortcuts.copyURL": "Copy URL",
    "presets.shortcuts.openShortcuts": "Open shortcuts",
    "presets.categories": "Categories",
    "presets.models": "Models",
    "presets.models.advancedAI": "Show Advanced AI",
    "presets.models.advancedAITooltip": "Advanced AI requires the Advanced AI add-on to Raycast Pro",
    "presets.extensions": "AI Extensions",
    "presets.extensions.tooltip": "AI Extensions provide additional functionality to AI models",
    "presets.copyURLToShare": "Copy URL to Share",
    "presets.addToRaycast": "Add to Raycast",
    "presets.downloadJSON": "Download JSON",
    "presets.copyJSON": "Copy JSON",
    "presets.copyInstructions": "Copy Instructions",
    "presets.copiedToClipboard": "Copied to clipboard",
    "presets.copyingURL": "Copying URL to clipboard...",
    "presets.urlCopied": "Copied URL to clipboard!",
    "presets.by": "by",

    // Code Images
    "code.focusEditor": "Focus text editor",
    "code.unfocusEditor": "Unfocus text editor",
    "code.changeColors": "Change colors",
    "code.toggleBackground": "Toggle background",
    "code.toggleDarkMode": "Toggle dark mode",
    "code.toggleLineNumbers": "Toggle line numbers",
    "code.changePadding": "Change padding",
    "code.selectLanguage": "Select language",
    "code.highlightLine": "Highlight line",
    "code.formatCode": "Format code",
    "code.toggleExportMenu": "Toggle Export Menu",
    "code.savePNG": "Save PNG",
    "code.saveSVG": "Save SVG",
    "code.copyImage": "Copy image",
    "code.copyURL": "Copy URL",
    "code.openShortcuts": "Open shortcuts",
    "code.about.title": "About",
    "code.about.desc1": "Code Images by Raycast is a tool to create beautiful screenshots of your code.",
    "code.about.desc2":
      "Pick a theme from a range of syntax colors and backgrounds, the language of your code and choose between light or dark mode.",
    "code.about.desc3":
      "Customize the padding and when you're ready, click export image in the top-right corner to save the image as a png, svg or share a link to your code.",
    "code.about.desc4": "You can also change the image resolution in the export menu.",
    "code.about.contribute": "The project is Open Source and available on GitHub.",
    "code.about.feedback": "If you have any questions or feedback, please write to us on 𝕏 or send us an email.",

    // Format Code Messages
    "code.format.notSupported": "Formatting is not supported for this language",
    "code.format.loading": "Formatting code...",
    "code.format.success": "Formatted code!",
    "code.format.failed": "Code formatting failed",

    // Export Messages
    "code.export.exportingPNG": "Exporting PNG",
    "code.export.copyingPNG": "Copying PNG",
    "code.export.pngCopied": "PNG Copied to clipboard!",
    "code.export.exportingSVG": "Exporting SVG",
    "code.export.copyingURL": "Copying URL",
    "code.export.urlCopied": "URL Copied to clipboard!",
    "code.export.frameNotFound": "Couldn't find a frame to export",
    "code.export.blobError": "Expected toBlob to return a blob",

    // Control Labels
    "code.controls.theme": "Theme",
    "code.controls.padding": "Padding",
    "code.controls.lineNumbers": "Line numbers",
    "code.controls.frameAdjust": "Frame Adjust",
    "code.controls.darkMode": "Dark mode",
    "code.controls.background": "Background",

    // Accessibility Labels
    "code.aria.exportPNG": "Export as PNG",
    "code.aria.exportOptions": "See other export options",

    // Button Labels
    "code.button.export": "Export",
    "code.button.image": "Image",

    // Export
    "export.savePNG": "Save PNG",
    "export.saveSVG": "Save SVG",
    "export.copyImage": "Copy Image",
    "export.copyURL": "Copy URL",
    "export.copyURLToShare": "Copy URL to Share",
    "export.downloadJSON": "Download JSON",
    "export.copyJSON": "Copy JSON",
    "export.addToRaycast": "Add to Raycast",
    "export.size": "Size",
    "export.toggleMenu": "Toggle Export Menu",

    // Instructions
    "instructions.installCommands": "Install AI Commands",
    "instructions.selectPrompt":
      "Select a prompt by clicking on it. Hold ⌘ to select multiple. Click Add to Raycast to import them directly.",
    "instructions.selectSnippet":
      "Select a snippet by clicking on it. Hold ⌘ to select multiple. Click Add to Raycast to import them directly.",
    "instructions.selectQuicklink":
      "Select a quicklink by clicking on it. Hold ⌘ to select multiple. Click Add to Raycast to import them directly.",

    // Icon Maker
    "icon.searchPlaceholder": "Search icons…",
    "icon.randomIcon": "Random icon",
    "icon.createTextIcon": "Create text icon",
    "icon.uploadSvg": "Upload your own SVG",
    "icon.text": "Text",
    "icon.textPlaceholder": "Enter text (e.g., AA, BN, C)",
    "icon.noIconsFound": "We couldn't find an icon for that",
    "icon.requestIcon": "Request icon",
    "icon.results": "Results",
    "icon.allIcons": "All Icons",
    "icon.presets": "Presets",
    "icon.fillStyles": "Fill Styles",
    "icon.fillType": "Fill Type",
    "icon.primaryColor": "Primary color",
    "icon.secondaryColor": "Secondary color",
    "icon.color": "Color",
    "icon.position": "Position",
    "icon.spread": "Spread",
    "icon.angle": "Angle",
    "icon.background": "Background",
    "icon.radialGlare": "Radial glare",
    "icon.noiseTexture": "Noise texture",
    "icon.radius": "Radius",
    "icon.stroke": "Stroke",
    "icon.strokeSize": "Stroke size",
    "icon.strokeColor": "Stroke color",
    "icon.strokeOpacity": "Stroke opacity",
    "icon.icon": "Icon",
    "icon.size": "Size",
    "icon.xOffset": "X Offset",
    "icon.yOffset": "Y Offset",
    "icon.imagePasted": "Image pasted to canvas",
    "icon.undo": "Undo",
    "icon.export": "Export",
    "icon.exportIcons": "Export Icons",
    "icon.addNewExport": "Add new export",
    "icon.exportIcon": "Export Icon",
    "icon.about.title": "About",
    "icon.about.desc1": "Icon Maker by Raycast is a tool to easily create and export icons for your extensions.",
    "icon.about.desc2":
      "Use the Raycast icon library to search for an icon, change the color of the icon, and customize the background to create a beautifully simple icon.",
    "icon.about.desc3":
      "Edit the file name, and when you're ready, click export in the top-right corner to export the icon in the correct size and format to submit to the Raycast Store.",
    "icon.about.viewDocs": "View Documentation",
    "icon.about.contribute": "The project is Open Source and available on GitHub.",
    "icon.about.feedback": "If you have any questions or feedback, please write to us on 𝕏 or send us an email.",
    "icon.shortcuts": "Shortcuts",
    "icon.shortcuts.undo": "Undo action",
    "icon.shortcuts.redo": "Redo action",
    "icon.shortcuts.search": "Search icons",
    "icon.shortcuts.toggleInterface": "Toggle interface",
    "icon.shortcuts.toggleExportMenu": "Toggle export menu",
    "icon.shortcuts.export": "Export",
    "icon.shortcuts.copyImage": "Copy image",
    "icon.shortcuts.copyUrl": "Copy URL",
    "icon.shortcuts.openShortcuts": "Open shortcuts",

    // Icon Fill Types
    "icon.fillType.linear": "Linear",
    "icon.fillType.radial": "Radial",
    "icon.fillType.solid": "Solid",

    // Icon Positions
    "icon.position.center": "Center",
    "icon.position.top": "Top",
    "icon.position.right": "Right",
    "icon.position.bottom": "Bottom",
    "icon.position.left": "Left",
  },
  zh: {
    // Navigation
    "nav.codeImages": "代码图片",
    "nav.codeImages.desc": "创建美观的代码截图",
    "nav.iconMaker": "图标制作器",
    "nav.iconMaker.desc": "创建美观的图标",
    "nav.prompts": "提示词",
    "nav.prompts.desc": "探索 Raycast AI 提示词",
    "nav.presets": "预设",
    "nav.presets.desc": "探索 Raycast AI 预设",
    "nav.quicklinks": "快速链接",
    "nav.quicklinks.desc": "探索 Raycast 快速链接",
    "nav.snippets": "代码片段",
    "nav.snippets.desc": "浏览和导入 Raycast 代码片段",
    "nav.themes": "主题",
    "nav.themes.desc": "浏览和导入 Raycast 主题",

    // Common
    "common.about": "关于",
    "common.shortcuts": "快捷键",
    "common.contribute": "贡献",
    "common.language": "语言",
    "common.autoDetect": "自动检测",
    "common.categories": "分类",
    "common.size": "尺寸",
    "common.position": "位置",
    "common.undo": "撤销",
    "common.format": "格式化代码",
    "common.download": "下载",
    "common.copy": "复制",
    "common.save": "保存",
    "common.export": "导出",
    "common.share": "分享",
    "common.search": "搜索",
    "common.select": "选择",
    "common.add": "添加",
    "common.remove": "删除",
    "common.cancel": "取消",
    "common.close": "关闭",
    "common.open": "打开",
    "common.loading": "加载中",
    "common.error": "错误",

    // Presets
    "presets.about.title": "关于",
    "presets.about.desc1": "预设探索器是一个轻松浏览、分享和添加预设到 Raycast 的工具。",
    "presets.about.desc2":
      '打开预设并点击"添加到 Raycast"按钮，直接将预设导入 Raycast。您也可以将预设下载为 JSON 文件，或复制链接与他人分享。',
    "presets.about.contribute": "该项目是开源的，可以在 GitHub 上找到。",
    "presets.about.feedback": "如果您有任何问题或反馈，请在 𝕏 上联系我们或发送电子邮件。",
    "presets.shortcuts": "快捷键",
    "presets.shortcuts.addToRaycast": "添加到 Raycast",
    "presets.shortcuts.downloadJSON": "下载 JSON",
    "presets.shortcuts.copyJSON": "复制 JSON",
    "presets.shortcuts.toggleExportMenu": "切换导出菜单",
    "presets.shortcuts.copyURL": "复制链接",
    "presets.shortcuts.openShortcuts": "打开快捷键",
    "presets.categories": "分类",
    "presets.models": "模型",
    "presets.models.advancedAI": "显示高级 AI",
    "presets.models.advancedAITooltip": "高级 AI 需要高级 AI 附加组件到 Raycast Pro",
    "presets.extensions": "AI 扩展",
    "presets.extensions.tooltip": "AI 扩展为 AI 模型提供额外功能",
    "presets.copyURLToShare": "复制分享链接",
    "presets.addToRaycast": "添加到 Raycast",
    "presets.downloadJSON": "下载 JSON",
    "presets.copyJSON": "复制 JSON",
    "presets.copyInstructions": "复制说明",
    "presets.copiedToClipboard": "已复制到剪贴板",
    "presets.copyingURL": "正在复制链接到剪贴板...",
    "presets.urlCopied": "链接已复制到剪贴板！",
    "presets.by": "由",

    // Code Images
    "code.focusEditor": "聚焦文本编辑器",
    "code.unfocusEditor": "取消聚焦文本编辑器",
    "code.changeColors": "更改颜色",
    "code.toggleBackground": "切换背景",
    "code.toggleDarkMode": "切换深色模式",
    "code.toggleLineNumbers": "切换行号",
    "code.changePadding": "更改内边距",
    "code.selectLanguage": "选择语言",
    "code.highlightLine": "高亮行",
    "code.formatCode": "格式化代码",
    "code.toggleExportMenu": "切换导出菜单",
    "code.savePNG": "保存 PNG",
    "code.saveSVG": "保存 SVG",
    "code.copyImage": "复制图片",
    "code.copyURL": "复制链接",
    "code.openShortcuts": "打开快捷键",
    "code.about.title": "关于",
    "code.about.desc1": "Raycast 代码图片是一个创建美观代码截图的工具。",
    "code.about.desc2": "从各种语法颜色和背景中选择主题，选择代码语言并在明暗模式之间切换。",
    "code.about.desc3": "自定义内边距，准备好后，点击右上角的导出图片按钮，将图片保存为 PNG、SVG 或分享代码链接。",
    "code.about.desc4": "您还可以在导出菜单中更改图片分辨率。",
    "code.about.contribute": "该项目是开源的，可以在 GitHub 上找到。",
    "code.about.feedback": "如果您有任何问题或反馈，请在 𝕏 上联系我们或发送电子邮件。",

    // Format Code Messages
    "code.format.notSupported": "此语言不支持格式化",
    "code.format.loading": "正在格式化代码...",
    "code.format.success": "代码格式化成功！",
    "code.format.failed": "代码格式化失败",

    // Export Messages
    "code.export.exportingPNG": "正在导出 PNG",
    "code.export.copyingPNG": "正在复制 PNG",
    "code.export.pngCopied": "PNG 已复制到剪贴板！",
    "code.export.exportingSVG": "正在导出 SVG",
    "code.export.copyingURL": "正在复制链接",
    "code.export.urlCopied": "链接已复制到剪贴板！",
    "code.export.frameNotFound": "未找到可导出的框架",
    "code.export.blobError": "生成图片数据失败",

    // Control Labels
    "code.controls.theme": "主题",
    "code.controls.padding": "内边距",
    "code.controls.lineNumbers": "行号",
    "code.controls.frameAdjust": "框架调整",
    "code.controls.darkMode": "深色模式",
    "code.controls.background": "背景",

    // Accessibility Labels
    "code.aria.exportPNG": "导出为 PNG",
    "code.aria.exportOptions": "查看其他导出选项",

    // Button Labels
    "code.button.export": "导出",
    "code.button.image": "图片",

    // Export
    "export.savePNG": "保存 PNG",
    "export.saveSVG": "保存 SVG",
    "export.copyImage": "复制图片",
    "export.copyURL": "复制链接",
    "export.copyURLToShare": "复制分享链接",
    "export.downloadJSON": "下载 JSON",
    "export.copyJSON": "复制 JSON",
    "export.addToRaycast": "添加到 Raycast",
    "export.size": "尺寸",
    "export.toggleMenu": "切换导出菜单",

    // Instructions
    "instructions.installCommands": "安装 AI 命令",
    "instructions.selectPrompt": '点击选择提示词。按住 ⌘ 可选择多个。点击"添加到 Raycast"直接导入。',
    "instructions.selectSnippet": '点击选择代码片段。按住 ⌘ 可选择多个。点击"添加到 Raycast"直接导入。',
    "instructions.selectQuicklink": '点击选择快速链接。按住 ⌘ 可选择多个。点击"添加到 Raycast"直接导入。',

    // Icon Maker
    "icon.searchPlaceholder": "搜索图标…",
    "icon.randomIcon": "随机图标",
    "icon.createTextIcon": "创建文本图标",
    "icon.uploadSvg": "上传您自己的 SVG",
    "icon.text": "文本",
    "icon.textPlaceholder": "输入文本（例如：AA, BN, C）",
    "icon.noIconsFound": "找不到相关图标",
    "icon.requestIcon": "申请图标",
    "icon.results": "搜索结果",
    "icon.allIcons": "所有图标",
    "icon.presets": "预设",
    "icon.fillStyles": "填充样式",
    "icon.fillType": "填充类型",
    "icon.primaryColor": "主色",
    "icon.secondaryColor": "辅助色",
    "icon.color": "颜色",
    "icon.position": "位置",
    "icon.spread": "扩散",
    "icon.angle": "角度",
    "icon.background": "背景",
    "icon.radialGlare": "径向光晕",
    "icon.noiseTexture": "噪声纹理",
    "icon.radius": "圆角",
    "icon.stroke": "描边",
    "icon.strokeSize": "描边大小",
    "icon.strokeColor": "描边颜色",
    "icon.strokeOpacity": "描边透明度",
    "icon.icon": "图标",
    "icon.size": "尺寸",
    "icon.xOffset": "X 偏移",
    "icon.yOffset": "Y 偏移",
    "icon.imagePasted": "图片已粘贴到画布",
    "icon.undo": "撤销",
    "icon.export": "导出",
    "icon.exportIcons": "导出图标",
    "icon.addNewExport": "添加新导出",
    "icon.exportIcon": "导出图标",
    "icon.about.title": "关于",
    "icon.about.desc1": "Raycast 图标制作器是一个轻松创建和导出扩展图标的工具。",
    "icon.about.desc2": "使用 Raycast 图标库搜索图标，更改图标颜色，自定义背景，创建简洁美观的图标。",
    "icon.about.desc3": "编辑文件名，准备好后，点击右上角的导出按钮，以正确的尺寸和格式导出图标，提交到 Raycast 商店。",
    "icon.about.viewDocs": "查看文档",
    "icon.about.contribute": "该项目是开源的，可以在 GitHub 上找到。",
    "icon.about.feedback": "如果您有任何问题或反馈，请在 𝕏 上联系我们或发送电子邮件。",
    "icon.shortcuts": "快捷键",
    "icon.shortcuts.undo": "撤销操作",
    "icon.shortcuts.redo": "重做操作",
    "icon.shortcuts.search": "搜索图标",
    "icon.shortcuts.toggleInterface": "切换界面",
    "icon.shortcuts.toggleExportMenu": "切换导出菜单",
    "icon.shortcuts.export": "导出",
    "icon.shortcuts.copyImage": "复制图片",
    "icon.shortcuts.copyUrl": "复制链接",
    "icon.shortcuts.openShortcuts": "打开快捷键",

    // Icon Fill Types
    "icon.fillType.linear": "线性",
    "icon.fillType.radial": "径向",
    "icon.fillType.solid": "纯色",

    // Icon Positions
    "icon.position.center": "中心",
    "icon.position.top": "顶部",
    "icon.position.right": "右侧",
    "icon.position.bottom": "底部",
    "icon.position.left": "左侧",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) {
    return "zh";
  }
  return "en";
}

const STORAGE_KEY = "ray-so-language";

export function getSavedLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "zh" || saved === "en") {
    return saved;
  }
  return getBrowserLanguage();
}

export function saveLanguage(lang: Language) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, lang);
}

export function getTranslation(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.en[key] || key;
}
