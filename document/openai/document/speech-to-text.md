---
hideAdContent: true
title: Speech to text, 语音转文字
lang: zh-CN
head:
  - - meta
    - name: description
      content: 基于我们最先进的开源大型 v2 Whisper 模型，提供两种语音到文本端点、转录和翻译
  - - meta
    - name: keywords
      content: 音频转换为文本, 语音转文字, Speech to text, turn audio into text
---

# Speech to text
Learn how to turn audio into text

语音转文字
了解如何将音频转换为文本

## Introduction
The Audio API provides two speech to text endpoints, transcriptions and translations, based on our state-of-the-art open source large-v2 Whisper model. They can be used to:

介绍
音频 API 基于我们最先进的开源大型 v2 Whisper 模型，提供两种语音到文本端点、转录和翻译。 它们可用于：

Transcribe audio into whatever language the audio is in.
Translate and transcribe the audio into english.
File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.

将音频转录成音频所使用的任何语言。
将音频翻译并转录成英语。
文件上传当前限制为 25 MB，并且支持以下输入文件类型：mp3、mp4、mpeg、mpga、m4a、wav 和 webm。

## Quickstart
Transcriptions
The transcriptions API takes as input the audio file you want to transcribe and the desired output file format for the transcription of the audio. We currently support multiple input and output file formats.

快速开始
转录
转录 API 将您想要转录的音频文件以及音频转录所需的输出文件格式作为输入。 我们目前支持多种输入和输出文件格式。

Transcribe audio
```py
python
from openai import OpenAI
client = OpenAI()

audio_file= open("/path/to/file/audio.mp3", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)
```
By default, the response type will be json with the raw text included.
 
默认情况下，响应类型将为 json，其中包含原始文本。

{
  "text": "Imagine the wildest idea that you've ever had, and you're curious about how it might scale to something that's a 100, a 1,000 times bigger.
....
}
The Audio API also allows you to set additional parameters in a request. For example, if you want to set the response_format as text, your request would look like the following:

 
音频 API 还允许您在请求中设置其他参数。 例如，如果您想将response_format设置为文本，您的请求将如下所示：

Additional options
```py

python
from openai import OpenAI
client = OpenAI()

audio_file = open("speech.mp3", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file, 
  response_format="text"
)
```
The API Reference includes the full list of available parameters.
 
翻译 API 将任何受支持语言的音频文件作为输入，并在必要时将音频转录为英语。 这与我们的 /Transcriptions 端点不同，因为输出不是原始输入语言，而是翻译为英语文本。

## Translations
The translations API takes as input the audio file in any of the supported languages and transcribes, if necessary, the audio into English. This differs from our /Transcriptions endpoint since the output is not in the original input language and is instead translated to English text.
 

## Translate audio
```py
python

python
from openai import OpenAI
client = OpenAI()

audio_file= open("/path/to/file/german.mp3", "rb")
transcript = client.audio.translations.create(
  model="whisper-1", 
  file=audio_file
)
```
In this case, the inputted audio was german and the outputted text looks like:

在本例中，输入的音频是德语，输出的文本如下所示：


Hello, my name is Wolfgang and I come from Germany. Where are you heading today?
We only support translation into english at this time.

你好，我叫沃尔夫冈，来自德国。 今天你要去哪里？
目前我们仅支持翻译成英文。

## Supported languages
We currently support the following languages through both the transcriptions and translations endpoint:

支持的语言
目前，我们通过转录和翻译端点支持以下语言：

Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.

南非荷兰语、阿拉伯语、亚美尼亚语、阿塞拜疆语、白俄罗斯语、波斯尼亚语、保加利亚语、加泰罗尼亚语、中文、克罗地亚语、捷克语、丹麦语、荷兰语、英语、爱沙尼亚语、芬兰语、法语、加利西亚语、德语、希腊语、希伯来语、印地语、匈牙利语、冰岛语、印度尼西亚语、 意大利语、日语、卡纳达语、哈萨克语、韩语、拉脱维亚语、立陶宛语、马其顿语、马来语、马拉地语、毛利语、尼泊尔语、挪威语、波斯语、波兰语、葡萄牙语、罗马尼亚语、俄语、塞尔维亚语、斯洛伐克语、斯洛文尼亚语、西班牙语、斯瓦希里语、瑞典语、他加禄语、 泰米尔语、泰语、土耳其语、乌克兰语、乌尔都语、越南语和威尔士语。

While the underlying model was trained on 98 languages, we only list the languages that exceeded <50% word error rate (WER) which is an industry standard benchmark for speech to text model accuracy. The model will return results for languages not listed above but the quality will be low.

虽然底层模型是在 98 种语言上进行训练的，但我们只列出了单词错误率 (WER) 超过 50% 的语言，这是语音到文本模型准确性的行业标准基准。 该模型将返回上面未列出的语言的结果，但质量较低。

## Longer inputs
By default, the Whisper API only supports files that are less than 25 MB. If you have an audio file that is longer than that, you will need to break it up into chunks of 25 MB's or less or used a compressed audio format. To get the best performance, we suggest that you avoid breaking the audio up mid-sentence as this may cause some context to be lost.

更长的输入
默认情况下，Whisper API 仅支持小于 25 MB 的文件。 如果您的音频文件比该长度长，则需要将其分成 25 MB 或更少的块，或者使用压缩音频格式。 为了获得最佳性能，我们建议您避免在句子中间中断音频，因为这可能会导致丢失一些上下文。

One way to handle this is to use the PyDub open source Python package to split the audio:

处理此问题的一种方法是使用 PyDub 开源 Python 包来分割音频：

```py
from pydub import AudioSegment

song = AudioSegment.from_mp3("good_morning.mp3")

# PyDub handles time in milliseconds
ten_minutes = 10 * 60 * 1000

first_10_minutes = song[:ten_minutes]

first_10_minutes.export("good_morning_10.mp3", format="mp3")
```

OpenAI makes no guarantees about the usability or security of 3rd party software like PyDub.
 
OpenAI 不保证 PyDub 等第三方软件的可用性或安全性。

## Prompting
You can use a prompt to improve the quality of the transcripts generated by the Whisper API. The model will try to match the style of the prompt, so it will be more likely to use capitalization and punctuation if the prompt does too. However, the current prompting system is much more limited than our other language models and only provides limited control over the generated audio. Here are some examples of how prompting can help in different scenarios:

提示
您可以使用提示来提高 Whisper API 生成的转录本的质量。 该模型将尝试匹配提示的样式，因此如果提示也这样做，则更有可能使用大写和标点符号。 然而，当前的提示系统比我们的其他语言模型受到更多限制，并且仅提供对生成的音频的有限控制。 以下是提示如何在不同情况下提供帮助的一些示例：

Prompts can be very helpful for correcting specific words or acronyms that the model often misrecognizes in the audio. For example, the following prompt improves the transcription of the words DALL·E and GPT-3, which were previously written as "GDP 3" and "DALI": "The transcript is about OpenAI which makes technology like DALL·E, GPT-3, and ChatGPT with the hope of one day building an AGI system that benefits all of humanity"

提示对于纠正模型在音频中经常错误识别的特定单词或首字母缩略词非常有帮助。 例如，以下提示改进了单词 DALL·E 和 GPT-3 的转录，这些词之前写为“GDP 3”和“DALI”：“转录是关于 OpenAI，它使 DALL·E、GPT- 等技术 3、和ChatGPT，希望有一天能够建立一个造福全人类的AGI系统”

To preserve the context of a file that was split into segments, you can prompt the model with the transcript of the preceding segment. This will make the transcript more accurate, as the model will use the relevant information from the previous audio. The model will only consider the final 224 tokens of the prompt and ignore anything earlier. For multilingual inputs, Whisper uses a custom tokenizer. For English only inputs, it uses the standard GPT-2 tokenizer which are both accessible through the open source Whisper Python package.


要保留分割为多个片段的文件的上下文，您可以使用前一个片段的转录本来提示模型。 这将使转录更加准确，因为模型将使用之前音频中的相关信息。 该模型将仅考虑提示的最后 224 个标记，并忽略之前的任何内容。 对于多语言输入，Whisper 使用自定义标记器。 对于仅英语输入，它使用标准 GPT-2 分词器，这两种分词器都可以通过开源 Whisper Python 包进行访问。

Sometimes the model might skip punctuation in the transcript. You can avoid this by using a simple prompt that includes punctuation: "Hello, welcome to my lecture."


有时，模型可能会跳过记录中的标点符号。 您可以通过使用包含标点符号的简单提示来避免这种情况：“您好，欢迎来到我的讲座。”

The model may also leave out common filler words in the audio. If you want to keep the filler words in your transcript, you can use a prompt that contains them: "Umm, let me think like, hmm... Okay, here's what I'm, like, thinking."

该模型还可能会遗漏音频中常见的填充词。 如果您想在成绩单中保留填充词，您可以使用包含它们的提示：“嗯，让我这样想，嗯......好吧，这就是我的想法。”
、
Some languages can be written in different ways, such as simplified or traditional Chinese. The model might not always use the writing style that you want for your transcript by default. You can improve this by using a prompt in your preferred writing style.


有些语言可以用不同的方式书写，例如简体中文或繁体中文。 默认情况下，模型可能并不总是使用您想要的成绩单写作风格。 您可以通过使用您喜欢的写作风格的提示来改进这一点。

Improving reliability
As we explored in the prompting section, one of the most common challenges faced when using Whisper is the model often does not recognize uncommon words or acronyms. To address this, we have highlighted different techniques which improve the reliability of Whisper in these cases:

提高可靠性
正如我们在提示部分中探讨的那样，使用 Whisper 时面临的最常见挑战之一是模型通常无法识别不常见的单词或首字母缩略词。 为了解决这个问题，我们重点介绍了在这些情况下提高 Whisper 可靠性的不同技术：

Using the prompt parameter
Post-processing with GPT-4


使用提示参数
使用 GPT-4 进行后处理