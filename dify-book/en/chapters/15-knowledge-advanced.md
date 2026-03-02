# Chapter 15: Advanced Knowledge Base — Making AI Answers More Accurate

> After the AI customer service had been running for a while, Lynn noticed a pattern in the logs: most wrong answers weren't because the AI couldn't answer — it was because **the wrong content was retrieved**.
>
> For example, a customer asked "How long is the warranty for TechPhone Pro 16?" but the AI returned the warranty terms for TechBuds Pro 3 — because both chunks contained the keyword "warranty," and the retrieval couldn't tell which one to use.
>
> "The knowledge base content is fine, but the retrieval method needs optimization."
>
> Lynn decided to dig deeper into Dify's Knowledge Base configuration.

This chapter doesn't involve Workflow orchestration. It focuses entirely on advanced Knowledge Base usage: how to segment, how to index, how to retrieve, and how to test — tuning the RAG pipeline for optimal performance.

## Review: The Basic Knowledge Base Flow

Let's recall what we did in Chapter 3:

1. Upload documents
2. Automatic segmentation (split into chunks)
3. Vector indexing (convert text into vectors)
4. During retrieval, find the most similar chunks → feed them to the LLM

This flow works with default settings. But default settings are a "one-size-fits-all" approach — they may not be good enough for specific business needs. There are three directions to optimize: **how to segment**, **how to index**, and **how to retrieve**.

## Segmentation Strategy: How to Segment

Segmentation (Chunking) is the most critical step in the entire RAG pipeline. How well you segment directly determines how accurate your retrieval is.

### Basic Concepts

- **Delimiter**: Where to split. For example, `\n\n` splits by paragraph, `\n` splits by line
- **Max Chunk Length**: Maximum characters per chunk. If exceeded, a forced split occurs
- **Overlap**: How many characters overlap between adjacent chunks, to prevent important information from being cut at the boundary

### Two Segmentation Modes

Dify provides two segmentation modes: **General mode** and **Parent-Child mode**.

**General Mode**

All chunks are the same size. Whichever chunk is matched during retrieval is returned. Suitable for short, self-contained content per segment (FAQs, glossaries, etc.).

**Parent-Child Mode**

Documents are first split into large segments (parent chunks), and each parent chunk is further split into small segments (child chunks). During retrieval, child chunks are used for precise matching, and when a child chunk is matched, the entire parent chunk it belongs to is returned to the LLM.

This solves a classic dilemma:
- Small chunks → Precise matching, but insufficient context — the LLM may not fully understand
- Large chunks → Rich context, but imprecise matching — irrelevant content may be included

Parent-Child mode gives you the best of both worlds: **use small chunks for precise targeting, use large chunks for complete context**.

::: tip When to use Parent-Child mode
Use Parent-Child mode when documents are long and densely structured. For example: product manuals, technical documentation, contract terms.

If it's short FAQs or independent Q&A pairs, General mode is sufficient.
:::

### Hands-On: Adjusting Segmentation Settings

In the Knowledge Base detail page → Document Settings, you can adjust the segmentation parameters:

1. **Select mode**: General or Parent-Child
2. **Set delimiter**: Choose based on document structure. For Markdown documents, `\n\n` (paragraph) is recommended; for HTML, split by tags
3. **Set max length**: For General mode, 500-1000 characters is recommended; for Parent-Child mode, child chunks should be 200-500, parent chunks should be 1000-2000
4. **Preview**: Click "Preview" to see the segmentation result — if it doesn't look right, adjust the parameters

::: warning Note
The segmentation mode cannot be changed after a Knowledge Base is created. If you want to switch modes, you need to create a new Knowledge Base and re-upload. However, the delimiter and max length can be adjusted at any time.
:::

## Indexing Method: How to Index

After segmentation, each chunk needs to be indexed so it can be found during retrieval. Dify provides two indexing methods:

| Indexing Method | How It Works | Pros | Cons |
|----------|------|------|------|
| **High Quality** | Uses an Embedding model to convert text into vectors | Understands semantics — "return policy" and "refund process" can match | Consumes Embedding model tokens |
| **Economical** | Keyword inverted index | No token consumption, fast | Only matches keywords, poor semantic understanding |

**Recommendation:** Use High Quality indexing for production projects. Economical mode is only suitable for very tight budgets or scenarios with massive content volume but low precision requirements.

High Quality indexing cannot be downgraded to Economical after creation, but Economical can be upgraded to High Quality.

## Retrieval Strategy: How to Retrieve

After choosing High Quality indexing, there are three retrieval strategies to choose from:

### Vector Search

The user's question is also converted to a vector, and compared against chunk vectors in the Knowledge Base for similarity. The closest matches are returned.

Pros: Understands semantics. If a user asks "how to return an item," it can match "refund process."
Cons: Not sensitive to exact keywords. If a user asks "order number 20251128," vector search may not perform as well as keyword search.

### Full-Text Search

Traditional keyword matching, similar to a search engine.

Pros: Very strong at exact keyword matching.
Cons: Doesn't understand semantics. "Return" and "refund" may not match.

### Hybrid Search — Recommended

Performs both vector search and full-text search simultaneously, then merges the results. You can set the weight ratio between semantic and keyword matching.

This is the best choice for most scenarios — combining semantic understanding with keyword matching.

**Weight setting recommendations:**
- Semantic-first (0.7 semantic / 0.3 keyword): Suitable for open-ended Q&A, like "What's your return policy?"
- Keyword-first (0.3 semantic / 0.7 keyword): Suitable for precise queries, like "Look up order 20251128"
- Balanced (0.5 / 0.5): Start with this when you're not sure

## Rerank: Re-Ranking Retrieval Results

After retrieval returns a batch of chunks, you can use a **Rerank model** to do a fine-grained re-ranking — putting the most relevant results at the top.

How Rerank works: It takes the user's question and each chunk together, and uses a specialized ranking model to score them. This is more accurate than simple vector similarity.

**Configuration:**
1. In "Settings → Model Provider," configure a Rerank model (e.g., Cohere Rerank, Jina Reranker)
2. Enable Rerank in the Knowledge Base's retrieval settings

**Two key parameters:**
- **TopK**: Maximum number of chunks to return. Default is 3; for content-heavy scenarios, you can increase to 5-10
- **Score Threshold**: Minimum similarity score. Chunks below this score are not returned. Default is 0.5; if too many irrelevant results are returned, increase to 0.7

::: tip
Rerank consumes additional tokens, but the improvement in retrieval accuracy is very significant. If your Knowledge Base has a lot of content with overlapping topics, it's strongly recommended to enable it.
:::

## Retrieval Testing: Validate Before Going Live

After configuring the Knowledge Base, don't rush to connect it to an application. First, validate it using the **Retrieval Testing** feature.

**Steps:**
1. Open the Knowledge Base detail page
2. Click "Retrieval Testing" on the left sidebar
3. Enter a real user question
4. Check whether the returned chunks are relevant

**Scenarios to test:**
- Common questions: Check whether the correct answer appears in the TopK results
- Edge cases: For example, products with similar names — does retrieval get confused?
- No-answer questions: For content not in the Knowledge Base, do the retrieval results have very low scores (they should be filtered out)?

If the test results aren't satisfactory, go back and adjust the segmentation strategy, retrieval method, or Rerank parameters, then test again.

## Knowledge Pipeline: Visual Orchestration of Knowledge Processing

If you find the above configuration still not flexible enough, Dify provides an even more powerful tool — **Knowledge Pipeline**.

Knowledge Pipeline lets you visually orchestrate the document processing flow, just like building a Workflow:

```
Data Source → Data Extraction → Data Processing → Knowledge Storage
```

What each stage does:

| Stage | What It Does | Example |
|------|--------|------|
| **Data Source** | Where to read data from | Local files, web pages, Notion |
| **Data Extraction** | Convert raw formats to text | PDF parsing, HTML cleaning |
| **Data Processing** | Segmentation, cleaning, enrichment | Custom segmentation rules, noise removal, summary generation |
| **Knowledge Storage** | Indexing and storage | Vectorization, writing to the Knowledge Base |

Each stage can use different nodes and plugin combinations, offering far more flexibility than the "Quick Create" approach described above.

**When to use Knowledge Pipeline:**
- Complex document formats (mixed PDFs, tables, images)
- Custom cleaning rules needed (removing headers, footers, watermark text, etc.)
- Multiple data sources need unified processing
- Document content needs preprocessing (summarization, translation, format conversion)

**When you don't need it:**
- Simple document formats (plain text, Markdown)
- Default segmentation and indexing are sufficient
- You're just getting started — practice with Quick Create first

::: tip
Knowledge Pipeline has built-in templates, so you don't need to build from scratch. Just open one and modify it.
:::

## Hands-On Exercise: Optimizing TechStore's Knowledge Base

Back to the TechStore scenario. Lynn identified the following issues:

**Issue 1:** Warranty terms for Product A and Product B were getting mixed up
- Cause: Both chunks contained "warranty," and General mode segmentation resulted in similarity scores too close together
- Solution: Switch to **Parent-Child segmentation mode** for smaller, more precise child chunks

**Issue 2:** When customers entered order numbers, retrieval results were irrelevant
- Cause: Pure vector search doesn't handle exact number matching well
- Solution: Switch to **Hybrid Search** and increase the keyword weight

**Issue 3:** Too many irrelevant chunks were returned, actually confusing the LLM
- Cause: TopK was too high, Score Threshold was too low
- Solution: Enable **Rerank**, set TopK to 3, and Score Threshold to 0.7

After adjusting the parameters, Lynn ran a round of retrieval testing. The results were much better — the product mix-up issues no longer occurred, and order number queries were hitting accurately.

---

The Knowledge Base is the foundation of RAG applications. When the foundation is solid, the Workflows and Chatflows built on top can truly deliver results.

::: tip In a nutshell
- Simple content → Quick Create + General segmentation + High Quality indexing
- Complex content → Knowledge Pipeline + Parent-Child segmentation + Hybrid Search + Rerank
- Not sure about the results → Run retrieval tests and let the data speak
:::
