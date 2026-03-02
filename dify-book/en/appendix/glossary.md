# Glossary

## AI Fundamentals

### LLM (Large Language Model)
An AI model trained on massive amounts of text, capable of understanding and generating natural language.

Examples: GPT-5, Claude, Gemini

### Prompt
The instructions or questions given to the AI. Better prompts = better output.

### Token
The smallest unit of text that AI processes.

Rough estimate: 1 English word ≈ 1-2 tokens

API pricing is based on tokens, so longer prompts cost more.

### Temperature
Controls the "creativity" of AI output.

- 0 = Most deterministic, output is nearly identical each time
- 1 = Default, with some randomness
- 2 = Maximum randomness (supported by some models), output can be very divergent

## RAG-Related

### RAG (Retrieval-Augmented Generation)
First retrieves relevant content from a Knowledge Base, then has the AI answer based on that content.

**Benefit**: The AI no longer relies solely on its training knowledge — it can use your data.

### Embedding (Vector Embedding)
The process of converting text into a sequence of numbers (a vector).

**Why convert?** Because that's how a computer can calculate "how similar two pieces of text are."

### Vector Database
A database specifically designed to store and retrieve vectors.

Dify's Docker Compose deployment uses Weaviate by default, but also supports pgvector (PostgreSQL), Qdrant, Milvus, Pinecone, and others.

### Rerank (Re-Ranking)
After retrieval returns a batch of chunks, a specialized ranking model re-scores and re-orders the results, putting the most relevant ones first. More accurate than pure vector similarity.

Common Rerank models: Cohere Rerank, Jina Reranker.

### Hybrid Search
Performs both vector search and full-text search simultaneously, then merges the results. Combines semantic understanding with precise keyword matching — the recommended choice for most scenarios.

### Parent-Child Chunking
A two-tier segmentation strategy: documents are first split into large segments (parent chunks), then into small segments (child chunks). During retrieval, child chunks are used for precise matching; when a match is found, the entire parent chunk is returned to the LLM. Balances retrieval precision with context completeness.

### Knowledge Pipeline
Dify's visual document processing orchestration tool. Like building a Workflow, you can visually configure the extraction, cleaning, segmentation, and indexing pipeline for documents. Suited for complex document processing scenarios.

## Dify-Specific

### Workflow
A processing pipeline composed of multiple nodes.

Input → Processing → Output

### Chatflow
A Workflow with conversation memory.

Suited for multi-turn conversation scenarios.

### Agent
An AI that can autonomously decide which tools to call to complete a task.

### DSL
Domain Specific Language

The format Dify uses to save application configurations (YAML).

## Technical Terms

### API
Application Programming Interface. A way for different software systems to communicate.

You calling Dify via API = your system having a conversation with Dify

### Docker
Container technology. Packages an application and its environment together for easy deployment.

### Webhook
A notification mechanism. "When something happens, notify me."

### JSON
A data format. Looks like this:

```json
{"name": "Lynn", "role": "ops_manager"}
```

### Jinja2
A templating language. Used for formatting text output.

Syntax example: `{{ variable_name }}`

### MCP (Model Context Protocol)
A standardized protocol that enables AI applications to communicate with external tools and data sources. Dify supports publishing applications as MCP Servers, which can be called directly by MCP-compatible clients (such as Cursor, Claude Desktop).
