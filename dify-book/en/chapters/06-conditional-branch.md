# Chapter 6: Conditional Branching — Teaching AI to Categorize

> After TechStore's customer service Workflow ran for a few days, Lynn spotted a problem:
>
> Every question was handled the same way — search the Knowledge Base, then answer. But some questions clearly needed different treatment:
>
> - Customer asks "What phones do you have?" → Should search the **product Knowledge Base**
> - Customer says "I want to return something" → Should search the **after-sales policy Knowledge Base**
> - Customer says "Your service is terrible" → Should use a **de-escalation response**, then transfer to a human agent
>
> "I need the AI to first determine what type of question this is, then decide how to handle it."
>
> That's what conditional branching is for.

## What Is Conditional Branching

Conditional branching (IF/ELSE) is one of the most fundamental logic structures in programming:

```
If (a condition is met), then (do A)
Otherwise (do B)
```

In a Dify Workflow, a conditional branch node lets you route the flow down different paths based on different conditions.

Think of an intersection:
- Go straight: head to the "Product Inquiry" flow
- Turn left: head to the "After-Sales Service" flow
- Turn right: head to the "Complaint Handling" flow

The conditional branch is the traffic light at this intersection — it reads the "signal" and decides which way to go.

## Planning the Processing Paths

Before jumping in, let's map out the logic we want to implement:

| Path | Condition | How It's Handled |
|------|-----------|------------------|
| Product Inquiry | Question contains product keywords (phone, computer, price...) | Search product Knowledge Base |
| After-Sales Service | Question contains after-sales keywords (return, exchange, warranty...) | Search FAQ Knowledge Base |
| Complaint/Other | None of the above | De-escalation response + transfer to human |

## Step 1: Add a Conditional Branch Node

Open the "TechStore CS v2" Workflow.

1. Between the "Start" node and the "Knowledge Retrieval" node, add an "IF/ELSE" (conditional branch) node
2. Connect the "Start" node to the "IF/ELSE" node
3. Click the "IF/ELSE" node and configure the first condition (IF):

**Condition settings:**
- Variable: Select "Start / user_question"
- Condition: Contains
- Value: phone

Click "Add Condition" and add more product keywords (connected with "OR"):
- OR contains: computer
- OR contains: tablet
- OR contains: price
- OR contains: specs

## Step 2: Add an ELIF Branch

The IF/ELSE node supports multiple conditional branches (ELIF).

1. In the conditional branch node, click "Add Branch"
2. Configure the second condition (ELIF):

- Variable: Select "Start / user_question"
- Condition: Contains
- Value: return

Add more after-sales keywords:
- OR contains: exchange
- OR contains: warranty
- OR contains: refund
- OR contains: repair

Now the conditional branch has three exits:
- **IF** (Product Inquiry)
- **ELIF** (After-Sales Service)
- **ELSE** (Other/Complaint)

## Step 3: Configure the Processing Flow for Each Branch

### IF Branch (Product Inquiry)

1. Add a "Knowledge Retrieval" node, connected to the IF exit
2. Configure it to query the "TechStore Product Knowledge Base" (you'll need to create this Knowledge Base first)
3. Add an "LLM" node:

```
You are TechStore's product consultant. Please answer the customer's question based on the product materials.
Be professional yet friendly, and feel free to recommend related products.

Reference materials:
{{#context#}}
```

### ELIF Branch (After-Sales Service)

1. Add another "Knowledge Retrieval" node, connected to the ELIF exit
2. Configure it to query the "TechStore FAQ" Knowledge Base
3. Add an "LLM" node:

```
You are TechStore's after-sales service specialist. Please answer the customer's question based on the policy documentation.
Be patient and professional — make the customer feel valued.

Reference materials:
{{#context#}}
```

### ELSE Branch (Other/Complaint)

1. Add an "LLM" node, connected to the ELSE exit
2. No Knowledge Base needed — just set up a de-escalation response:

```
You are a TechStore customer service representative. The customer's issue may be unusual or a complaint.
Respond with a warm, understanding tone and show that you take it seriously.
Tell the customer: "Thank you for your feedback. Your concern has been logged, and a human agent will reach out to you shortly."
```

## Step 4: Merge the Outputs

All three branches need to converge at the End node.

1. Connect all three LLM nodes to the "End" node
2. Configure the output variable in the End node

Dify handles multiple inputs automatically — whichever branch executes, its result becomes the output.

The Workflow structure now looks like this:

```
Start (receive question)
    ↓
Conditional Branch
    ├── IF (product keywords) → Product Knowledge Base → Product Consultant LLM
    ├── ELIF (after-sales keywords) → FAQ Knowledge Base → After-Sales Specialist LLM
    └── ELSE (other) → De-escalation LLM
    ↓
End (output answer)
```

## Testing Different Scenarios

**Test 1: Product Inquiry**
```
Input: Do you have any phone recommendations? Something around $500.
Expected: Takes the IF branch, searches the product KB, gives product recommendations
```

**Test 2: After-Sales Issue**
```
Input: I bought headphones yesterday and want to return them. How do I do that?
Expected: Takes the ELIF branch, searches the FAQ KB, provides the return process
```

**Test 3: Complaint**
```
Input: Your shipping is way too slow — I've been waiting a week and it still hasn't arrived!
Expected: Takes the ELSE branch, outputs a de-escalation response
```

Click "Run" and test all three scenarios. Watch the Workflow execution path — you'll see that different questions indeed take different branches.

---

After testing, Lynn nodded with satisfaction: *"Now different questions are actually handled differently."*

## Advanced: Using an LLM for Classification

Keyword matching is simple, but it has limitations:
- Customers might not use the keywords you've predefined
- Some questions are hard to categorize with keywords alone

A smarter approach is to **let the AI determine the question type**.

Dify provides a "Question Classifier" node:

1. Replace the conditional branch node with a "Question Classifier" node
2. Define the categories:
   - Category 1: Product Inquiry — asking about product info, pricing, features, recommendations
   - Category 2: After-Sales Service — returns, exchanges, warranty, shipping, refunds
   - Category 3: Complaints & Suggestions — expressing dissatisfaction, criticism, filing complaints
   - Category 4: Other — anything that doesn't fit above
3. Select a model (a cost-effective model like gpt-5 works well here)

The Question Classifier uses AI to understand the intent behind a question, rather than simply matching keywords.

For example, "This phone keeps freezing" — keyword matching might classify it as a product inquiry, but AI can understand it's actually a complaint.

::: tip Trade-offs
- **Keyword matching**: Fast, low cost, but not very smart
- **AI classification**: Smarter, more accurate, but consumes more tokens

Choose the right approach for your scenario.
:::
