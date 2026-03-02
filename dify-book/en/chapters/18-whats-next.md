# Chapter 18: The Road Ahead

> Three months have passed.
>
> Lynn's Dify skills went from beginner to proficient, and TechStore's AI applications went from zero to a full-fledged system.
>
> One afternoon, as Lynn was organizing her work from the past few months, David knocked and walked in.
>
> *"Lynn, what are you up to?"*
>
> *"Writing up documentation for all the AI tools I've built over the past few months."*
>
> *"Good — I like the documentation mindset."* David sat down. *"What do you think we should do next?"*
>
> Lynn thought for a moment, then shared the directions she'd been considering.

## Scheduled Triggers: Let AI Work Proactively

*"The first direction is scheduled triggers."*

*"Right now all our tools are 'human-triggered' — a person provides input, the AI provides output. But some things should happen automatically on a schedule."*

For example: automatically generate a daily to-do summary every morning at 9 AM, auto-generate a draft weekly report every Friday afternoon, or check once per hour for new complaints that need flagging.

Dify's Workflow Start node already supports **Trigger** types — you can set up scheduled or event-based triggers to run Workflows at specified times automatically, without anyone clicking the "Run" button.

David's eyes lit up: *"You mean I won't have to chase you for the weekly report on Fridays — it'll just show up automatically?"*

*"Exactly. With an email or Slack plugin, it gets sent straight to you as soon as it's generated."*

*"I like this. Get it done ASAP."*

## Connecting More Data Sources

*"The second direction is integrating with our internal company data."*

Currently, the Knowledge Base mainly contains documents. But the company also has massive amounts of data in databases, ERP, CRM, and other systems. If we can connect those, when a customer asks "Where's my order?" the AI can query the logistics system directly; when David asks "What's this month's sales revenue?" the AI can pull the number straight from the database.

*"This requires developing some custom tool plugins so Workflows can call internal APIs."*

David paused to think: *"The direction is right, but we need to be careful about data permissions. Not everyone should be able to query everything."*

*"Understood. I'll work with the IT department to plan out the permissions framework."*

## Multimodal Knowledge Base

*"There's one more direction."* Lynn showed David the Dify changelog. *"Dify recently added support for multimodal Knowledge Bases — you can upload Word documents or Markdown files that contain images, and the images get automatically extracted. If paired with a multimodal Embedding model (like Jina CLIP), retrieval can even do cross-modal image-text matching."*

This would be valuable for TechStore. Previously, when a customer asked "What does the TechPhone Pro 16 look like?" the AI could only describe it in text. Going forward, it could return product images directly to the customer. That said, this feature is still evolving, and the supported document formats and retrieval effectiveness depend on the version.

*"I'm planning to test it with our product manuals first."*

## Team Capability Building

*"There's one more thing."* Lynn said. *"Right now I'm the only one maintaining all these tools. If I go on vacation or leave the company, no one else can manage them."*

David laughed: *"Are you planning to quit?"*

*"No, no. I'm just saying — we should get more people trained on Dify. Each department should have one or two people who can build simple tools on their own, while I handle the complex stuff."*

**Team capability building plan:**
- Put together an internal tutorial
- Organize an internal training session
- Establish an "AI tool request" process
- Hold monthly sharing sessions to exchange experiences

David was supportive: *"You take the lead on the training. Let me know what resources you need."*

*"Sure, let me finish the documentation first."*

## Lynn's Reflections

After David left, Lynn continued working on the documentation.

Three months ago, Lynn couldn't even clearly articulate "what AI can be used for." Looking back now, a lot had changed.

A few honest takeaways:

**1. Start from pain points**

It's not "learn a technology then look for use cases." It's "have a pain point then find the right tool."

Customer service, weekly reports, content — each one was a real business problem. Solving them is what creates value.

**2. Get it running first, then optimize**

The first version doesn't have to be perfect. Good enough is good enough.

User feedback is more valuable than you'd think.

**3. Technology is just a means**

No matter how powerful Dify is, it's still just a tool.

The real value lies in understanding the business, solving problems, and creating efficiency.

**4. Know when to leverage others**

Self-hosted deployment — rely on John. API integration — rely on the dev team. Security review — rely on the IT department.

One person can't do everything, but you can bring the right people in.

**5. Keep learning**

Dify iterates rapidly, and the AI field changes by the day.

Today's best practices might be outdated tomorrow. Stay curious and keep the learning habit going.

---

Lynn wrote these into the final section of the documentation.

Then closed the laptop and called it a day. There would be new things to tinker with tomorrow.
