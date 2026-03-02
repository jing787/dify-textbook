# Chapter 5: Upgrading to Workflow — Same Features, More Possibilities

> Lynn decided to upgrade the customer service assistant from a Chatbot to a Workflow.
>
> "Let me replicate the current functionality first, then improve it from there."

## Creating a Workflow App

1. Go to Studio → Create Blank App
2. Select app type: **Workflow**
3. Name it "TechStore CS v2"
4. Click Create

You'll see an entirely new interface — the **Workflow Canvas**.

## Getting to Know the Workflow Canvas

The Workflow Canvas is where you design your AI application. Here are the core concepts:

**Node**: Each block on the canvas is a node, representing a processing step. For example, an "LLM" node calls a large language model, and a "Knowledge Retrieval" node queries a Knowledge Base.

**Edge**: The connections between nodes represent data flow. The output of one node becomes the input of the next.

**Start Node**: Every Workflow has a Start node that defines the input for the entire flow.

**End Node**: Every Workflow has an End node that defines the output of the entire flow.

Canvas tips:
- Scroll to zoom in/out
- Drag to pan the canvas
- Right-click to add nodes
- Drag from a node's edge to create connections

## Step 1: Configure the Start Node

Click the "Start" node on the canvas. In the right panel, configure the input:

**Add an input variable:**
- Variable name: `user_question`
- Type: Text (String)
- Display name: User Question
- Required: Yes

This variable captures the user's question — the starting point for the entire Workflow.

## Step 2: Add a Knowledge Retrieval Node

1. Right-click on an empty area of the canvas, select "Add Node" → "Knowledge Retrieval"
2. Connect the "Start" node to the "Knowledge Retrieval" node
3. Configure the Knowledge Retrieval node:

**Query variable**: Select "Start / user_question"

**Knowledge Base**: Select "TechStore FAQ"

**Retrieval settings**:
- Number of results: 5 (return the 5 most relevant passages)
- Similarity threshold: 0.5 (filter out results with low relevance)

This node retrieves the most relevant content from the Knowledge Base based on the user's question.

## Step 3: Add an LLM Node

1. Add an "LLM" node
2. Connect the "Knowledge Retrieval" node to the "LLM" node
3. Configure the LLM node:

**Select model**: gpt-4o-mini (or another model you've configured)

**System prompt**:

```
You are TechStore's intelligent customer service assistant.

Please answer the user's question based on the following reference materials.

Reference materials:
{{#context#}}

Response guidelines:
1. Only answer based on the reference materials — do not make things up
2. If the materials don't contain relevant information, say "I'll need to transfer this to a human agent"
3. Be friendly and professional
4. Keep answers concise — no more than 200 words
```

**User prompt**:

```
{{user_question}}
```

::: tip Variable References
- `{{#context#}}` is the output of the Knowledge Retrieval node, containing the retrieved content
- `{{user_question}}` is the input variable from the Start node
- Double curly braces `{{}}` are Dify's variable reference syntax
:::

## Step 4: Configure the End Node

1. Connect the "LLM" node to the "End" node
2. Configure the End node:

**Add an output variable**:
- Variable name: `answer`
- Variable value: Select "LLM / text" (the LLM node's output)

Now the complete Workflow structure looks like this:

```
Start (receive user_question)
    ↓
Knowledge Retrieval (retrieve relevant content from Knowledge Base)
    ↓
LLM (generate answer based on retrieved content)
    ↓
End (output answer)
```

## Test Run and Debugging

Click the "Run" button in the upper-right corner to open the test panel.

**Input**:
```
user_question: What's the return process?
```

**Click Run** and watch the execution. Dify's debug panel shows the **real-time execution status** of each node — the currently running node is highlighted, and completed nodes display a green checkmark.

Click any completed node to inspect its input and output. For example, clicking the "Knowledge Retrieval" node shows which passages it retrieved; clicking the "LLM" node shows the complete prompt (with variables filled in with actual values) and the generated response.

This capability is incredibly useful for debugging. If the final answer is wrong, you don't have to guess which step went wrong — just click through each node and inspect the data flow, and you'll quickly pinpoint the issue. If the Knowledge Retrieval node returned irrelevant passages, the problem is in the retrieval configuration. If the retrieval results were correct but the answer is wrong, the problem is in the LLM prompt.

::: tip Single Node Testing
If you only want to test a specific node, you don't need to run the entire Workflow every time. Dify supports testing individual nodes — click the test button in the upper-right corner of a node, manually enter input values, and run it in isolation. This saves a lot of time as your Workflow grows longer.
:::

## Comparing Chatbot and Workflow

At this point, this Workflow has the exact same functionality as the previous Chatbot. But there's one key difference:

**Chatbot**: You can only configure prompts and a Knowledge Base — the internal flow is fixed.

**Workflow**: You can freely add, remove, and rearrange nodes to design arbitrarily complex flows.

The difference is that Workflow lets you add things. That leaves room for all the upgrades to come.

---

Lynn stared at the nodes and connections on the canvas and suddenly thought — this stuff isn't that mysterious after all.

*"So if I want different questions to go through different flows... I just add a fork?"*

Exactly. That's what the next chapter is about.
