
# Fine-tuning
Learn how to customize a model for your application.

了解如何为您的应用程序定制模型。


## Introduction
This guide is intended for users of the new OpenAI fine-tuning API. If you are a legacy fine-tuning user, please refer to our legacy fine-tuning guide.

本指南面向新 OpenAI 微调 API 的用户。 如果您是旧版微调用户，请参阅我们的旧版微调指南。

Fine-tuning lets you get more out of the models available through the API by providing:

微调可让您通过 API 提供以下功能，从而更充分地利用可用模型：


- Higher quality results than prompting
- Ability to train on more examples than can fit in a prompt
- Token savings due to shorter prompts
- Lower latency requests
OpenAI's text generation models have been pre-trained on a vast amount of text. To use the models effectively, we include instructions and sometimes several examples in a prompt. Using demonstrations to show how to perform a task is often called "few-shot learning."

  
比提示更高质量的结果
能够训练超出提示范围的示例
由于提示较短而节省了代币
更低的延迟请求
OpenAI 的文本生成模型已经过大量文本的预训练。 为了有效地使用模型，我们在提示中包含说明，有时还包含几个示例。 使用演示来展示如何执行任务通常称为“小样本学习”。

 
Fine-tuning improves on few-shot learning by training on many more examples than can fit in the prompt, letting you achieve better results on a wide number of tasks. Once a model has been fine-tuned, you won't need to provide as many examples in the prompt. This saves costs and enables lower-latency requests.


微调通过训练超出提示范围的更多示例来改进小样本学习，让您在大量任务上取得更好的结果。 一旦模型经过微调，您就不需要在提示中提供那么多示例。 这可以节省成本并实现更低延迟的请求。



At a high level, fine-tuning involves the following steps:

在较高层面上，微调涉及以下步骤：

- Prepare and upload training data
准备并上传训练数据
- Train a new fine-tuned model
训练新的微调模型
- Evaluate results and go back to step 1 if needed
评估结果并根据需要返回步骤 1
- Use your fine-tuned model
使用您的微调模型
- Visit our pricing page to learn more about how fine-tuned model training and usage are billed.
请访问我们的定价页面，了解有关微调模型训练和使用如何计费的更多信息。



## What models can be fine-tuned?
Fine-tuning for GPT-4 is in an experimental access program - elibible users can request access.

GPT-4 的微调是在一个实验性访问计划中 - 合格的用户可以请求访问。

Fine-tuning is currently available for the following models:

目前可对以下型号进行微调：

- gpt-3.5-turbo-1106 (recommended)
- gpt-3.5-turbo-0613
- babbage-002
- davinci-002
- gpt-4-0613 (experimental — eligible users will be presented with an option to request access in the fine-tuning UI)
You can also fine-tune a fine-tuned model which is useful if you acquire additional data and don't want to repeat the previous training steps.

您还可以对经过微调的模型进行微调，如果您获取其他数据并且不想重复之前的训练步骤，则该模型非常有用。

We expect gpt-3.5-turbo to be the right model for most users in terms of results and ease of use, unless you are migrating a legacy fine-tuned model.

我们预计 gpt-3.5-turbo 在结果和易用性方面将成为大多数用户的正确模型，除非您要迁移旧的微调模型。



## When to use fine-tuning
Fine-tuning OpenAI text generation models can make them better for specific applications, but it requires a careful investment of time and effort. We recommend first attempting to get good results with prompt engineering, prompt chaining (breaking complex tasks into multiple prompts), and function calling, with the key reasons being:

 
微调 OpenAI 文本生成模型可以使它们更好地适应特定应用，但这需要仔细投入时间和精力。 我们建议首先尝试通过提示工程、提示链接（将复杂的任务分解为多个提示）和函数调用来获得良好的结果，主要原因是：

There are many tasks at which our models may not initially appear to perform well, but results can be improved with the right prompts - thus fine-tuning may not be necessary

在许多任务中，我们的模型最初可能表现不佳，但可以通过正确的提示来改进结果 - 因此可能不需要进行微调

Iterating over prompts and other tactics has a much faster feedback loop than iterating with fine-tuning, which requires creating datasets and running training jobs


迭代提示和其他策略比微调迭代具有更快的反馈循环，后者需要创建数据集并运行训练作业


In cases where fine-tuning is still necessary, initial prompt engineering work is not wasted - we typically see best results when using a good prompt in the fine-tuning data (or combining prompt chaining / tool use with fine-tuning)

在仍然需要微调的情况下，最初的提示工程工作不会浪费 - 在微调数据中使用良好的提示（或将提示链接/工具使用与微调相结合）时，我们通常会看到最佳结果

Our prompt engineering guide provides a background on some of the most effective strategies and tactics for getting better performance without fine-tuning. You may find it helpful to iterate quickly on prompts in our playground.

我们的即时工程指南提供了一些最有效的策略和策略的背景知识，无需微调即可获得更好的性能。 您可能会发现在我们的 Playground 中快速迭代提示很有帮助。



## Common use cases
Some common use cases where fine-tuning can improve results:

微调可以改善结果的一些常见用例：

- Setting the style, tone, format, or other qualitative aspects
设置风格、基调、格式或其他定性方面
- Improving reliability at producing a desired output
提高产生所需输出的可靠性
- Correcting failures to follow complex prompts
纠正未能遵循复杂提示的问题
- Handling many edge cases in specific ways
以特定方式处理许多边缘情况
- Performing a new skill or task that’s hard to articulate in a prompt
执行难以在提示中阐明的新技能或任务
- One high-level way to think about these cases is when it’s easier to "show, not tell". In the sections to come, we will explore how to set up data for fine-tuning and various examples where fine-tuning improves the performance over the baseline model.
思考这些案例的一种高级方法是“展示而不是讲述”更容易。 在接下来的部分中，我们将探讨如何设置用于微调的数据以及微调可以提高基准模型性能的各种示例。



Another scenario where fine-tuning is effective is in reducing costs and / or latency, by replacing GPT-4 or by utilizing shorter prompts, without sacrificing quality. If you can achieve good results with GPT-4, you can often reach similar quality with a fine-tuned gpt-3.5-turbo model by fine-tuning on the GPT-4 completions, possibly with a shortened instruction prompt.


微调有效的另一种情况是通过替换 GPT-4 或使用较短的提示来降低成本和/或延迟，而不牺牲质量。 如果您可以使用 GPT-4 获得良好的结果，那么您通常可以通过对 GPT-4 补全进行微调（可能还需要缩短指令提示）来使用经过微调的 gpt-3.5-turbo 模型达到类似的质量。


## Preparing your dataset
Once you have determined that fine-tuning is the right solution (i.e. you’ve optimized your prompt as far as it can take you and identified problems that the model still has), you’ll need to prepare data for training the model. You should create a diverse set of demonstration conversations that are similar to the conversations you will ask the model to respond to at inference time in production.


一旦您确定微调是正确的解决方案（即您已尽可能优化了提示并确定了模型仍然存在的问题），您将需要准备用于训练模型的数据。 您应该创建一组多样化的演示对话，这些对话类似于您要求模型在生产中的推理时响应的对话。

Each example in the dataset should be a conversation in the same format as our Chat Completions API, specifically a list of messages where each message has a role, content, and optional name. At least some of the training examples should directly target cases where the prompted model is not behaving as desired, and the provided assistant messages in the data should be the ideal responses you want the model to provide.
 
数据集中的每个示例都应该是与我们的聊天完成 API 格式相同的对话，特别是消息列表，其中每条消息都有角色、内容和可选名称。 至少一些训练示例应该直接针对提示模型未按预期运行的情况，并且数据中提供的辅助消息应该是理想的响应您希望模型提供的 ses。

## Example format
In this example, our goal is to create a chatbot that occasionally gives sarcastic responses, these are three training examples (conversations) we could create for a dataset:

在此示例中，我们的目标是创建一个偶尔给出讽刺性响应的聊天机器人，这是我们可以为数据集创建的三个训练示例（对话）：

```json
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters."}]}
```

The conversational chat format is required to fine-tune gpt-3.5-turbo. For babbage-002 and davinci-002, you can follow the prompt completion pair format used for legacy fine-tuning as shown below.

微调 gpt-3.5-turbo 需要对话式聊天格式。 对于 babbage-002 和 davinci-002，您可以遵循用于旧版微调的提示完成对格式，如下所示。
```json
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}

```
## Crafting prompts
We generally recommend taking the set of instructions and prompts that you found worked best for the model prior to fine-tuning, and including them in every training example. This should let you reach the best and most general results, especially if you have relatively few (e.g. under a hundred) training examples.

制作提示
我们通常建议在微调之前采用您认为最适合模型的一组说明和提示，并将其包含在每个训练示例中。 这应该可以让您获得最好和最一般的结果，特别是如果您的训练示例相对较少（例如一百个以下）。

If you would like to shorten the instructions or prompts that are repeated in every example to save costs, keep in mind that the model will likely behave as if those instructions were included, and it may be hard to get the model to ignore those "baked-in" instructions at inference time.

如果您想缩短每个示例中重复的说明或提示以节省成本，请记住，模型的行为可能就像包含这些说明一样，并且可能很难让模型忽略那些“烘焙的” -in” 推理时的指令。

It may take more training examples to arrive at good results, as the model has to learn entirely through demonstration and without guided instructions.

可能需要更多的训练示例才能达到良好的结果，因为模型必须完全通过演示来学习，而无需指导说明。

## Example count recommendations
To fine-tune a model, you are required to provide at least 10 examples. We typically see clear improvements from fine-tuning on 50 to 100 training examples with gpt-3.5-turbo but the right number varies greatly based on the exact use case.

计数建议示例
要微调模型，您需要提供至少 10 个示例。 我们通常会看到使用 gpt-3.5-turbo 对 50 到 100 个训练示例进行微调会带来明显的改进，但正确的数字根据具体用例而有很大差异。

We recommend starting with 50 well-crafted demonstrations and seeing if the model shows signs of improvement after fine-tuning. In some cases that may be sufficient, but even if the model is not yet production quality, clear improvements are a good sign that providing more data will continue to improve the model. No improvement suggests that you may need to rethink how to set up the task for the model or restructure the data before scaling beyond a limited example set.

我们建议从 50 个精心设计的演示开始，看看模型在微调后是否显示出改进的迹象。 在某些情况下，这可能就足够了，但即使模型尚未达到生产质量，明显的改进也是一个好兆头，表明提供更多数据将继续改进模型。 没有任何改进表明您可能需要重新考虑如何在超出有限示例集之前设置模型任务或重组数据。

## Train and test splits
After collecting the initial dataset, we recommend splitting it into a training and test portion. When submitting a fine-tuning job with both training and test files, we will provide statistics on both during the course of training. These statistics will be your initial signal of how much the model is improving. Additionally, constructing a test set early on will be useful in making sure you are able to evaluate the model after training, by generating samples on the test set.

训练和测试分割
收集初始数据集后，我们建议将其分为训练和测试部分。 当提交包含训练和测试文件的微调作业时，我们将在训练过程中提供两者的统计数据。 这些统计数据将成为您模型改进程度的初始信号。 此外，尽早构建测试集将有助于确保您能够在训练后通过在测试集上生成样本来评估模型。

## Token limits
Each training example is limited to 4096 tokens. Examples longer than this will be truncated to the first 4096 tokens when training. To be sure that your entire training example fits in context, consider checking that the total token counts in the message contents are under 4,000.

代币限制
每个训练示例仅限于 4096 个标记。 训练时，超过此长度的示例将被截断为前 4096 个标记。 为了确保整个训练示例适合上下文，请考虑检查消息内容中的总标记计数是否低于 4,000。

You can compute token counts using our counting tokens notebook from the OpenAI cookbook.

您可以使用 OpenAI 食谱中的计数令牌笔记本来计算令牌计数。

## Estimate costs
Please refer to the pricing page for details on cost per 1k input and output tokens (we do to charge for tokens that are part of the validation data). To estimate the costs for a specific fine-tuning job, use the following formula:

估算成本
请参阅定价页面，了解每 1000 个输入和输出代币的成本详细信息（我们对属于验证数据一部分的代币收费）。 要估算特定微调作业的成本，请使用以下公式：

base cost per 1k tokens * number of tokens in the input file * number of epochs trained

每 1k 个 token 的基本成本 * 输入文件中的 token 数量 * 训练的 epoch 数量

For a training file with 100,000 tokens trained over 3 epochs, the expected cost would be ~$2.40 USD.

对于包含 100,000 个令牌并经过 3 个 epoch 训练的训练文件，预期成本约为 2.40 美元。

## Check data formatting
Once you have compiled a dataset and before you create a fine-tuning job, it is important to check the data formatting. To do this, we created a simple Python script which you can use to find potential errors, review token counts, and estimate the cost of a fine-tuning job.

检查数据格式
编译数据集后，在创建微调作业之前，检查数据格式非常重要。 为此，我们创建了一个简单的 Python 脚本，您可以使用它来查找潜在错误、检查令牌计数并估计微调作业的成本。

- Fine-tuning data format validation
微调数据格式验证
- Learn about fine-tuning data formatting
了解微调数据格式
- Upload a training file
上传训练文件

Once you have the data validated, the file needs to be uploaded using the Files API in order to be used with a fine-tuning jobs:

验证数据后，需要使用文件 API 上传文件，以便与微调作业一起使用：

```py
python
from openai import OpenAI
client = OpenAI()

client.files.create(
  file=open("mydata.jsonl", "rb"),
  purpose="fine-tune"
)
```
After you upload the file, it may take some time to process. While the file is processing, you can still create a fine-tuning job but it will not start until the file processing has completed.

上传文件后，可能需要一些时间来处理。 虽然当文件正在处理时，您仍然可以创建微调作业，但直到文件处理完成后才会启动。

## Create a fine-tuned model
After ensuring you have the right amount and structure for your dataset, and have uploaded the file, the next step is to create a fine-tuning job. We support creating fine-tuning jobs via the fine-tuning UI or programmatically.



创建微调模型
确保数据集的数量和结构正确并上传文件后，下一步是创建微调作业。 我们支持通过微调 UI 或以编程方式创建微调作业。

To start a fine-tuning job using the OpenAI SDK:


要使用 OpenAI SDK 启动微调作业：
```py
python

python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123", 
  model="gpt-3.5-turbo"
)
```
In this example, model is the name of the model you want to fine-tune (gpt-3.5-turbo, babbage-002, davinci-002, or an existing fine-tuned model) and training_file is the file ID that was returned when the training file was uploaded to the OpenAI API. You can customize your fine-tuned model's name using the suffix parameter.

在此示例中，model 是要微调的模型的名称（gpt-3.5-turbo、babbage-002、davinci-002 或现有的微调模型），training_file 是执行以下操作时返回的文件 ID： 训练文件已上传至 OpenAI API。 您可以使用后缀参数自定义微调模型的名称。

To set additional fine-tuning parameters like the validation_file or hyperparameters, please refer to the API specification for fine-tuning.

要设置额外的微调参数，例如validation_file或超参数，请参阅API规范进行微调。

After you've started a fine-tuning job, it may take some time to complete. Your job may be queued behind other jobs in our system, and training a model can take minutes or hours depending on the model and dataset size. After the model training is completed, the user who created the fine-tuning job will receive an email confirmation.

开始微调工作后，可能需要一些时间才能完成。 您的作业可能排在我们系统中的其他作业后面，训练模型可能需要几分钟或几小时，具体取决于模型和数据集大小。 模型训练完成后，创建微调作业的用户将收到一封确认电子邮件。
In addition to creating a fine-tuning job, you can also list existing jobs, retrieve the status of a job, or cancel a job.


除了创建微调作业外，您还可以列出现有作业、检索作业状态或取消作业。
```py
python
from openai import OpenAI
client = OpenAI()

# List 10 fine-tuning jobs
client.fine_tuning.jobs.list(limit=10)

# Retrieve the state of a fine-tune
client.fine_tuning.jobs.retrieve("ftjob-abc123")

# Cancel a job
client.fine_tuning.jobs.cancel("ftjob-abc123")

# List up to 10 events from a fine-tuning job
client.fine_tuning.jobs.list_events(fine_tuning_job_id="ftjob-abc123", limit=10)

# Delete a fine-tuned model (must be an owner of the org the model was created in)
client.models.delete("ft:gpt-3.5-turbo:acemeco:suffix:abc123")
```
## Use a fine-tuned model
When a job has succeeded, you will see the fine_tuned_model field populated with the name of the model when you retrieve the job details. You may now specify this model as a parameter to in the Chat Completions (for gpt-3.5-turbo) or legacy Completions API (for babbage-002 and davinci-002), and make requests to it using the Playground.

使用微调模型
作业成功后，您在检索作业详细信息时将看到用模型名称填充的fine_tuned_model 字段。 您现在可以将此模型指定为聊天完成（对于 gpt-3.5-turbo）或旧版完成 API（对于 babbage-002 和 davinci-002）中的参数，并使用 Playground 向其发出请求。

After your job is completed, the model should be available right away for inference use. In some cases, it may take several minutes for your model to become ready to handle requests. If requests to your model time out or the model name cannot be found, it is likely because your model is still being loaded. If this happens, try again in a few minutes.


工作完成后，模型应该立即可供推理使用。 在某些情况下，您的模型可能需要几分钟才能准备好处理请求。 如果对模型的请求超时或找不到模型名称，可能是因为您的模型仍在加载中。 如果发生这种情况，请在几分钟后重试。

```py
python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="ft:gpt-3.5-turbo:my-org:custom_suffix:id",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)
print(completion.choices[0].message)
```
You can start making requests by passing the model name as shown above and in our GPT guide.

您可以通过传递上面和我们的 GPT 指南中所示的型号名称来开始提出请求。

## Analyzing your fine-tuned model
We provide the following training metrics computed over the course of training: training loss, training token accuracy, test loss, and test token accuracy. These statistics are meant to provide a sanity check that training went smoothly (loss should decrease, token accuracy should increase). While an active fine-tuning jobs is running, you can view an event object which contains some useful metrics:

分析您的微调模型
我们提供在训练过程中计算的以下训练指标：训练损失、训练令牌准确性、测试损失和测试令牌准确性。 这些统计数据旨在提供健全性检查，确保训练顺利进行（损失应该减少，令牌准确性应该增加）。 当活动的微调作业正在运行时，您可以查看包含一些有用指标的事件对象：

```json
{
    "object": "fine_tuning.job.event",
    "id": "ftevent-abc-123",
    "created_at": 1693582679,
    "level": "info",
    "message": "Step 100/100: training loss=0.00",
    "data": {
        "step": 100,
        "train_loss": 1.805623287509661e-5,
        "train_mean_token_accuracy": 1.0
    },
    "type": "metrics"
}

```
After a fine-tuning job has finished, you can also see metrics around how the training process went by querying a fine-tuning job, extracting a file ID from the result_files, and then retrieving that files content. Each results CSV file has the following columns: step, train_loss, train_accuracy, valid_loss, and valid_mean_token_accuracy.

微调作业完成后，您还可以通过查询微调作业、从 result_files 中提取文件 ID，然后检索该文件内容来查看有关训练过程的指标。 每个结果 CSV 文件都包含以下列：step、train_loss、train_accuracy、valid_loss 和 valid_mean_token_accuracy。

- step,train_loss,train_accuracy,valid_loss,valid_mean_token_accuracy
- 1,1.52347,0.0,,
- 2,0.57719,0.0,,
- 3,3.63525,0.0,,
- 4,1.72257,0.0,,
- 5,1.52379,0.0,,
While metrics can he helpful, evaluating samples from the fine-tuned model provides the most relevant sense of model quality. We recommend generating samples from both the base model and the fine-tuned model on a test set, and comparing the samples side by side. The test set should ideally include the full distribution of inputs that you might send to the model in a production use case. If manual evaluation is too time-consuming, consider using our Evals library to automate future evaluations.

虽然指标很有帮助，但评估微调模型中的样本可以提供最相关的模型质量感觉。 我们建议在测试集上从基本模型和微调模型生成样本，并并排比较样本。 理想情况下，测试集应包括您可能在生产用例中发送到模型的输入的完整分布。 如果手动评估太耗时，请考虑使用我们的 Evals 库来自动执行未来的评估。

## Iterating on data quality
If the results from a fine-tuning job are not as good as you expected, consider the following ways to adjust the training dataset:

迭代数据质量
如果微调结果没有达到预期效果，请考虑以下方式调整训练数据集：


- Collect examples to target remaining issues
收集示例以解决剩余问题
- If the model still isn’t good at certain aspects, add training examples that directly show the model how to do these aspects correctly
如果模型在某些方面仍然不擅长，请添加训练示例，直接向模型展示如何正确地完成这些方面
- Scrutinize existing examples for issues
仔细检查现有示例是否存在问题
- If your model has grammar, logic, or style issues, check if your data has any of the same issues. For instance, if the model now says "I will schedule this meeting for you" (when it shouldn’t), see if existing examples teach the model to say it can do new things that it can’t do
如果您的模型存在语法、逻辑或样式问题，请检查您的数据是否存在任何相同的问题。 例如，如果模型现在说“我会为你安排这次会议”（其实不应该），看看现有的例子是否教模型说它可以做它不能做的新事情
- Consider the balance and diversity of data
考虑数据的平衡性和多样性

- If 60% of the assistant responses in the data says "I cannot answer this", but at inference time only 5% of responses should say that, you will likely get an overabundance of refusals
如果数据中 60% 的助理回答说“我无法回答这个问题”，但在推理时只有 5% 的回答应该这么说，那么您可能会得到过多的拒绝
- Make sure your training examples contain all of the information needed for the response
确保您的训练示例包含响应所需的所有信息
- If we want the model to compliment a user based on their personal traits and a training example includes assistant compliments for traits not found in the preceding conversation, the model may learn to hallucinate information
如果我们希望模型根据用户的个人特征来赞美用户，并且训练示例包括对先前对话中未找到的特征的辅助赞美，则模型可能会学习产生幻觉信息
- Look at the agreement / consistency in the training examples
查看训练示例中的一致性/一致性
- If multiple people created the training data, it’s likely that model performance will be limited by the level of agreement / consistency between people. For instance, in a text extraction task, if people only agreed on 70% of extracted snippets, the model would likely not be able to do better than this
如果多个人创建了训练数据，则模型性能可能会受到人们之间的一致性/一致性程度的限制。 例如，在文本提取任务中，如果人们仅同意 70% 的提取片段，则模型可能无法做得更好
- Make sure your all of your training examples are in the same format, as expected for inference
确保所有训练示例都采用相同的格式，正如推理所预期的那样
- Iterating on data quantity
迭代数据量
- Once you’re satisfied with the quality and distribution of the examples, you can consider scaling up the number of training examples. This tends to help the model learn the task better, especially around possible "edge cases". We expect a similar amount of improvement every time you double the number of training examples. You can loosely estimate the expected quality gain from increasing the training data size by:

一旦您对示例的质量和分布感到满意，您就可以考虑扩大训练示例的数量。 这往往有助于模型更好地学习任务，尤其是围绕可能的“边缘情况”。 每次将训练示例的数量增加一倍，我们预计都会有类似的改进。 您可以通过以下方式粗略地估计通过增加训练数据大小而获得的预期质量增益：

- Fine-tuning on your current dataset
对当前数据集进行微调
- Fine-tuning on half of your current dataset
对当前数据集的一半进行微调
- Observing the quality gap between the two
观察两者之间的质量差距
- In general, if you have to make a trade-off, a smaller amount of high-quality data is generally more effective than a larger amount of low-quality data.
一般来说，如果必须做出权衡，较少量的高质量数据通常比较大量的低质量数据更有效。


## Iterating on hyperparameters
We allow you to specify the following hyperparameters:
迭代超参数
我们允许您指定以下超参数：

- epochs
纪元
- learning rate multiplier
学习率乘数
- batch size
批量大小

We recommend initially training without specifying any of these, allowing us to pick a default for you based on dataset size, then adjusting if you observe the following:

我们建议最初进行训练时不指定任何这些，以便我们根据数据集大小为您选择默认值，然后在您观察到以下情况时进行调整：


If the model does not follow the training data as much as expected increase the number of epochs by 1 or 2
This is more common for tasks for which there is a single ideal completion (or a small set of ideal completions which are similar). Some examples include classification, entity extraction, or structured parsing. These are often tasks for which you can compute a final accuracy metric against a reference answer.

如果模型没有像预期那样遵循训练数据，则将 epoch 数量增加 1 或 2
对于只有一个理想完成（或一小组相似的理想完成）的任务来说，这种情况更为常见。 一些示例包括分类、实体提取或结构化解析。 这些通常是您可以根据参考答案计算最终准确性指标的任务。

If the model becomes less diverse than expected decrease the number of epochs by 1 or 2
This is more common for tasks for which there are a wide range of possible good completions


如果模型的多样性低于预期，则将 epoch 数量减少 1 或 2
对于有多种可能良好完成的任务来说，这种情况更为常见


If the model does not appear to be converging, increase the learning rate multiplier
You can set the hyperparameters as is shown below:

如果模型似乎没有收敛，请增加学习率乘数

您可以设置超参数，如下所示：

```PY
python
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123", 
  model="gpt-3.5-turbo", 
  hyperparameters={
    "n_epochs":2
  }
)
```

## Fine-tuning examples
Now that we have explored the basics of the fine-tuning API, let’s look at going through the fine-tuning lifecycle for a few different use cases.

现在我们已经探索了微调 API 的基础知识，让我们看看几个不同用例的微调生命周期。

- Style and tone
风格和基调
- Structured output
结构化输出
- Function calling
函数调用
- Migration of legacy models
遗留模型的迁移
For users migrating from /v1/fine-tunes to the updated /v1/fine_tuning/jobs API and newer models, the main difference you can expect is the updated API. The legacy prompt completion pair data format has been retained for the updated babbage-002 and davinci-002 models to ensure a smooth transition. The new models will support fine-tuning with 4k token context and have a knowledge cutoff of September 2021.

对于从 /v1/fine-tunes 迁移到更新的 /v1/fine_tuning/jobs API 和较新模型的用户，您可以预期的主要区别是更新的 API。 更新的 babbage-002 和 davinci-002 模型保留了旧的提示完成对数据格式，以确保平稳过渡。 新模型将支持 4k 代币上下文的微调，知识截止日期为 2021 年 9 月。

For most tasks, you should expect to get better performance from gpt-3.5-turbo than from the GPT base models.


对于大多数任务，您应该期望 gpt-3.5-turbo 比 GPT 基本模型获得更好的性能。

## FAQ
 
### When should I use fine-tuning vs embeddings / retrieval augmented generation?
Embeddings with retrieval is best suited for cases when you need to have a large database of documents with relevant context and information.


我什么时候应该使用微调与嵌入/检索增强生成？
带检索的嵌入最适合需要拥有具有相关上下文和信息的大型文档数据库的情况。

By default OpenAI’s models are trained to be helpful generalist assistants. Fine-tuning can be used to make a model which is narrowly focused, and exhibits specific ingrained behavior patterns. Retrieval strategies can be used to make new information available to a model by providing it with relevant context before generating its response. Retrieval strategies are not an alternative to fine-tuning and can in fact be complementary to it.

默认情况下，OpenAI 的模型被训练为有用的多面手助理。 微调可用于建立一个目标明确的模型，并展示特定的根深蒂固的行为模式。 检索策略可用于在生成响应之前向模型提供相关上下文，从而为模型提供新信息。 检索策略并不是微调的替代方案，实际上可以作为微调的补充。

You can explore the differences between these options further in our Developer Day talk:

您可以探索这些选项之间的差异将在我们的开发者日演讲中进一步介绍：

### Can I fine-tune GPT-4 or GPT-3.5-Turbo-16k?
GPT-4 fine-tuning is in experimental access and eligible developers can request access via the fine-tuning UI. Currently, gpt-3.5-turbo-1106 supports up to 16K context examples.

我可以微调 GPT-4 或 GPT-3.5-Turbo-16k 吗？
GPT-4 微调处于实验性访问阶段，符合条件的开发者可以通过微调 UI 请求访问。 目前，gpt-3.5-turbo-1106 支持最多 16K 上下文示例。

### How do I know if my fine-tuned model is actually better than the base model?
We recommend generating samples from both the base model and the fine-tuned model on a test set of chat conversations, and comparing the samples side by side. For more comprehensive evaluations, consider using the OpenAI evals framework to create an eval specific to your use case.


我如何知道我的微调模型是否实际上比基本模型更好？
我们建议在聊天对话测试集上从基本模型和微调模型生成样本，并并排比较样本。 如需更全面的评估，请考虑使用 OpenAI 评估框架来创建特定于您的用例的评估。

### Can I continue fine-tuning a model that has already been fine-tuned?
Yes, you can pass the name of a fine-tuned model into the model parameter when creating a fine-tuning job. This will start a new fine-tuning job using the fine-tuned model as the starting point.

已经微调过的模型还可以继续微调吗？
是的，您可以在创建微调作业时将微调模型的名称传递到模型参数中。 这将以微调模型为起点开始新的微调工作。

### How can I estimate the cost of fine-tuning a model?
Please refer to the estimate cost section above.

如何估算微调模型的成本？
请参阅上面的估算成本部分。

### Does the new fine-tuning endpoint still work with Weights & Biases for tracking metrics?
No, we do not currently support this integration but are working to enable it in the near future.

新的微调端点是否仍然可以与权重和偏差一起使用来跟踪指标？
不，我们目前不支持这种集成，但正在努力在不久的将来实现它。

### How many fine-tuning jobs can I have running at once?
Please refer to our rate limit guide for the most up to date information on the limits.

我可以同时运行多少个微调作业？
请参阅我们的费率限制指南，了解有关限制的最新信息。

### How do rate limits work on fine-tuned models?
A fine-tuned model pulls from the same shared rate limit as the model it is based off of. For example, if you use half your TPM rate limit in a given time period with the standard gpt-3.5-turbo model, any model(s) you fine-tuned from gpt-3.5-turbo would only have the remaining half of the TPM rate limit accessible since the capacity is shared across all models of the same type.

速率限制如何在微调模型上发挥作用？
经过微调的模型与它所基于的模型具有相同的共享速率限制。 例如，如果您在给定时间段内使用标准 gpt-3.5-turbo 模型的 TPM 速率限制的一半，则您从 gpt-3.5-turbo 微调的任何模型将仅具有 TPM 的剩余一半 由于容量在同一类型的所有型号之间共享，因此可以访问速率限制。

Put another way, having fine-tuned models does not give you more capacity to use our models from a total throughput perspective.


换句话说，从总吞吐量的角度来看，拥有微调模型并不能为您提供更多使用我们模型的能力。
