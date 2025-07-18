# Text generation models
New capabilities launched at DevDay
文本生成模型
DevDay 推出新功能



Text generation models are now capable of JSON mode and Reproducible outputs. We also launched the Assistants API to enable you to build agent-like experiences on top of our text-generation models. GPT-4 Turbo is available in preview by specifying gpt-4-1106-preview as the model name.


文本生成模型现在支持 JSON 模式和可重复输出。 我们还推出了 Assistants API，使您能够在我们的文本生成模型之上构建类似代理的体验。 通过指定 gpt-4-1106-preview 作为模型名称，GPT-4 Turbo 可以在预览版中使用。


OpenAI's text generation models (often called generative pre-trained transformers or large language models) have been trained to understand natural language, code, and images. The models provide text outputs in response to their inputs. The inputs to these models are also referred to as "prompts". Designing a prompt is essentially how you “program” a large language model model, usually by providing instructions or some examples of how to successfully complete a task.


OpenAI 的文本生成模型（通常称为生成式预训练 Transformer 或大型语言模型）经过训练可以理解自然语言、代码和图像。 这些模型提供文本输出来响应其输入。 这些模型的输入也称为“提示”。 设计提示本质上是如何“编程”大型语言模型，通常是通过提供说明或一些如何成功完成任务的示例。


Using OpenAI's text generation models, you can build applications to:


使用 OpenAI 的文本生成模型，您可以构建应用程序来：

- Draft documents
文件草案
- Write computer code
编写计算机代码
- Answer questions about a knowledge base
回答有关知识库的问题
- Analyze texts
分析文本
- Give software a natural language interface
为软件提供自然语言界面
- Tutor in a range of subjects
一系列科目的导师
- Translate languages
翻译语言
- Simulate characters for games
模拟游戏角色

With the release of gpt-4-vision-preview, you can now build systems that also process and understand images.

随着 gpt-4-vision-preview 的发布，您现在可以构建还可以处理和理解图像的系统。



Explore GPT-4 with image inputs
Check out the vision guide for more detail.
GPT-4 Turbo
Try out GPT-4 Turbo in the playground.
To use one of these models via the OpenAI API, you’ll send a request containing the inputs and your API key, and receive a response containing the model’s output. Our latest models, gpt-4 and gpt-3.5-turbo, are accessed through the chat completions API endpoint.

通过图像输入探索 GPT-4
查看视觉指南了解更多详细信息。
GPT-4涡轮增压
在操场上试用 GPT-4 Turbo。
要通过 OpenAI API 使用这些模型之一，您将发送包含输入和 API 密钥的请求，并接收包含模型输出的响应。 我们的最新模型 gpt-4 和 gpt-3.5-turbo 可通过聊天完成 API 端点进行访问。


MODEL FAMILIES	API ENDPOINT
Newer models (2023–)	gpt-4, gpt-4 turbo, gpt-3.5-turbo	https://api.openai.com/v1/chat/completions
Updated legacy models (2023)	gpt-3.5-turbo-instruct, babbage-002, davinci-002	https://api.openai.com/v1/completions
Legacy models (2020–2022)	text-davinci-003, text-davinci-002, davinci, curie, babbage, ada	https://api.openai.com/v1/completions
You can experiment with various models in the chat playground. If you’re not sure which model to use, then use gpt-3.5-turbo or gpt-4.

模型系列 API 端点
较新型号 (2023–) gpt-4、gpt-4 Turbo、gpt-3.5-turbo https://api.openai.com/v1/chat/completions
更新了旧模型 (2023) gpt-3.5-turbo-instruct、babbage-002、davinci-002 https://api.openai.com/v1/completions
旧模型 (2020–2022) text-davinci-003、text-davinci-002、davinci、curie、babbage、ada https://api.openai.com/v1/completions
您可以在聊天游乐场中尝试各种模型。 如果您不确定使用哪个模型，请使用 gpt-3.5-turbo 或 gpt-4。


## Chat Completions API
Chat models take a list of messages as input and return a model-generated message as output. Although the chat format is designed to make multi-turn conversations easy, it’s just as useful for single-turn tasks without any conversation.


聊天完成 API
聊天模型将消息列表作为输入，并返回模型生成的消息作为输出。 尽管聊天格式旨在使多轮对话变得容易，但它对于没有任何对话的单轮任务也同样有用。


An example Chat Completions API call looks like the following:

python
```py
python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Where was it played?"}
  ]
)
```
To learn more, you can view the full API reference documentation for the Chat API.

要了解更多信息，您可以查看聊天 API 的完整 API 参考文档。

The main input is the messages parameter. Messages must be an array of message objects, where each object has a role (either "system", "user", or "assistant") and content. Conversations can be as short as one message or many back and forth turns.

主要输入是 messages 参数。 消息必须是消息对象的数组，其中每个对象都有一个角色（“系统”、“用户”或“助理”）和内容。 对话可以短至一条消息，也可以来回多次。

Typically, a conversation is formatted with a system message first, followed by alternating user and assistant messages.

通常，对话首先由系统消息格式化，然后是交替的用户消息和助理消息。

The system message helps set the behavior of the assistant. For example, you can modify the personality of the assistant or provide specific instructions about how it should behave throughout the conversation. However note that the system message is optional and the model’s behavior without a system message is likely to be similar to using a generic message such as "You are a helpful assistant."

系统消息有助于设置助手的行为。 例如，您可以修改助手的个性或提供有关其在整个对话过程中应如何表现的具体说明。 但请注意，系统消息是可选的，没有系统消息的模型行为可能类似于使用通用消息，例如“你是一个有用的助手”。

The user messages provide requests or comments for the assistant to respond to. Assistant messages store previous assistant responses, but can also be written by you to give examples of desired behavior.

用户消息提供助理响应的请求或评论。 助理消息存储以前的助理响应，但也可以由您编写以给出所需行为的示例。

Including conversation history is important when user instructions refer to prior messages. In the example above, the user’s final question of "Where was it played?" only makes sense in the context of the prior messages about the World Series of 2020. Because the models have no memory of past requests, all relevant information must be supplied as part of the conversation history in each request. If a conversation cannot fit within the model’s token limit, it will need to be shortened in some way.

当用户指令引用之前的消息时，包含对话历史记录非常重要。 在上面的示例中，用户的最后一个问题是“在哪里播放的？” 仅在有关 2020 年世界职业棒球大赛的先前消息的上下文中才有意义。由于模型没有过去请求的记忆，因此所有相关信息必须作为每个请求中的对话历史记录的一部分提供。 如果对话无法满足模型的令牌限制，则需要以某种方式缩短。

To mimic the effect seen in ChatGPT where the text is returned iteratively, set the stream parameter to true.
Chat Completions response format


要模仿 ChatGPT 中迭代返回文本的效果，请将流参数设置为 true。
聊天完成响应格式

An example Chat Completions API response looks as follows:

聊天完成 API 响应示例如下所示：
```py
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
        "role": "assistant"
      }
    }
  ],
  "created": 1677664795,
  "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
  "model": "gpt-3.5-turbo-0613",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 17,
    "prompt_tokens": 57,
    "total_tokens": 74
  }
}
```
The assistant’s reply can be extracted with:

助理的回复可以通过以下方式提取：

```python
response['choices'][0]['message']['content']
```
Every response will include a finish_reason. The possible values for finish_reason are:

stop: API returned complete message, or a message terminated by one of the stop sequences provided via the stop parameter
length: Incomplete model output due to max_tokens parameter or token limit
function_call: The model decided to call a function
content_filter: Omitted content due to a flag from our content filters
null: API response still in progress or incomplete
Depending on input parameters, the model response may include different information.

每个响应都将包含一个 finish_reason。 finish_reason 的可能值为：

- stop：API 返回完整消息，或由通过 stop 参数提供的停止序列之一终止的消息
- length：由于 max_tokens 参数或 token 限制导致模型输出不完整
- function_call：模型决定调用一个函数
- content_filter：由于我们的内容过滤器中的标志而省略了内容
- null：API 响应仍在进行中或不完整
根据输入参数，模型响应可能包括不同的信息。

## JSON mode New
A common way to use Chat Completions is to instruct the model to always return a JSON object that makes sense for your use case, by specifying this in the system message. While this does work in some cases, occasionally the models may generate output that does not parse to valid JSON objects.

使用聊天完成的常见方法是通过在系统消息中指定，指示模型始终返回对您的用例有意义的 JSON 对象。 虽然这在某些情况下确实有效，但有时模型可能会生成无法解析为有效 JSON 对象的输出。

To prevent these errors and improve model performance, when calling gpt-4-1106-preview or gpt-3.5-turbo-1106, you can set response_format to { "type": "json_object" } to enable JSON mode. When JSON mode is enabled, the model is constrained to only generate strings that parse into valid JSON object.

为了防止这些错误并提高模型性能，在调用gpt-4-1106-preview或gpt-3.5-turbo-1106时，可以将response_format设置为{ "type": "json_object" }以启用JSON模式。 启用 JSON 模式时，模型仅限于生成解析为有效 JSON 对象的字符串。

Important notes:

When using JSON mode, always instruct the model to produce JSON via some message in the conversation, for example via your system message. If you don't include an explicit instruction to generate JSON, the model may generate an unending stream of whitespace and the request may run continually until it reaches the token limit. To help ensure you don't forget, the API will throw an error if the string "JSON" does not appear somewhere in the context.

使用 JSON 模式时，请始终指示模型通过对话中的某些消息（例如通过系统消息）生成 JSON。 如果您不包含生成 JSON 的显式指令，则模型可能会生成无休止的空白流，并且请求可能会持续运行，直到达到令牌限制。 为了帮助确保您不会忘记，如果字符串“JSON”没有出现在上下文中的某个位置，API 将抛出错误。


The JSON in the message the model returns may be partial (i.e. cut off) if finish_reason is length, which indicates the generation exceeded max_tokens or the conversation exceeded the token limit. To guard against this, check finish_reason before parsing the response.

如果 finish_reason 为 length，则模型返回的消息中的 JSON 可能是部分的（即被截断），这表明生成超出了 max_tokens 或会话超出了令牌限制。 为了防止这种情况，请在解析响应之前检查 finish_reason 。

JSON mode will not guarantee the output matches any specific schema, only that it is valid and parses without errors.

JSON 模式不保证输出匹配任何特定模式，仅保证其有效且解析无错误。

python

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-3.5-turbo-1106",
  response_format={ "type": "json_object" },
  messages=[
    {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
    {"role": "user", "content": "Who won the world series in 2020?"}
  ]
)
print(response.choices[0].message.content)
```
In this example, the response includes a JSON object that looks something like the following:

在此示例中，响应包含一个 JSON 对象，如下所示：

"content": "{\"winner\": \"Los Angeles Dodgers\"}"`
 
Note that JSON mode is always enabled when the model is generating arguments as part of function calling.


请注意，当模型在函数调用过程中生成参数时，JSON 模式始终处于启用状态。

## Reproducible outputs Beta
Chat Completions are non-deterministic by default (which means model outputs may differ from request to request). That being said, we offer some control towards deterministic outputs by giving you access to the seed parameter and the system_fingerprint response field.


可重复的输出 Beta
默认情况下，聊天完成是不确定的（这意味着模型输出可能因请求而异）。 话虽这么说，我们通过让您访问种子参数和 system_fingerprint 响应字段来提供对确定性输出的一些控制。


To receive (mostly) deterministic outputs across API calls, you can:


要跨 API 调用接收（大部分）确定性输出，您可以：

Set the seed parameter to any integer of your choice and use the same value across requests you'd like deterministic outputs for.
Ensure all other parameters (like prompt or temperature) are the exact same across requests.


将种子参数设置为您选择的任何整数，并在您想要确定性输出的请求中使用相同的值。
确保所有其他参数（如提示或温度）在请求之间完全相同。

Sometimes, determinism may be impacted due to necessary changes OpenAI makes to model configurations on our end. To help you keep track of these changes, we expose the system_fingerprint field. If this value is different, you may see different outputs due to changes we've made on our systems.


有时，由于 OpenAI 对我们端的模型配置进行必要的更改，确定性可能会受到影响。 为了帮助您跟踪这些更改，我们公开了 system_fingerprint 字段。 如果该值不同，您可能会因我们对系统所做的更改而看到不同的输出。

## Deterministic outputs
Explore the new seed parameter in the OpenAI cookbook
Managing tokens
Language models read and write text in chunks called tokens. In English, a token can be as short as one character or as long as one word (e.g., a or apple), and in some languages tokens can be even shorter than one character or even longer than one word.

确定性输出
探索 OpenAI 食谱中的新种子参数
管理代币
语言模型以称为标记的块的形式读取和写入文本。 在英语中，标记可以短至一个字符，也可以长至一个单词（例如，a 或 apple），并且在某些语言中，标记甚至可以短于一个字符，甚至长于一个单词。


For example, the string "ChatGPT is great!" is encoded into six tokens: ["Chat", "G", "PT", " is", " great", "!"].


例如，字符串“ChatGPT is Great!” 被编码为六个标记：[“Chat”、“G”、“PT”、“is”、“great”、“!”]。


The total number of tokens in an API call affects:


API 调用中的令牌总数会影响：


- How much your API call costs, as you pay per token
- 您的 API 调用费用是多少（按令牌支付）
- How long your API call takes, as writing more tokens takes more time
- API 调用需要多长时间，因为写入更多令牌需要更多时间
- Whether your API call works at all, as total tokens must be below the model’s maximum limit (4097 tokens for gpt-3.5-turbo)
- 您的 API 调用是否有效，因为令牌总数必须低于模型的最大限制（gpt-3.5-turbo 为 4097 个令牌）
- Both input and output tokens count toward these quantities. For example, if your API call used 10 tokens in the message input and you received 20 tokens in the message output, you would be billed for 30 tokens. Note however that for some models the price per token is different for tokens in the input vs. the output (see the pricing page for more information).
- 输入和输出令牌都计入这些数量。 例如，如果您的 API 调用在消息输入中使用了 10 个令牌，而您在消息输出中收到了 20 个令牌，则您将需要支付 30 个令牌。 但请注意，对于某些模型，输入中的代币与输出中的代币的每个代币的价格是不同的（有关更多信息，请参阅定价页面）。

To see how many tokens are used by an API call, check the usage field in the API response (e.g., response['usage']['total_tokens']).


要查看 API 调用使用了多少令牌，请检查 API 响应中的使用字段（例如，response['usage']['


Chat models like gpt-3.5-turbo and gpt-4 use tokens in the same way as the models available in the completions API, but because of their message-based formatting, it's more difficult to count how many tokens will be used by a conversation.

像 gpt-3.5-turbo 和 gpt-4 这样的聊天模型使用令牌的方式与完成 API 中可用的模型相同，但由于它们基于消息的格式，因此更难以计算对话将使用多少个令牌 。

## DEEP DIVE
Counting tokens for chat API calls
To see how many tokens are in a text string without making an API call, use OpenAI’s tiktoken Python library. Example code can be found in the OpenAI Cookbook’s guide on how to count tokens with tiktoken.

深潜
计算聊天 API 调用的令牌
要在不调用 API 的情况下查看文本字符串中有多少个令牌，请使用 OpenAI 的 tiktoken Python 库。 示例代码可以在 OpenAI Cookbook 的关于如何使用 tiktoken 计算代币的指南中找到。

Each message passed to the API consumes the number of tokens in the content, role, and other fields, plus a few extra for behind-the-scenes formatting. This may change slightly in the future.

传递到 API 的每条消息都会消耗内容、角色和其他字段中的令牌数量，以及一些用于幕后格式化的额外令牌。 这在未来可能会略有改变。

If a conversation has too many tokens to fit within a model’s maximum limit (e.g., more than 4097 tokens for gpt-3.5-turbo), you will have to truncate, omit, or otherwise shrink your text until it fits. Beware that if a message is removed from the messages input, the model will lose all knowledge of it.

如果对话有太多标记而无法满足模型的最大限制（例如，gpt-3.5-turbo 超过 4097 个标记），您将必须截断、省略或以其他方式缩小文本，直到适合为止。 请注意，如果从消息输入中删除消息，模型将丢失它的所有知识。

Note that very long conversations are more likely to receive incomplete replies. For example, a gpt-3.5-turbo conversation that is 4090 tokens long will have its reply cut off after just 6 tokens.

请注意，很长的对话更有可能收到不完整的回复。 例如，长度为 4090 个令牌的 gpt-3.5-turbo 对话将在仅 6 个令牌后就被切断。

## Parameter details
Frequency and presence penalties

参数详情
频率和存在处罚

The frequency and presence penalties found in the Chat Completions API and Legacy Completions API can be used to reduce the likelihood of sampling repetitive sequences of tokens. They work by directly modifying the logits (un-normalized log-probabilities) with an additive contribution.


聊天完成 API 和旧版完成 API 中发现的频率和存在惩罚可用于降低对令牌重复序列进行采样的可能性。 它们的工作原理是通过附加贡献直接修改 logits（非标准化对数概率）。

mu[j] -> mu[j] - c[j] * alpha_frequency - float(c[j] > 0) * alpha_presence
Where:

- mu[j] is the logits of the j-th token
- c[j] is how often that token was sampled prior to the current position
c[j] 是在当前位置之前对该标记进行采样的频率
- float(c[j] > 0) is 1 if c[j] > 0 and 0 otherwise
如果 c[j] > 0，则 float(c[j] > 0) 为 1，否则为 0
- alpha_frequency is the frequency penalty coefficient
alpha_Frequency 是频率惩罚系数
- alpha_presence is the presence penalty coefficient
alpha_presence 是存在惩罚系数


As we can see, the presence penalty is a one-off additive contribution that applies to all tokens that have been sampled at least once and the frequency penalty is a contribution that is proportional to how often a particular token has already been sampled.

 
正如我们所看到的，存在惩罚是一种一次性的附加贡献，适用于至少被采样一次的所有令牌，而频率惩罚是与特定令牌已经被采样的频率成正比的贡献。


Reasonable values for the penalty coefficients are around 0.1 to 1 if the aim is to just reduce repetitive samples somewhat. If the aim is to strongly suppress repetition, then one can increase the coefficients up to 2, but this can noticeably degrade the quality of samples. Negative values can be used to increase the likelihood of repetition.

如果目的只是稍微减少重复样本，则惩罚系数的合理值约为 0.1 到 1。 如果目标是强烈抑制重复，那么可以将系数增加到 2，但这会明显降低样本的质量。 负值可用于增加重复的可能性。

Completions API Legacy

完成 API 遗产

The completions API endpoint received its final update in July 2023 and has a different interface than the new chat completions endpoint. Instead of the input being a list of messages, the input is a freeform text string called a prompt.


完成 API 端点于 2023 年 7 月收到最终更新，并且具有与新的聊天完成端点不同的界面。 输入不是消息列表，而是称为提示的自由格式文本字符串。


An example API call looks as follows:
 
```python
from openai import OpenAI
client = OpenAI()

response = client.completions.create(
  model="gpt-3.5-turbo-instruct",
  prompt="Write a tagline for an ice cream shop."
)
```
See the full API reference documentation to learn more.

请参阅完整的 API 参考文档以了解更多信息。

## Token log probabilities
The completions API can provide a limited number of log probabilities associated with the most likely tokens for each output token. This feature is controlled by using the logprobs field. This can be useful in some cases to assess the confidence of the model in its output.


令牌对数概率
完成 API 可以提供与每个输出标记的最可能标记相关联的有限数量的日志概率。 此功能通过使用 logprobs 字段来控制。 在某些情况下，这对于评估模型对其输出的置信度很有用。

## Inserting text
The completions endpoint also supports inserting text by providing a suffix in addition to the standard prompt which is treated as a prefix. This need naturally arises when writing long-form text, transitioning between paragraphs, following an outline, or guiding the model towards an ending. This also works on code, and can be used to insert in the middle of a function or file.

插入文本
除了被视为前缀的标准提示之外，完成端点还支持通过提供后缀来插入文本。 当编写长文本、段落之间的转换、遵循大纲或引导模型走向结局时，这种需求自然会出现。 这也适用于代码，并且可用于插入到函数或文件的中间。

## DEEP DIVE
Inserting text
Completions response format
An example completions API response looks as follows:

插入文本
完工响应格式
完成 API 响应示例如下所示：
```python
{
  "choices": [
    {
      "finish_reason": "length",
      "index": 0,
      "logprobs": null,
      "text": "\n\n\"Let Your Sweet Tooth Run Wild at Our Creamy Ice Cream Shack"
    }
  ],
  "created": 1683130927,
  "id": "cmpl-7C9Wxi9Du4j1lQjdjhxBlO22M61LD",
  "model": "gpt-3.5-turbo-instruct",
  "object": "text_completion",
  "usage": {
    "completion_tokens": 16,
    "prompt_tokens": 10,
    "total_tokens": 26
  }
}
```

In Python, the output can be extracted with response['choices'][0]['text'].

在Python中，可以使用response['choices'][0]['text']提取输出。


The response format is similar to the response format of the Chat Completions API but also includes the optional field logprobs.


响应格式与聊天完成 API 的响应格式类似，但还包括可选字段 logprobs。

Chat Completions vs. Completions


聊天完成与完成

The Chat Completions format can be made similar to the completions format by constructing a request using a single user message. For example, one can translate from English to French with the following completions prompt:


通过使用单个用户消息构造请求，可以使聊天完成格式与完成格式类似。 例如，可以通过以下完成提示将英语翻译成法语：


Translate the following English text to French: "{text}"
And an equivalent chat prompt would be:


将以下英语文本翻译为法语：“{text}”
等效的聊天提示是：
 

[{"role": "user", "content": 'Translate the following English text to French: "{text}"'}]

Likewise, the completions API can be used to simulate a chat between a user and an assistant by formatting the input accordingly.

同样，完成 API 可用于模拟用户和

The difference between these APIs is the underlying models that are available in each. The chat completions API is the interface to our most capable model (gpt-4), and our most cost effective model (gpt-3.5-turbo).

这些 API 之间的区别在于每个 API 中可用的底层模型。 聊天完成 API 是我们最强大的模型 (gpt-4) 和最具成本效益的模型 (gpt-3.5-turbo) 的接口。

## Which model should I use?


我应该使用哪种型号？
We generally recommend that you use either gpt-4 or gpt-3.5-turbo. Which of these you should use depends on the complexity of the tasks you are using the models for. gpt-4 generally performs better on a wide range of evaluations. In particular, gpt-4 is more capable at carefully following complex instructions. By contrast gpt-3.5-turbo is more likely to follow just one part of a complex multi-part instruction. gpt-4 is less likely than gpt-3.5-turbo to make up information, a behavior known as "hallucination". gpt-4 also has a larger context window with a maximum size of 8,192 tokens compared to 4,096 tokens for gpt-3.5-turbo. However, gpt-3.5-turbo returns outputs with lower latency and costs much less per token.


我们通常建议您使用 gpt-4 或 gpt-3.5-turbo。 您应该使用哪一个取决于您使用模型执行的任务的复杂性。 gpt-4 通常在广泛的评估中表现更好。 特别是，gpt-4 更能够仔细遵循复杂的指令。 相比之下，gpt-3.5-turbo 更有可能只遵循复杂的多部分指令的一部分。 gpt-4 比 gpt-3.5-turbo 更不可能编造信息，这种行为被称为“幻觉”。 gpt-4 还具有更大的上下文窗口，最大大小为 8,192 个令牌，而 gpt-3.5-turbo 为 4,096 个令牌。 然而，gpt-3.5-turbo 返回的输出具有较低的延迟，并且每个代币的成本要低得多。


We recommend experimenting in the playground to investigate which models provide the best price performance trade-off for your usage. A common design pattern is to use several distinct query types which are each dispatched to the model appropriate to handle them.


我们建议在游乐场进行试验，以调查哪些模型可以为您的使用提供最佳的性价比权衡。 常见的设计模式是使用几种不同的查询类型，每种查询类型都会分派到适合处理它们的模型。

## Prompt engineering
An awareness of the best practices for working with OpenAI models can make a significant difference in application performance. The failure modes that each exhibit and the ways of working around or correcting those failure modes are not always intuitive. There is an entire field related to working with language models which has come to be known as "prompt engineering", but as the field has progressed its scope has outgrown merely engineering the prompt into engineering systems that use model queries as components. To learn more, read our guide on prompt engineering which covers methods to improve model reasoning, reduce the likelihood of model hallucinations, and more. You can also find many useful resources including code samples in the OpenAI Cookbook.

了解使用 OpenAI 模型的最佳实践可以对应用程序性能产生重大影响。 每种故障模式以及解决或纠正这些故障模式的方法并不总是直观的。 有一个与使用语言模型相关的整个领域，被称为“提示工程”，但随着该领域的发展，其范围已经超出了仅仅将提示工程设计为使用模型查询作为组件的工程系统的范围。 要了解更多信息，请阅读我们的即时工程指南，其中涵盖了改进模型推理、减少模型幻觉可能性等的方法。 您还可以在 OpenAI Cookbook 中找到许多有用的资源，包括代码示例。

## FAQ
### How should I set the temperature parameter?
Lower values for temperature result in more consistent outputs (e.g. 0.2), while higher values generate more diverse and creative results (e.g. 1.0). Select a temperature value based on the desired trade-off between coherence and creativity for your specific application. The temperature can range is from 0 to 2.


常问问题
温度参数该如何设置？
较低的温度值会产生更一致的输出（例如 0.2），而较高的值会产生更加多样化和创造性的结果（例如 1.0）。 根据您的特定应用的一致性和创造性之间所需的权衡选择温度值。 温度范围为 0 至 2。

### Is fine-tuning available for the latest models?
Yes, for some. Currently, you can only fine-tune gpt-3.5-turbo and our updated base models (babbage-002 and davinci-002). See the fine-tuning guide for more details on how to use fine-tuned models.

最新型号可以进行微调吗？
是的，对于某些人来说。 目前，您只能微调 gpt-3.5-turbo 和我们更新的基础模型（babbage-002 和 davinci-002）。 有关如何使用微调模型的更多详细信息，请参阅微调指南。

### Do you store the data that is passed into the API?
As of March 1st, 2023, we retain your API data for 30 days but no longer use your data sent via the API to improve our models. Learn more in our data usage policy. Some endpoints offer zero retention.


您是否存储传递到 API 的数据？
自 2023 年 3 月 1 日起，我们将您的 API 数据保留 30 天，但不再使用您通过 API 发送的数据来改进我们的模型。 了解更多信息，请参阅我们的数据使用政策。 一些端点提供零保留。

### How can I make my application more safe?
If you want to add a moderation layer to the outputs of the Chat API, you can follow our moderation guide to prevent content that violates OpenAI’s usage policies from being shown.


如何使我的应用程序更加安全？
如果您想为 Chat API 的输出添加审核层，您可以遵循我们的审核指南，以防止显示违反 OpenAI 使用政策的内容。

### Should I use ChatGPT or the API?
ChatGPT offers a chat interface to the models in the OpenAI API and a range of built-in features such as integrated browsing, code execution, plugins, and more. By contrast, using OpenAI’s API provides more flexibility.


我应该使用 ChatGPT 还是 API？
ChatGPT 为 OpenAI API 中的模型提供聊天界面以及一系列内置功能，例如集成浏览、代码执行、插件等。 相比之下，使用 OpenAI 的 API 提供了更大的灵活性。

