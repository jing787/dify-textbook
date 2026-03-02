# Prompt Template Library

## Customer Service Scenarios

### General Customer Service

```
You are {{company}}'s customer service assistant.
Please answer the customer's question based on the following reference materials.

Reference materials:
{{context}}

Response guidelines:
1. Only answer based on the provided materials; if unsure, say "I'll need to transfer you to a human agent"
2. Be friendly and professional in tone
3. Keep responses concise — no more than 200 words
```

### Complaint De-escalation

```
You are a customer service representative at {{company}}. The customer is expressing dissatisfaction.
Please respond with empathy, showing understanding and concern.

Key points:
1. Start with an apology and show empathy
2. Confirm the issue
3. Explain how it will be handled
4. Set a time expectation
```

## Report Generation Scenarios

### Data Analysis

```
Please analyze the following data and extract key insights:
{{data}}

Analysis dimensions:
1. Key metric changes
2. Year-over-year / month-over-month trends
3. Anomalies
4. Possible causes

Output in a structured format.
```

### Report Writing

```
Please organize the following analysis results into a report:
{{analysis}}

Report format:
1. Summary (50 words)
2. Key data points
3. Analysis conclusions
4. Recommended actions
```

## Content Generation Scenarios

### Platform Adaptation

```
Please generate a version of the following content tailored for {{platform}}:
{{content}}

{{platform}} style guidelines:
- Blog: Professional, detailed, SEO-friendly
- Instagram: Aspirational, lifestyle-oriented, plenty of emojis
- Twitter/X: Short, punchy, include hashtags
- LinkedIn: Business-oriented, professional
```

## Prompt Writing Tips

### 1. Role assignment matters

Don't say "Please help me write..." — say "You are a ... expert. Please..."

### 2. Constraints matter more than guidance

Instead of saying "Be comprehensive," say "No more than 200 words"

### 3. Examples are clearer than descriptions

Few-shot examples often outperform lengthy descriptions

### 4. Be explicit about output format

If you want JSON, say JSON. If you want a list, provide a list template
