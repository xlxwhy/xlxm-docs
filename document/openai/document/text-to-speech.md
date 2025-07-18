# Text to speech
Learn how to turn text into lifelike spoken audio
文字转语音
了解如何将文本转换为逼真的语音

## Introduction
The Audio API provides a speech endpoint based on our TTS (text-to-speech) model. It comes with 6 built-in voices and can be used to:

介绍
音频 API 提供基于我们的 TTS（文本转语音）模型的语音端点。 它带有 6 种内置声音，可用于：

- Narrate a written blog post
叙述一篇书面博客文章
- Produce spoken audio in multiple languages
制作多种语言的语音音频
- Give real time audio output using streaming
使用流式传输提供实时音频输出

Here is an example of the alloy voice:

这是合金声音的示例：

Please note that our usage policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.

请注意，我们的使用政策要求您向最终用户明确披露，他们听到的 TTS 语音是人工智能生成的，而不是人类的声音。

## Quick start
The speech endpoint takes in three key inputs: the model, the text that should be turned into audio, and the voice to be used for the audio generation. A simple request would look like the following:

快速开始
语音端点接受三个关键输入：模型、应转换为音频的文本以及用于音频生成的语音。 一个简单的请求如下所示：

Generate spoken audio from input text

从输入文本生成语音

```py
python
from pathlib import Path
from openai import OpenAI
client = OpenAI()

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="Today is a wonderful day to build something people love!"
)

response.stream_to_file(speech_file_path)
```
By default, the endpoint will output a MP3 file of the spoken audio but it can also be configured to output any of our supported formats.

默认情况下，终端将输出语音音频的 MP3 文件，但也可以配置为输出我们支持的任何格式。

Audio quality
For real-time applications, the standard tts-1 model provides the lowest latency but at a lower quality than the tts-1-hd model. Due to the way the audio is generated, tts-1 is likely to generate content that has more static in certain situations than tts-1-hd. In some cases, the audio may not have noticeable differences depending on your listening device and the individual person.


音频质量
对于实时应用程序，标准 tts-1 模型提供最低的延迟，但质量低于 tts-1-hd 模型。 由于音频的生成方式，tts-1 在某些情况下可能会生成比 tts-1-hd 更静态的内容。 在某些情况下，根据您的收听设备和个人的不同，音频可能没有明显的差异。

Voice options
Experiment with different voices (alloy, echo, fable, onyx, nova, and shimmer) to find one that matches your desired tone and audience. The current voices are optimized for English.

语音选项
尝试不同的声音（合金、回声、寓言、缟玛瑙、新星和闪光），找到一种适合您所需的音调和听众的声音。 当前的语音针对英语进行了优化。

Alloy
Echo
Fable
Onyx
Nova
Shimmer
Supported output formats
The default response format is "mp3", but other formats like "opus", "aac", or "flac" are available.

合金
回声
寓言
玛瑙
诺瓦
微光
支持的输出格式
默认响应格式为“mp3”，但也可以使用“opus”、“aac”或“flac”等其他格式。

Opus: For internet streaming and communication, low latency.
AAC: For digital audio compression, preferred by YouTube, Android, iOS.
FLAC: For lossless audio compression, favored by audio enthusiasts for archiving.
Supported languages
The TTS model generally follows the Whisper model in terms of language support. Whisper supports the following languages and performs well despite the current voices being optimized for English:

Opus：用于互联网流媒体和通信，低延迟。
AAC：用于数字音频压缩，YouTube、Android、iOS 首选。
FLAC：用于无损音频压缩，受到音频爱好者存档的青睐。
支持的语言
TTS模型在语言支持方面总体上遵循Whisper模型。 尽管当前语音针对英语进行了优化，但 Whisper 支持以下语言并且表现良好：

Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.

南非荷兰语、阿拉伯语、亚美尼亚语、阿塞拜疆语、白俄罗斯语、波斯尼亚语、保加利亚语、加泰罗尼亚语、中文、克罗地亚语、捷克语、丹麦语、荷兰语、英语、爱沙尼亚语、芬兰语、法语、加利西亚语、德语、希腊语、希伯来语、印地语、匈牙利语、冰岛语、印度尼西亚语、 意大利语、日语、卡纳达语、哈萨克语、韩语、拉脱维亚语、立陶宛语、马其顿语、马来语、马拉地语、毛利语、尼泊尔语、挪威语、波斯语、波兰语、葡萄牙语、罗马尼亚语、俄语、塞尔维亚语、斯洛伐克语、斯洛文尼亚语、西班牙语、斯瓦希里语、瑞典语、他加禄语、 泰米尔语、泰语、土耳其语、乌克兰语、乌尔都语、越南语和威尔士语。

You can generate spoken audio in these languages by providing the input text in the language of your choice.

您可以通过以您选择的语言提供输入文本来生成这些语言的口语音频。

Streaming real time audio
The Speech API provides support for real time audio streaming using chunk transfer encoding. This means that the audio is able to be played before the full file has been generated and made accessible.

流式传输实时音频
语音 API 使用块传输编码提供对实时音频流的支持。 这意味着可以在生成完整文件并可供访问之前播放音频。
```py
from openai import OpenAI

client = OpenAI()

response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Hello world! This is a streaming test.",
)

response.stream_to_file("output.mp3")
```

## FAQ
### How can I control the emotional range of the generated audio?
There is no direct mechanism to control the emotional output of the audio generated. Certain factors may influence the output audio like capitalization or grammar but our internal  

如何控制生成的音频的情感范围？
没有直接的机制来控制所生成的音频的情感输出。 某些因素可能会影响输出音频，例如大小写或语法，但我们对这些因素的内部测试产生了不同的结果。

### Can I create a custom copy of my own voice?
No, this is not something we support.

我可以创建自己声音的自定义副本吗？
不，这不是我们支持的。

### Do I own the outputted audio files?
Yes, like with all outputs from our API, the person who created them owns the output. You are still required to inform end users that they are hearing audio generated by AI and not a real person talking to them.


我拥有输出的音频文件吗？
是的，就像我们 API 的所有输出一样，创建它们的人拥有输出。 您仍然需要告知最终用户，他们听到的是人工智能生成的音频，而不是真人与他们交谈。