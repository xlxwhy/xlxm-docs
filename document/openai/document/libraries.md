Libraries
Python library
We provide a Python library, which you can install as follows:

$ pip install openai
Once installed, you can use the bindings and your secret key to run the following:

from openai import OpenAI
client = OpenAI(
    # Defaults to os.environ.get("OPENAI_API_KEY")
    # Otherwise use: api_key="Your_API_Key",
)

chat_completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello world"}]
)
The bindings also will install a command-line utility you can use as follows:

$ openai api chat_completions.create -m gpt-3.5-turbo -g user "Hello world"
Node.js library
We also have a Node.js library, which you can install by running the following command in your Node.js project directory:

$ npm install openai
Once installed, you can use the library and your secret key to run the following:

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
});
Azure OpenAI libraries
Microsoft's Azure team maintains libraries that are compatible with both the OpenAI API and Azure OpenAI services. Read the library documentation below to learn how you can use them with the OpenAI API.

Azure OpenAI client library for .NET
Azure OpenAI client library for JavaScript
Azure OpenAI client library for Java
Azure OpenAI client library for Go
Community libraries
The libraries below are built and maintained by the broader developer community. If you'd like to add a new library here, please follow the instructions in our help center article on adding community libraries. You can also watch our OpenAPI specification repository on GitHub to get timely updates on when we make changes to our API.

Please note that OpenAI does not verify the correctness or security of these projects. Use them at your own risk!

C# / .NET
Betalgo.OpenAI by Betalgo
OpenAI-API-dotnet by OkGoDoIt
OpenAI-DotNet by RageAgainstThePixel
C++
liboai by D7EAD
Clojure
openai-clojure by wkok
Crystal
openai-crystal by sferik
Dart/Flutter
openai by anasfik
Delphi
DelphiOpenAI by HemulGM
Elixir
openai.ex by mgallo
Go
go-gpt3 by sashabaranov
Java
openai-java by Theo Kanning
Julia
OpenAI.jl by rory-linehan
Kotlin
openai-kotlin by Mouaad Aallam
Node.js
openai-api by Njerschow
openai-api-node by erlapso
gpt-x by ceifa
gpt3 by poteat
gpts by thencc
@dalenguyen/openai by dalenguyen
tectalic/openai by tectalic
PHP
orhanerday/open-ai by orhanerday
tectalic/openai by tectalic
openai-php clinet by openai-php
Python
chronology by OthersideAI
R
rgpt3 by ben-aaron188
Ruby
openai by nileshtrivedi
ruby-openai by alexrudall
Rust
async-openai by 64bit
fieri by lbkolev
Scala
openai-scala-client by cequence-io
Swift
OpenAIKit by dylanshine
OpenAI by MacPaw
Unity
OpenAi-Api-Unity by hexthedev
com.openai.unity by RageAgainstThePixel
Unreal Engine
OpenAI-Api-Unreal by KellanM