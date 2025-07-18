# Moderation
适度
## Overview
The moderations endpoint is a tool you can use to check whether content complies with OpenAI's usage policies. Developers can thus identify content that our usage policies prohibits and take action, for instance by filtering it.

概述
审核端点是一种工具，可用于检查内容是否符合 OpenAI 的使用政策。 因此，开发人员可以识别我们的使用政策禁止的内容并采取行动，例如过滤它。

The models classifies the following categories:

这些模型分为以下几类：

CATEGORY	DESCRIPTION
- hate	Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content - aimed at non-protected groups (e.g., chess players) is harrassment.
- hate/threatening	Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, - disability status, or caste.
- harassment	Content that expresses, incites, or promotes harassing language towards any target.
- harassment/threatening	Harassment content that also includes violence or serious harm towards any target.
- self-harm	Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders.
- self-harm/intent	Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders.
- self-harm/instructions	Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit - such acts.
- sexual	Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).
- sexual/minors	Sexual content that includes an individual who is under 18 years old.
- violence	Content that depicts death, violence, or physical injury.
- violence/graphic	Content that depicts death, violence, or physical injury in graphic detail.
- The moderation endpoint is free to use when monitoring the inputs and outputs of OpenAI APIs. We currently disallow other use cases. Accuracy may be lower on longer pieces of text. 
类别描述
- 仇恨 表达、煽动或宣扬基于种族、性别、民族、宗教、国籍、性取向、残疾状况或种姓的仇恨的内容。 针对非受保护群体（例如棋手）的仇恨内容属于骚扰。
- 仇恨/威胁 仇恨内容，还包括基于种族、性别、民族、宗教、国籍、性取向、残疾状况或种姓对目标群体实施暴力或严重伤害。
- 骚扰 对任何目标表达、煽动或宣扬骚扰性语言的内容。
- 骚扰/威胁 骚扰内容还包括对任何目标的暴力或严重伤害。
- 自残 宣扬、鼓励或描述自残行为的内容，例如自杀、自残和饮食失调。
- 自残/意图 说话者表示他们正在或打算进行自残行为的内容，例如自杀、割伤和饮食失调。
- 自残/说明 鼓励进行自残行为（例如自杀、割伤和饮食失调）的内容，或者提供有关如何实施此类行为的说明或建议的内容。
- 性 旨在引起性兴奋的内容，例如对性活动的描述，或宣传性服务（不包括性教育和健康）。
- 性/未成年人 包含 18 岁以下个人的色情内容。
- 暴力 描述死亡、暴力或人身伤害的内容。
- 暴力/图形 以图形细节描述死亡、暴力或人身伤害的内容。

For higher accuracy, try splitting long pieces of text into smaller chunks each less than 2,000 characters.

监控 OpenAI API 的输入和输出时，可以免费使用审核端点。 我们目前不允许其他用例。 较长文本的准确性可能会较低。 为了获得更高的准确度，请尝试将长文本分割成较小的块，每个块少于 2,000 个字符。

We are continuously working to improve the accuracy of our classifier. Our support for non-English languages is currently limited.

我们不断努力提高分类器的准确性。 目前我们对非英语语言的支持有限。

## Quickstart
To obtain a classification for a piece of text, make a request to the moderation endpoint as demonstrated in the following code snippets:

快速开始
要获取一段文本的分类，请向审核端点发出请求，如以下代码片段所示：

示例：获得审核
Example: Getting moderations
```sh

curl
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{"input": "Sample text goes here"}'

```
Below is an example output of the endpoint. It returns the following fields:
以下是端点的输出示例。 它返回以下字段：

- flagged: Set to true if the model classifies the content as violating OpenAI's usage policies, false otherwise.
flagged：如果模型将内容分类为违反 OpenAI 的使用策略，则设置为 true，否则设置为 false。
- categories: Contains a dictionary of per-category binary usage policies violation flags. For each category, the value is true if the model flags the corresponding category as violated, false otherwise.
类别：包含每个类别二进制使用策略违规标志的字典。 对于每个类别，如果模型将相应类别标记为违规，则值为 true，否则为 false。
- category_scores: Contains a dictionary of per-category raw scores output by the model, denoting the model's confidence that the input violates the OpenAI's policy for the category. The value is between 0 and 1, where higher values denote higher confidence. The scores should not be interpreted as probabilities.
category_scores：包含模型输出的每个类别原始分数的字典，表示模型对输入违反 OpenAI 该类别策略的置信度。 该值介于 0 和 1 之间，其中值越高表示置信度越高。 分数不应被解释为概率。


```json
{
  "id": "modr-XXXXX",
  "model": "text-moderation-005",
  "results": [
    {
      "flagged": true,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": false,
        "self-harm": false,
        "sexual/minors": false,
        "hate/threatening": false,
        "violence/graphic": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "harassment/threatening": true,
        "violence": true,
      },
      "category_scores": {
        "sexual": 1.2282071e-06,
        "hate": 0.010696256,
        "harassment": 0.29842457,
        "self-harm": 1.5236925e-08,
        "sexual/minors": 5.7246268e-08,
        "hate/threatening": 0.0060676364,
        "violence/graphic": 4.435014e-06,
        "self-harm/intent": 8.098441e-10,
        "self-harm/instructions": 2.8498655e-11,
        "harassment/threatening": 0.63055265,
        "violence": 0.99011886,
      }
    }
  ]
}

```
OpenAI will continuously upgrade the moderation endpoint's underlying model. Therefore, custom policies that rely on category_scores may need recalibration over time.