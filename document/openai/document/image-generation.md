# Image generation
Learn how to generate or manipulate images with DALL·E in the API.
 
了解如何使用 API 中的 DALL·E 生成或操作图像。


Looking to generate images in ChatGPT? Head to chat.openai.com.

想要在 ChatGPT 中生成图像？ 前往 chat.openai.com。

## Introduction
The Images API provides three methods for interacting with images:
 
Images API 提供了三种与图像交互的方法：


- Creating images from scratch based on a text prompt (DALL·E 3 and DALL·E 2)
根据文本提示从头开始创建图像（DALL·E 3 和 DALL·E 2）
- Creating edited versions of images by having the model replace some areas of a pre-existing image, based on a new text prompt (DALL·E 2 only)
根据新的文本提示，通过让模型替换预先存在的图像的某些区域来创建图像的编辑版本（仅限 DALL·E 2）
- Creating variations of an existing image (DALL·E 2 only)
创建现有图像的变体（仅限 DALL·E 2）

This guide covers the basics of using these three API endpoints with useful code samples. To try DALL·E 3, head to ChatGPT. To try DALL·E 2, check out the DALL·E preview app.

本指南涵盖了使用这三个 API 端点的基础知识以及有用的代码示例。 要尝试 DALL·E 3，请前往 ChatGPT。 要试用 DALL·E 2，请查看 DALL·E 预览应用程序。


## Usage
### Generations
The image generations endpoint allows you to create an original image given a text prompt. When using DALL·E 3, images can have a size of 1024x1024, 1024x1792 or 1792x1024 pixels.

 
图像生成端点允许您根据文本提示创建原始图像。 使用 DALL·E 3 时，图像的尺寸可以为 1024x1024、1024x1792 或 1792x1024 像素。


By default, images are generated at standard quality, but when using DALL·E 3 you can set quality: "hd" for enhanced detail. Square, standard quality images are the fastest to generate.


默认情况下，图像以标准质量生成，但使用 DALL·E 3 时，您可以设置质量：“hd”以增强细节。 方形、标准质量的图像生成速度最快。


You can request 1 image at a time with DALL·E 3 (request more by making parallel requests) or up to 10 images at a time using DALL·E 2 with the n parameter.


您可以使用 DALL·E 3 一次请求 1 个图像（通过发出并行请求来请求更多图像），或者使用带有 n 参数的 DALL·E 2 一次最多请求 10 个图像。


### Generate an image
生成图像
```py
python
from openai import OpenAI
client = OpenAI()

response = client.images.generate(
  model="dall-e-3",
  prompt="a white siamese cat",
  size="1024x1024",
  quality="standard",
  n=1,
)

image_url = response.data[0].url

```


### What is new with DALL·E 3
Explore what is new with DALL·E 3 in the OpenAI Cookbook


DALL·E 3 的新增功能
在 OpenAI Cookbook 中探索 DALL·E 3 的新增功能

### Prompting
With the release of DALL·E 3, the model now takes in the default prompt provided and automatically re-write it for safety reasons, and to add more detail (more detailed prompts generally result in higher quality images).

  
随着 DALL·E 3 的发布，该模型现在采用提供的默认提示，并出于安全原因自动重写它，并添加更多细节（更详细的提示通常会产生更高质量的图像）。



While it is not currently possible to disable this feature, you can use prompting to get outputs closer to your requested image by adding the following to your prompt: I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:.


虽然目前无法禁用此功能，但您可以通过在提示中添加以下内容来使用提示来使输出更接近您所请求的图像：我需要测试该工具如何使用极其简单的提示来工作。 不要添加任何细节，只需按原样使用即可：。

The updated prompt is visible in the revised_prompt field of the data response object.


更新后的提示在数据响应对象的revised_prompt 字段中可见。

### Example DALL·E 3 generations
PROMPT	GENERATION
A photograph of a white Siamese cat.	
Each image can be returned as either a URL or Base64 data, using the response_format parameter. URLs will expire after an hour.


 
一张白色暹罗猫的照片。
使用response_format 参数，每个图像都可以作为 URL 或 Base64 数据返回。 URL 将在一小时后过期。



### Edits (DALL·E 2 only)
Also known as "inpainting", the image edits endpoint allows you to edit or extend an image by uploading an image and mask indicating which areas should be replaced. The transparent areas of the mask indicate where the image should be edited, and the prompt should describe the full new image, not just the erased area. This endpoint can enable experiences like the editor in our DALL·E preview app.

编辑（仅限 DALL·E 2）
图像编辑端点也称为“修复”，允许您通过上传图像和指示应替换哪些区域的蒙版来编辑或扩展图像。 蒙版的透明区域指示应编辑图像的位置，并且提示应描述完整的新图像，而不仅仅是擦除的区域。 此端点可以实现类似于我们 DALL·E 预览应用程序中的编辑器的体验。



Edit an image
```py
python
from openai import OpenAI
client = OpenAI()

response = client.images.edit((
  model="dall-e-2",
  image=open("sunlit_lounge.png", "rb"),
  mask=open("mask.png", "rb"),
  prompt="A sunlit indoor lounge area with a pool containing a flamingo",
  n=1,
  size="1024x1024"
)
image_url = response.data[0].url
```

IMAGE	MASK	OUTPUT
		
Prompt: a sunlit indoor lounge area with a pool containing a flamingo

提示：阳光明媚的室内休息区，设有包含火烈鸟的游泳池

The uploaded image and mask must both be square PNG images less than 4MB in size, and also must have the same dimensions as each other. The non-transparent areas of the mask are not used when generating the output, so they don’t necessarily need to match the original image like the example above.

上传的图像和蒙版必须都是大小小于4MB的方形PNG图像，并且尺寸必须相同。 生成输出时不会使用遮罩的非透明区域，因此它们不一定需要像上面的示例一样与原始图像匹配。


### Variations (DALL·E 2 only)
The image variations endpoint allows you to generate a variation of a given image.

变体（仅限 DALL·E 2）
图像变体端点允许您生成给定图像的变体。


Generate an image variation
生成图像变体
```py

python
from openai import OpenAI
client = OpenAI()

response = client.images.create_variation(
  image=open("image_edit_original.png", "rb"),
  n=2,
  size="1024x1024"
)

image_url = response.data[0].url
```
IMAGE	OUTPUT
	
Similar to the edits endpoint, the input image must be a square PNG image less than 4MB in size.


与编辑端点类似，输入图像必须是大小小于 4MB 的方形 PNG 图像。

## Content moderation
Prompts and images are filtered based on our content policy, returning an error when a prompt or image is flagged.

内容审核
提示和图像根据我们的内容政策进行过滤，当提示或图像被标记时返回错误。

## Language-specific tips
Using in-memory image data

特定于语言的提示
使用内存中的图像数据

The Node.js examples in the guide above use the fs module to read image data from disk. In some cases, you may have your image data in memory instead. Here's an example API call that uses image data stored in a Node.js Buffer object:


上面指南中的 Node.js 示例使用 fs 模块从磁盘读取图像数据。 在某些情况下，您可能会将图像数据存储在内存中。 下面是一个使用 Node.js Buffer 对象中存储的图像数据的 API 调用示例：

```js

import OpenAI from "openai";

const openai = new OpenAI();

// This is the Buffer object that contains your image data
const buffer = [your image data];

// Set a `name` that ends with .png so that the API knows it's a PNG image
buffer.name = "image.png";

async function main() {
  const image = await openai.images.createVariation({ model: "dall-e-2", image: buffer, n: 1, size: "1024x1024" });
  console.log(image.data);
}
main();
Working with TypeScript
If you're using TypeScript, you may encounter some quirks with image file arguments. Here's an example of working around the type mismatch by explicitly casting the argument:

import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  // Cast the ReadStream to `any` to appease the TypeScript compiler
  const image = await openai.images.createVariation({
    image: fs.createReadStream("image.png") as any,
  });

  console.log(image.data);
}
main();
And here's a similar example for in-memory image data:

import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

// This is the Buffer object that contains your image data
const buffer: Buffer = [your image data];

// Cast the buffer to `any` so that we can set the `name` property
const file: any = buffer;

// Set a `name` that ends with .png so that the API knows it's a PNG image
file.name = "image.png";

async function main() {
  const image = await openai.images.createVariation({
    file,
    1,
    "1024x1024"
  });
  console.log(image.data);
}
main();

```
## Error handling
API requests can potentially return errors due to invalid inputs, rate limits, or other issues. These errors can be handled with a try...catch statement, and the error details can be found in either error.response or error.message:

```js
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

try {
    const response = openai.images.createVariation(
        fs.createReadStream("image.png"),
        1,
        "1024x1024"
    );
    console.log(response.data.data[0].url);
} catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
}


```


 