# 第 3 章：30 分钟，搭建你的第一个 AI 客服

> 小林决定从客服场景开始。TechStore 每天收到几百条咨询，大部分是重复的问题——退货政策、配送时效、保修条款。
>
> "如果 AI 能回答这些常见问题，客服就能专注处理复杂的售后。"
>
> 说干就干。

## 准备工作：获取 API Key

Dify 本身是一个编排平台，它需要调用大语言模型来处理任务。你需要先配置一个模型。

以 OpenAI 为例：

1. 访问 [platform.openai.com](https://platform.openai.com)
2. 注册账号并添加支付方式
3. 在 API Keys 页面创建一个新的 Key
4. 复制保存好（只显示一次）

Dify 支持几十种模型供应商（OpenAI、Anthropic、Google Gemini、Mistral、AWS Bedrock 等），流程都类似——去对应平台注册开发者账号，拿到 API Key 即可。

**在 Dify 中配置模型：**

1. 进入 Dify 工作台
2. 点击右上角头像 → 设置 → 模型供应商
3. 找到你的模型供应商（如 OpenAI），点击配置
4. 填入 API Key，保存

配置完成后，你就可以在 Dify 中使用这个模型了。

## 第一步：创建知识库

AI 要能回答 TechStore 的问题，首先需要"知道" TechStore 的信息。这就需要用到**知识库**。

1. 在 Dify 左侧导航，点击「知识库」
2. 点击「创建知识库」
3. 命名为"TechStore FAQ"
4. 选择「导入已有文本」

现在需要准备内容。小林整理了 TechStore 的常见问题文档：

::: details 点击查看 TechStore FAQ 示例内容
```markdown
# TechStore FAQ

## Shipping
- Coverage: Domestic shipping within the US
- Delivery: Metro areas 1-2 days, other regions 3-5 days
- Cost: Free shipping on orders over $50; $5.99 flat rate otherwise

## Return Policy
- 30-day return: Within 30 days of delivery, item must be unopened
- Defective items: 15-day exchange, 1-year free repair
- Non-returnable: Activated electronics, custom products, free gifts

## Warranty
- Smartphones / Tablets: 1-year warranty
- Laptops: 2-year warranty
- Accessories: 6-month warranty

## Payment Methods
Credit/Debit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, Klarna installments
```
:::

5. 上传你的 FAQ 文档（支持 TXT、Markdown、PDF、Word）
6. 配置分段和索引：
   - **分段方式**：推荐先用「自动分段」，Dify 会帮你把文档切成合适的段落
   - **索引方式**：选「高质量」，它会用 Embedding 模型把文本转成向量，检索效果更好（代价是处理时会消耗一些 Token）
7. 点击「保存并处理」

等待几分钟，知识库就创建好了。你可以在知识库详情页看到文档被分成了多个"段落"（也叫 chunk），每个段落都会被向量化索引，后续检索时 Dify 会找到和用户问题最相似的段落。

::: tip 知识库进阶：Knowledge Pipeline
Dify 后来推出了更强大的 **Knowledge Pipeline（知识管线）**，你可以像搭 Workflow 一样，可视化地编排文档的处理流程——怎么清洗、怎么分段、怎么索引，全部可配置。

其中一个重要能力叫 **Parent-Child Retrieval（父子分段检索）**：用小粒度的段落做精准匹配，匹配命中后返回它所属的大段落给 LLM，兼顾检索精度和上下文完整性。

不过对于入门阶段，默认的自动分段 + 高质量索引已经够用了。等你遇到"检索结果不够准"的问题时，再回来研究 Knowledge Pipeline。
:::

## 第二步：创建 Chatbot 应用

知识库准备好了，现在创建一个能使用这个知识库的 Chatbot。

1. 点击左侧「工作室」
2. 点击「创建空白应用」
3. 选择应用类型：**Chatbot**（聊天助手）
4. 命名为"TechStore 客服助手"
5. 点击创建

你会进入 Chatbot 的编辑界面。

## 第三步：配置应用

现在来配置这个 Chatbot。

**设置提示词（System Prompt）：**

在「提示词」区域，输入：

```
你是 TechStore 的智能客服助手。

你的职责是回答客户关于 TechStore 的问题，包括产品咨询、配送、退换货、保修等。

回答要求：
1. 只根据知识库中的信息回答，不要编造
2. 如果知识库中没有相关信息，请说"这个问题我需要转给人工客服"
3. 语气友好、专业
4. 回答简洁，不超过 200 字
```

**关联知识库：**

1. 在「上下文」区域，点击「添加」
2. 选择刚才创建的"TechStore FAQ"知识库
3. 设置检索数量：3-5 条（检索最相关的几段内容）

**选择模型：**

1. 在「模型」区域，选择你配置好的模型
2. 推荐：gpt-4o-mini（性价比高）或 gpt-5（效果更好但更贵）

## 第四步：测试效果

配置完成，让我们测试一下。

点击右侧的「预览」，打开测试对话框。

**测试 1：退货政策**
```
用户：我买的东西想退货，怎么操作？
```

AI 应该会根据知识库回答退货政策。

**测试 2：配送时效**
```
用户：发货到上海要几天？
```

**测试 3：知识库外的问题**
```
用户：你们卖不卖二手手机？
```

AI 应该会说需要转人工（因为知识库里没有这个信息）。

如果测试结果符合预期，恭喜你！你的第一个 AI 客服已经可以工作了。

## 发布应用

测试没问题后，点击右上角的「发布」。

发布后，你可以：
- 获取一个网页链接，分享给团队试用
- 获取 API 接口，集成到现有系统

---

小林把链接发给了几个客服同事试用。

反馈很快来了：

*"基本问题都能答对！"*

*"但有些复杂问题答不上来……"*

*"有个客户一次问了三个问题，它只回答了第一个。"*

*"投诉类的问题回复太生硬了。"*

小林意识到，简单的 Chatbot 只是起点。要真正用起来，还需要更强大的能力。

下一章，我们来看看 Dify 还有什么更厉害的武器。
