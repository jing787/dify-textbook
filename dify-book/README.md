# Dify 实战指南

从零开始，构建企业级 AI 应用。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Vercel

1. Fork 这个仓库到你的 GitHub
2. 在 [Vercel](https://vercel.com) 创建新项目
3. 导入你 Fork 的仓库
4. 框架选择 VitePress
5. 点击 Deploy

部署完成后，你会得到一个 `xxx.vercel.app` 的链接。

## 更新内容

所有内容都在 `chapters/`、`appendix/`、`assets/` 目录下的 Markdown 文件中。

修改 `.md` 文件后：
- 本地开发：自动热更新
- 生产环境：push 到 GitHub，Vercel 会自动重新部署

## 目录结构

```
dify-book/
├── .vitepress/
│   ├── config.mjs      # 网站配置
│   └── theme/          # 主题样式
├── chapters/           # 章节内容
│   ├── preface.md
│   ├── 00-quick-start.md
│   ├── 01-from-chat-to-workflow.md
│   └── ...
├── appendix/           # 附录
│   ├── node-reference.md
│   ├── prompt-templates.md
│   ├── faq.md
│   └── glossary.md
├── assets/             # 素材下载
│   ├── techstore-faq.md
│   └── techstore-products.md
├── index.md            # 首页
└── package.json
```

## 许可

MIT
