# Chapter 9: Adding Conversation Memory to Your Workflow

> TechStore's AI customer service could already classify questions, break down problems, and query the knowledge base. But the CS team lead flagged a new issue:
>
> *"When a customer tells the AI their budget is $500 in one message, the AI completely forgets it in the next and asks again. Customers think our AI is stupid."*
>
> Lynn tried it out and confirmed the problem:
>
> ```
> Customer: I'm looking for a new phone.
> AI: Sure! What's your budget?
> Customer: Around $500.
> AI: What kind of product are you looking for? (completely forgot the budget)
> ```
>
> Where's the problem? **Workflow executes independently each time — it has no "memory."**
>
> "I need a way to remember the conversation context."
>
> That's exactly what Chatflow is — essentially a Workflow with conversation memory added.

## Chatflow vs. Workflow

In Chapter 4, we mentioned Dify's five application types. Let's now compare Workflow and Chatflow in detail:

| | Workflow | Chatflow |
|---|---------|----------|
| **Interaction** | Single input → Single output | Multi-turn conversation |
| **Memory** | None — each execution is independent | Yes — remembers conversation context |
| **Built-in variables** | Basic variables like `sys.user_id`, `sys.files` | Adds `sys.query` (current user input), `sys.conversation_id`, etc. |
| **Conversation variables** | Not supported | Supported — persists across turns |
| **Best for** | One-off tasks (report generation, batch content production) | Multi-turn interactions (customer service, consulting, guided Q&A) |

**In short: Workflow is a "one-and-done" deal; Chatflow is an ongoing conversation.**

Customer service naturally requires multi-turn conversations — customers won't share all their information at once, and the AI needs to follow up, confirm, and remember what was said before.

## Step 1: Create a Chatflow Application

1. Go to Studio → Create blank application
2. Select application type: **Chatflow**
3. Name it "TechStore AI Customer Service v3"
4. Click Create

You'll see a canvas interface similar to Workflow, but with a few differences:

- The **Start node** comes with a built-in `sys.query` variable (the user's current input) — no need to manually define input variables
- There are additional **conversation memory** settings
- The End node is replaced by an **"Answer"** node (also called "Direct Reply")

## Step 2: Build the Basic Conversation Flow

Let's port over the core flow from the previous Workflow:

**1. Add a Question Classifier node**

Connect it after the Start node.

Configure the categories:
- Category 1: Product Inquiry — asking about product info, pricing, features, recommendations
- Category 2: After-Sales Service — returns, exchanges, warranty, shipping, refunds
- Category 3: Complaints & Suggestions — expressing dissatisfaction, providing criticism
- Category 4: Other

**2. Add processing flows for each category**

Same as the previous Workflow:
- Product Inquiry → Product Knowledge Base → LLM response
- After-Sales Service → FAQ Knowledge Base → LLM response
- Complaints/Other → Empathetic response LLM

**3. Connect to the "Answer" node**

Chatflow uses "Answer" instead of Workflow's "End" node. It sends the LLM's output directly to the user and keeps it in the conversation history.

::: tip Answer vs. End
- Workflow's "End": Outputs the result and the process ends — the next execution starts fresh
- Chatflow's "Answer": Outputs the result and waits for the user's next input — conversation context is preserved
:::

At this point, you already have a customer service bot that can handle multi-turn conversations. But there's still a key capability missing — **remembering information the user has already shared**.

## Step 3: Use Conversation Variables

**Conversation Variables** are a capability unique to Chatflow. They allow you to store and retrieve information across multiple conversation turns.

### Create Conversation Variables

1. Click the "Conversation Variables" button at the top of the canvas
2. Add variables:

| Variable Name | Type | Description |
|--------------|------|-------------|
| `user_budget` | String | User's budget |
| `user_preference` | String | User's preferences (brand, features, etc.) |
| `order_id` | String | Order number (for returns/exchanges) |

These variables persist throughout the entire conversation and won't disappear between turns.

### Extract Information with the Parameter Extractor

Before the Question Classifier, add a "Parameter Extractor" node:

**Input variable**: `sys.query`

**Parameters to extract**:
- `budget`: String — budget range mentioned by the user
- `preference`: String — brand or feature preferences mentioned by the user
- `order_id`: String — order number mentioned by the user

**Extraction instructions**:
```
Extract the following information from the user's message (if present).
If the user doesn't mention a particular piece of information, return an empty string for that field.
- budget: Budget amount or range
- preference: Brand preference, feature requirements, use case
- order_id: Order number
```

### Store Information with the Variable Assigner

The "Variable Assigner" node writes extracted information into conversation variables.

1. Add a "Variable Assigner" node after the Parameter Extractor
2. Configure:
   - Write `budget` to conversation variable `user_budget` (only when the value is not empty)
   - Write `preference` to conversation variable `user_preference` (only when the value is not empty)
   - Write `order_id` to conversation variable `order_id` (only when the value is not empty)

### Use Conversation Variables in the LLM

Now, the LLM prompt for the Product Inquiry branch can be written like this:

```
You are a TechStore product consultant. Answer questions based on the product materials and customer information.

Known customer information:
- Budget: {{user_budget}}
- Preferences: {{user_preference}}

Reference materials:
{{#context#}}

Response guidelines:
1. If the customer's budget is known, recommend products within their budget
2. If the customer's preferences are known, prioritize matching products
3. If information is insufficient, ask follow-up questions naturally
4. Be friendly — converse like a real consultant
```

## Step 4: Test the Multi-Turn Conversation

Click "Preview" and start testing:

```
Customer: I'm looking to buy a phone.
AI: Great! What's your budget roughly? Are there any features you care about most,
    like camera quality, battery life, or gaming performance?

Customer: Budget is around $500, mainly want a good camera.
AI: For great camera performance around $500, I'd recommend our TechPhone Pro 16
    (starting at $599). It features a 50MP main camera + 64MP telephoto lens with
    Leica optics... If you want to stay closer to budget, the TechPhone Lite 12
    also has excellent camera capabilities.
    Which one would you like to learn more about?

Customer: Does the Pro 16 come in white?
AI: Yes! The TechPhone Pro 16 comes in three colors: Starlight Black, Glacier White,
    and Twilight Purple. Glacier White is very popular — would you like to see some
    real photos?
```

Notice: In the third turn, the AI didn't ask "what are you looking for?" again because it **remembered** the user was asking about the TechPhone Pro 16.

## Complete Chatflow Structure

```
Start (receives sys.query)
    ↓
Parameter Extractor (extracts budget/preferences/order number)
    ↓
Variable Assigner (writes to conversation variables)
    ↓
Question Classifier
    ├── Product Inquiry → Product Knowledge Base → Product Consultant LLM (references conversation variables)
    ├── After-Sales → FAQ Knowledge Base → After-Sales Specialist LLM (references order_id)
    ├── Complaints → Empathetic Response LLM
    └── Other → General Response LLM
    ↓
Answer
```

## The Upgrade Path: Chatbot → Workflow → Chatflow

Let's review the complete upgrade journey of TechStore's customer service:

| Version | App Type | Capabilities |
|---------|----------|-------------|
| v1 | Chatbot | Simple Q&A, knowledge base queries |
| v2 | Workflow | Classification, iterative breakdown, tool calls |
| v3 | Chatflow | Everything in v2 + multi-turn conversation memory |

This is also the typical application upgrade path on Dify:

1. **Start with a Chatbot to validate the idea** — fastest to ship, takes just minutes
2. **Use Workflow to enhance the logic** — add branching, iteration, tools, and other advanced capabilities
3. **Use Chatflow to improve the experience** — add conversation memory for more natural interactions

---

After Lynn deployed the new version, the CS team lead's feedback changed:

*"Customers are saying our AI is much smarter now — it even remembers what they said earlier."*

Lynn smiled. After all these chapters of work, TechStore's AI customer service was finally acting like a proper customer service agent.

The customer service project was done for now. Next up, Lynn had to tackle the second pain point — the weekly operations report every Friday afternoon.
