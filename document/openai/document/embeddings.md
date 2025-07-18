# Embeddings
What are embeddings?
OpenAI’s text embeddings measure the relatedness of text strings. Embeddings are commonly used for:

嵌入
什么是嵌入？
OpenAI 的文本嵌入衡量文本字符串的相关性。 嵌入通常用于：


- Search (where results are ranked by relevance to a query string)
搜索（结果按与查询字符串的相关性排名）
- Clustering (where text strings are grouped by similarity)
聚类（文本字符串按相似性分组）
- Recommendations (where items with related text strings are recommended)
推荐（推荐具有相关文本字符串的项目）
- Anomaly detection (where outliers with little relatedness are identified)
异常检测（识别出相关性很小的异常值）
- Diversity measurement (where similarity distributions are analyzed)
多样性测量（分析相似性分布）
- Classification (where text strings are classified by their most similar label)
分类（文本字符串按最相似的标签进行分类）

We are excited to announce that the new Assistants API comes with retrieval and built in message history management. If you don't want to worry about making and storing embeddings yourself, check out the Assistants API to learn more.


我们很高兴地宣布，新的 Assistants API 具有检索功能和内置消息历史记录管理功能。 如果您不想自己制作和存储嵌入，请查看 Assistants API 以了解更多信息。

An embedding is a vector (list) of floating point numbers. The distance between two vectors measures their relatedness. Small distances suggest high relatedness and large distances suggest low relatedness.

嵌入是浮点数的向量（列表）。 两个向量之间的距离衡量它们的相关性。 距离小表明相关性高，距离大表明相关性低。

Visit our pricing page to learn about Embeddings pricing. Requests are billed based on the number of tokens in the input sent.

请访问我们的定价页面，了解嵌入定价。 请求根据发送的输入中的令牌数量进行计费。

To see embeddings in action, check out our code samples


要查看嵌入的实际效果，请查看我们的代码示例

- Classification
- Topic clustering
- Search
- Recommendations


## How to get embeddings
To get an embedding, send your text string to the embeddings API endpoint along with a choice of embedding model ID (e.g., text-embedding-ada-002). The response will contain an embedding, which you can extract, save, and use.

要获得嵌入，请将文本字符串以及嵌入模型 ID 的选择（例如，text-embedding-ada-002）发送到嵌入 API 端点。 响应将包含一个嵌入，您可以提取、保存和使用它。

Example requests:

Example: Getting embeddings
```sh
curl
curl https://api.openai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-ada-002"
  }'
Example response:

{
  "data": [
    {
      "embedding": [
        -0.006929283495992422,
        -0.005336422007530928,
        ...
        -4.547132266452536e-05,
        -0.024047505110502243
      ],
      "index": 0,
      "object": "embedding"
    }
  ],
  "model": "text-embedding-ada-002",
  "object": "list",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
```
See more Python code examples in the OpenAI Cookbook.

请参阅 OpenAI Cookbook 中的更多 Python 代码示例。

When using OpenAI embeddings, please keep in mind their limitations and risks.

使用 OpenAI 嵌入时，请记住其局限性和风险。

## Embedding models
OpenAI offers one second-generation embedding model (denoted by -002 in the model ID) and 16 first-generation models (denoted by -001 in the model ID).

嵌入模型
OpenAI提供1个第二代嵌入模型（模型ID中用-002表示）和16个第一代模型（模型ID中用-001表示）。

We recommend using text-embedding-ada-002 for nearly all use cases. It’s better, cheaper, and simpler to use. Read the blog post announcement.

我们建议对几乎所有用例使用 text-embedding-ada-002。 它更好、更便宜、使用更简单。 阅读博客文章公告。

MODEL GENERATION	TOKENIZER	MAX INPUT TOKENS	KNOWLEDGE CUTOFF

模型生成 标记器 最大输入标记 知识截止

- V2	cl100k_base	8191	Sep 2021
V2 cl100k_base 8191 2021 年 9 月
- V1	GPT-2/GPT-3	2046	Aug 2020
V1 GPT-2/GPT-3 2046 2020 年 8 月

Usage is priced per input token, at a rate of $0.0004 per 1000 tokens, or about ~3,000 pages per US dollar (assuming ~800 tokens per page):

使用按输入令牌定价，每 1000 个令牌 0.0004 美元，或每美元约 3,000 个页面（假设每页约 800 个令牌）：

- MODEL	ROUGH PAGES PER DOLLAR	EXAMPLE PERFORMANCE ON BEIR SEARCH EVAL
- text-embedding-ada-002	3000	53.9
- *-davinci-*-001	6	52.8
- *-curie-*-001	60	50.9
- *-babbage-*-001	240	50.4
- *-ada-*-001	300	49.0
- Second-generation models
- MODEL NAME	TOKENIZER	MAX INPUT TOKENS	OUTPUT DIMENSIONS
- text-embedding-ada-002	cl100k_base	8191	1536
- First-generation models (not recommended)

## Use cases
Here we show some representative use cases. We will use the Amazon fine-food reviews dataset for the following examples.

这里我们展示了一些有代表性的用例。 我们将在以下示例中使用亚马逊美食评论数据集。

## Obtaining the embeddings
The dataset contains a total of 568,454 food reviews Amazon users left up to October 2012. We will use a subset of 1,000 most recent reviews for illustration purposes. The reviews are in English and tend to be positive or negative. Each review has a ProductId, UserId, Score, review title (Summary) and review body (Text). For example:


获取嵌入
该数据集包含截至 2012 年 10 月亚马逊用户留下的总共 568,454 条食品评论。出于说明目的，我们将使用 1,000 条最新评论的子集。 评论是英文的，往往是正面的或负面的。 每条评论都有 ProductId、UserId、Score、评论标题（摘要）和评论正文（文本）。 例如：

- PRODUCT ID	USER ID	SCORE	SUMMARY	TEXT
产品 ID 用户 ID 分数摘要文本
- B001E4KFG0	A3SGXH7AUHU8GW	5	Good Quality Dog Food	I have bought several of the Vitality canned...
B001E4KFG0 A3SGXH7AUHU8GW 5 优质狗粮 我买了几罐活力罐装...
- B00813GRG4	A1D87F6ZCVE5NK	1	Not as Advertised	Product arrived labeled as Jumbo Salted Peanut...
B00813GRG4 A1D87F6ZCVE5NK 1 与广告不同的产品到达时标记为巨型咸花生...

We will combine the review summary and review text into a single combined text. The model will encode this combined text and output a single vector embedding.

我们将把评论摘要和评论文本合并成一个组合文本。 该模型将对组合文本进行编码并输出单个向量嵌入。

Get embeddings from dataset
```py
from openai import OpenAI
client = OpenAI()

def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return client.embeddings.create(input = [text], model=model).data[0].embedding

df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x, model='text-embedding-ada-002'))
df.to_csv('output/embedded_1k_reviews.csv', index=False)
```
To load the data from a saved file, you can run the following:
要从保存的文件加载数据，您可以运行以下命令：

```py
import pandas as pd

df = pd.read_csv('output/embedded_1k_reviews.csv')
df['ada_embedding'] = df.ada_embedding.apply(eval).apply(np.array)
```
 

- Data visualization in 2D
二维数据可视化
- Embedding as a text feature encoder for ML algorithms
嵌入作为 ML 算法的文本特征编码器
- Classification using the embedding features
使用嵌入特征进行分类
- Zero-shot classification
零样本分类
- Obtaining user and product embeddings for cold-start recommendation
获取用户和产品嵌入以进行冷启动推荐
- Clustering
聚类
- Text search using embeddings
使用嵌入的文本搜索
- Code search using embeddings
使用嵌入进行代码搜索
- Recommendations using embeddings
推荐


## Limitations & risks
Our embedding models may be unreliable or pose social risks in certain cases, and may cause harm in the absence of mitigations.

我们的嵌入模型可能不可靠，或者在某些情况下会带来社会风险，并且在没有缓解措施的情况下可能会造成损害。



## Social bias
Limitation: The models encode social biases, e.g. via stereotypes or negative sentiment towards certain groups.


社会偏见
局限性：模型编码了社会偏见，例如 通过对某些群体的刻板印象或负面情绪。

We found evidence of bias in our models via running the SEAT (May et al, 2019) and the Winogender (Rudinger et al, 2018) benchmarks. Together, these benchmarks consist of 7 tests that measure whether models contain implicit biases when applied to gendered names, regional names, and some stereotypes.


我们通过运行 SEAT（May 等人，2019 年）和 Winogender（Rudinger 等人，2018 年）基准测试发现了模型中存在偏差的证据。 这些基准由 7 项测试组成，用于衡量模型在应用于性别名称、地区名称和一些刻板印象时是否包含隐性偏见。


For example, we found that our models more strongly associate (a) European American names with positive sentiment, when compared to African American names, and (b) negative stereotypes with black women.


例如，我们发现，与非裔美国人的名字相比，我们的模型更强烈地将（a）欧洲裔美国人的名字与积极情绪联系起来，以及（b）与黑人女性的负面刻板印象。

These benchmarks are limited in several ways: (a) they may not generalize to your particular use case, and (b) they only test for a very small slice of possible social bias.

这些基准在几个方面受到限制：（a）它们可能无法推广到您的特定用例，（b）它们仅测试一小部分可能的社会偏见。

These tests are preliminary, and we recommend running tests for your specific use cases. These results should be taken as evidence of the existence of the phenomenon, not a definitive characterization of it for your use case. Please see our usage policies for more details and guidance.


这些测试是初步的，我们建议针对您的特定用例运行测试。 这些结果应被视为该现象存在的证据，而不是您的用例的明确特征。 请参阅我们的使用政策以获取更多详细信息和指导。

Please contact our support team via chat if you have any questions; we are happy to advise on this.

如果您有任何疑问，请通过聊天联系我们的支持团队； 我们很乐意就此提供建议。

Blindness to recent events
Limitation: Models lack knowledge of events that occurred after August 2020.

对最近发生的事件视而不见
局限性：模型缺乏 2020 年 8 月之后发生的事件的知识。

Our models are trained on datasets that contain some information about real world events up until 8/2020. If you rely on the models representing recent events, then they may not perform well.

我们的模型是在包含截至 8/2020 年现实世界事件的一些信息的数据集上进行训练的。 如果您依赖代表最近事件的模型，那么它们可能表现不佳。

Frequently asked questions
How can I tell how many tokens a string has before I embed it?
In Python, you can split a string into tokens with OpenAI's tokenizer tiktoken.


经常问的问题
在嵌入字符串之前如何知道它有多少个标记？
在 Python 中，您可以使用 OpenAI 的标记器 tiktoken 将字符串拆分为标记。

Example code:
```py
import tiktoken

def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

num_tokens_from_string("tiktoken is great!", "cl100k_base")
```
For second-generation embedding models like text-embedding-ada-002, use the cl100k_base encoding.

对于第二代嵌入模型（例如 text-embedding-ada-002），请使用 cl100k_base 编码。

More details and example code are in the OpenAI Cookbook guide how to count tokens with tiktoken.

更多详细信息和示例代码请参阅 OpenAI Cookbook 指南如何使用 tiktoken 计算代币。

How can I retrieve K nearest embedding vectors quickly?
For searching over many vectors quickly, we recommend using a vector database. You can find examples of working with vector databases and the OpenAI API in our Cookbook on GitHub.

如何快速检索 K 个最近的嵌入向量？
为了快速搜索许多向量，我们建议使用向量数据库。 您可以在 GitHub 上的 Cookbook 中找到使用矢量数据库和 OpenAI API 的示例。

Vector database options include:

矢量数据库选项包括：

- Chroma, an open-source embeddings store
Chroma，开源嵌入商店
- Elasticsearch, a popular search/analytics engine and vector database
Elasticsearch，流行的搜索/分析引擎和矢量数据库
- Milvus, a vector database built for scalable similarity search
Milvus，一个为可扩展相似性搜索而构建的矢量数据库
- Pinecone, a fully managed vector database
Pinecone，完全托管的矢量数据库
- Qdrant, a vector search engine
Qdrant，矢量搜索引擎
- Redis as a vector database
Redis 作为向量数据库
- Typesense, fast open source vector search
Typesense，快速开源矢量搜索
- Weaviate, an open-source vector search engine
Weaviate，开源矢量搜索引擎
- Zilliz, data infrastructure, powered by Milvus
Zilliz，数据基础设施，由 Milvus 提供支持
- Which distance function should I use?
我应该使用哪个距离函数？

We recommend cosine similarity. The choice of distance function typically doesn’t matter much.

我们推荐余弦相似度。 距离函数的选择通常并不重要。

OpenAI embeddings are normalized to length 1, which means that:

OpenAI 嵌入标准化为长度 1，这意味着：

- Cosine similarity can be computed slightly faster using just a dot product
仅使用点积即可稍微更快地计算余弦相似度
- Cosine similarity and Euclidean distance will result in the identical rankings
余弦相似度和欧氏距离将导致相同的排名
- Can I share my embeddings online?
我可以在线分享我的嵌入吗？
- Customers own their input and output from our models, including in the case of embeddings. You are responsible for ensuring that the content you input to our API does not violate any applicable law or our Terms of Use.

客户拥有我们模型的输入和输出，包括嵌入的情况。 您有责任确保您输入到我们的 API 的内容不违反任何适用的法律或我们的使用条款。
