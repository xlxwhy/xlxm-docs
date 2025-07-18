# Developer quickstart
## Get up and running with the OpenAI API
Looking for ChatGPT? Head to chat.openai.com.
The OpenAI API provides a simple interface for developers to create an intelligence layer in their applications, powered by OpenAI's state of the art models. The Chat Completions endpoint powers ChatGPT and provides a simple way to take text as input and use a model like GPT-4 to generate an output.

正在寻找 ChatGPT？ 前往 chat.openai.com。
OpenAI API 为开发人员提供了一个简单的界面，可在其应用程序中创建智能层，并由 OpenAI 最先进的模型提供支持。 Chat Completions 端点为 ChatGPT 提供支持，并提供了一种简单的方法来将文本作为输入并使用 GPT-4 等模型来生成输出。

Want to jump straight to the code?
Skip the quickstart and dive into the API reference.

想直接跳到代码吗？
跳过快速入门并深入了解 API 参考。

This quickstart is designed to help get your local development environment setup and send your first API request. If you are an experienced developer or want to just dive into using the OpenAI API, the API reference of GPT guide are a great place to start. Throughout this quickstart, you will learn:


本快速入门旨在帮助您设置本地开发环境并发送您的第一个 API 请求。 如果您是经验丰富的开发人员或只想深入使用 OpenAI API，GPT 指南的 API 参考是一个很好的起点。 通过本快速入门，您将了解到：

- How to setup your development environment
- 如何设置您的开发环境
- How to install the latest SDKs
- 如何安装最新的 SDK
- Some of the basic concepts of the OpenAI API
- OpenAI API 的一些基本概念
- How to send your first API request
- 如何发送您的第一个 API 请求
- If you run into any challenges or have questions getting started, please join our developer forum.
- 如果您在入门时遇到任何挑战或有疑问，请加入我们的开发者论坛。



## Account setup
First, create an OpenAI account or sign in. Next, navigate to the API key page and "Create new secret key", optionally naming the key. Make sure to save this somewhere safe and do not share it with anyone.
 
首先，创建 OpenAI 帐户或登录。接下来，导航到 API 密钥页面和“创建新密钥”，可以选择命名密钥。 请务必将其保存在安全的地方，并且不要与任何人共享。


## Quickstart language selection
Select the tool or language you want to get started using the OpenAI API with.

Python is a popular programming language that is commonly used for data applications, web development, and many other programming tasks due to its ease of use. OpenAI provides a custom Python library which makes working with the OpenAI API in Python simple and efficient.
 
选择您想要开始使用 OpenAI API 的工具或语言。

Python 是一种流行的编程语言，由于其易用性，通常用于数据应用程序、Web 开发和许多其他编程任务。 OpenAI 提供了一个自定义 Python 库，使得在 Python 中使用 OpenAI API 变得简单而高效。

## Step 1: Setup Python
Install Python  
Setup a virtual environment (optional)  
Install the OpenAI Python library  
 
安装Python  
设置虚拟环境（可选）  
安装 OpenAI Python 库  

## Step 2: Setup your API key
Setup your API key for all projects (recommended)  
Setup your API key for a single project  

为所有项目设置 API 密钥（推荐）  
为单个项目设置 API 密钥  
## Step 3: Sending your first API request
Making an API request  
After you have Python configured and an API key setup, the final step is to send a request to the OpenAI API using the Python library. To do this, create a file named openai-test.py using th terminal or an IDE.  

发出 API 请求  
配置 Python 并设置 API 密钥后，最后一步是使用 Python 库向 OpenAI API 发送请求。 为此，请使用终端或 IDE 创建一个名为 openai-test.py 的文件。  


 

Inside the file, copy and paste one of the examples below:

## ChatCompletions
```py
ChatCompletions
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)
print(completion.choices[0].message)

```
To run the code, enter python openai-test.py into the terminal / command line.

The Chat Completions example highlights just one area of strength for our models: creative ability. Explaining recursion (the programming topic) in a well formatted poem is something both the best developers and best poets would struggle with. In this case, gpt-3.5-turbo does it effortlessly.

要运行代码，请在终端/命令行中输入 python openai-test.py。

聊天完成示例仅突出了我们模型的一个优势领域：创造力。 用一首格式良好的诗来解释递归（编程主题）是最好的开发人员和最好的诗人都会遇到的问题。 在这种情况下，gpt-3.5-turbo 可以毫不费力地做到这一点。

## Next steps
Now that you have made you first OpenAI API request, it is time to explore what else is possible:

现在您已经发出了第一个 OpenAI API 请求，是时候探索其他可能的方法了：

For more detailed information on our models and the API, see our GPT guide.
Visit the OpenAI Cookbook for in-depth example API use-cases, as well as code snippets for common tasks.
Wondering what OpenAI's models are capable of? Check out our library of example prompts.
Want to try the API without writing any code? Start experimenting in the Playground.
Keep our usage policies in mind as you start building.

有关我们的模型和 API 的更多详细信息，请参阅我们的 GPT 指南。
- 访问 OpenAI Cookbook 以获取深入的 API 用例示例以及常见任务的代码片段。
- 想知道 OpenAI 的模型有什么能力？ 查看我们的示例提示库。
- 想要在不编写任何代码的情况下尝试 API 吗？ 开始在 Playground 中进行实验。
- 当您开始构建时，请牢记我们的使用政策。
