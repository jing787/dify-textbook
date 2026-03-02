# Chapter 4: Understanding App Types — Why You Need to Upgrade

> After running the customer service assistant for a few days, Lynn collected quite a bit of feedback:
>
> "The complaint handling sounds too cold and robotic — customers get even angrier."
> "A customer asked three questions in one email, but the AI only answered the first one."
> "Someone asked where their package was, and the AI told them to check it themselves. Can't it just look it up?"
>
> Lynn realized: a simple Chatbot wasn't going to cut it.

## App Types in Dify

In Dify, you can create several types of applications. The two primary types are:

| Type | Description | Use Cases |
|------|-------------|-----------|
| **Workflow** | Multi-step process orchestration; single input → output | Report generation, data processing, batch tasks |
| **Chatflow** | Conversational workflow; Workflow + multi-turn conversation memory | Customer service, consultations, guided Q&A |

Beyond these two, there are three simplified types (Chatbot, Agent, Text Generator). Under the hood, they all run on the Workflow engine — they just provide a simpler configuration interface, making them great for quickly testing ideas. What Lynn created in Chapter 3 was a Chatbot — no need to draw flowcharts, just configure some prompts and a Knowledge Base and you're good to go.

But the limitations of a Chatbot are pretty clear:
- It can only answer based on the Knowledge Base
- It can't process things in steps
- It can't call external systems
- It can't route different question types to different flows

To address the feedback, Lynn needed to upgrade to **Workflow**.

## Chatbot vs Workflow: An Analogy

Imagine you're eating at a restaurant.

**A Chatbot is like a fixed set meal**:
- You say "I'd like to eat"
- The server brings you a standard set meal
- No matter what you actually want, you get the same thing

**A Workflow is like cooking from a recipe**:
- First, ask what you want to eat (receive input)
- Determine if it's Chinese or Western food (conditional branching)
- If Chinese, call the Chinese chef; if Western, call the Western chef (different processing paths)
- Adjust seasoning to your taste (parameter tuning)
- Plate and serve (output the result)

**The core capability of a Workflow is: you get to design the entire processing flow.**

## When to Use a Workflow

You should consider using a Workflow when your requirements match any of these scenarios:

**1. You need categorized handling**
- Different types of questions need different processing flows
- Example: product inquiries go to the product Knowledge Base, returns go to the policy Knowledge Base, complaints go to the de-escalation flow

**2. You need multi-step processing**
- A task needs to be broken into multiple steps
- Example: extract keywords → search Knowledge Base → generate answer → format output

**3. You need to call external systems**
- You need to query databases, call APIs, or search the web
- Example: check order status, get real-time shipping info

**4. You need batch processing**
- A single input contains multiple sub-tasks
- Example: one email with three questions, each needing a separate answer

Lynn's needs — categorized handling, multi-question responses, shipping lookups — all pointed to Workflow.

## The Upgrade Path

The good news is you don't have to start from scratch.

Dify lets you take your existing Chatbot logic and "move" it into a Workflow, then enhance it step by step.

Over the next few chapters, we'll progressively upgrade TechStore's customer service:

| Chapter | Goal | What You'll Learn |
|---------|------|-------------------|
| Chapter 5 | Rebuild customer service with Workflow | Workflow basics, node concepts |
| Chapter 6 | Route different questions differently | Conditional branching (IF/ELSE) |
| Chapter 7 | Handle multiple questions in one email | Iteration |
| Chapter 8 | Look up shipping, search the web | Tool calling (Agent) |

After these chapters, TechStore's customer service won't just be a bot that recites FAQs — it'll be able to categorize, break down problems, and pull external data.

Let's get started.
