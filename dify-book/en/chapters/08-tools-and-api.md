# Chapter 8: Connecting to the Outside World — Shipping Lookups & Web Search

> TechStore's customer service is already quite powerful. But there's one category of questions it still can't handle:
>
> Customer asks: *"Where's my order 2025112800001?"*
>
> AI responds: *"Please check your shipping information..."*
>
> That answer isn't wrong — but it's useless. The customer wants to know the **actual shipping status**, and that information isn't in the Knowledge Base — it requires a real-time query to the courier's system.
>
> "I need the AI to be able to call external tools."
>
> That's what Agent nodes and tool calling are for.

## Understanding Tool Calling

While many AI products now come with built-in web search and tool calling, a plain LLM node in a Dify Workflow can only process text by default — it won't go look up shipping info or search the web on its own.

You need to explicitly equip it with tools:

1. **Information retrieval** — search engines, database queries, API calls, letting the AI access real-time data
2. **Executing actions** — sending emails, writing to databases, calling internal systems, letting the AI actually "do things"

**Tool Calling** is exactly what enables this.

You can equip the AI with various "tools":
- Search engines: look up the latest information
- Shipping tracking API: get delivery status
- Database queries: access business data
- Calculator: perform precise calculations
- Send email: execute real actions

The AI will analyze the user's question, **decide which tool it needs**, call the tool to get results, and then generate an answer based on those results.

Think of it like giving an assistant a computer and a phone — the assistant no longer has to rely on memory alone, they can actually "look things up."

## Dify's Plugin Marketplace

Dify's tool capabilities are provided through the **Plugin Marketplace**. Think of the Marketplace as an app store for your phone — when you need a capability, just install it from the Marketplace.

The Marketplace content is organized into several categories:

**Tools (tool plugins)** are the most commonly used. Search engines, weather lookups, math calculations, code execution... these all exist as plugins that need to be installed before use. Google Search, DuckDuckGo, Wikipedia, Slack, Notion, GitHub — the community is continuously contributing new tool plugins.

**Models (model plugins)** are used to connect various large language models. OpenAI, Anthropic, Google Gemini, AWS Bedrock... each model provider is also a plugin.

**Agent Strategies** and **Extensions** are more advanced categories — we'll cover them when we encounter them later.

Beyond what's available in the Marketplace, you can also call any API via the **HTTP Request node** or implement custom logic with **Code nodes**. So even if the Marketplace doesn't have the tool you need, there's always a way to integrate it.

## Step 1: Install a Search Tool from the Plugin Marketplace

1. Click "Plugins" in the Dify top navigation bar
2. Enter the Plugin Marketplace and search for "DuckDuckGo"
3. Click "Install" — DuckDuckGo doesn't require an API key, making it great for getting started

Once installed, this tool is available for use in your Workflows. You can always come back to the Marketplace to install more tools.

## Step 2: Add an Agent Node

The Agent node is a standalone node type (not a variant of the LLM node). Its defining feature is the ability to **autonomously decide whether to call tools**, and it supports multi-turn tool calling — call a tool → analyze the result → decide whether to make another call.

1. Add an "Agent" node to your Workflow
2. Configure it:

**Select model**: gpt-5 (recommended for accurate tool calling)

**Configure tools**: Check the tools you want to use, e.g., "DuckDuckGo Search"

**System prompt**:
```
You are TechStore's intelligent customer service agent. When customers ask about product comparisons, market reviews, or other topics requiring up-to-date information, use the search tool to gather information.

Tool usage guidelines:
1. Only use tools when you genuinely need external information
2. Formulate clear search keywords before searching
3. Analyze search results in the context of TechStore's products

Response guidelines:
1. Be objective and fair — don't over-promote
2. If search results are uncertain, say so
3. Cite sources when referencing information
```

## Step 3: Test the Search Functionality

**Input:**
```
How does the TechPhone Pro 16 compare to the iPhone 16?
```

Watch the Agent's execution:

1. The Agent analyzes the question and determines it needs external information
2. The Agent calls DuckDuckGo to search "TechPhone Pro 16 vs iPhone 16"
3. The search returns relevant articles and reviews
4. The Agent generates an answer based on the search results

**Sample output:**
```
Based on online reviews and comparisons, the TechPhone Pro 16 and iPhone 16 each have their strengths:

Display: The TechPhone Pro 16 features a 6.7-inch AMOLED display with 120Hz refresh rate;
the iPhone 16 has a 6.1-inch Super Retina XDR display at 60Hz (the Pro models support 120Hz).

Performance: The TechPhone Pro 16 runs on the Snapdragon 8 Gen 3, while the iPhone 16 uses the A18 chip.
In benchmark tests...

Price: The TechPhone Pro 16 starts at $599, while the iPhone 16 starts at $799.
TechStore's product has a clear advantage in value for money.

If you prioritize value and fast charging, the TechPhone Pro 16 is recommended;
if you prefer the iOS ecosystem, the iPhone 16 is also an excellent choice.
```

## Step 4: Add an HTTP Request (Simulating a Shipping Lookup)

For shipping lookups and other internal systems, you'll need the HTTP Request node to call APIs.

1. Add an "HTTP Request" node
2. Configure it:
   - Method: GET
   - URL: `https://api.example.com/logistics/{{order_id}}`
   - Headers: Configure as required by the API
3. Add an LLM node to interpret the results:

```
Please convert the following shipping data into a customer-friendly response:

Shipping data:
{{http_response}}

Response guidelines:
1. Describe the shipping status in natural language
2. Include the estimated delivery time (if available)
3. If there's a shipping issue, provide suggestions
```

::: warning Note
This is a simplified example. In a real project, you would need to:
- Have an actual shipping tracking API (FedEx Tracking API, UPS API, etc.)
- Configure proper authentication credentials
- Handle various error cases
:::

## Integrating into the Complete Flow

Now let's integrate search and API calls into TechStore's complete customer service flow:

**Updated conditional branch logic:**

| Question Type | How It's Handled |
|---------------|------------------|
| Product inquiry (no external info needed) | Knowledge Base + LLM |
| Product comparison (needs external info) | Agent + search tool |
| Shipping lookup | HTTP Request + LLM |
| After-sales service | Knowledge Base + LLM |
| Complaint/Other | De-escalation response + transfer to human |

The complete Workflow can now:
- ✅ Answer basic product questions (Knowledge Base)
- ✅ Compare with competitors (web search)
- ✅ Look up order shipping (API call)
- ✅ Handle after-sales inquiries (Knowledge Base)
- ✅ De-escalate customer complaints (response templates)

---

Lynn looked at the complete Workflow and thought: this thing is already more reliable than a lot of human agents.

By this point, you've seen all the core Workflow nodes: conditional branching, iteration, parameter extraction, tool calling, and HTTP requests. These capabilities are universal — you'll use them later for weekly reports, content generation, alert systems, and more.

But there's one more piece missing from the customer service scenario: multi-turn conversation memory. The customer mentions their budget, and by the next message the AI has already forgotten. The next chapter uses Chatflow to fix that.
