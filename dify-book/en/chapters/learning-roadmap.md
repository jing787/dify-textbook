# Dify Hands-On Learning Roadmap

> The complete path from zero to independently building enterprise-grade AI applications. Each milestone indicates the estimated time and core skills you'll gain.
>
> **The main track is Workflow** — Dify's most powerful capability. Chatflow is simply Workflow with conversation memory added on top.

---

## Overall Roadmap

```
                    ┌─────────────────────────────────────┐
                    │  Foundations: What Is Dify (30 min)  │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Workflow Basics: Build Your First   │
                    │  Chatbot → App Types → Workflow      │
                    │              (1h)                    │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Workflow Advanced: Master Core Nodes│
                    │  Branching → Iteration → Tool Calls  │
                    │              (1.5h)                  │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Chatflow = Workflow + Conversation  │
                    │  Add memory for multi-turn dialogue  │
                    │              (30 min)                │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Real-World Scenarios: Apply & Build │
                    │  Reports → Templates → Content →     │
                    │  Early Warning          (2.5h)       │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Advanced Knowledge Base: Improve    │
                    │  AI Accuracy                        │
                    │  Chunking → Indexing → Retrieval →   │
                    │  Pipeline              (1h)          │
                    └──────────────┬──────────────────────┘
                                   ▼
                    ┌─────────────────────────────────────┐
                    │  Publish & Operate: Go Live          │
                    │  Publish → Monitor → Deploy → Plan   │
                    │              (2h)                    │
                    └──────────────┬──────────────────────┘
                                   ▼
                              Total: 9-13h
```

---

## Stage 1: Foundations (30 minutes)

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch0 · Quick Start | Sign up for Dify, run a pre-built app, explore the internals | 5 min | Know what Dify looks like |
| Ch1 · From Chat to Workflow | ChatGPT vs Dify — platform positioning | 10 min | Understand the difference between "conversation" and "application" |
| Ch2 · What Can Dify Do | Real-world use case overview | 10 min | Initial mapping to your own business scenarios |

**Stage outcome**: Understand what Dify can do and how it differs from using ChatGPT directly.

---

## Stage 2: Workflow Basics (1 hour)

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch3 · Build an AI Customer Service | Configure model, upload Knowledge Base, write prompts, publish Chatbot | 30 min | **Your first working AI application** |
| Ch4 · Understanding App Types | Workflow vs Chatflow vs Chatbot — the differences | 15 min | Know which type to use for which scenario |
| Ch5 · Upgrade to Workflow | Convert a Chatbot into a Workflow, understand nodes and connections | 15 min | Master the basics of the Workflow canvas |

**Stage outcome**: Build your first application and learn basic Workflow orchestration.

**Key skills**: Configure models · Upload Knowledge Base · Write prompts · Node connections

---

## Stage 3: Workflow Advanced (1.5 hours)

The skills in this stage are universal — not just for customer service, but for any Workflow.

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch6 · Conditional Branching | IF/ELSE logic, Question Classifier | 30 min | Make workflows follow different paths based on conditions |
| Ch7 · Iteration | Parameter Extractor + Iteration node | 30 min | Handle "one input containing multiple sub-tasks" |
| Ch8 · Tool Calls | Plugin marketplace, Agent node, HTTP requests | 30 min | Let AI call external APIs and search the web |

**Stage outcome**: Master all core Workflow nodes. Able to build moderately complex applications.

**Key skills**: Conditional branching · Question Classifier · Parameter Extractor · Iteration · Agent · HTTP requests

---

## Stage 4: Chatflow = Workflow + Conversation (30 minutes)

Chatflow isn't something entirely new. It's Workflow, with conversation memory added.

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch9 · Add Conversation Memory to Workflow | Conversation variables, multi-turn context, conversational interaction | 30 min | Build multi-turn dialogue apps with memory |

**Stage outcome**: Understand the relationship between Chatflow and Workflow — memory is added, everything else stays the same.

**Key skills**: Conversation variables · `sys.query` · Conversation context management

---

## Stage 5: Real-World Scenarios (2.5 hours)

All the nodes learned previously, combined in different business scenarios.

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch10 · Operations Weekly Report | Data analysis Workflow, parallel processing | 30 min | Build "input data → output report" applications |
| Ch11 · Template Transform | Jinja2 templates, formatted output | 30 min | Precisely control AI output formatting |
| Ch12 · Content Factory | One source → multi-platform content | 30 min | Batch content generation |
| Ch14 · Comprehensive Project | Customer churn early warning — all capabilities combined | 60 min | Independently design complex Workflows |

**Stage outcome**: Able to apply skills creatively, independently design and deliver complete AI applications.

**Key skills**: Parallel processing · Jinja2 templates · Code Execution · Workflow as Tool

---

## Stage 6: Advanced Knowledge Base (1 hour)

After your applications are running, you may find: the questions AI gets wrong aren't because it can't answer — it's because the wrong content was retrieved. This stage focuses on optimizing the RAG pipeline.

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch15 · Advanced Knowledge Base | Segmentation strategies, Parent-Child chunking, indexing methods, Hybrid Search, Rerank, retrieval testing, Knowledge Pipeline | 60 min | Make Knowledge Base retrieval fast and accurate |

**Stage outcome**: Understand the complete RAG pipeline. Able to diagnose and fix "AI gives wrong answers" problems.

**Key skills**: General vs Parent-Child chunking · Vector / Full-text / Hybrid Search · Rerank · Retrieval testing · Knowledge Pipeline

---

## Stage 7: Publish & Operate (2 hours)

Building the app is just the beginning. Publishing, monitoring, optimizing, deploying — complete the full cycle.

| Chapter | Content | Time | What You'll Gain |
|------|------|------|----------|
| Ch13 · Publish Your App | Web link, embed in website, API, DSL, MCP Server | 30 min | Deliver your app to real users |
| Ch16 · Operations Monitoring | Log analysis, Annotation Replies, continuous optimization | 30 min | Make your app better over time |
| Ch17 · Self-Hosted Deployment | Docker Compose deployment, data migration, maintenance | 30 min | Run Dify on your own servers |
| Ch18 · The Road Ahead | Scheduled tasks, data integration, team collaboration | 30 min | Know where to go next |

**Stage outcome**: Complete the full cycle — Build → Publish → Monitor → Optimize → Scale.

---

## Quick Reference: I Want to Do X — Which Chapter?

| What I Want to Do | Go To |
|-----------|--------|
| Build a Q&A chatbot | Ch3 |
| Route based on question type | Ch6 |
| Let AI call external APIs | Ch8 |
| Build a conversational assistant with memory | Ch9 |
| Auto-generate weekly reports | Ch10 + Ch11 |
| Generate multi-platform content from one source | Ch12 |
| Embed the app into a website/system | Ch13 |
| Build a complex, comprehensive application | Ch14 |
| Knowledge Base retrieval is inaccurate — need to optimize | Ch15 |
| Review logs and improve performance | Ch16 |
| Deploy Dify on your own server | Ch17 |
