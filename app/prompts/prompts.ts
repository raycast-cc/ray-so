// 中文 Prompt 数据
// 基于 ray.so prompts.ts 格式

export type Prompt = {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  content: string;
  contentZh: string;
  author: string;
  tags: string[];
  category: string;
  models: string[];
  premium?: boolean;
};

export const prompts: Prompt[] = [
  {
    id: 'code-review',
    title: 'Code Review Expert',
    titleZh: '代码审查专家',
    description: 'Professional code review with best practices',
    descriptionZh: '专业代码审查，遵循最佳实践',
    content: `You are a senior software engineer conducting a code review. Analyze the code for:
1. Potential bugs and edge cases
2. Performance issues
3. Security vulnerabilities
4. Code style and readability
5. Test coverage

Provide specific suggestions with code examples where applicable.`,
    contentZh: `你是一位高级软件工程师，进行代码审查。分析代码的：
1. 潜在 bug 和边界情况
2. 性能问题
3. 安全漏洞
4. 代码风格和可读性
5. 测试覆盖率

在适用的情况下，提供具体的建议和代码示例。`,
    author: 'ray-so',
    tags: ['review', 'quality', 'best-practices'],
    category: 'coding',
    models: ['claude', 'gpt-4', 'deepseek'],
  },
  {
    id: 'english-essay',
    title: 'English Essay Writer',
    titleZh: '英文作文助手',
    description: 'Help improve English essay writing',
    descriptionZh: '帮助改进英文作文写作',
    content: `Help me improve my English essay. Provide feedback on:
1. Grammar and spelling
2. Vocabulary and phrasing
3. Logical flow
4. Overall structure
5. Academic tone

Also suggest specific improvements with revised examples.`,
    contentZh: `帮助我改进我的英文作文。提供反馈：
1. 语法和拼写
2. 用词和措辞
3. 逻辑流畅度
4. 整体结构
5. 学术语气

同时提供具体的改进建议和修改示例。`,
    author: 'ray-so',
    tags: ['writing', 'english', 'essay'],
    category: 'writing',
    models: ['claude', 'gpt-4'],
  },
  {
    id: 'chinese-summary',
    title: 'Chinese Content Summarizer',
    titleZh: '中文内容摘要',
    description: 'Summarize Chinese content accurately',
    descriptionZh: '准确摘要中文内容，保持原意',
    content: `Summarize the following Chinese content. Preserve the key points and meaning accurately. Use Simplified Chinese in the summary. Focus on:
1. Main topic
2. Key arguments
3. Important details
4. Conclusions

Output in clear, concise Chinese.`,
    contentZh: `摘要以下中文内容。准确保留要点和原意。使用简体中文输出，专注于：
1. 主题
2. 关键论点
3. 重要细节
4. 结论

输出清晰简洁的中文摘要。`,
    author: 'ray-so-zh',
    tags: ['summary', 'chinese', 'comprehension'],
    category: 'analysis',
    models: ['claude', 'deepseek', 'ernie'],
  },
  {
    id: 'rust-expert',
    title: 'Rust Programming Expert',
    titleZh: 'Rust 编程专家',
    description: 'Expert Rust code assistance',
    descriptionZh: '专家级 Rust 代码辅助',
    content: `You are a Rust expert. Help with:
1. Rust idiomatic patterns
2. Memory safety concerns
3. Lifetime management
4. Error handling (Result, Option)
5. Concurrency patterns (Tokio, async-std)
6. Trait and generics usage

Provide production-quality code examples.`,
    contentZh: `你是 Rust 专家。帮助解决：
1. Rust 惯用模式
2. 内存安全问题
3. 生命周期管理
4. 错误处理 (Result, Option)
5. 并发模式 (Tokio, async-std)
6. Trait 和泛型使用

提供生产级别的代码示例。`,
    author: 'ray-so-zh',
    tags: ['rust', 'programming', 'expert'],
    category: 'coding',
    models: ['claude', 'deepseek'],
  },
  {
    id: 'startup-pitch',
    title: 'Startup Pitch Coach',
    titleZh: '创业路演教练',
    description: 'Help craft compelling startup pitches',
    descriptionZh: '帮助制作有说服力的创业路演',
    content: `Help me refine my startup pitch. Analyze and improve:
1. Problem statement clarity
2. Solution description
3. Market opportunity
4. Business model
5. Team background
6. Traction and metrics

Make it compelling and investor-ready.`,
    contentZh: `帮助我完善我的创业路演。分析和改进：
1. 问题陈述清晰度
2. 解决方案描述
3. 市场机会
4. 商业模式
5. 团队背景
6. 进展和指标

使其有说服力、投资者就绪。`,
    author: 'ray-so-zh',
    tags: ['startup', 'pitch', 'business'],
    category: 'creative',
    models: ['claude', 'gpt-4'],
  },
];

export const categories = [
  { id: 'writing', name: '写作', nameZh: '写作' },
  { id: 'coding', name: 'Coding', nameZh: '编程' },
  { id: 'analysis', name: 'Analysis', nameZh: '分析' },
  { id: 'creative', name: 'Creative', nameZh: '创意' },
  { id: 'productivity', name: 'Productivity', nameZh: '效率' },
];

export const models = [
  { id: 'claude', name: 'Claude' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'ernie', name: '文心一言' },
];
