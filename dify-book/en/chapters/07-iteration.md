# Chapter 7: Handling Complex Questions — Multiple Questions in One Email

> TechStore's customer service got another upgrade. But Lynn found a new problem:
>
> A customer sent in this email:
>
> *"Hi, I have a few questions:*
> *1. Does the TechPhone Pro 16 come in white?*
> *2. Are there any deals if I buy now?*
> *3. Can I return it if I don't like it?*
> *Thanks."*
>
> The current Workflow only answered the first question — the other two were ignored.
>
> "I need the AI to split the questions apart, answer them one by one, and then combine everything at the end."
>
> That's what Iteration is for.

## Understanding the Concept of Iteration

Iteration means "for each element in a list, perform the same operation."

Everyday examples:
- Grading homework: for **each** assignment, perform "read, score, write comments"
- Sending notifications: for **each** recipient, perform "fill in name, send email"

In our scenario:
- First, split the email into a **list of questions**
- For **each** question, perform "classify, retrieve, answer"
- Finally, **combine** all the answers into one complete reply

Three steps: **Extract → Iterate → Combine**

## Step 1: Add a Parameter Extractor

The "Parameter Extractor" node lets AI extract structured information from unstructured text.

1. Open the Workflow and add a "Parameter Extractor" node after the "Start" node
2. Configure it:

**Input variable**: Select "Start / user_question"

**Extraction parameters**:
- Parameter name: `questions`
- Type: `Array[String]` (string array)
- Description: All questions contained in the customer's email, each as a separate element

**Select model**: gpt-5

**Extraction instructions** (optional):
```
Carefully read the customer's email and extract all questions.
Each independent question should be a separate element in the array.
Even if there's only one question, return it in array format.
```

Now, if the input is:
```
Do you have it in white? Any deals right now? Can I return it?
```

The Parameter Extractor will output:
```json
["Do you have it in white?", "Any deals right now?", "Can I return it?"]
```

## Step 2: Add an Iteration Node

The "Iteration" node executes the same sub-flow for each element in an array.

1. Add an "Iteration" node, connected after the "Parameter Extractor"
2. Configure the iteration input: Select "Parameter Extractor / questions"
3. The Iteration node will create a "sub-canvas"

Double-click the Iteration node (or click "Edit Iteration Content") to enter the sub-canvas.

You'll see a special start node with an `item` variable — this represents the question currently being processed.

## Step 3: Build the Sub-Flow Inside the Iteration

Inside the Iteration sub-canvas, build the flow for handling a single question:

**1. Add a "Knowledge Retrieval" node**
- Query variable: Select `item` (the current question)
- Knowledge Base: Select your Knowledge Base

**2. Add an "LLM" node**

System prompt:
```
You are TechStore's customer service representative. Please give a concise answer to this specific question.

Reference materials:
{{#context#}}

Note: Only answer this one question — don't go off-topic.
```

User: `{{item}}`

**3. Configure the Iteration output**

Select the LLM's output as the iteration result.

The Iteration node will execute this sub-flow for each question, ultimately producing an **array of answers**.

## Step 4: Combine the Answers

After the iteration finishes, we have an array of answers. But the customer needs a complete email reply, not a list.

1. Add an "LLM" node after the Iteration node
2. Configure the summary LLM:

```
You are TechStore's customer service representative. Please organize the following Q&A pairs into a complete, well-written email reply.

Customer's original email:
{{user_question}}

Answers to each question:
{{iteration_output}}

Requirements:
1. Start with a friendly greeting
2. Answer each question in order, numbered
3. End with a thank-you and sign off as TechStore Customer Service Team
```

3. Connect to the End node

The complete Workflow structure:

```
Start (receive email)
    ↓
Parameter Extractor (extract list of questions)
    ↓
Iteration (execute sub-flow for each question)
    ├── Knowledge Retrieval
    └── LLM Answer
    ↓
LLM Summary (organize into a complete email)
    ↓
End (output email)
```

## Testing with a Complex Email

**Input:**
```
Hi, I have a few questions:
1. Does the TechPhone Pro 16 come in white?
2. Are there any deals if I buy now?
3. Can I return it if I don't like it?
Thanks.
```

Click Run and watch the execution:

1. The Parameter Extractor identifies 3 questions
2. The Iteration node runs the sub-flow 3 times
3. Each question gets its own answer
4. Everything is combined into a complete email

**Sample output:**

```
Dear Customer,

Thank you for your interest in TechStore! Here are the answers to your questions:

1. Regarding TechPhone Pro 16 colors
   Yes, the TechPhone Pro 16 is available in Glacier White, along with Starlight Black and Twilight Purple.

2. Regarding current promotions
   Right now, purchasing the TechPhone Pro 16 qualifies you for our trade-in program with up to $1,000 off...

3. Regarding the return policy
   Per our policy, within 7 days of delivery, unopened items that don't affect resale can be returned...

If you have any other questions, feel free to reach out anytime.

TechStore Customer Service Team
```

---

Lynn looked at the output email and finally breathed a sigh of relief.

*"Good — now no matter how many questions a customer crams into one email, they'll all get answered."*
