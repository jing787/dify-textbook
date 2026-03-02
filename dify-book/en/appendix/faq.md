# Frequently Asked Questions

## Knowledge Base

### Q: The AI doesn't seem to understand the uploaded documents?

Check the segmentation settings. Default segmentation may have split related content apart.

**Solution**: Try increasing the chunk length, or use "by paragraph" segmentation.

### Q: Retrieval results are inaccurate?

Possible causes and solutions:

1. Document quality issues — poorly formatted PDFs perform badly
2. Try the High Quality indexing mode
3. Increase the retrieval count and let the LLM filter the results

### Q: Updated the Knowledge Base but results haven't changed?

After updating Knowledge Base content, you need to wait for the index rebuild to complete.

You can check the indexing status on the Knowledge Base detail page.

### Q: Want to go deeper on optimizing Knowledge Base performance?

See Ch15 Advanced Knowledge Base, covering segmentation strategies (General / Parent-Child chunking), indexing mode selection, Hybrid Search + Rerank, retrieval testing, Knowledge Pipeline, and more.

## Chatflow

### Q: Should I use Chatflow or Workflow?

In a nutshell: Use Chatflow for multi-turn conversations, Workflow for single-pass processing. Chatflow is essentially Workflow + conversation memory. If unsure, start with Workflow — you can always upgrade to Chatflow later when multi-turn is needed.

### Q: Conversation variables aren't working?

Troubleshooting steps:

1. Confirm the variable is created in the "Conversation Variables" panel at the top of the Chatflow canvas
2. Confirm you're using a Variable Assigner node to write the value — not assigning it directly in the LLM node
3. Check whether the variable type matches (e.g., if the target is an Array type, you can't assign a String)

### Q: Chatflow conversation memory is too long and exceeding token limits?

In the LLM node's "Memory" settings, adjust the window size (e.g., only keep the most recent 10 turns). Or use conversation variables to store only key information rather than feeding the entire conversation history.

## Workflow

### Q: My Workflow runs too slowly?

Optimization suggestions:

1. Reduce unnecessary LLM calls
2. Run nodes in parallel when possible
3. Use a faster model (gpt-4o-mini)
4. Optimize prompts to reduce output length

### Q: The Iteration node throws an error?

Check whether the input is actually an array.

Common mistake: The input is a string, not an array.

### Q: Conditional branching isn't working?

Troubleshooting steps:

1. Check whether the condition variable is correct
2. Check the comparison logic ("contains" vs "equals")
3. Click "Test" on the node to verify

## API

### Q: API call returns 401?

The API Key is incorrect or expired. Generate a new one.

### Q: API call returns 500?

Troubleshooting steps:

1. Check whether the request format is correct
2. Review the Dify backend logs
3. Confirm the application has been published

### Q: API responses are too slow?

Possible causes:

1. The Workflow itself is slow — optimize the Workflow
2. Consider using asynchronous calls
3. Check for network latency

## Real-World Pitfalls

### 1. Used Chinese quotation marks in prompts

Dify variable references require English double curly braces `{{}}`

Chinese quotation marks `""` will cause variables to not work

### 2. Forgot to publish before calling the API

After modifying a Workflow, you must click "Publish" — otherwise the API still calls the old version

### 3. Didn't separate Knowledge Base permissions

Connected an internal Knowledge Base to a public-facing app, nearly leaking information

**Lesson**: Use different Knowledge Bases for applications with different security levels

### 4. Made major changes without a backup

Broke a Workflow and didn't know how to revert

**Lesson**: Always export the DSL before making major changes

### 5. Hit rate limits while testing with free credits

The Sandbox tier has call limits — too much testing will get you throttled

**Lesson**: Use a proper environment for testing — don't skimp on that
