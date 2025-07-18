# Chat Plugins Beta
Learn how to build a plugin that allows ChatGPT to intelligently call your API.

Looking for ChatGPT? Head to chat.openai.com.
## GPTs and custom Actions are here!

We’re rolling out custom versions of ChatGPT that you can create for a specific purpose—called GPTs. GPTs are a new way for anyone to create a tailored version of ChatGPT to be more helpful in their daily life, at specific tasks, at work, or at home—and then share that creation with others. We are excited to announce Actions, which build on plugins. Actions take many of the core ideas of plugins while also introducing many new features builders have been asking for.
Introduction
OpenAI plugins connect ChatGPT to third-party applications. These plugins enable ChatGPT to interact with APIs defined by developers, enhancing ChatGPT's capabilities and allowing it to perform a wide range of actions. Plugins enable ChatGPT to do things like:

Retrieve real-time information; e.g., sports scores, stock prices, the latest news, etc.
Retrieve knowledge-base information; e.g., company docs, personal notes, etc.
Assist users with actions; e.g., booking a flight, ordering food, etc.
If you want to have an example running as you read through the documentation and learn more about plugins, you can begin with our plugin quickstart repo.

Plugin developers expose one or more API endpoints, accompanied by a standardized manifest file and an OpenAPI specification. These define the plugin's functionality, allowing ChatGPT to consume the files and make calls to the developer-defined APIs.

The AI model acts as an intelligent API caller. Given an API spec and a natural-language description of when to use the API, the model proactively calls the API to perform actions. For instance, if a user asks, "Where should I stay in Paris for a couple nights?", the model may choose to call a hotel reservation plugin API, receive the API response, and generate a user-facing answer combining the API data and its natural language capabilities.

Over time, we anticipate the system will evolve to accommodate more advanced use cases.

## Plugin flow
To build a plugin, it is important to understand the end-to-end flow.

Create a manifest file and host it at yourdomain.com/.well-known/ai-plugin.json

The file includes metadata about your plugin (name, logo, etc.), details about authentication required (type of auth, OAuth URLs, etc.), and an OpenAPI spec for the endpoints you want to expose.
The model will see the OpenAPI description fields, which can be used to provide a natural language description for the different fields.
We suggest exposing only 1-2 endpoints in the beginning with a minimum number of parameters to minimize the length of the text. The plugin description, API requests, and API responses are all inserted into the conversation with ChatGPT. This counts against the context limit of the model.
Register your plugin in the ChatGPT UI

Select the plugin model from the top drop down, then select “Plugins”, “Plugin Store”, and finally “Develop your own plugin”.
If authentication is required, provide an OAuth 2 client_id and client_secret or an API key.
Users activate your plugin

Users must manually activate your plugin in the ChatGPT UI. (ChatGPT will not use your plugin by default.)
You will be able to share your plugin with 100 additional users (only other developers can install unverified plugins).
If OAuth is required, users will be redirected via OAuth to your plugin to sign in.
Users begin a conversation

OpenAI will inject a compact description of your plugin in a message to ChatGPT, invisible to end users. This will include the plugin description, endpoints, and examples.
When a user asks a relevant question, the model may choose to invoke an API call from your plugin if it seems relevant; for POST requests, we require that developers build a user confirmation flow to avoid destruction actions.
The model will incorporate the API call results into its response to the user.
The model might include links returned from the API calls in its response. These will be displayed as rich previews (using the OpenGraph protocol, where we pull the site_name, title, description, image, and url fields).
The model can also format data from your API in markdown and the ChatGPT UI will render the markdown automatically.
Currently, we will be sending the user’s country and state in the Plugin conversation header (if you are in California for example, it would look like {"openai-subdivision-1-iso-code": "US-CA"}. This is useful for shopping, restaurants, weather, and more. You can read more in our developer terms of use.

## Next steps
Now that you know the basics of plugins, you might want to:

- Get started building a plugin
- Explore example plugins
- Find the right plugin authentication schema
- Read about important steps for productionizing your plugin
- Learn about the plugin review process
- Familiarize yourself with the plugin policies