# Error codes
This guide includes an overview on error codes you might see from both the API and our official Python library. Each error code mentioned in the overview has a dedicated section with further guidance.
 
本指南概述了您可能从 API 和我们的官方 Python 库中看到的错误代码。 概述中提到的每个错误代码都有一个专门的部分来提供进一步的指导。


## API errors
CODE	OVERVIEW
- 401 - Invalid Authentication	Cause: Invalid Authentication
- Solution: Ensure the correct API key and requesting organization are being used.
- 401 - Incorrect API key provided	Cause: The requesting API key is not correct.
- Solution: Ensure the API key used is correct, clear your browser cache, or generate a new one.
- 401 - You must be a member of an organization to use the API	Cause: Your account is not part of an organization.
- Solution: Contact us to get added to a new organization or ask your organization manager to invite you to an organization.
- 429 - Rate limit reached for requests	Cause: You are sending requests too quickly.
- Solution: Pace your requests. Read the Rate limit guide.
- 429 - You exceeded your current quota, please check your plan and billing details	Cause: You have run out of credits or hit your maximum monthly spend.
- Solution: Buy more credits or learn how to increase your limits.
- 500 - The server had an error while processing your request	Cause: Issue on our servers.
- Solution: Retry your request after a brief wait and contact us if the issue persists. Check the status page.
- 503 - The engine is currently overloaded, please try again later	Cause: Our servers are experiencing high traffic.
- Solution: Please retry your requests after a brief wait.
- 401 - Invalid Authentication
- 401 - Incorrect API key provided
- 401 - You must be a member of an organization to use the API
- 429 - Rate limit reached for requests
- 429 - You exceeded your current quota, please check your plan and billing details
- 503 - The engine is currently overloaded, please try again later

API错误
- 代码概述
- 401 - 无效身份验证 原因：无效身份验证
- 解决方案：确保使用正确的 API 密钥和请求组织。
- 401 - 提供的 API 密钥不正确 原因：请求的 API 密钥不正确。
- 解决方案：确保使用的 API 密钥正确，清除浏览器缓存，或生成新的。
- 401 - 您必须是组织的成员才能使用 API 原因：您的帐户不属于组织。
- 解决方案：联系我们以添加到新组织，或要求您的组织经理邀请您加入组织。
- 429 - 达到请求速率限制 原因：您发送请求的速度太快。
- 解决方案：调整您的请求。 阅读速率限制指南。
- 429 - 您超出了当前配额，请检查您的计划和账单详细信息 原因：您已用完积分或达到每月最高支出。
- 解决方案：购买更多积分或了解如何增加限额。
- 500 - 服务器在处理您的请求时出错 原因：我们的服务器出现问题。
- 解决方案：短暂等待后重试您的请求，如果问题仍然存在，请联系我们。 检查状态页面。
- 503 - 引擎当前过载，请稍后重试原因：我们的服务器流量很高。
- 解决方案：请稍等片刻后重试您的请求。
- 401 - 身份验证无效
- 401 - 提供的 API 密钥不正确
- 401 - 您必须是组织的成员才能使用 API
- 429 - 请求达到速率限制
- 429 - 您超出了当前配额，请检查您的计划和账单详细信息
- 503 - 引擎当前过载，请稍后再试

## Python library error types

Python 库错误类型

TYPE	OVERVIEW
- APIConnectionError	Cause: Issue connecting to our services.
- Solution: Check your network settings, proxy configuration, SSL certificates, or firewall rules.
- APITimeoutError	Cause: Request timed out.
- Solution: Retry your request after a brief wait and contact us if the issue persists.
- AuthenticationError	Cause: Your API key or token was invalid, expired, or revoked.
- Solution: Check your API key or token and make sure it is correct and active. You may need to generate a new one from your account dashboard.
- BadRequestError	Cause: Your request was malformed or missing some required parameters, such as a token or an input.
- Solution: The error message should advise you on the specific error made. Check the documentation for the specific API method you are calling and make sure you are sending valid and - complete parameters. You may also need to check the encoding, format, or size of your request data.
- ConflictError	Cause: The resource was updated by another request.
- Solution: Try to update the resource again and ensure no other requests are trying to update it.
- InternalServerError	Cause: Issue on our side.
- Solution: Retry your request after a brief wait and contact us if the issue persists.
- NotFoundError	Cause: Requested resource does not exist.
- Solution: Ensure you are the correct resource identifier.
- PermissionDeniedError	Cause: You don't have access to the requested resource.
- Solution: Ensure you are using the correct API key, organization ID, and resource ID.
- RateLimitError	Cause: You have hit your assigned rate limit.
- Solution: Pace your requests. Read more in our Rate limit guide.
- UnprocessableEntityError	Cause: Unable to process the request despite the format being correct.
- Solution: Please try the request again.
- APIConnectionError
- APITimeoutError
- AuthenticationError
- BadRequestError
- InternalServerError
- RateLimitError
- Persistent errors
If the issue persists, contact our support team via chat and provide them with the following information:

类型概览
- APIConnectionError 原因：连接到我们的服务时出现问题。
- 解决方案：检查您的网络设置、代理配置、SSL 证书或防火墙规则。
- APITimeoutError 原因：请求超时。
- 解决方案：短暂等待后重试您的请求，如果问题仍然存在，请联系我们。
- AuthenticationError 原因：您的 API 密钥或令牌无效、过期或已撤销。
- 解决方案：检查您的 API 密钥或令牌并确保其正确且有效。 您可能需要从您的帐户仪表板生成一个新的。
- BadRequestError 原因：您的请求格式错误或缺少某些必需参数，例如令牌或输入。
- 解决方案：错误消息应告知您所发生的具体错误。 检查您正在调用的特定 API 方法的文档，并确保您发送的参数有效且完整。 您可能还需要检查请求数据的编码、格式或大小。
- ConflictError 原因：资源已被另一个请求更新。
- 解决方案：尝试再次更新资源并确保没有其他请求尝试更新它。
- InternalServerError 原因：我们这边的问题。
- 解决方案：短暂等待后重试您的请求，如果问题仍然存在，请联系我们。
- NotFoundError 原因：请求的资源不存在。
- 解决方案：确保您是正确的资源标识符。
- PermissionDeniedError 原因：您无权访问所请求的资源。
- 解决方案：确保您使用正确的 API 密钥、组织 ID 和资源 ID。
- RateLimitError 原因：您已达到指定的速率限制。
- 解决方案：调整您的请求。 请阅读我们的速率限制指南了解更多信息。
- UnprocessableEntityError 原因：尽管格式正确，但无法处理请求。
- 解决方案：请重试该请求。
- API连接错误
- API超时错误
- 授权错误
- 错误请求错误
- 内部服务器错误
- 速率限制错误
- 持续错误
如果问题仍然存在，请通过聊天联系我们的支持团队并向他们提供以下信息：

- The model you were using
- The error message and code you received
- The request data and headers you sent
- The timestamp and timezone of your request
- Any other relevant details that may help us diagnose the issue
Our support team will investigate the issue and get back to you as soon as possible. Note that our support queue times may be long due to high demand. You can also post in our Community Forum but be sure to omit any sensitive information.

- 您使用的型号
- 您收到的错误消息和代码
- 您发送的请求数据和标头
- 您的请求的时间戳和时区
- 任何其他可以帮助我们诊断问题的相关详细信息
我们的支持团队将调查该问题并尽快回复您。 请注意，由于需求量大，我们的支持排队时间可能会很长。 您也可以在我们的社区论坛上发帖，但请务必省略任何敏感信息。



## Handling errors
We advise you to programmatically handle errors returned by the API. To do so, you may want to use a code snippet like below:

处理错误

我们建议您以编程方式处理 API 返回的错误。 为此，您可能需要使用如下代码片段：

```py

import openai
from openai import OpenAI
client = OpenAI()

try:
  #Make your OpenAI API request here
  response = client.completions.create(
    prompt="Hello world",
    model="gpt-3.5-turbo-instruct"
  )
except openai.APIError as e:
  #Handle API error here, e.g. retry or log
  print(f"OpenAI API returned an API Error: {e}")
  pass
except openai.APIConnectionError as e:
  #Handle connection error here
  print(f"Failed to connect to OpenAI API: {e}")
  pass
except openai.RateLimitError as e:
  #Handle rate limit error (we recommend using exponential backoff)
  print(f"OpenAI API request exceeded rate limit: {e}")
  pass


```