# Introduction
Looking for ChatGPT? Head to chat.openai.com.
The OpenAI API can be applied to virtually any task. We offer a range of models with different capabilities and price points, as well as the ability to fine-tune custom models.

OpenAI API 几乎可以应用于任何任务。 我们提供一系列具有不同功能和价位的模型，并且能够微调定制模型。

## Resources
Experiment in the playground   
Read the API reference   
Visit the help center   
View the current API status  
Check out the OpenAI Developer Forum  
Learn about our usage policies  
At OpenAI, protecting user data is fundamental to our mission. We do not train our models on inputs and outputs through our API. Learn more on our API data privacy page.  
Key concepts  

在操场上做实验  
阅读 API 参考  
访问帮助中心  
查看当前API状态  
查看 OpenAI 开发者论坛  
了解我们的使用政策  
在 OpenAI，保护用户数据是我们使命的基础。 我们不会通过 API 来训练我们的模型的输入和输出。 请访问我们的 API 数据隐私页面了解更多信息。  
关键概念  

## Text generation models
OpenAI's text generation models (often referred to as generative pre-trained transformers or "GPT" models for short), like GPT-4 and GPT-3.5, have been trained to understand natural and formal language. Models like GPT-4 allows text outputs in response to their inputs. The inputs to these models are also referred to as "prompts". Designing a prompt is essentially how you "program" a model like GPT-4, usually by providing instructions or some examples of how to successfully complete a task. Models like GPT-4 can be used across a great variety of tasks including content or code generation, summarization, conversation, creative writing, and more. Read more in our introductory text generation guide and in our prompt engineering guide.

OpenAI 的文本生成模型（通常称为生成预训练 Transformer 或简称“GPT”模型），如 GPT-4 和 GPT-3.5，已经过训练来理解自然和形式语言。 像 GPT-4 这样的模型允许文本输出来响应其输入。 这些模型的输入也称为“提示”。 设计提示本质上是如何“编程”GPT-4 等模型，通常是通过提供说明或一些如何成功完成任务的示例。 GPT-4 等模型可用于多种任务，包括内容或代码生成、摘要、对话、创意写作等。 请阅读我们的介绍性文本生成指南和提示工程指南来了解更多信息。

## Assistants
Assistants refer to entities, which in the case of the OpenAI API are powered by large language models like GPT-4, that are capable of performing tasks for users. These assistants operate based on the instructions embedded within the context window of the model. They also usually have access to tools which allows the assistants to perform more complex tasks like running code or retrieving information from a file. Read more about assistants in our Assistants API Overview.

助手是指实体，在 OpenAI API 的情况下，它们由 GPT-4 等大型语言模型提供支持，能够为用户执行任务。 这些助手根据模型上下文窗口中嵌入的指令进行操作。 他们通常还可以使用允许助理执行更复杂任务的工具，例如运行代码或从文件中检索信息。 在我们的 Assistants API 概述中了解有关助手的更多信息。

## Embeddings
An embedding is a vector representation of a piece of data (e.g. some text) that is meant to preserve aspects of its content and/or its meaning. Chunks of data that are similar in some way will tend to have embeddings that are closer together than unrelated data. OpenAI offers text embedding models that take as input a text string and produce as output an embedding vector. Embeddings are useful for search, clustering, recommendations, anomaly detection, classification, and more. Read more about embeddings in our embeddings guide.

嵌入是一段数据（例如某些文本）的矢量表示，旨在保留其内容和/或其含义的各个方面。 在某些方面相似的数据块往往比不相关的数据具有更紧密的嵌入。 OpenAI 提供文本嵌入模型，该模型将文本字符串作为输入并生成嵌入向量作为输出。 嵌入对于搜索、聚类、推荐、异常检测、分类等非常有用。 在我们的嵌入指南中阅读有关嵌入的更多信息。

## Tokens
Text generation and embeddings models process text in chunks called tokens. Tokens represent commonly occurring sequences of characters. For example, the string " tokenization" is decomposed as " token" and "ization", while a short and common word like " the" is represented as a single token. Note that in a sentence, the first token of each word typically starts with a space character. Check out our tokenizer tool to test specific strings and see how they are translated into tokens. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

文本生成和嵌入模型以称为标记的块的形式处理文本。 标记代表常见的字符序列。 例如，字符串“tokenization”被分解为“token”和“ization”，而像“the”这样的短而常见的单词则被表示为单个标记。 请注意，在句子中，每个单词的第一个标记通常以空格字符开头。 查看我们的标记生成器工具来测试特定字符串并查看它们如何转换为标记。 根据粗略的经验，1 个标记大约相当于 4 个字符或英文文本的 0.75 个单词。

One limitation to keep in mind is that for a text generation model the prompt and the generated output combined must be no more than the model's maximum context length. For embeddings models (which do not output tokens), the input must be shorter than the model's maximum context length. The maximum context lengths for each text generation and embeddings model can be found in the model index.

要记住的一个限制是，对于文本生成模型，提示和生成的输出的总和不得超过模型的最大上下文长度。 对于嵌入模型（不输出标记），输入必须短于模型的最大上下文长度。 每个文本生成和嵌入模型的最大上下文长度可以在模型索引中找到。


## Guides
Jump into one of our guides to learn more.

- Quickstart tutorial
Learn by building a quick sample application
- 快速入门教程
通过构建快速示例应用程序来学习
- Text generation
Learn how to generate and process text
- 文本生成
了解如何生成和处理文本
- AssistantsBeta
Learn the basics of building an assistant
- 助理测试版
了解构建助手的基础知识
- Embeddings
Learn how to search, classify, and compare text
- 嵌入
了解如何搜索、分类和比较文本
- Speech to text
Learn how to turn speech into text
- 语音转文字
了解如何将语音转换为文本
- Image generation
Learn how to generate or edit images
- 图像生成
了解如何生成或编辑图像
- Vision
Learn how to use GPT-4 to process image inputs
- 想象
了解如何使用 GPT-4 处理图像输入

