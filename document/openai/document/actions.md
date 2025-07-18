# Actions in GPTs
Looking for ChatGPT? Head to chat.openai.com.


## GPTs and custom Actions are here!

We’re rolling out custom versions of ChatGPT that you can create for a specific purpose—called GPTs. GPTs are a new way for anyone to create a tailored version of ChatGPT to be more helpful in their daily life, at specific tasks, at work, or at home—and then share that creation with others. We are excited to announce Actions, which build on plugins. Actions take many of the core ideas of plugins while also introducing many new features builders have been asking for.

我们正在推出 ChatGPT 的自定义版本，您可以为特定目的创建该版本，称为 GPT。 GPT 是一种新方式，任何人都可以创建 ChatGPT 的定制版本，以便在日常生活、特定任务、工作或家庭中更有帮助，然后与其他人分享该创作。 我们很高兴地宣布基于插件构建的 Actions。 操作采用了插件的许多核心思想，同时还引入了构建者一直要求的许多新功能。

## What is a GPT?
GPTs provide the ability to deeply customize ChatGPT with all new capabilities. GPTs also lower the barrier for builders. You can read more in the GPT launch blog post and the deep dive on GPT's from OpenAI Developer Day:

GPT 提供了使用所有新功能深度定制 ChatGPT 的能力。 GPT 还降低了构建者的门槛。 您可以在 GPT 发布博客文章以及 OpenAI 开发者日对 GPT 的深入探讨中阅读更多内容：


## What is an action?
In addition to using our built-in capabilities, you can also define custom actions by making one or more APIs available to the GPT. Like plugins, actions allow GPTs to integrate external data or interact with the real-world. Connect GPTs to databases, plug them into emails, or make them your shopping assistant. For example, you could integrate a travel listings database, connect a user’s email inbox, or facilitate e-commerce orders.

除了使用我们的内置功能之外，您还可以通过向 GPT 提供一个或多个 API 来定义自定义操作。 与插件一样，操作允许 GPT 集成外部数据或与现实世界交互。 将 GPT 连接到数据库、将其插入电子邮件或使它们成为您的购物助手。 例如，您可以集成旅行列表数据库、连接用户的电子邮件收件箱或促进电子商务订单。

The design of actions builds upon insights from our plugins beta, granting developers greater control over the model and how their APIs are called. Migrating from the plugins beta is easy with the ability to use your existing plugin manifest to define actions for your GPT.

操作的设计建立在我们插件测试版的见解之上，使开发人员能够更好地控制模型及其 API 的调用方式。 从插件测试版迁移很容易，能够使用现有的插件清单来定义 GPT 的操作。


## Create an Action
To create an Action, you can define an OpenAPI specification similarly to that of a plugin with a few changes listed below. If you have a plugin today, creating a GPT with an action should only take a few minutes.

要创建操作，您可以定义类似于插件的 OpenAPI 规范，并进行下面列出的一些更改。 如果您现在有一个插件，那么使用操作创建 GPT 应该只需要几分钟。

You can start by creating a GPT in the ChatGPT UI and then connect it to your existing plugin OpenAPI reference.
您可以首先在 ChatGPT UI 中创建 GPT，然后将其连接到现有插件 OpenAPI 参考。

From the GPT editor:

Select "Configure"
"Add Action"
Fill in your OpenAPI spec or paste in a URL where it is hosted (you can use an existing plugin URL)
Actions vs Plugins
Like ChatGPT plugins, Actions allow you to connect a GPT to a custom API. There are a few noticeable differences between Actions and plugins which you can see mentioned below.


## Functions
Endpoints defined in the OpenAPI specification are now called "functions". There is no difference in how these are defined.
OpenAPI 规范中定义的端点现在称为“函数”。 这些的定义方式没有区别。

Hosted OpenAPI specification
With Actions, OpenAI now hosts the OpenAPI specification for your API. This means you no longer need to host your own OpenAPI specification. You can import an existing OpenAPI specification or create a new one from scratch using the UI in the GPT creator.
托管 OpenAPI 规范
借助 Actions，OpenAI 现在可以为您的 API 托管 OpenAPI 规范。 这意味着您不再需要托管自己的 OpenAPI 规范。 您可以导入现有的 OpenAPI 规范，或使用 GPT 创建器中的 UI 从头开始创建新的规范。

## Consequential flag
In the OpenAPI specification, you can now set certain endpoints as "consequential" as shown below:
在 OpenAPI 规范中，您现在可以将某些端点设置为“相应的”，如下所示：
get:
  operationId: blah
  x-openai-isConsequential: false
post:
  operationId: blah2
  x-openai-isConsequential: true

If the x-openai-isConsequential field is true, we treat the operation as "must always prompt the user for confirmation before running" and don't show an "always allow" button (both are new features of GPTs designed to give users more control).
If the x-openai-isConsequential field is false, we show the "always allow button".
If the field isn't present, we default all GET operations to false and all other operations to true
Multiple authentication schemas
Actions now support multiple authentication schemas which can be set on a per-endpoint basis. This means you can have some endpoints that require authentication and some that don't.
如果 x-openai-isConsequential 字段为 true，我们将该操作视为“运行前必须始终提示用户确认”，并且不显示“始终允许”按钮（两者都是 GPT 的新功能，旨在为用户提供更多 控制）。
如果 x-openai-isConsequential 字段为 false，我们将显示“始终允许按钮”。
如果该字段不存在，我们将所有 GET 操作默认为 false，所有其他操作默认为 true
多种身份验证模式
操作现在支持多个身份验证模式，可以针对每个端点进行设置。 这意味着您可以拥有一些需要身份验证的端点，而另一些则不需要。


This can be set as a components -> securityschemes -> object in the OpenAPI spec, and on each operation in the spec there will be a security object. If no security object is specified in the operation, we consider it unauthed or noauth.
这可以在 OpenAPI 规范中设置为组件 -> 安全方案 -> 对象，并且规范中的每个操作都会有一个安全对象。 如果操作中没有指定安全对象，我们认为它是未经验证的或 noauth。


## Updated store process
The GPT marketplace will supersede the plugin store. As the GPT marketplace rolls out, we will have more to share.

更新了商店流程
GPT 市场将取代插件商店。 随着 GPT 市场的推出，我们将有更多内容可以分享。

