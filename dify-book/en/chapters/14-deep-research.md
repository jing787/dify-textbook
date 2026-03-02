# Chapter 14: Comprehensive Project — Customer Churn Early Warning System

> Lynn's three pain points were all resolved. AI customer service, operations reports, the content factory — these tools had become part of TechStore's daily operations.
>
> One day, David called Lynn into his office.
>
> *"Lynn, I hear the AI tools you've been building are pretty impressive?"*
>
> *"They're working well — mostly because Dify makes things easy."*
>
> *"Well, I have a task for you."* David pushed a data report across the desk. *"Last month we lost a batch of high-value customers. Repeat purchase rate dropped 12%. I want to catch at-risk customers before they actually leave — do something before it's too late. Can you build an early warning system with AI?"*
>
> Lynn thought about it: this was far more complex than customer service or weekly reports. It would require analyzing complaint logs, return data, and purchase behavior, then synthesizing risk assessments and generating actionable alert reports.
>
> *"Let me give it a shot."*

In this chapter, we follow Lynn as she combines **all the skills learned so far** to build a truly complex application — a customer churn early warning system.

::: tip Why this chapter exists
In previous chapters, each one focused on learning a single new capability — Knowledge Retrieval, conditional branching, iteration, tool calling, template transformation...

This chapter doesn't teach new nodes. Instead, it shows: **what happens when you combine all these capabilities together**.

If you've made it this far, you've already mastered Dify's core capabilities. Now it's time to put them to the test.
:::

## Analyzing Requirements

Back at her desk, Lynn started thinking through the task.

What does a good churn early warning system need?

1. **Data input**: Accept complaint logs and return data
2. **Per-customer analysis**: Risk assessment of each customer's behavior
3. **Risk classification**: Categorize by severity into High / Medium / Low risk
4. **Root cause diagnosis**: Analyze the specific issues for each high-risk customer
5. **Action recommendations**: Provide retention strategies for different risk levels
6. **Formatted report**: Output a structured early warning report

Lynn sketched out a flow on paper:

```
Input complaint logs + return data
    ↓
Extract customer list and key metrics
    ↓
Risk assessment for each customer (iteration)
    ↓
Group by risk level
    ↓
Generate retention suggestions for high-risk customers
    ↓
Compile into an early warning report
```

*"This involves iteration (multiple customers), conditional branching (risk classification), multiple LLM nodes..."*

This would be the most complex Workflow Lynn had ever built.

But when you break it down, every piece is something she'd already learned. It's just a matter of putting them together.

## Capabilities Used

| Capability | Chapter Learned | Usage in This Chapter |
|------|----------|-------------|
| Workflow basics | Chapter 5 | Overall framework |
| LLM node | Chapter 5 | Risk assessment, root cause analysis, recommendation generation, report writing |
| Iteration | Chapter 7 | Iterating through each customer for assessment |
| Conditional branching | Chapter 6 | Routing by risk level |
| Parameter Extractor | Chapter 7 | Extracting structured info from logs |
| Template Transform | Chapter 11 | Formatting the final report |
| Parallel processing | Chapter 10 | Analyzing complaint and return data simultaneously |

## Step 1: Data Input and Parsing

Create a new Workflow named "Customer Churn Early Warning System."

**Start node:**
- `complaint_logs`: Long text, recent complaint logs
- `return_data`: Long text, recent return data
- `report_period`: Text, report period (e.g., "2025-W48")

**Add a Parameter Extractor — "Customer Extraction":**

```
Please extract a list of customers mentioned in the following complaint logs and return data.

Complaint logs:
{{complaint_logs}}

Return data:
{{return_data}}

For each customer, extract the following:
- customer_id: Customer ID
- complaint_count: Number of complaints
- return_count: Number of returns
- issues: Summary list of issues

Output as a JSON array.
```

## Step 2: Iterative Assessment of Each Customer

Add an Iteration node to loop through the customer array.

**Inside the iteration, add an LLM node — "Risk Assessor":**

```
You are a senior customer success analyst. Assess the churn risk for the following customer.

Customer data:
{{item}}

Assessment dimensions:
1. Complaint frequency and severity
2. Return frequency and amount
3. Whether issues recur (same type of complaint multiple times = high risk signal)
4. Sentiment of the most recent interaction

Risk scoring criteria:
- HIGH: Multiple unresolved complaints / large-value returns / explicit dissatisfaction
- MEDIUM: Complaints filed but resolved / small-value returns / neutral sentiment
- LOW: Occasional inquiries / no returns / normal interactions

Please output:
{
  "customer_id": "...",
  "risk_level": "HIGH/MEDIUM/LOW",
  "risk_score": 1-10,
  "key_issues": ["issue1", "issue2"],
  "sentiment": "negative/neutral/positive",
  "reasoning": "One sentence explaining why you gave this score"
}
```

After the iteration completes, it outputs a risk assessment array.

## Step 3: Risk-Level Grouping

Add a Code Execution node to group the assessment results by risk level:

```python
def main(iteration_output: str) -> dict:
    import json

    results = json.loads(iteration_output)
    high = [r for r in results if r["risk_level"] == "HIGH"]
    medium = [r for r in results if r["risk_level"] == "MEDIUM"]
    low = [r for r in results if r["risk_level"] == "LOW"]

    return {
        "high_risk": json.dumps(high),
        "medium_risk": json.dumps(medium),
        "low_risk": json.dumps(low),
        "high_count": len(high),
        "medium_count": len(medium),
        "low_count": len(low)
    }
```

::: tip
Dify's Code Execution node requires all code to be wrapped in a `main` function, parameters must have type annotations, and `import` statements go inside the function.
:::

## Step 4: Generate Retention Plans for High-Risk Customers

For high-risk customers, use another LLM to generate targeted retention recommendations.

**Add an LLM node — "Retention Strategist":**

```
You are a customer retention expert. Below is a list of customers flagged as high churn risk.

High-risk customers:
{{high_risk}}

Please develop a specific retention strategy for each high-risk customer:

1. Immediate action (within 24 hours)
   - Proactive contact method (phone / email / dedicated support agent)
   - Suggested opening script

2. Compensation plan
   - Recommended compensation based on issue type (discount coupon / free upgrade / extended warranty, etc.)
   - Compensation level matched to customer value

3. Long-term follow-up
   - Follow-up visit plan
   - Measures to prevent the same type of issue from recurring

Requirements:
- Plans must be specific and actionable
- Each customer's plan should be personalized — no one-size-fits-all
- Consider cost-effectiveness
```

## Step 5: Generate the Early Warning Report

**Add an LLM node — "Report Writer":**

```
Please generate a customer churn early warning report based on the following analysis results.

Report period: {{report_period}}

Risk distribution:
- High-risk customers: {{high_count}}
- Medium-risk customers: {{medium_count}}
- Low-risk customers: {{low_count}}

High-risk customer details and retention plans:
{{retention_plan}}

Medium-risk customer list:
{{medium_risk}}

Report format:

# Customer Churn Early Warning Report
## {{report_period}}

### Executive Summary
(3-5 sentences summarizing this period's risk status and key recommendations)

### Risk Overview
(High/Medium/Low risk distribution, trend compared to previous period)

### High-Risk Customers — Immediate Action Required
(For each customer: issue summary + retention plan + suggested owner)

### Medium-Risk Customers — Monitor Closely
(List + recommended follow-up frequency)

### Root Cause Analysis
(Top 3 most frequent issues, systemic improvement recommendations)

### Next Steps
(Specific action items with priority and timeline)
```

**Use a Template Transform node to wrap the format:**

```jinja2
=============================================
     TechStore Customer Churn Alert
=============================================

Report Period: {{ report_period }}
Generated: {{ timestamp }}

---------------------------------------------

{{ report_content }}

---------------------------------------------

[Note] This report is AI-generated based on
complaint logs and return data. Please verify
key findings before taking action.

=============================================
```

## Testing the Early Warning System

**Prepare test data:**

`complaint_logs`:
```
Recent Complaints (Nov 25 - Dec 1):

1. Customer #A1023 - Nov 26
   "This is the THIRD time my TechPhone Pro keeps crashing. 
    I've sent it for repair twice and it's still broken. 
    I want a full refund."

2. Customer #A1023 - Nov 28
   "Still no response about my refund request. 
    This is unacceptable. I'm switching to another brand."

3. Customer #B2045 - Nov 27
   "The TechBuds Pro 3 noise cancellation stopped working 
    after 2 months. Disappointing quality."

4. Customer #C3067 - Nov 25
   "Shipping took 8 days instead of the promised 2 days. 
    Not happy."

5. Customer #C3067 - Nov 29
   "My replacement order is delayed AGAIN. What is going on 
    with your logistics?"
```

`return_data`:
```
Returns (Nov 25 - Dec 1):

- Customer #A1023: TechPhone Pro 16 ($599), reason: Repeated defect
- Customer #B2045: TechBuds Pro 3 ($129), reason: Quality issue
- Customer #D4089: TechCase ($19), reason: Wrong color shipped
```

Click Run and observe the execution flow:

1. The Parameter Extractor identifies 4 involved customers
2. The Iteration node assesses each customer's risk
3. The Code node groups customers into High / Medium / Low risk
4. The LLM generates retention plans for high-risk customers (#A1023, #C3067)
5. The final output is a structured early warning report

**Expected results:**

- Customer #A1023: **HIGH** — Multiple unresolved complaints + explicitly threatening to switch brands + high-value return
- Customer #C3067: **HIGH** — Repeated logistics complaints + escalating frustration
- Customer #B2045: **MEDIUM** — Single quality complaint + return but calm sentiment
- Customer #D4089: **LOW** — Small-value return + not a quality issue

## Going Further: Publish Sub-Workflows as Tools

After building this Workflow, Lynn realized that the "complaint logs → extract customer info → risk assessment" logic was actually quite reusable — not just for churn warnings, but also for customer service quality analysis, VIP customer identification, and more.

Rebuilding it every time would be a waste. Dify provides a feature called **Workflow as Tool**:

1. Build the "complaint analysis + risk assessment" logic as a standalone Workflow
2. In the app settings, select "Publish as Tool"
3. From then on, any other Workflow or Agent can call it just like calling a search tool

It's like extracting common logic into a function when writing code — write it once, call it everywhere. The churn warning system calls it, the customer service quality report can call it too — no need to rebuild the same nodes.

---

Lynn sent the early warning report to the CS team lead and the operations manager.

The CS team lead immediately arranged for someone to contact Customer #A1023, offering a free replacement. A week later, this customer didn't churn — in fact, they posted on social media: "Their after-sales service is actually really solid."

David saw the report and said: *"We should have done this ages ago. Run it automatically every week from now on."*

Lynn smiled. From that very first Chatbot that could only recite FAQs, to now being able to analyze complaint data and generate retention recommendations — things had come a long way.

But at the end of the day, AI itself hadn't gotten that much smarter. What changed was how you use it — put it in the right process, and it does the right thing.
