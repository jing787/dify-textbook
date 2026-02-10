# 第 14 章：综合实战——客户流失预警系统

> 小林的三个痛点都解决了。AI 客服、运营周报、内容工厂——这些工具已经成为 TechStore 日常运营的一部分。
>
> 一天，老板把小林叫到办公室。
>
> *"小林，听说你最近搞的那些 AI 工具很厉害？"*
>
> *"还行吧，主要是 Dify 好用。"*
>
> *"那我有个任务给你。"* 老板推过来一份数据，*"上个月我们流失了一批高价值客户，复购率下降了 12%。我希望能提前发现有流失风险的客户，在他们真正离开之前做点什么。你能用 AI 搞一个预警系统吗？"*
>
> 小林想了想：这可比客服和周报复杂多了。需要分析客诉日志、退货数据、消费行为，综合判断风险，还要生成可执行的预警报告。
>
> *"我试试。"*

这一章，我们跟着小林一起，把前面学到的所有能力**组合起来**，构建一个真正复杂的应用——客户流失预警系统。

::: tip 为什么有这一章
前面的章节，每章重点学一个新能力——知识检索、条件分支、迭代、工具调用、模板转换……

这一章不教新节点，而是看看：**当这些能力组合在一起时，能做出什么**。

如果你跟到了这里，说明你已经掌握了 Dify 的核心能力。现在是检验的时候。
:::

## 分析需求

小林回到工位，开始思考这个任务。

一个好的流失预警系统需要什么？

1. **数据输入**：接收客诉日志和退货数据
2. **逐客户分析**：对每个客户的行为进行风险评估
3. **风险分级**：按严重程度分为高/中/低风险
4. **原因诊断**：分析每个高风险客户的具体问题
5. **行动建议**：针对不同风险给出留存策略
6. **格式化报告**：输出结构化的预警报告

小林在纸上画了一个流程：

```
输入客诉日志 + 退货数据
    ↓
提取客户列表和关键指标
    ↓
对每个客户进行风险评估（迭代）
    ↓
按风险等级分组
    ↓
为高风险客户生成留存建议
    ↓
整合为预警报告
```

*"这里面有迭代（多个客户），有条件分支（风险分级），有多个 LLM 节点……"*

这会是小林搭过的最复杂的 Workflow。

不过拆开看，每一块都是之前学过的。拼起来就是了。

## 用到的能力清单

| 能力 | 学习章节 | 在本章的用途 |
|------|----------|-------------|
| Workflow 基础 | 第 5 章 | 整体框架 |
| LLM 节点 | 第 5 章 | 风险评估、原因分析、建议生成、报告撰写 |
| 迭代 | 第 7 章 | 遍历每个客户进行评估 |
| 条件分支 | 第 6 章 | 按风险等级分流 |
| 参数提取器 | 第 7 章 | 从日志中提取结构化信息 |
| 模板转换 | 第 11 章 | 格式化最终报告 |
| 并行处理 | 第 10 章 | 同时分析客诉和退货数据 |

## 第一步：数据输入与解析

创建新的 Workflow，命名为"客户流失预警系统"。

**开始节点：**
- `complaint_logs`：长文本，近期客诉日志
- `return_data`：长文本，近期退货数据
- `report_period`：文本，报告周期（如 "2025-W48"）

**添加参数提取器——"客户提取"：**

```
请从以下客诉日志和退货数据中，提取涉及的客户列表。

客诉日志：
{{complaint_logs}}

退货数据：
{{return_data}}

对每个客户提取以下信息：
- customer_id：客户 ID
- complaint_count：客诉次数
- return_count：退货次数
- issues：问题摘要列表

以 JSON 数组格式输出。
```

## 第二步：迭代评估每个客户

添加「迭代」节点，遍历客户数组。

**在迭代内部，添加 LLM 节点——"风险评估师"：**

```
你是一位资深的客户成功分析师。请评估以下客户的流失风险。

客户数据：
{{item}}

评估维度：
1. 客诉频率和严重程度
2. 退货频率和金额
3. 问题是否重复出现（同类问题多次投诉 = 高风险信号）
4. 最近一次互动的情绪

风险评分标准：
- HIGH：多次投诉未解决 / 大额退货 / 明确表示不满
- MEDIUM：有投诉但已处理 / 小额退货 / 情绪中性
- LOW：偶尔咨询 / 无退货 / 正常互动

请输出：
{
  "customer_id": "...",
  "risk_level": "HIGH/MEDIUM/LOW",
  "risk_score": 1-10,
  "key_issues": ["issue1", "issue2"],
  "sentiment": "negative/neutral/positive",
  "reasoning": "一句话解释为什么给这个评分"
}
```

迭代完成后，输出一个风险评估数组。

## 第三步：分级处理

添加「代码执行」节点，把评估结果按风险等级分组：

```python
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

## 第四步：为高风险客户生成留存方案

对高风险客户，用另一个 LLM 生成针对性的留存建议。

**添加 LLM 节点——"留存策略师"：**

```
你是一位客户留存专家。以下是被标记为高流失风险的客户列表。

高风险客户：
{{high_risk}}

请为每个高风险客户制定具体的留存策略：

1. 立即行动（24 小时内）
   - 主动联系方式（电话 / 邮件 / 专属客服）
   - 开场话术建议
   
2. 补偿方案
   - 根据问题类型推荐补偿（折扣券 / 免费升级 / 延长保修等）
   - 补偿力度与客户价值匹配

3. 长期跟进
   - 后续回访计划
   - 防止再次出现同类问题的措施

要求：
- 方案要具体、可执行
- 不同客户的方案要个性化，不要千篇一律
- 考虑成本效益
```

## 第五步：生成预警报告

**添加 LLM 节点——"报告撰写员"：**

```
请根据以下分析结果，生成一份客户流失预警报告。

报告周期：{{report_period}}

风险分布：
- 高风险客户：{{high_count}} 人
- 中风险客户：{{medium_count}} 人
- 低风险客户：{{low_count}} 人

高风险客户详情与留存方案：
{{retention_plan}}

中风险客户列表：
{{medium_risk}}

报告格式：

# 客户流失预警报告
## {{report_period}}

### Executive Summary
（3-5 句话总结本期风险状况和关键建议）

### 风险概览
（高/中/低风险分布、与上期对比趋势）

### 高风险客户 —— 需立即行动
（每个客户：问题摘要 + 留存方案 + 责任人建议）

### 中风险客户 —— 需关注
（列表 + 建议的跟进频率）

### 根因分析
（高频问题 TOP 3、系统性改进建议）

### 下一步行动
（具体的 action items，带优先级和时间节点）
```

**用模板转换节点包装格式：**

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

## 测试预警系统

**准备测试数据：**

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

点击运行，观察执行过程：

1. 参数提取器识别出 4 个涉及的客户
2. 迭代节点对每个客户进行风险评估
3. 代码节点将客户分为高/中/低风险组
4. LLM 为高风险客户（#A1023、#C3067）生成留存方案
5. 最终输出结构化的预警报告

**预期结果：**

- Customer #A1023：**HIGH** — 多次投诉未解决 + 明确表示要换品牌 + 大额退货
- Customer #C3067：**HIGH** — 重复物流投诉 + 情绪升级
- Customer #B2045：**MEDIUM** — 单次质量投诉 + 退货但情绪平稳
- Customer #D4089：**LOW** — 小额退货 + 非质量问题

## 进阶：把子流程发布为工具

小林搭完这个 Workflow 之后发现，"客诉日志 → 提取客户信息 → 风险评估"这段逻辑其实挺通用的——不只是流失预警需要，客服质量分析、VIP 客户识别都可能用到。

每次都重新搭一遍太浪费了。Dify 提供了一个能力叫 **Workflow as Tool（把 Workflow 发布为工具）**：

1. 把"客诉分析 + 风险评估"的逻辑单独做成一个 Workflow
2. 在应用设置里选择「发布为工具」
3. 之后在任何其他 Workflow 或 Agent 里，都可以像调用搜索工具一样调用它

这就像写代码时把常用逻辑封装成函数——写一次，到处调用。流失预警系统调用它，客服质量报告也可以调用它，不用重复搭相同的节点。

---

小林把预警报告发给了客服组长和运营经理。

客服组长立刻安排人联系了 Customer #A1023，提供了免费换新方案。一周后，这个客户没有流失，反而在社交媒体上说："他们的售后处理还是很负责的。"

老板看到报告，说了一句：*"早该做这个了。以后每周自动跑一次。"*

小林笑了。从最开始那个只会背 FAQ 的 Chatbot，到现在能分析客诉数据、给出留存建议——变化挺大的。

但说到底，AI 本身并没有变聪明多少。变的是你怎么用它——放到对的流程里，它就能干对的事。
