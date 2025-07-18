Rate limits
Rate limits are restrictions that our API imposes on the number of times a user or client can access our services within a specified period of time.
Why do we have rate limits?
Rate limits are a common practice for APIs, and they're put in place for a few different reasons:

They help protect against abuse or misuse of the API. For example, a malicious actor could flood the API with requests in an attempt to overload it or cause disruptions in service. By setting rate limits, OpenAI can prevent this kind of activity.
Rate limits help ensure that everyone has fair access to the API. If one person or organization makes an excessive number of requests, it could bog down the API for everyone else. By throttling the number of requests that a single user can make, OpenAI ensures that the most number of people have an opportunity to use the API without experiencing slowdowns.
Rate limits can help OpenAI manage the aggregate load on its infrastructure. If requests to the API increase dramatically, it could tax the servers and cause performance issues. By setting rate limits, OpenAI can help maintain a smooth and consistent experience for all users.
Please work through this document in its entirety to better understand how OpenAI’s rate limit system works. We include code examples and possible solutions to handle common issues. We also include details around how your rate limits are automatically increased in the usage tiers section below.
How do these rate limits work?
Rate limits are measured in five ways: RPM (requests per minute), RPD (requests per day), TPM (tokens per minute), TPD (tokens per day), and IPM (images per minute). Rate limits can be hit across any of the options depending on what occurs first. For example, you might send 20 requests with only 100 tokens to the ChatCompletions endpoint and that would fill your limit (if your RPM was 20), even if you did not send 150k tokens (if your TPM limit was 150k) within those 20 requests.

Other important things worth noting:

Rate limits are imposed at the organization level, not user level.
Rate limits vary by the model being used.
Limits are also placed on the total amount an organization can spend on the API each month. These are also known as "usage limits".
Usage tiers
You can view the rate and usage limits for your organization under the limits section of your account settings. As your usage of the OpenAI API and your spend on our API goes up, we automatically graduate you to the next usage tier. This usually results in an increase in rate limits across most models. Organizations in higher tiers also get access to lower latency models.

TIER	QUALIFICATION	USAGE LIMITS
Free	User must be in an allowed geography	$100 / month
Tier 1	$5 paid	$100 / month
Tier 2	$50 paid and 7+ days since first successful payment	$500 / month
Tier 3	$100 paid and 7+ days since first successful payment	$1,000 / month
Tier 4	$250 paid and 14+ days since first successful payment	$5,000 / month
Tier 5	$1,000 paid and 30+ days since first successful payment	$10,000 / month
Select a tier below to view a high-level summary of rate limits per model.

Free tier rate limits
This is a high level summary and there are per-model exceptions to these limits (e.g. some legacy models or models with larger context windows have different rate limits). To view the exact rate limits per model for your account, visit the limits section of your account settings.

MODEL	RPM	RPD	TPM	TPD
gpt-3.5-turbo	3	200	20,000	
text-embedding-ada-002	3	200	150,000	
whisper-1	3	200		
tts-1	3	200		
dall-e-2	5 img/min			
dall-e-3	1 img/min			
* The models gpt-4-1106-preview and gpt-4-vision-preview are currently under preview with restrictive rate limits that make them suitable for testing and evaluations, but not for production usage. We plan to increase these limits gradually in the coming weeks with an intention to match current gpt-4 rate limits once the models graduate from preview. As these models are adopted for production workloads we expect latency to increase modestly compared to this preview phase.

Rate limits in headers
In addition to seeing your rate limit on your account page, you can also view important information about your rate limits such as the remaining requests, tokens, and other metadata in the headers of the HTTP response.

You can expect to see the following header fields:

FIELD	SAMPLE VALUE	DESCRIPTION
x-ratelimit-limit-requests	60	The maximum number of requests that are permitted before exhausting the rate limit.
x-ratelimit-limit-tokens	150000	The maximum number of tokens that are permitted before exhausting the rate limit.
x-ratelimit-remaining-requests	59	The remaining number of requests that are permitted before exhausting the rate limit.
x-ratelimit-remaining-tokens	149984	The remaining number of tokens that are permitted before exhausting the rate limit.
x-ratelimit-reset-requests	1s	The time until the rate limit (based on requests) resets to its initial state.
x-ratelimit-reset-tokens	6m0s	The time until the rate limit (based on tokens) resets to its initial state.
Error Mitigation
What are some steps I can take to mitigate this?
The OpenAI Cookbook has a Python notebook that explains how to avoid rate limit errors, as well an example Python script for staying under rate limits while batch processing API requests.

You should also exercise caution when providing programmatic access, bulk processing features, and automated social media posting - consider only enabling these for trusted customers.

To protect against automated and high-volume misuse, set a usage limit for individual users within a specified time frame (daily, weekly, or monthly). Consider implementing a hard cap or a manual review process for users who exceed the limit.

Retrying with exponential backoff
One easy way to avoid rate limit errors is to automatically retry requests with a random exponential backoff. Retrying with exponential backoff means performing a short sleep when a rate limit error is hit, then retrying the unsuccessful request. If the request is still unsuccessful, the sleep length is increased and the process is repeated. This continues until the request is successful or until a maximum number of retries is reached. This approach has many benefits:

Automatic retries means you can recover from rate limit errors without crashes or missing data
Exponential backoff means that your first retries can be tried quickly, while still benefiting from longer delays if your first few retries fail
Adding random jitter to the delay helps retries from all hitting at the same time.
Note that unsuccessful requests contribute to your per-minute limit, so continuously resending a request won’t work.

Below are a few example solutions for Python that use exponential backoff.

Example 1: Using the Tenacity library
Example 2: Using the backoff library
Example 3: Manual backoff implementation
Reduce the max_tokens to match the size of your completions
Your rate limit is calculated as the maximum of max_tokens and the estimated number of tokens based on the character count of your request. Try to set the max_tokens value as close to your expected response size as possible.

Batching requests
The OpenAI API has separate limits for requests per minute and tokens per minute.

If you're hitting the limit on requests per minute, but have available capacity on tokens per minute, you can increase your throughput by batching multiple tasks into each request. This will allow you to process more tokens per minute, especially with our smaller models.

Sending in a batch of prompts works exactly the same as a normal API call, except you pass in a list of strings to the prompt parameter instead of a single string.

Example without batching
Example with batching
Warning: the response object may not return completions in the order of the prompts, so always remember to match responses back to prompts using the index field.