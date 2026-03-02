# Node Quick Reference

## Basic Nodes

### Start
- **Purpose**: Define the Workflow's input variables
- **Configuration**: Variable name, type, required or not
- **Usage frequency**: ★★★★★ (every Workflow has one)

### End
- **Purpose**: Define the Workflow's output
- **Configuration**: Output variable name, source
- **Usage frequency**: ★★★★★

### LLM
- **Purpose**: Call a large language model
- **Configuration**: Model, System/User prompts, temperature
- **Usage frequency**: ★★★★★ (core node)

### Knowledge Retrieval
- **Purpose**: Retrieve content from a Knowledge Base
- **Configuration**: Query variable, Knowledge Base, number of results
- **Usage frequency**: ★★★★☆

## Logic Nodes

### IF/ELSE (Conditional Branch)
- **Purpose**: Route to different paths based on conditions
- **Configuration**: Condition expressions, multiple branches
- **Usage frequency**: ★★★★☆

### Question Classifier
- **Purpose**: Use AI to categorize input
- **Configuration**: Category definitions, model
- **Usage frequency**: ★★★☆☆

### Iteration
- **Purpose**: Loop through an array and perform operations
- **Configuration**: Input array, sub-workflow
- **Usage frequency**: ★★★☆☆

## Processing Nodes

### Parameter Extractor
- **Purpose**: Extract structured information from text
- **Configuration**: Parameter definitions, model
- **Usage frequency**: ★★★☆☆

### Template Transform
- **Purpose**: Format output using Jinja2
- **Configuration**: Template content
- **Usage frequency**: ★★★☆☆

### Code (code execution)
- **Purpose**: Execute Python/JS code
- **Configuration**: Code, input/output variables
- **Note**: Code must be wrapped in a `main()` function, receiving input via parameters and returning output via `return`. Bare code without the function wrapper is not supported
- **Usage frequency**: ★★☆☆☆

## Integration Nodes

### HTTP Request
- **Purpose**: Call external APIs
- **Configuration**: URL, method, headers
- **Usage frequency**: ★★☆☆☆

### Agent
- **Purpose**: Let AI autonomously call tools
- **Configuration**: Model, strategy, available tools
- **Usage frequency**: ★★★☆☆

### Variable Assigner
- **Purpose**: Write data to a specified variable (used in Workflow to merge branches; in Chatflow to write conversation variables)
- **Configuration**: Target variable, data source, operation mode (overwrite / append / clear)
- **Usage frequency**: ★★★☆☆

## Chatflow-Exclusive Nodes

### Answer
- **Purpose**: Send a reply to the user within a Chatflow
- **Configuration**: Reply content (supports variable references)
- **Note**: Acts like the End node in a Workflow, but doesn't terminate the conversation — it waits for the user's next input
- **Usage frequency**: ★★★★★ (essential for Chatflow)

### Variable Assigner in Chatflow
- **Note**: Same node as the Variable Assigner above. In Chatflow, it's primarily used to write conversation variables for cross-turn memory — the key to making Chatflow "remember context"
- **Usage frequency**: ★★★★☆ (commonly used in Chatflow)

### Conversation Variable
- **Purpose**: Persistently store data across multi-turn conversations (not a node — it's a Chatflow global setting)
- **Configuration**: Variable name, type (String / Number / Array / Object, etc.)
- **Note**: Managed via the "Conversation Variables" button at the top of the Chatflow canvas. Regular variables reset each turn; conversation variables persist across turns
- **Usage frequency**: ★★★★☆ (commonly used in Chatflow)
