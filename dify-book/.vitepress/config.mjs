import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dify 实战指南",
  description: "从零开始，构建企业级 AI 应用",
  lang: 'zh-CN',
  
  // 简洁的黑白主题
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/chapters/00-quick-start' },
      { text: '附录', link: '/appendix/node-reference' }
    ],

    // 侧边栏 - 章节导航
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '📍 学习路线图', link: '/chapters/learning-roadmap' },
          { text: '前言', link: '/chapters/preface' },
          { text: '第 0 章：5 分钟见证 AI 应用的诞生', link: '/chapters/00-quick-start' }
        ]
      },
      {
        text: '第一部分：认知篇',
        items: [
          { text: '第 1 章：从聊天机器人到 AI 工作流', link: '/chapters/01-from-chat-to-workflow' },
          { text: '第 2 章：Dify 能帮你做什么', link: '/chapters/02-what-dify-can-do' }
        ]
      },
      {
        text: '第二部分：客服场景',
        items: [
          { text: '第 3 章：30 分钟搭建 AI 客服', link: '/chapters/03-first-chatbot' },
          { text: '第 4 章：理解应用类型', link: '/chapters/04-app-types' },
          { text: '第 5 章：升级为 Workflow', link: '/chapters/05-upgrade-to-workflow' },
          { text: '第 6 章：条件分支', link: '/chapters/06-conditional-branch' },
          { text: '第 7 章：处理复杂问题', link: '/chapters/07-iteration' },
          { text: '第 8 章：连接外部世界', link: '/chapters/08-tools-and-api' },
          { text: '第 9 章：升级为 Chatflow', link: '/chapters/09-upgrade-to-chatflow' }
        ]
      },
      {
        text: '第三部分：更多场景',
        items: [
          { text: '第 10 章：自动生成运营周报', link: '/chapters/10-weekly-report' },
          { text: '第 11 章：模板转换', link: '/chapters/11-template-transform' },
          { text: '第 12 章：多平台内容工厂', link: '/chapters/12-content-factory' }
        ]
      },
      {
        text: '第四部分：发布与运营',
        items: [
          { text: '第 13 章：发布你的应用', link: '/chapters/13-publish' },
          { text: '第 14 章：综合实战——客户流失预警', link: '/chapters/14-deep-research' },
          { text: '第 15 章：运营监控与优化', link: '/chapters/15-monitoring' },
          { text: '第 16 章：私有部署', link: '/chapters/16-self-hosted' },
          { text: '第 17 章：更远的路', link: '/chapters/17-whats-next' }
        ]
      },
      {
        text: '附录',
        items: [
          { text: '节点速查表', link: '/appendix/node-reference' },
          { text: '提示词模板库', link: '/appendix/prompt-templates' },
          { text: '常见问题', link: '/appendix/faq' },
          { text: '术语表', link: '/appendix/glossary' }
        ]
      },
      {
        text: '素材下载',
        items: [
          { text: 'TechStore FAQ', link: '/assets/techstore-faq' },
          { text: 'TechStore 产品库', link: '/assets/techstore-products' }
        ]
      }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/langgenius/dify' }
    ],

    // 页脚
    footer: {
      message: '基于 Dify 构建 AI 应用',
      copyright: '© 2026'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 编辑链接（方便你在 GitHub 上编辑）
    editLink: {
      pattern: 'https://github.com/jing787/dify-textbook/edit/main/dify-book/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 上下页导航
    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于'
    }
  },

  // Markdown 配置
  markdown: {
    lineNumbers: false
  },

  // Vue 配置 - 禁用模板编译的某些特性
  vue: {
    template: {
      compilerOptions: {
        // 不把 {{ }} 当作 Vue 模板
        delimiters: ['[[', ']]']
      }
    }
  }
})
