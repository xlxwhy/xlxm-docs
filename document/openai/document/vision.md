# Vision
Learn how to use GPT-4 to understand images

了解如何使用 GPT-4 来理解图像


## Introduction
GPT-4 with Vision, sometimes referred to as GPT-4V or gpt-4-vision-preview in the API, allows the model to take in images and answer questions about them. Historically, language model systems have been limited by taking in a single input modality, text. For many use cases, this constrained the areas where models like GPT-4 could be used.

GPT-4 with Vision（有时在 API 中称为 GPT-4V 或 gpt-4-vision-preview）允许模型接收图像并回答有关图像的问题。 从历史上看，语言模型系统受到单一输入模式（文本）的限制。 对于许多用例来说，这限制了 GPT-4 等模型的使用领域。

GPT-4 with vision is currently available to all developers who have access to GPT-4 via the gpt-4-vision-preview model and the Chat Completions API which has been updated to support image inputs. Note that the Assistants API does not currently support image inputs.


目前，所有能够通过 gpt-4-vision-preview 模型和聊天完成 API 访问 GPT-4 的开发人员都可以使用带有视觉的 GPT-4，该 API 已更新为支持图像输入。 请注意，Assistants API 目前不支持图像输入。

It is important to note the following:


重要的是要注意以下几点：

- GPT-4 Turbo with vision may behave slightly differently than GPT-4 Turbo, due to a system message we automatically insert into the conversation
由于我们自动插入对话中的系统消息，具有视觉功能的 GPT-4 Turbo 的行为可能与 GPT-4 Turbo 略有不同
- GPT-4 Turbo with vision is the same as the GPT-4 Turbo preview model and performs equally as well on text tasks but has vision capabilities added
具有视觉功能的 GPT-4 Turbo 与 GPT-4 Turbo 预览模型相同，在文本任务上的表现同样出色，但添加了视觉功能
- Vision is just one of many capabilities the model has
视觉只是模型拥有的众多功能之一
- Currently, GPT-4 Turbo with vision does not support the message.name parameter, functions/tools, response_format parameter, and we currently set a low max_tokens default which you can override.
目前，GPT-4 Turbo with Vision 不支持 message.name 参数、functions/tools、response_format 参数，并且我们当前设置了一个较低的 max_tokens 默认值，您可以覆盖该默认值。
## Quick start
Images are made available to the model in two main ways: by passing a link to the image or by passing the base64 encoded image directly in the request. Images can be passed in the user, system and assistant messages. Currently we don't support images in the first system message but this may change in the future.

快速开始
图像可通过两种主要方式提供给模型：传递图像的链接或直接在请求中传递 base64 编码的图像。 图像可以在用户、系统和助理消息中传递。 目前我们不支持第一条系统消息中的图像，但将来可能会改变。



```py
python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0])
```

The model is best at answering general questions about what is present in the images. While it does understand the relationship between objects in images, it is not yet optimized to answer detailed questions about the location of certain objects in an image. For example, you can ask it what color a car is or what some ideas for dinner might be based on what is in you fridge, but if you show it an image of a room and ask it where the chair is, it may not answer the question correctly.
 
该模型最擅长回答有关图像中存在的内容的一般问题。 虽然它确实理解图像中对象之间的关系，但尚未优化以回答有关图像中某些对象位置的详细问题。 例如，您可以询问它汽车是什么颜色，或者根据冰箱里的东西提出一些关于晚餐的想法，但如果您向它展示房间的图像并询问它椅子在哪里，它可能不会回答 问题正确。

It is important to keep in mind the limitations of the model as you explore what use-cases visual understanding can be applied to.

当您探索视觉理解可以应用于哪些用例时，请务必牢记模型的局限性。

- Video understanding with vision
用视觉理解视频
- Learn how to use use GPT-4 with Vision to understand videos in the OpenAI Cookbook
了解如何结合使用 GPT-4 和 Vision 来理解 OpenAI Cookbook 中的视频
- Uploading base 64 encoded images
上传 Base 64 编码图像

If you have an image or set of images locally, you can pass those to the model in base 64 encoded format, here is an example of this in action:

如果您本地有一个图像或一组图像，则可以将它们以 Base 64 编码格式传递给模型，以下是实际操作的示例：

```py 
import base64
import requests

# OpenAI API Key
api_key = "YOUR_OPENAI_API_KEY"

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "path_to_your_image.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What’s in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())
```

## Multiple image inputs
The Chat Completions API is capable of taking in and processing multiple image inputs in both base64 encoded format or as an image URL. The model will process each image and use the information from all of them to answer the question.

Chat Completions API 能够接收并处理采用 Base64 编码格式或图像 URL 形式的多个图像输入。 该模型将处理每张图像并使用所有图像的信息来回答问题。
```py
python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What are in these images? Is there any difference between them?",
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)
print(response.choices[0])
```

Here the model is shown two copies of the same image and can answer questions about both or each of the images independently.

在这里，模型显示了同一图像的两个副本，并且可以独立回答有关两个或每个图像的问题。


Low or high fidelity image understanding
By controlling the detail parameter, which has three options, low, high, or auto, you have control over how the model processes the image and generates its textual understanding. By default, the model will use the auto setting which will look at the image input size and decide if it should use the low or high setting.

低保真度或高保真度图像理解
通过控制细节参数（具有低、高或自动三个选项），您可以控制模型如何处理图像并生成其文本理解。 默认情况下，模型将使用自动设置，该设置将查看图像输入尺寸并决定是否应使用低设置或高设置。

low will disable the “high res” model. The model will receive a low-res 512px x 512px version of the image, and represent the image with a budget of 65 tokens. This allows the API to return faster responses and consume fewer input tokens for use cases that do not require high detail.
high will enable “high res” mode, which first allows the model to see the low res image and then creates detailed crops of input images as 512px squares based on the input image size. Each of the detailed crops uses twice the token budget (65 tokens) for a total of 129 tokens.
Choosing the detail level


低将禁用“高分辨率”模型。 该模型将收到图像的低分辨率 512px x 512px 版本，并以 65 个代币的预算表示该图像。 这使得 API 能够返回更快的响应，并在不需要高细节的用例中消耗更少的输入令牌。
high 将启用“高分辨率”模式，该模式首先允许模型查看低分辨率图像，然后根据输入图像大小将输入图像创建为 512 像素正方形的详细裁剪。 每个详细作物使用两倍的代币预算（65 个代币），总共 129 个代币。
选择细节级别
```py
python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            "detail": "high"
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)

```

## Managing images
The Chat Completions API, unlike the Assistants API, is not stateful. That means you have to manage the messages (including images) you pass to the model yourself. If you want to pass the same image to the model multiple times, you will have to pass the image each time you make a request to the API.

与助手 API 不同，聊天完成 API 没有状态。 这意味着您必须自己管理传递给模型的消息（包括图像）。 如果您想多次将相同的图像传递给模型，则每次向 API 发出请求时都必须传递该图像。

For long running conversations, we suggest passing images via URL's instead of base64. The latency of the model can also be improved by downsizing your images ahead of time to be less than the maximum size they are expected them to be. For low res mode, we expect a 512px x 512px image. For high res mode, the short side of the image should be less than 768px and the long side should be less than 2,000px.

对于长时间运行的对话，我们建议通过 URL 而不是 base64 传递图像。 还可以通过提前将图像尺寸缩小到小于预期的最大尺寸来改善模型的延迟。 对于低分辨率模式，我们预计图像尺寸为 512 像素 x 512 像素。 对于高分辨率模式，图像的短边应小于 768 像素，长边应小于 2,000 像素。

After an image has been processed by the model, it is deleted from OpenAI servers and not retained. We do not use data uploaded via the OpenAI API to train our models.

图像经过模型处理后，将从 OpenAI 服务器中删除且不会保留。 我们不使用通过 OpenAI API 上传的数据来训练我们的模型。


## Limitations
While GPT-4 with vision is powerful and can be used in many situations, it is important to understand the limitations of the model. Here are some of the limitations we are aware of:

虽然具有视觉功能的 GPT-4 功能强大并且可以在许多情况下使用，但了解该模型的局限性也很重要。 以下是我们意识到的一些限制：

- Medical images: The model is not suitable for interpreting specialized medical images like CT scans and shouldn't be used for medical advice.
- Non-English: The model may not perform optimally when handling images with text of non-Latin alphabets, such as Japanese or Korean.
- Small text: Enlarge text within the image to improve readability, but avoid cropping important details.
- Rotation: The model may misinterpret rotated / upside-down text or images.
- Visual elements: The model may struggle to understand graphs or text where colors or styles like solid, dashed, or dotted lines vary.
- Spatial reasoning: The model struggles with tasks requiring precise spatial localization, such as identifying chess positions.
- Accuracy: The model may generate incorrect descriptions or captions in certain scenarios.
- Image shape: The model struggles with panoramic and fisheye images.
- Metadata and resizing: The model doesn't process original file names or metadata, and images are resized before analysis, affecting their original dimensions.
- Counting: May give approximate counts for objects in images.
- CAPTCHAS: For safety reasons, we have implemented a system to block the submission of CAPTCHAs.
- Calculating costs
- Image inputs are metered and charged in tokens, just as text inputs are. The token cost of a given image is determined by two factors: its size, and the detail option on each image_url block. All images with detail: low cost 85 tokens each. detail: high images are first scaled to fit within a 2048 x 2048 square, maintaining their aspect ratio. Then, they are scaled such that the shortest side of the image is 768px long. Finally, we count how many 512px squares the image consists of. Each of those squares costs 170 tokens. Another 85 tokens are always added to the final total.

- 医学图像：该模型不适合解释 CT 扫描等专业医学图像，也不应用于提供医疗建议。
- 非英语：在处理包含非拉丁字母文本（例如日语或韩语）的图像时，模型可能无法发挥最佳性能。
- 小文本：放大图像中的文本以提高可读性，但避免裁剪重要细节。
- 旋转：模型可能会误解旋转/颠倒的文本或图像。
- 视觉元素：模型可能难以理解颜色或样式（如实线、虚线或点线）变化的图形或文本。
- 空间推理：该模型难以完成需要精确空间定位的任务，例如识别国际象棋位置。
- 准确性：在某些情况下，模型可能会生成不正确的描述或标题。
- 图像形状：模型难以处理全景和鱼眼图像。
- 元数据和调整大小：模型不处理原始文件名或元数据，图像在分析之前会调整大小，从而影响其原始尺寸。
- 计数：可以给出图像中对象的近似计数。
- 验证码：出于安全原因，我们实施了一个系统来阻止验证码的提交。
- 计算成本
- 与文本输入一样，图像输入以代币计量和收费。 给定图像的代币成本由两个因素决定：图像的大小以及每个 image_url 块上的详细信息选项。 所有图像都有细节：低成本，每张 85 个代币。 细节：首先缩放高图像以适合 2048 x 2048 的正方形，并保持其纵横比。 然后，对它们进行缩放，使图像的最短边长为 768 像素。 最后，我们计算图像由多少个 512px 的正方形组成。 每个方格花费 170 个代币。 另外 85 个代币始终会添加到最终总数中。

Here are some examples demonstrating the above.
以下是一些演示上述内容的示例。

- A 1024 x 1024 square image in detail: high mode costs 765 tokens
- 1024 is less than 2048, so there is no initial resize.
- The shortest side is 1024, so we scale the image down to 768 x 768.
- 4 512px square tiles are needed to represent the image, so the final token cost is 170 * 4 + 85 = 765.
- A 2048 x 4096 image in detail: high mode costs 1105 tokens
- We scale down the image to 1024 x 2048 to fit within the 2048 square.
- The shortest side is 1024, so we further scale down to 768 x 1536.
- 6 512px tiles are needed, so the final token cost is 170 * 6 + 85 = 1105.
- A 4096 x 8192 image in detail: low most costs 85 tokens
Regardless of input size, low detail images are a fixed cost.

- 1024 x 1024 方形图像的详细信息：高模式需要 765 个代币
- 1024 小于 2048，因此没有初始调整大小。
- 最短边是 1024，因此我们将图像缩小到 768 x 768。
- 需要 4 512px 方形图块来表示图像，因此最终的代币成本为 170 * 4 + 85 = 765。
- 2048 x 4096 详细图像：高模式花费 1105 个代币
- 我们将图像缩小到 1024 x 2048 以适合 2048 的正方形。
- 最短边是 1024，所以我们进一步缩小到 768 x 1536。
- 需要 6 512px 的图块，因此最终的代币成本为 170 * 6 + 85 = 1105。
- 4096 x 8192 详细图像：最低成本 85 个代币
无论输入大小如何，低细节图像都是固定成本。


## FAQ
Can I fine-tune the image capabilities in gpt-4?
No, we do not support fine-tuning the image capabilities of gpt-4 at this time.

我可以微调 gpt-4 中的图像功能吗？
不，我们目前不支持微调 gpt-4 的图像功能。

Can I use gpt-4 to generate images?
No, you can use dall-e-3 to generate images and gpt-4-vision-preview to understand images.
我可以使用 gpt-4 生成图像吗？
不，您可以使用 dall-e-3 生成图像并使用 gpt-4-vision-preview 来理解图像。

What type of files can I upload?
We currently support PNG (.png), JPEG (.jpeg and .jpg), WEBP (.webp), and non-animated GIF (.gif).

我可以上传什么类型的文件？
我们目前支持 PNG (.png)、JPEG（.jpeg 和 .jpg）、WEBP (.webp) 和非动画 GIF (.gif)。

Is there a limit to the size of the image I can upload?
Yes, we restrict image uploads to 20MB per image.

我可以上传的图片大小有限制吗？
是的，我们将图像上传限制为每张图像 20MB。

Can I delete an image I uploaded?
No, we will delete the image for you automatically after it has been processed by the model.


我可以删除我上传的图片吗？
不会，模型处理完图像后，我们会自动为您删除该图像。

Where can I learn more about the considerations of GPT-4 with Vision?
You can find details about our evaluations, preparation, and mitigation work in the GPT-4 with Vision system card.

在哪里可以了解有关 GPT-4 with Vision 的注意事项的更多信息？
您可以在 GPT-4 with Vision 系统卡中找到有关我们的评估、准备和缓解工作的详细信息。

We have further implemented a system to block the submission of CAPTCHAs.

我们进一步实施了一个系统来阻止验证码的提交。

How do rate limits for GPT-4 with Vision work?
We process images at the token level, so each image we process counts towards your tokens per minute (TPM) limit. See the calculating costs section for details on the formula used to determine token count per image.

GPT-4 with Vision 的速率限制如何运作？
我们在令牌级别处理图像，因此我们处理的每个图像都会计入您的每分钟令牌 (TPM) 限制。 有关用于确定每个图像的标记计数的公式的详细信息，请参阅计算成本部分。

Can GPT-4 with Vision understand image metadata?
No, the model does not receive image metadata.

带有 Vision 的 GPT-4 可以理解图像元数据吗？
不，模型不接收图像元数据。

What happens if my image is unclear?
If an image is ambiguous or unclear, the model will do its best to interpret it. However, the results may be less accurate. A good rule of thumb is that if an average human cannot see the info in an image at the resolutions used in low/high res mode, then the model cannot either.

如果我的图像不清楚怎么办？
如果图像不明确或不清楚，模型将尽力解释它。 然而，结果可能不太准确。 一个好的经验法则是，如果普通人无法以低/高分辨率模式下使用的分辨率看到图像中的信息，那么模型也看不到。