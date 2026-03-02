# Chapter 16: Operations Monitoring & Optimization — Making Your App Better Over Time

> A week after launch, Lynn opened the Dify dashboard to check the data.
>
> The AI customer service handled over 1,200 conversations in one week, with a 78% resolution rate.
>
> *"78% is decent, but what's going on with the other 22%?"*
>
> Lynn dug into the logs and reviewed a few unresolved conversations. She found the issues:
>
> - A customer asked "Can I pay with Klarna in 12 installments?" and the AI answered "We support Klarna," but didn't mention **that only 4 interest-free payments are supported**
> - A customer asked "Do you have any Black Friday deals?" and the AI said "I'll need to transfer you to a human agent" — even though the promotional information was already in the Knowledge Base; it just wasn't retrieved
>
> *"So it's not 'build it and you're done' — you need to keep watching the data, finding problems, and making improvements."*
>
> That's what operations monitoring is for.

## Conversation Logs

Dify records every interaction between users and your application. This is your primary source of data for understanding app performance.

### Viewing Logs

1. Open your application
2. Click "Logs" in the left navigation
3. You'll see a list of conversations sorted by time

Each log entry includes:
- **User input**: What the user asked
- **AI response**: What the application output
- **Metadata**: Response time, token consumption, model used
- **Node execution details** (Workflow/Chatflow): Input and output of each node

### Key Dimensions for Log Analysis

**1. Response Quality**

Review AI responses one by one for accuracy and completeness. Focus on:
- Conversations where the AI said "transferring to a human agent" — these may indicate missing Knowledge Base content
- Conversations where users asked follow-ups or repeated their question — suggesting the first answer wasn't good enough
- Conversations with negative user feedback — if you've enabled the feedback feature

**2. Execution Efficiency**

- Is the average response time reasonable?
- Which nodes take the longest? (They may need optimization)
- Is token consumption within expected range?

**3. Question Distribution**

Track the most common question types. If a certain type appears frequently, it means:
- That area of the Knowledge Base needs strengthening
- Or the business itself needs improvement (e.g., a complicated return process causing high inquiry volume)

## Annotation Replies

Lynn found in the logs that some questions were answered by the AI, but not well enough. For example:

> Customer: Can I use Klarna to pay in 12 installments?
> AI: Yes, TechStore supports Klarna. You can select it at checkout.

This answer had a critical omission — it didn't mention **that Klarna only supports 4 interest-free payments, not 12**. The customer might assume 12 installments are available, only to find out otherwise at checkout — which becomes a complaint.

**Annotation Reply** is the solution for this.

### What Are Annotation Replies

Annotation Replies let you **preset standard answers** for specific questions. When a user's question is similar enough to an annotation, the system **returns your preset answer directly**, bypassing AI generation.

Benefits:
- **Precise control**: You decide exactly how critical questions are answered
- **No hallucinations**: The AI won't fabricate or omit information
- **Faster responses**: No LLM call needed — direct match and return
- **Lower cost**: No token consumption

### Setting Up Annotation Replies

**Method 1: Annotate from Logs**

1. Find a conversation with a subpar answer in the logs
2. Click the "Edit" icon next to the AI's response
3. Modify it to your desired standard answer
4. Click "Save as Annotation"

For example, change the Klarna installment answer to:

```
Yes, TechStore supports Klarna's "Pay in 4" option — you can split your purchase into 4 interest-free payments. However, we don't currently support 12-month installment plans. The exact terms will be shown at checkout.
```

**Method 2: Bulk Import**

If you have a batch of standard Q&As, you can import them in bulk:

1. Go to the "Logs & Annotations" page
2. Switch to the "Annotations" tab
3. Click "Bulk Import"
4. Download the template, fill in question-answer pairs, and upload

**Method 3: Manual Addition**

On the Annotations page, click "Add" to manually enter a question and its standard answer.

### Configuring Match Parameters

1. On the application's "Orchestrate" page, find "Add Feature"
2. Enable "Annotation Reply"
3. Configure:
   - **Similarity Threshold**: Recommended 0.9 (high-precision matching). The higher the threshold, the stricter the matching, and the less likely it is to trigger incorrectly
   - **Embedding Model**: Choose the model for calculating semantic similarity

### Monitoring Annotation Effectiveness

After enabling Annotation Replies, you can see on the Annotations page:
- How many times each annotation was matched
- The similarity score at the time of matching
- Recent match records

This data helps you determine:
- Which annotations are heavily used (meaning the question is truly common)
- Which annotations have never been matched (the question phrasing may need adjustment)
- Whether the similarity score is appropriate (too low may cause false matches)

## Continuous Optimization Cycle

Lynn turned operations monitoring into a periodic process:

```
Deploy the app
    ↓
Review logs (1-2 times per week)
    ↓
Identify issues
    ├── Knowledge Base gaps → Add Knowledge Base content
    ├── Inaccurate answers → Add Annotation Replies
    ├── Flawed workflow → Adjust Workflow nodes
    └── Poor prompts → Optimize Prompts
    ↓
Re-publish
    ↓
Continue monitoring
```

**Week 1**: Lynn added 15 Annotation Replies covering the most common questions.

**Week 2**: The AI customer service resolution rate improved from 78% to 85%. Lynn also added a batch of Knowledge Base content.

**Week 3**: The resolution rate reached 91%. The CS team lead said: "Now only genuinely complex issues need to be transferred to a human."

---

::: tip Lynn's takeaways
1. **The first week after launch is the most important** — focus on reviewing logs and iterating quickly
2. **Use Annotation Replies for "critical questions" first** — like pricing, policies, and other info that can't be wrong
3. **Don't aim for 100% automation** — some questions genuinely need human handling; 90% AI coverage is already excellent
4. **Always export a DSL backup before major changes** — so you can roll back if something breaks
:::

Lynn wrote up this process as a one-page internal document and shared it with the team.

Building the app is just the beginning. Keeping an eye on the data and continuously tuning — that's what makes a tool truly useful.
