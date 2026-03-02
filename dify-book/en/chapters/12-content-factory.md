# Chapter 12: New Use Case — Multi-Platform Content Factory

> Lynn had solved the customer service and weekly report pain points. Now it was time for the third one: **marketing content**.
>
> Whenever a new product launched, the marketing team would come to Lynn: "Can you help write the product copy? We need versions for Blog, Instagram, Twitter/X, and LinkedIn..."
>
> Same product, four or five different versions. Each platform has its own style:
> - **Blog**: Formal, detailed
> - **Instagram**: Visual, aspirational
> - **Twitter/X**: Short, punchy
> - **LinkedIn**: Professional, business-oriented
>
> "Can I input one product brief and automatically generate content for each platform?"

## Designing the Content Factory Workflow

Key characteristics of this use case:
- One input, multiple outputs (different platforms)
- Each output needs platform-specific style adjustments

**Implementation approach: Iterative generation**

Define a list of platforms and use an Iteration node to loop through them. Adding a new platform in the future only requires updating the list.

## Step 1: Define Inputs and the Platform List

Create a new Workflow: "TechStore Content Factory"

**Start node configuration:**

| Variable Name | Type | Description |
|--------------|------|-------------|
| `product_info` | Paragraph | Product brief |
| `platforms` | Array[String] | Target platform list |
| `tone_notes` | Short Text | Additional tone requirements (optional) |

`platforms` default value: `["Blog", "Instagram", "Twitter/X", "LinkedIn"]`

## Step 2: Build the Iteration Flow

**Add an Iteration node:**

1. Set the iteration input: select "Start / platforms"
2. Enter the iteration sub-canvas

**Add an LLM node inside the iteration:**

```
You are an experienced content marketing expert. Based on the product brief, write marketing content for the specified platform.

Product brief:
{{ product_info }}

Target platform: {{ item }}

Platform style guide:

[Blog]
- Tone: Professional, trustworthy
- Length: 800-1200 words
- Structure: Title + intro + product description + use cases + purchase CTA
- Notes: SEO-friendly, well-structured, light use of emoji is OK

[Instagram]
- Tone: Lifestyle, authentic sharing
- Length: 300-500 words
- Structure: Eye-catching title + user experience + highlights + purchase suggestion
- Notes: Heavy emoji use, conversational, include #hashtags

[Twitter/X]
- Tone: Casual, fun, witty
- Length: 1-3 tweets, each under 280 characters
- Structure: One-liner hook + key selling point + engagement prompt
- Notes: Short and punchy, include #hashtags

[LinkedIn]
- Tone: Professional, business-oriented
- Length: 200-400 words
- Structure: Industry insight + product value + business invitation
- Notes: Emphasize professionalism and business value

Write content appropriate for the specified platform.
```

## Step 3: Format the Output

After the iteration completes, use a Template Transform node to organize the format:

```jinja2
===================================
     TechStore Content Production Report
===================================

Product: {{ product_name }}
Generated At: {{ timestamp }}

{% for i in range(platforms|length) %}
-----------------------------------
[{{ platforms[i] }}]
-----------------------------------
{{ contents[i] }}

{% endfor %}
===================================

Content is ready — copy and use directly.
To make adjustments, modify and regenerate.

===================================
```

## Testing Content Generation

**Test input:**

`product_info`:
```
TechBuds Pro 3 True Wireless ANC Earbuds

Key selling points:
- 45dB industry-leading active noise cancellation
- 8-hour battery per charge, 32 hours with charging case
- Spatial audio for immersive listening
- Seamless multi-device switching
- IPX5 water resistance — worry-free during workouts

Price: $129

Target audience: Commuters, music enthusiasts, business professionals
```

`platforms`: `["Blog", "Instagram", "Twitter/X"]`

Run the Workflow, and within seconds you'll get content for three platforms:

- **Blog**: Professional long-form article
- **Instagram**: Lifestyle-style post
- **Twitter/X**: Short and snappy tweets

---

Lynn dropped the generated content into the marketing team's group chat.

*"That was way too fast! And the tone is actually on point."*

Lynn thought to herself: from now on, every product launch means a 5-minute turnaround on content.

## Advanced: Adding Multi-Language Support

What if you also need to generate content in multiple languages?

Simple approach: include the language in the platform list:

```
platforms: ["Blog-English", "Instagram-English", "LinkedIn-English", "Blog-Japanese", "Blog-Korean"]
```

Then add language instructions to the prompt:

```
Write in the language indicated in the platform name.
For example, "Blog-Japanese" should be written in Japanese, "Blog-Korean" in Korean. Default to English.
```

This way, a single Workflow handles **multi-platform, multi-language** content generation.

---

All three pain points were now solved: customer service had its AI agent, weekly reports had a generator, and content had a factory.

But building the tools is only the first step. Up next is a comprehensive hands-on exercise, followed by how to publish and manage your applications.
