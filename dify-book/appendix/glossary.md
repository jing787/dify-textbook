# 术语表

## AI 基础概念

### LLM（大语言模型）
Large Language Model 的缩写。经过海量文本训练的 AI 模型，能理解和生成自然语言。

代表：GPT-5、Claude、Gemini

### Prompt（提示词）
给 AI 的指令或问题。好的提示词 = 好的输出。

### Token
AI 处理文本的最小单位。

粗略估计：1 个中文字 ≈ 2 token

API 按 token 计费，所以提示词越长越贵。

### Temperature（温度）
控制 AI 输出的"创造性"。

- 0 = 确定性高，每次输出差不多
- 1 = 随机性高，每次输出可能很不同

## RAG 相关

### RAG（检索增强生成）
Retrieval-Augmented Generation

先从知识库检索相关内容，再让 AI 基于这些内容回答。

**好处**：AI 不再只靠训练知识，可以用你的数据。

### Embedding（向量嵌入）
把文本转成一串数字（向量）的过程。

**为什么要转？** 因为这样计算机才能计算"两段文本有多相似"。

### 向量数据库
专门存储和检索向量的数据库。

Dify 默认使用 pgvector（基于 PostgreSQL），也支持 Weaviate、Qdrant、Milvus、Pinecone 等。

## Dify 相关

### Workflow
工作流。由多个节点组成的处理流程。

输入 → 处理 → 输出

### Chatflow
带对话记忆的 Workflow。

适合多轮对话场景。

### Agent
智能体。可以自主决定调用什么工具来完成任务的 AI。

### DSL
Domain Specific Language

Dify 用来保存应用配置的格式（YAML）。

## 技术相关

### API
应用程序接口。让不同软件之间通信的方式。

你通过 API 调用 Dify = 你的系统和 Dify 对话

### Docker
容器技术。把应用和它需要的环境打包在一起，方便部署。

### Webhook
一种通知机制。"有事发生时，通知我"。

### JSON
一种数据格式。长得像这样：

```json
{"name": "Lynn", "role": "ops_manager"}
```

### Jinja2
一种模板语言。用于格式化文本输出。

语法示例：`{{ 变量名 }}`
