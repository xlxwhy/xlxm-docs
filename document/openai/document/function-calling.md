# Function calling
Learn how to connect large language models to external tools.

函数调用
了解如何将大型语言模型连接到外部工具。

We are aware of an issue with non-ASCII outputs in gpt-3.5-turbo-1106 and gpt-4-1106-preview, and are working on implementing a fix. When these models generate a function call and the arguments include non-ASCII characters, the API may return Unicode escape sequences instead of the Unicode character directly. For example, arguments may look like {"location": "D\u00fcsseldorf"} instead of {"location": "Düsseldorf"}. Most applications should not be affected by this, as JSON parsers in languages like Python and Javascript will parse these strings into the correct objects. To stay updated on this topic, please subscribe to this community forum thread.

我们意识到 gpt-3.5-turbo-1106 和 gpt-4-1106-preview 中的非 ASCII 输出存在问题，并正在努力实施修复。 当这些模型生成函数调用并且参数包含非 ASCII 字符时，API 可能会返回 Unicode 转义序列，而不是直接返回 Unicode 字符。 例如，参数可能类似于 {"location": "D\u00fcsseldorf"} 而不是 {"location": "Düsseldorf"}。 大多数应用程序不应受此影响，因为 Python 和 Javascript 等语言中的 JSON 解析器会将这些字符串解析为正确的对象。 要了解此主题的最新动态，请订阅此社区论坛主题。

## Introduction


In an API call, you can describe functions and have the model intelligently choose to output a JSON object containing arguments to call one or many functions. The Chat Completions API does not call the function; instead, the model generates JSON that you can use to call the function in your code.


介绍
在 API 调用中，您可以描述函数，并让模型智能地选择输出包含调用一个或多个函数的参数的 JSON 对象。 聊天完成 API 不会调用该函数； 相反，模型会生成 JSON，您可以使用它来调用代码中的函数。

The latest models (gpt-3.5-turbo-1106 and gpt-4-1106-preview) have been trained to both detect when a function should to be called (depending on the input) and to respond with JSON that adheres to the function signature more closely than previous models. With this capability also comes potential risks. We strongly recommend building in user confirmation flows before taking actions that impact the world on behalf of users (sending an email, posting something online, making a purchase, etc).


最新模型（gpt-3.5-turbo-1106 和 gpt-4-1106-preview）经过训练，可以检测何时应调用函数（取决于输入）并使用遵循函数签名的 JSON 进行响应 比以前的型号更接近。 这种能力也带来了潜在的风险。 我们强烈建议在代表用户采取影响世界的行动（发送电子邮件、在线发布内容、购买等）之前构建用户确认流程。

This guide is focused on function calling with the Chat Completions API, for details on function calling in the Assistants API, please see the Assistants Tools page.
Common use cases

本指南重点介绍使用聊天完成 API 进行函数调用，有关助手 API 中函数调用的详细信息，请参阅助手工具页面。
常见用例

Function calling allows you to more reliably get structured data back from the model. For example, you can:


函数调用使您能够更可靠地从模型中获取结构化数据。 例如，您可以：

Create assistants that answer questions by calling external APIs (e.g. like ChatGPT Plugins)

- e.g. define functions like send_email(to: string, body: string), or get_current_weather(location: string, unit: 'celsius' | 'fahrenheit')
Convert natural language into API calls
- e.g. convert "Who are my top customers?" to get_customers(min_revenue: int, created_before: string, limit: int) and call your internal API
Extract structured data from text
- e.g. define a function called extract_data(name: string, birthday: string), or sql_query(query: string)
...and much more!



创建通过调用外部 API 来回答问题的助手（例如 ChatGPT 插件）
- 例如 定义诸如 send_email(to: string, body: string) 或 get_current_weather(location: string, unit: 'celsius' | 'fahrenheit') 之类的函数
将自然语言转换为 API 调用
- 例如 转换“谁是我的主要客户？” get_customers(min_revenue: int, created_before: string, limit: int) 并调用您的内部 API
从文本中提取结构化数据
- 例如 定义一个名为 extract_data(name: string,birthday: string) 或 sql_query(query: string) 的函数
...以及更多！

The basic sequence of steps for function calling is as follows:


函数调用的基本步骤顺序如下：


Call the model with the user query and a set of functions defined in the functions parameter.


使用用户查询和函数参数中定义的一组函数来调用模型。

The model can choose to call one or more functions; if so, the content will be a stringified JSON object adhering to your custom schema (note: the model may hallucinate parameters).

模型可以选择调用一个或多个函数； 如果是这样，内容将是一个符合您的自定义架构的字符串化 JSON 对象（注意：模型可能会产生参数）。

Parse the string into JSON in your code, and call your function with the provided arguments if they exist.


在代码中将字符串解析为 JSON，并使用提供的参数（如果存在）调用函数。

Call the model again by appending the function response as a new message, and let the model summarize the results back to the user.


通过将函数响应作为新消息附加来再次调用模型，并让模型将结果汇总返回给用户。

Supported models

支持机型

Not all model versions are trained with function calling data. Function calling is supported with the following models:

并非所有模型版本都使用函数调用数据进行训练。 以下型号支持函数调用：


- gpt-4
- gpt-4-1106-preview
- gpt-4-0613
- gpt-3.5-turbo
- gpt-3.5-turbo-1106
- gpt-3.5-turbo-0613
In addition, parallel function calls is supported on the following models:
此外，以下型号支持并行函数调用：

- gpt-4-1106-preview
- gpt-3.5-turbo-1106

## Parallel function calling
Parallel function calling is the model's ability to perform multiple function calls together, allowing the effects and results of these function calls to be resolved in parallel. This is especially useful if functions take a long time, and reduces round trips with the API. For example, the model may call functions to get the weather in 3 different locations at the same time, which will result in a message with 3 function calls in the tool_calls array, each with an id. To respond to these function calls, add 3 new messages to the conversation, each containing the result of one function call, with a tool_call_id referencing the id from tool_calls.

并行函数调用是模型同时执行多个函数调用的能力，允许并行解决这些函数调用的效果和结果。 如果函数需要很长时间，这尤其有用，并且可以减少 API 的往返次数。 例如，模型可能会调用函数来同时获取 3 个不同位置的天气，这将导致在 tool_calls 数组中产生一条包含 3 个函数调用的消息，每个函数调用都有一个 id。 要响应这些函数调用，请向对话中添加 3 条新消息，每条消息都包含一个函数调用的结果，并使用 tool_call_id 引用 tool_calls 中的 id。


In this example, we define a single function get_current_weather. The model calls the function multiple times, and after sending the function response back to the model, we let it decide the next step. It responded with a user-facing message which was telling the user the temperature in San Francisco, Tokyo, and Paris. Depending on the query, it may choose to call a function again.


在此示例中，我们定义了一个函数 get_current_weather。 模型多次调用该函数，并将函数响应发送回模型后，我们让它决定下一步。 它回复了一条面向用户的消息，告诉用户旧金山、东京和巴黎的气温。 根据查询，它可能会选择再次调用函数。


If you want to force the model to call a specific function you can do so by setting tool_choice with a specific function name. You can also force the model to generate a user-facing message by setting tool_choice: "none". Note that the default behavior (tool_choice: "auto") is for the model to decide on its own whether to call a function and if so which function to call.


如果您想强制模型调用特定函数，可以通过设置 tool_choice 与特定函数名称来实现。 您还可以通过设置 tool_choice: "none" 强制模型生成面向用户的消息。 请注意，默认行为（tool_choice：“auto”）是模型自行决定是否调用函数以及如果调用哪个函数。


Example invoking multiple function calls in one response


在一个响应中调用多个函数的示例


You can find more examples of function calling in the OpenAI Cookbook:


您可以在 OpenAI Cookbook 中找到更多函数调用示例：
- Function calling
Learn from more examples demonstrating function calling

从更多演示函数调用的示例中学习
- Tokens
Under the hood, functions are injected into the system message in a syntax the model has been trained on. This means functions count against the model's context limit and are billed as input tokens. If running into context limits, we suggest limiting the number of functions or the length of documentation you provide for function parameters.
 
在引擎盖下，功能以模型训练过的语法注入到系统消息中。 这意味着函数会根据模型的上下文限制进行计数，并作为输入令牌进行计费。 如果遇到上下文限制，我们建议限制函数的数量或为函数参数提供的文档的长度。


It is also possible to use fine-tuning to reduce the number of tokens used if you have many functions defined.


如果定义了许多函数，还可以使用微调来减少使用的标记数量。
