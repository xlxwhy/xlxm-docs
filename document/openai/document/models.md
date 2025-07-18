


# Models
New models launched at DevDay

We are excited to announce the preview release of GPT-4 Turbo (128k context window) and an updated GPT-3.5 Turbo (16k context window). Among other things, both models come with improved instruction following, JSON mode, more reproducible outputs, and parallel function calling.
Learn more.

DevDay 推出新模型

我们很高兴地宣布推出 GPT-4 Turbo（128k 上下文窗口）的预览版和更新的 GPT-3.5 Turbo（16k 上下文窗口）。 除此之外，这两种模型都具有改进的指令跟踪、JSON 模式、更可重复的输出和并行函数调用。
了解更多。

## Overview
The OpenAI API is powered by a diverse set of models with different capabilities and price points. You can also make customizations to our models for your specific use case with fine-tuning.

OpenAI API 由具有不同功能和价格点的多种模型提供支持。 您还可以通过微调来针对您的特定用例定制我们的模型。

MODEL	DESCRIPTION
- GPT-4 and GPT-4 Turbo	A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code
- GPT-3.5	A set of models that improve on GPT-3 and can understand as well as generate natural language or code
- DALL·E	A model that can generate and edit images given a natural language prompt
- TTS	A set of models that can convert text into natural sounding spoken audio
- Whisper	A model that can convert audio into text
- Embeddings	A set of models that can convert text into a numerical form
- Moderation	A fine-tuned model that can detect whether text may be sensitive or unsafe
- GPT base	A set of models without instruction following that can understand as well as generate natural language or code
- GPT-3Legacy	A set of models that can understand and generate natural language
- Deprecated	A full list of models that have been deprecated along with the suggested replacement

We have also published open source models including Point-E, Whisper, Jukebox, and CLIP.
我们还发布了开源模型，包括 Point-E、Whisper、Jukebox 和 CLIP。

Visit our model index for researchers to learn more about which models have been featured in our research papers and the differences between model series like InstructGPT and GPT-3.5.
请访问我们的模型索引，以便研究人员详细了解我们的研究论文中介绍了哪些模型以及 InstructGPT 和 GPT-3.5 等模型系列之间的差异。

## Continuous model upgrades
型号持续升级
gpt-3.5-turbo, gpt-4, and gpt-4-32k point to the latest model version. You can verify this by looking at the response object after sending a request. The response will include the specific model version used (e.g. gpt-3.5-turbo-0613).

gpt-3.5-turbo、gpt-4和gpt-4-32k指向最新的模型版本。 您可以通过发送请求后查看响应对象来验证这一点。 响应将包括所使用的特定模型版本（例如 gpt-3.5-turbo-0613）。

We also offer static model versions that developers can continue using for at least three months after an updated model has been introduced. With the new cadence of model updates, we are also giving people the ability to contribute evals to help us improve the model for different use cases. If you are interested, check out the OpenAI Evals repository.

我们还提供静态模型版本，开发人员可以在引入更新模型后继续使用至少三个月。 随着模型更新的新节奏，我们还让人们能够贡献评估，以帮助我们针对不同用例改进模型。 如果您有兴趣，请查看 OpenAI Evals 存储库。

The following models are the temporary snapshots, which we have already announced the deprecation dates of along with their replacement. If you want to use the latest model version, use the standard model names like gpt-4 or gpt-3.5-turbo.

以下型号是临时快照，我们已经宣布了它们的弃用日期及其替换日期。 如果您想使用最新的型号版本，请使用标准型号名称，例如 gpt-4 或 gpt-3.5-turbo。


MODEL NAME	DISCONTINUATION DATE	REPLACEMENT MODEL
- gpt-3.5-turbo-0613	Jun 13, 2024	gpt-3.5-turbo-1106
- gpt-3.5-turbo-0301	Jun 13, 2024	gpt-3.5-turbo-1106
- gpt-4-0314	Jun 13, 2024	gpt-4-0613
- gpt-4-32k-0314	Jun 13, 2024	gpt-4-32k-0613
Learn more about model deprecation on our deprecation page.

## GPT-4 and GPT-4 Turbo
GPT-4 is a large multimodal model (accepting text or image inputs and outputting text) that can solve difficult problems with greater accuracy than any of our previous models, thanks to its broader general knowledge and advanced reasoning capabilities. GPT-4 is available in the OpenAI API to paying customers. Like gpt-3.5-turbo, GPT-4 is optimized for chat but works well for traditional completions tasks using the Chat Completions API. Learn how to use GPT-4 in our GPT guide.

GPT-4 是一个大型多模态模型（接受文本或图像输入并输出文本），由于其更广泛的常识和先进的推理能力，它可以比我们以前的任何模型更准确地解决难题。 GPT-4 可在 OpenAI API 中向付费客户提供。 与 gpt-3.5-turbo 一样，GPT-4 针对聊天进行了优化，但也适用于使用聊天完成 API 的传统完成任务。 在我们的 GPT 指南中了解如何使用 GPT-4。

MODEL	DESCRIPTION	CONTEXT WINDOW	TRAINING DATA
- gpt-4-1106-preview	GPT-4 TurboNew
- The latest GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. This preview model is not yet suited for production traffic. Learn more.	128,000 tokens	Up to Apr 2023
- gpt-4-vision-preview	GPT-4 Turbo with visionNew
- Ability to understand images, in addition to all other GPT-4 Turbo capabilties. Returns a maximum of 4,096 output tokens. This is a preview model version and not suited yet for production traffic. Learn more.	128,000 tokens	Up to Apr 2023
- gpt-4	Currently points to gpt-4-0613. See continuous model upgrades.	8,192 tokens	Up to Sep 2021
- gpt-4-32k	Currently points to gpt-4-32k-0613. See continuous model upgrades.	32,768 tokens	Up to Sep 2021
- gpt-4-0613	Snapshot of gpt-4 from June 13th 2023 with improved function calling support.	8,192 tokens	Up to Sep 2021
- gpt-4-32k-0613	Snapshot of gpt-4-32k from June 13th 2023 with improved function calling support.	32,768 tokens	Up to Sep 2021
- gpt-4-0314
Legacy	Snapshot of gpt-4 from March 14th 2023 with function calling support. This model version will be deprecated on June 13th 2024.	8,192 tokens	Up to Sep 2021
gpt-4-32k-0314
Legacy	Snapshot of gpt-4-32k from March 14th 2023 with function calling support. This model version will be deprecated on June 13th 2024.	32,768 tokens	Up to Sep 2021
For many basic tasks, the difference between GPT-4 and GPT-3.5 models is not significant. However, in more complex reasoning situations, GPT-4 is much more capable than any of our previous models.

## Multilingual capabilities
GPT-4 outperforms both previous large language models and as of 2023, most state-of-the-art systems (which often have benchmark-specific training or hand-engineering). On the MMLU benchmark, an English-language suite of multiple-choice questions covering 57 subjects, GPT-4 not only outperforms existing models by a considerable margin in English, but also demonstrates strong performance in other languages.

GPT-4 的性能优于之前的大型语言模型，并且截至 2023 年，大多数最先进的系统（通常具有特定于基准的训练或手工工程）。 在 MMLU 基准（涵盖 57 个科目的英语多项选择题套件）上，GPT-4 不仅在英语方面远远优于现有模型，而且在其他语言方面也表现出了强劲的表现。

GPT-3.5
GPT-3.5 models can understand and generate natural language or code. Our most capable and cost effective model in the GPT-3.5 family is gpt-3.5-turbo which has been optimized for chat using the Chat Completions API but works well for traditional completions tasks as well.

GPT-3.5模型可以理解并生成自然语言或代码。 GPT-3.5 系列中功能最强大且最具成本效益的模型是 gpt-3.5-turbo，它已针对使用聊天完成 API 的聊天进行了优化，但也适用于传统的完成任务。

MODEL	DESCRIPTION	CONTEXT WINDOW	TRAINING DATA
- gpt-3.5-turbo-1106	Updated GPT 3.5 TurboNew
- The latest GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. Learn more.	16,385 tokens	Up to Sep 2021
- gpt-3.5-turbo	Currently points to gpt-3.5-turbo-0613. Will point to gpt-3.5-turbo-1106 starting Dec 11, 2023. See continuous model upgrades.	4,096 tokens	Up to Sep 2021
- gpt-3.5-turbo-16k	Currently points to gpt-3.5-turbo-0613. Will point to gpt-3.5-turbo-1106 starting Dec 11, 2023. See continuous model upgrades.	16,385 tokens	Up to Sep 2021
- gpt-3.5-turbo-instruct	Similar capabilities as text-davinci-003 but compatible with legacy Completions endpoint and not Chat Completions.	4,096 tokens	Up to Sep 2021
- gpt-3.5-turbo-0613
- Legacy	Snapshot of gpt-3.5-turbo from June 13th 2023. Will be deprecated on June 13, 2024.	4,096 tokens	Up to Sep 2021
- gpt-3.5-turbo-16k-0613
- Legacy	Snapshot of gpt-3.5-16k-turbo from June 13th 2023. Will be deprecated on June 13, 2024.	16,385 tokens	Up to Sep 2021
- gpt-3.5-turbo-0301
- Legacy	Snapshot of gpt-3.5-turbo from March 1st 2023. Will be deprecated on June 13th 2024.	4,096 tokens	Up to Sep 2021
- text-davinci-003
- Legacy	Can do language tasks with better quality and consistency than the curie, babbage, or ada models. Will be deprecated on Jan 4th 2024.	4,096 tokens	Up to Jun 2021
- text-davinci-002
- Legacy	Similar capabilities to text-davinci-003 but trained with supervised fine-tuning instead of reinforcement learning. Will be deprecated on Jan 4th 2024.	4,096 tokens	Up to Jun - 2021
- code-davinci-002
Legacy	Optimized for code-completion tasks. Will be deprecated on Jan 4th 2024.	8,001 tokens	Up to Jun 2021
We recommend using gpt-3.5-turbo over the other GPT-3.5 models because of its lower cost and improved performance.

旧版针对代码完成任务进行了优化。 将于 2024 年 1 月 4 日弃用。 8,001 个代币 截至 2021 年 6 月
我们建议使用 gpt-3.5-turbo 而不是其他 GPT-3.5 型号，因为它的成本更低，性能更高。

## DALL·E
DALL·E is a AI system that can create realistic images and art from a description in natural language. DALL·E 3 currently supports the ability, given a prompt, to create a new image with a specific size. DALL·E 2 also support the ability to edit an existing image, or create variations of a user provided image.

DALL·E是一个人工智能系统，可以根据自然语言的描述创建逼真的图像和艺术。 DALL·E 3 目前支持根据提示创建具有特定尺寸的新图像的功能。 DALL·E 2 还支持编辑现有图像或创建用户提供的图像的变体的功能。

DALL·E 3 is available through our Images API along with DALL·E 2. You can try DALL·E 3 through ChatGPT Plus.

DALL·E 3 可通过我们的图像 API 与 DALL·E 2 一起使用。您可以通过 ChatGPT Plus 尝试 DALL·E 3。

MODEL	DESCRIPTION
- dall-e-3	DALL·E 3New
The latest DALL·E model released in Nov 2023. Learn more.
- dall-e-2	The previous DALL·E model released in Nov 2022. The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model.

## TTS
TTS is an AI model that converts text to natural sounding spoken text. We offer two different model variates, tts-1 is optimized for real time text to speech use cases and tts-1-hd is optimized for quality. These models can be used with the Speech endpoint in the Audio API.

TTS 是一种人工智能模型，可将文本转换为听起来自然的语音文本。 我们提供两种不同的模型变量，tts-1 针对实时文本到语音用例进行了优化，tts-1-hd 针对质量进行了优化。 这些模型可以与音频 API 中的语音端点一起使用。

MODEL	DESCRIPTION
tts-1	Text-to-speech 1New
The latest text to speech model, optimized for speed.
tts-1-hd	Text-to-speech 1 HDNew
The latest text to speech model, optimized for quality.
## Whisper
Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the whisper-1 model name.

Whisper 是一种通用语音识别模型。 它是在各种音频的大型数据集上进行训练的，也是一个多任务模型，可以执行多语言语音识别以及语音翻译和语言识别。 Whisper v2-large 模型目前可通过我们的 API 获得，模型名称为 Whisper-1。

Currently, there is no difference between the open source version of Whisper and the version available through our API. However, through our API, we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can read the paper.

目前，Whisper 的开源版本和通过我们的 API 提供的版本没有区别。 然而，通过我们的 API，我们提供了优化的推理过程，这使得通过我们的 API 运行 Whisper 比通过其他方式运行要快得多。 有关 Whisper 的更多技术细节，您可以阅读该论文。

## Embeddings
Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. Our second generation embedding model, text-embedding-ada-002 is a designed to replace the previous 16 first-generation embedding models at a fraction of the cost. Embeddings are useful for search, clustering, recommendations, anomaly detection, and classification tasks. You can read more about our latest embedding model in the announcement blog post.

嵌入是文本的数字表示，可用于衡量两段文本之间的相关性。 我们的第二代嵌入模型 text-embedding-ada-002 旨在以一小部分成本取代之前的 16 个第一代嵌入模型。 嵌入对于搜索、聚类、推荐、异常检测和分类任务很有用。 您可以在公告博客文章中阅读有关我们最新嵌入模型的更多信息。

## Moderation
The Moderation models are designed to check whether content complies with OpenAI's usage policies. The models provide classification capabilities that look for content in the following categories: hate, hate/threatening, self-harm, sexual, sexual/minors, violence, and violence/graphic. You can find out more in our moderation guide.

审核模型旨在检查内容是否符合 OpenAI 的使用政策。 这些模型提供分类功能，可查找以下类别的内容：仇恨、仇恨/威胁、自残、性、性/未成年人、暴力和暴力/图形。 您可以在我们的审核指南中了解更多信息。

Moderation models take in an arbitrary sized input that is automatically broken up into chunks of 4,096 tokens. In cases where the input is more than 32,768 tokens, truncation is used which in a rare condition may omit a small number of tokens from the moderation check.

审核模型接受任意大小的输入，该输入会自动分解为 4,096 个令牌的块。 如果输入超过 32,768 个令牌，则会使用截断，在极少数情况下，可能会在审核检查中省略少量令牌。

The final results from each request to the moderation endpoint shows the maximum value on a per category basis. For example, if one chunk of 4K tokens had a category score of 0.9901 and the other had a score of 0.1901, the results would show 0.9901 in the API response since it is higher.

每个对审核端点的请求的最终结果显示每个类别的最大值。 例如，如果一块 4K 令牌的类别分数为 0.9901，另一块的分数为 0.1901，则结果将在 API 响应中显示 0.9901，因为它更高。

MODEL	DESCRIPTION	MAX TOKENS
text-moderation-latest	Most capable moderation model. Accuracy will be slightly higher than the stable model.	32,768
text-moderation-stable	Almost as capable as the latest model, but slightly older.	32,768
## GPT base
GPT base models can understand and generate natural language or code but are not trained with instruction following. These models are made to be replacements for our original GPT-3 base models and use the legacy Completions API. Most customers should use GPT-3.5 or GPT-4.

GPT 基础模型可以理解并生成自然语言或代码，但未接受以下指令的训练。 这些模型旨在替代我们原来的 GPT-3 基本模型，并使用旧版 Completions API。 大多数客户应使用 GPT-3.5 或 GPT-4。

MODEL	DESCRIPTION	MAX TOKENS	TRAINING DATA
babbage-002	Replacement for the GPT-3 ada and babbage base models.	16,384 tokens	Up to Sep 2021
davinci-002	Replacement for the GPT-3 curie and davinci base models.	16,384 tokens	Up to Sep 2021
GPT-3 Legacy
GPT-3 models can understand and generate natural language. These models were superseded by the more powerful GPT-3.5 generation models. However, the original GPT-3 base models (davinci, curie, ada, and babbage) are current the only models that are available to fine-tune.

MODEL	DESCRIPTION	MAX TOKENS	TRAINING DATA
- text-curie-001	Very capable, faster and lower cost than Davinci.	2,049 tokens	Up to Oct 2019
- text-babbage-001	Capable of straightforward tasks, very fast, and lower cost.	2,049 tokens	Up to Oct 2019
- text-ada-001	Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.	2,049 tokens	Up to Oct 2019
- davinci	Most capable GPT-3 model. Can do any task the other models can do, often with higher quality.	2,049 tokens	Up to Oct 2019
- curie	Very capable, but faster and lower cost than Davinci.	2,049 tokens	Up to Oct 2019
- babbage	Capable of straightforward tasks, very fast, and lower cost.	2,049 tokens	Up to Oct 2019
- ada	Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.	2,049 tokens	Up to Oct 2019

How we use your data
Your data is your data.

As of March 1, 2023, data sent to the OpenAI API will not be used to train or improve OpenAI models (unless you explicitly opt in). One advantage to opting in is that the models may get better at your use case over time.

自 2023 年 3 月 1 日起，发送到 OpenAI API 的数据将不会用于训练或改进 OpenAI 模型（除非您明确选择加入）。 选择加入的好处之一是，随着时间的推移，模型可能会越来越适合您的用例。

To help identify abuse, API data may be retained for up to 30 days, after which it will be deleted (unless otherwise required by law). For trusted customers with sensitive applications, zero data retention may be available. With zero data retention, request and response bodies are not persisted to any logging mechanism and exist only in memory in order to serve the request.

为了帮助识别滥用行为，API 数据最多可保留 30 天，之后将被删除（除非法律另有要求）。 对于拥有敏感应用程序的值得信赖的客户，零数据保留可能是可用的。 在零数据保留的情况下，请求和响应主体不会持久保存到任何日志记录机制中，并且仅存在于内存中以便为请求提供服务。

Note that this data policy does not apply to OpenAI's non-API consumer services like ChatGPT or DALL·E Labs.

请注意，此数据政策不适用于 OpenAI 的非 API 消费者服务，例如 ChatGPT 或 DALL·E Labs。

Default usage policies by endpoint

按端点的默认使用策略
ENDPOINT	DATA USED FOR TRAINING	DEFAULT RETENTION	ELIGIBLE FOR ZERO RETENTION
- /v1/chat/completions*	No	30 days	Yes, except image inputs*
- /v1/files	No	Until deleted by customer	No
- /v1/assistants	No	Until deleted by customer	No
- /v1/threads	No	30 days	No
- /v1/threads/messages	No	30 days	No
- /v1/threads/runs	No	30 days	No
- /v1/threads/runs/steps	No	30 days	No
- /v1/images/generations	No	30 days	No
- /v1/images/edits	No	30 days	No
- /v1/images/variations	No	30 days	No
- /v1/embeddings	No	30 days	Yes
- /v1/audio/transcriptions	No	Zero data retention	-
- /v1/audio/translations	No	Zero data retention	-
- /v1/audio/speech	No	30 days	No
- /v1/fine_tuning/jobs	No	Until deleted by customer	No
- /v1/fine-tunes	No	Until deleted by customer	No
- /v1/moderations	No	Zero data retention	-
- /v1/completions	No	30 days	Yes
- /v1/edits	No	30 days	Yes
* Image inputs via the gpt-4-vision-preview model are not eligible for zero retention.

* 通过 gpt-4-vision-preview 模型输入的图像不符合零保留条件。

For details, see our API data usage policies. To learn more about zero retention, get in touch with our sales team.

有关详细信息，请参阅我们的 API 数据使用政策。 要了解有关零保留的更多信息，请联系我们的销售团队。

Model endpoint compatibility
ENDPOINT	LATEST MODELS
- /v1/assistants	All models except gpt-3.5-turbo-0301 supported. retrieval tool requires gpt-4-1106-preview or gpt-3.5-turbo-1106.
- /v1/audio/transcriptions	whisper-1
- /v1/audio/translations	whisper-1
- /v1/audio/speech	tts-1, tts-1-hd
- /v1/chat/completions	gpt-4 and dated model releases, gpt-4-1106-preview, gpt-4-vision-preview, gpt-4-32k and dated model releases, gpt-3.5-turbo and dated model releases, gpt-3.5-turbo-16k and dated model releases, fine-tuned versions of gpt-3.5-turbo
- /v1/completions (Legacy)	gpt-3.5-turbo-instruct, babbage-002, davinci-002
- /v1/embeddings	text-embedding-ada-002
- /v1/fine_tuning/jobs	gpt-3.5-turbo, babbage-002, davinci-002
- /v1/moderations	text-moderation-stable, text-moderation-latest
- /v1/images/generations	dall-e-2, dall-e-3
This list excludes all of our deprecated models.

此列表不包括我们所有已弃用的型号。