# Chapter 3: 30 Minutes — Build Your First AI Customer Service Bot

> Hundreds of inquiries pour into TechStore every day, and most of them are the same questions over and over — how to return an item, how long shipping takes, what the warranty covers.
>
> Lynn thought: if AI could handle these repetitive questions, the CS team could free up their time for genuinely complex cases.
>
> Worth a shot.

## Prep Work: Get an API Key

Dify itself is an orchestration platform — it needs to call a large language model to process tasks. You'll need to configure a model first.

Using OpenAI as an example:

1. Go to [platform.openai.com](https://platform.openai.com)
2. Register an account and add a payment method
3. Create a new key on the API Keys page
4. Copy and save it (it's only shown once)

Dify supports dozens of model providers (OpenAI, Anthropic, Google Gemini, Mistral, AWS Bedrock, etc.). The process is similar for all of them — register a developer account on the provider's platform and get an API key.

**Configure the model in Dify:**

1. Go to the Dify workspace
2. Click your avatar in the top right → Settings → Model Provider
3. Find your model provider (e.g., OpenAI) and click Configure
4. Enter your API Key and save

Once configured, you can use this model in Dify.

## Step 1: Create a Knowledge Base

For AI to answer TechStore questions, it first needs to "know" TechStore's information. That's where the **Knowledge Base** comes in.

1. In the left sidebar, click "Knowledge"
2. Click "Create Knowledge"
3. Name it "TechStore FAQ"
4. Select "Import existing text"

Now you need to prepare the content. Lynn put together TechStore's FAQ document:

::: details Click to view TechStore FAQ sample content
```markdown
# TechStore FAQ

## Shipping
- Coverage: Domestic shipping within the US
- Delivery: Metro areas 1-2 days, other regions 3-5 days
- Cost: Free shipping on orders over $50; $5.99 flat rate otherwise

## Return Policy
- 30-day return: Within 30 days of delivery, item must be unopened
- Defective items: 15-day exchange, 1-year free repair
- Non-returnable: Activated electronics, custom products, free gifts

## Warranty
- Smartphones / Tablets: 1-year warranty
- Laptops: 2-year warranty
- Accessories: 6-month warranty

## Payment Methods
Credit/Debit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, Klarna installments
```
:::

5. Upload your FAQ document (supports TXT, Markdown, PDF, Word)
6. Configure segmentation and indexing:
   - **Segmentation mode**: Start with "Automatic" — Dify will split your document into appropriate chunks
   - **Indexing mode**: Choose "High Quality" — it uses an Embedding model to convert text into vectors for better retrieval (the trade-off is some token consumption during processing)
7. Click "Save & Process"

Wait a few minutes and the Knowledge Base is ready. On the Knowledge Base detail page, you'll see the document split into multiple "segments" (also called chunks). Each segment is vectorized and indexed, so when users ask questions, Dify finds the segments most similar to the query.

::: tip Advanced: Knowledge Pipeline
Dify also offers a more powerful feature called **Knowledge Pipeline**, where you can visually orchestrate the document processing flow — just like building a Workflow. How to clean, how to segment, how to index — it's all configurable.

One key capability is **Parent-Child Retrieval**: it uses fine-grained segments for precise matching, and when a match is found, returns the parent (larger) segment to the LLM — balancing retrieval precision with context completeness.

For getting started, the default automatic segmentation + high-quality indexing works just fine. When you run into "retrieval results aren't accurate enough" issues, come back and explore Knowledge Pipeline.
:::

## Step 2: Create a Chatbot Application

The Knowledge Base is ready. Now let's create a Chatbot that uses it.

1. Click "Studio" in the left sidebar
2. Click "Create Blank App"
3. Select application type: **Chatbot**
4. Name it "TechStore CS Assistant"
5. Click Create

You'll enter the Chatbot editing interface.

## Step 3: Configure the App

Now let's configure the Chatbot.

**Set the System Prompt:**

In the "Instructions" area, enter:

```
You are TechStore's intelligent customer service assistant.

Your job is to answer customer questions about TechStore, including product inquiries, shipping, returns/exchanges, and warranties.

Response guidelines:
1. Only answer based on information in the Knowledge Base — do not make things up
2. If the Knowledge Base doesn't have the relevant information, say "I'll need to transfer this to a human agent"
3. Be friendly and professional
4. Keep responses concise, under 200 words
```

**Connect the Knowledge Base:**

1. In the "Context" section, click "Add"
2. Select the "TechStore FAQ" Knowledge Base you just created
3. Set retrieval count: 3–5 (retrieves the most relevant segments)

**Choose a Model:**

1. In the "Model" section, select the model you configured
2. Recommended: gpt-4o-mini (great cost-performance ratio) or gpt-5 (better results but more expensive)

## Step 4: Test It Out

Configuration complete — let's test it.

Click "Preview" on the right to open the test chat window.

**Test 1: Return policy**
```
User: I want to return something I bought. How do I do that?
```

The AI should answer based on the Knowledge Base's return policy.

**Test 2: Shipping time**
```
User: How long does delivery take to New York?
```

**Test 3: Question outside the Knowledge Base**
```
User: Do you sell refurbished phones?
```

The AI should say it needs to transfer to a human agent (since the Knowledge Base doesn't have this information).

If the test results are roughly correct, your first AI customer service bot is up and running.

## Publish the App

Once testing looks good, click "Publish" in the top right.

After publishing, you can:
- Get a web link to share with your team for trial use
- Get an API endpoint for integration into existing systems

---

Lynn sent the link to a few CS colleagues for a test run.

Feedback came back quickly:

*"It gets the basic questions right!"*

*"But it can't handle some of the more complex questions…"*

*"One customer asked three questions at once, and it only answered the first one."*

*"Its tone is too stiff when handling complaints."*

Lynn realized that a simple Chatbot is just the starting point. To truly hold up under real-world usage, it would need further upgrades.
