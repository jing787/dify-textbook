# Chapter 10: New Use Case — Auto-Generating the Weekly Operations Report

> TechStore's AI customer service was running smoothly on its own. Lynn could finally step away from the repetitive customer inquiries.
>
> But there was still the second pain point: **the weekly operations report every Friday afternoon**.
>
> Every week, the same routine:
> 1. Collect data from various systems (revenue, order volume, complaint count...)
> 2. Organize it into tables
> 3. Write an analysis summary
> 4. Generate the report for David (the boss)
>
> This process took at least 3 hours and was incredibly tedious.
>
> "Can I build a Workflow that takes the data and automatically generates the weekly report?"
>
> Absolutely.

## Designing the Weekly Report Workflow

Unlike customer service, the weekly report is a "one-and-done" task — feed in the data, get a report back, no multi-turn conversation needed. So a Workflow is the right choice here, not a Chatflow.

**Design approach:**

```
Input: This week's sales data + complaint data + key events
  ↓
Process: Data parsing → Generate analysis → Generate summary → Compile report
  ↓
Output: A structured weekly report document
```

## Step 1: Define Input Variables

Create a new Workflow and name it "TechStore Weekly Report Generator."

Configure the Start node's input variables:

| Variable Name | Type | Description |
|--------------|------|-------------|
| `sales_data` | Paragraph | This week's sales data |
| `complaint_data` | Paragraph | This week's complaint summary |
| `key_events` | Paragraph | Key events this week (optional) |
| `week_range` | Short Text | Report date range, e.g. "2025.11.25-12.01" |

## Step 2: Parallel Data Analysis

The weekly report needs to analyze two independent datasets: sales data and complaint data. Since they don't depend on each other, they can be **executed in parallel**, cutting the wait time in half.

### What Is Parallel Processing

In a Dify Workflow, when a node's output connects to multiple downstream nodes simultaneously, those downstream nodes **automatically execute in parallel**.

The implementation is straightforward:

1. Draw a connection from the Start node to the "Sales Analysis" LLM node
2. Draw another connection from the Start node to the "Complaint Analysis" LLM node
3. After both analysis nodes complete, they converge into the "Report Generation" node

```
              ┌── Sales Analysis LLM ──┐
Start ──┤                               ├── Report Generation LLM → End
              └── Complaint Analysis LLM ──┘
```

Dify automatically recognizes this structure and launches both analysis nodes simultaneously. The downstream "Report Generation" node only executes after both nodes have finished.

::: tip Parallel vs. Sequential
- **Sequential**: Sales analysis (15s) → Complaint analysis (15s) = 30 seconds total
- **Parallel**: Sales analysis + Complaint analysis run simultaneously = ~15 seconds total

The more nodes you have, the bigger the advantage of parallelism. As long as nodes don't have data dependencies, they can run in parallel.
:::

### Configure the Sales Analysis Node

Add the first LLM node and name it "Sales Analysis":

```
You are a data analyst. Analyze the following sales data and extract key metrics and insights.

Sales data:
{{sales_data}}

Please extract the following information (if available in the data):
1. Total revenue and week-over-week change
2. Order volume and week-over-week change
3. Top 5 best-selling products
4. Average order value changes
5. Notable trends or anomalies

Output in JSON format for downstream processing.
```

### Configure the Complaint Analysis Node

Add the second LLM node and name it "Complaint Analysis":

```
You are a customer service quality analyst. Analyze the following complaint data.

Complaint data:
{{complaint_data}}

Please extract the following information:
1. Total complaint volume and week-over-week change
2. Distribution of complaint types
3. Typical problem cases
4. Areas needing improvement
5. Efficiency metrics (e.g., average response time)

Output in structured text format.
```

**Don't forget**: Both nodes connect directly to the Start node — they are not chained sequentially.

## Step 3: Generate the Report Body

Add a third LLM node and name it "Report Generation." Connect **both** analysis nodes to it.

Configure inputs: reference the outputs of both analysis nodes.

```
You are an assistant to TechStore's operations director. Based on the following analysis results, write a professional weekly operations report.

Date range: {{week_range}}

Sales analysis:
{{sales_analysis}}

Complaint analysis:
{{complaint_analysis}}

Key events:
{{key_events}}

Report format requirements:

# TechStore Weekly Operations Report
## {{week_range}}

### 1. Weekly Overview
(Summarize the overall situation this week in 3-5 sentences)

### 2. Sales Performance
(Key metrics, trend analysis, highlights/issues)

### 3. Customer Service
(Complaint status, resolution efficiency, notable cases)

### 4. Key Events
(Important items that occurred this week)

### 5. Next Week's Priorities
(Based on this week's data, propose focus areas for next week)

Tone requirements:
- Professional and objective
- Data-driven — avoid vague descriptions
- Report both good news and problems — propose solutions for issues
```

## Step 4: Configure the Output

1. Add an End node
2. Configure the output variable: `weekly_report` = output from the Report Generation node

Complete Workflow structure:

```
              ┌── Sales Analysis LLM ──┐
Start ──┤                               ├── Report Generation LLM → End
              └── Complaint Analysis LLM ──┘
```

## Testing the Report Generation

**Prepare test data:**

`sales_data`:
```
Weekly Sales Summary (11.25-12.01)
Total Revenue: $425,860 (Last week: $402,320, WoW +5.9%)
Order Volume: 2,847 orders (Last week: 2,756 orders, WoW +3.3%)
Avg. Order Value: $150 (Last week: $146, WoW +2.5%)

Top 5 Best Sellers:
1. TechPhone Pro 16 - 328 units - $196,472
2. TechBuds Pro 3 - 412 units - $53,148
3. TechBook Air 14 - 89 units - $53,311
4. TechWatch Ultra - 156 units - $46,644
5. TechPad Air 11 - 67 units - $23,383
```

`complaint_data`:
```
Weekly Complaint Statistics
Total Complaints: 47 (Last week: 52, down 9.6%)
- Shipping delays: 18 (38%)
- Product quality: 12 (26%)
- Return/exchange process: 9 (19%)
- After-sales service attitude: 5 (11%)
- Other: 3 (6%)

Average response time: 2.3 hours
Resolution rate: 91%
```

Click Run and observe the execution — you'll see both analysis nodes **start executing simultaneously**, and only after both finish does the Report Generation node kick in.

---

The first time Lynn ran this Workflow, results came back in 30 seconds. The task that used to eat up 3 hours every Friday afternoon was now just a quick copy-paste job.

*"Should've built this ages ago."*
