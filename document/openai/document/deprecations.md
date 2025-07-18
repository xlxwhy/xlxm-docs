# Deprecations
## Overview
As we launch safer and more capable models, we regularly retire older models. Software relying on OpenAI models may need occasional updates to keep working. Impacted customers will always be notified by email and in our documentation along with blog posts for larger changes.

随着我们推出更安全、功能更强大的型号，我们会定期淘汰旧型号。 依赖 OpenAI 模型的软件可能需要偶尔更新才能继续工作。 受影响的客户将始终通过电子邮件、我们的文档以及博客文章收到较大更改的通知。


This page lists all API deprecations, along with recommended replacements.

此页面列出了所有已弃用的 API，以及推荐的替代方案。


## Deprecation vs Legacy
We use the term "deprecation" to refer to the process of retiring a model or endpoint. When we announce that a model or endpoint is being deprecated, it immediately becomes deprecated. All deprecated models and endpoints will also have a shut down date. At the time of the shut down, the model or endpoint will no longer be accessible.

我们使用术语“弃用”来指淘汰模型或端点的过程。 当我们宣布某个模型或端点将被弃用时，它会立即被弃用。 所有已弃用的模型和端点也将有一个关闭日期。 关闭时，模型或端点将不再可访问。

We use the term "legacy" to refer to models and endpoints that will no longer receive updates. We tag endpoints and models as legacy to signal to developers where we are moving as a platform and that they should likely migrate to newer models or endpoints. You can expect that a legacy model or endpoint will be deprecated at some point in the future.

我们使用术语“旧版”来指代将不再接收更新的模型和端点。 我们将端点和模型标记为遗留，以向开发人员发出信号，表明我们作为平台正在向何处移动，并且他们应该迁移到更新的模型或端点。 您可以预期旧模型或端点将在未来某个时候被弃用。

## Incremental model updates
As announced in March 2023, we regularly release new versions of gpt-4 and gpt-3.5-turbo.

增量模型更新
正如 2023 年 3 月宣布的那样，我们定期发布新版本的 gpt-4 和 gpt-3.5-turbo。


Each model version is dated with an -MMDD suffix; e.g., gpt-4-0613. The undated model name, e.g., gpt-4, will typically point to the latest version (e.g. gpt-4 points to gpt-4-0613). Users of undated model names will be notified by email typically 2 weeks before any change takes place.

每个型号版本都带有 -MMDD 后缀； 例如，gpt-4-0613。 未注明日期的型号名称（例如 gpt-4）通常会指向最新版本（例如 gpt-4 指向 gpt-4-0613）。 通常会在发生任何更改之前 2 周通过电子邮件通知未注明型号名称的用户。

After a new version is launched, older versions will typically be deprecated 3 months later.

新版本发布后，旧版本通常会在 3 个月后被弃用。

## Migrating to replacements
Once a model is deprecated, be sure to migrate all usage to a suitable replacement before the shutdown date. Requests to models past the shutdown date will fail.

迁移到替代品
一旦某个模型被弃用，请务必在关闭日期之前将所有使用情况迁移到合适的替代品。 对超过关闭日期的模型的请求将失败。

To help measure the performance of replacement models on your tasks, we have open-sourced Evals, a Python framework for evaluating language models.

为了帮助衡量替代模型在您的任务中的性能，我们开源了 Evals，这是一个用于评估语言模型的 Python 框架。

If new models perform worse on your tasks, let us know by by submitting a pull request to our Evals repo with examples of the task.

如果新模型在您的任务上表现较差，请通过向我们的 Evals 存储库提交带有任务示例的拉取请求来告知我们。

## Deprecation history
 
All deprecations are listed below, with the most recent announcements at the top.

下面列出了所有弃用的内容，最新的公告位于顶部。


### 2023-11-06: Chat model updates
On November 6th, 2023, we announced the release of an updated GPT-3.5-Turbo model (which now comes by default with 16k context) along with deprecation of gpt-3.5-turbo-0613 and gpt-3.5-turbo-16k-0613.

SHUTDOWN DATE	LEGACY MODEL	LEGACY MODEL PRICE	RECOMMENDED REPLACEMENT
2024-06-13	gpt-3.5-turbo-0613	$0.0015 / 1K input tokens + $0.0020 / 1K output tokens	gpt-3.5-turbo-1106
2024-06-13	gpt-3.5-turbo-16k-0613	$0.0030 / 1K input tokens + $0.0040 / 1K output tokens	gpt-3.5-turbo-1106
Fine-tuned models created from these base models are not effected by this deprecation, but you will no longer be able to create new fine-tuned versions with these models.

### 2023-08-22: Fine-tunes endpoint
On August 22nd, 2023, we announced the new fine-tuning API (/v1/fine_tuning/jobs) and that the original /v1/fine-tunes API along with legacy models (including those fine-tuned with the /v1/fine-tunes API) will be shut down on January 04, 2024. This means that models fine-tuned using the /v1/fine-tunes API will no longer be accessible and you would have to fine-tune new models with the updated endpoint and associated base models.

Fine-tunes endpoint

SHUTDOWN DATE	SYSTEM	RECOMMENDED REPLACEMENT
2024-01-04	/v1/fine-tunes	/v1/fine_tuning/jobs
2023-07-06: GPT and embeddings
On July 06, 2023, we announced the upcoming retirements of older GPT-3 and GPT-3.5 models served via the completions endpoint. We also announced the upcoming retirement of our first-generation text embedding models. They will be shut down on January 04, 2024.

### InstructGPT models
SHUTDOWN DATE	LEGACY MODEL	LEGACY MODEL PRICE	RECOMMENDED REPLACEMENT
2024-01-04	text-ada-001	$0.0004 / 1K tokens	gpt-3.5-turbo-instruct
2024-01-04	text-babbage-001	$0.0005 / 1K tokens	gpt-3.5-turbo-instruct
2024-01-04	text-curie-001	$0.0020 / 1K tokens	gpt-3.5-turbo-instruct
2024-01-04	text-davinci-001	$0.0200 / 1K tokens	gpt-3.5-turbo-instruct
2024-01-04	text-davinci-002	$0.0200 / 1K tokens	gpt-3.5-turbo-instruct
2024-01-04	text-davinci-003	$0.0200 / 1K tokens	gpt-3.5-turbo-instruct
Pricing for the replacement gpt-3.5-turbo-instruct model can be found on the pricing page.

### Base GPT models
SHUTDOWN DATE	LEGACY MODEL	LEGACY MODEL PRICE	RECOMMENDED REPLACEMENT
2024-01-04	ada	$0.0004 / 1K tokens	babbage-002
2024-01-04	babbage	$0.0005 / 1K tokens	babbage-002
2024-01-04	curie	$0.0020 / 1K tokens	davinci-002
2024-01-04	davinci	$0.0200 / 1K tokens	davinci-002
2024-01-04	code-davinci-002	---	gpt-3.5-turbo-instruct
Pricing for the replacement babbage-002 and davinci-002 models can be found on the pricing page.

### Edit models & endpoint
- SHUTDOWN DATE	MODEL / SYSTEM	RECOMMENDED REPLACEMENT
- 2024-01-04	text-davinci-edit-001	gpt-4
- 2024-01-04	code-davinci-edit-001	gpt-4
- 2024-01-04	/v1/edits	/v1/chat/completions
### Fine-tuning GPT models
- SHUTDOWN DATE	LEGACY MODEL	TRAINING PRICE	USAGE PRICE	RECOMMENDED REPLACEMENT
- 2024-01-04	ada	$0.0004 / 1K tokens	$0.0016 / 1K tokens	babbage-002
- 2024-01-04	babbage	$0.0006 / 1K tokens	$0.0024 / 1K tokens	babbage-002
- 2024-01-04	curie	$0.003 / 1K tokens	$0.012 / 1K tokens	davinci-002
- 2024-01-04	davinci	$0.03 / 1K tokens	$0.12 / 1K tokens	davinci-002, gpt-3.5-turbo, gpt-4
### First-generation text embedding models
- SHUTDOWN DATE	LEGACY MODEL	LEGACY MODEL PRICE	RECOMMENDED REPLACEMENT
- 2024-01-04	text-similarity-ada-001	$0.004 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-ada-doc-001	$0.004 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-ada-query-001	$0.004 / 1K tokens	text-embedding-ada-002
- 2024-01-04	code-search-ada-code-001	$0.004 / 1K tokens	text-embedding-ada-002
- 2024-01-04	code-search-ada-text-001	$0.004 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-similarity-babbage-001	$0.005 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-babbage-doc-001	$0.005 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-babbage-query-001	$0.005 / 1K tokens	text-embedding-ada-002
- 2024-01-04	code-search-babbage-code-001	$0.005 / 1K tokens	text-embedding-ada-002
- 2024-01-04	code-search-babbage-text-001	$0.005 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-similarity-curie-001	$0.020 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-curie-doc-001	$0.020 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-curie-query-001	$0.020 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-similarity-davinci-001	$0.200 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-davinci-doc-001	$0.200 / 1K tokens	text-embedding-ada-002
- 2024-01-04	text-search-davinci-query-001	$0.200 / 1K tokens	text-embedding-ada-002
- 2023-06-13: Updated chat models
- On June 13, 2023, we announced new chat model versions in the Function calling and other API updates blog post. The three original versions will be retired in June 2024 at the - earliest.
- 
- SHUTDOWN DATE	LEGACY MODEL	LEGACY MODEL PRICE	RECOMMENDED REPLACEMENT
- at earliest 2024-06-13	gpt-3.5-turbo-0301	$0.0015 / 1K input tokens + $0.0020 / 1K output tokens	gpt-3.5-turbo-0613
- at earliest 2024-06-13	gpt-4-0314	$0.03 / 1K input tokens + $0.06 / 1K output tokens	gpt-4-0613
- at earliest 2024-06-13	gpt-4-32k-0314	$0.06 / 1K input tokens + $0.12 / 1K output tokens	gpt-4-32k-0613
### 2023-03-20: Codex models
- SHUTDOWN DATE	LEGACY MODEL	RECOMMENDED REPLACEMENT
- 2023-03-23	code-davinci-002	gpt-4 or researcher access program
- 2023-03-23	code-davinci-001	gpt-4 or researcher access program
- 2023-03-23	code-cushman-002	gpt-4 or researcher access program
- 2023-03-23	code-cushman-001	gpt-4 or researcher access program
- 2022-06-03: Legacy endpoints
### SHUTDOWN DATE	SYSTEM	RECOMMENDED REPLACEMENT
- 2022-12-03	/v1/engines	/v1/models
- 2022-12-03	/v1/search	View transition guide
- 2022-12-03	/v1/classifications	View transition guide
- 2022-12-03	/v1/answers	View transition guide
