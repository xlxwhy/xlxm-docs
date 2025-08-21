 
import { defineConfig, type DefaultTheme } from 'vitepress'

const BASEHOST="https://xlxm.cn"
// const BASEHOST="http://localhost:5173"

const BASEPATH="/document/openai"
const BASEURL=`${BASEHOST}${BASEPATH}`
 
export default defineConfig({
  lang: 'en-US',
  title: 'OpenAI',
  description: 'OpenAI documents',
  base: BASEPATH,
  lastUpdated: true,
  cleanUrls: false,

  markdown: {
    math: true
  },

 
  sitemap: {
    hostname: `${BASEURL}/`
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/openai.svg' }], 
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'xlxf and openai' }], 

    // <!-- Clarity tracking code for https://xlxf.cn/ -->
    // [
    //   'script',
    //   {},
    //   `
    //   (function(c,l,a,r,i,t,y){
    //       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    //       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    //       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    //     })(window, document, "clarity", "script", "k0ogsddggc");
    //   `
    // ],
    // <!-- Google tag (gtag.js) -->
    // [
    //   "script",
    //   { 
    //     async: "true", 
    //     src: "https://www.googletagmanager.com/gtag/js?id=G-BX7E3SHYKW"
    //   }
    // ],
    // [
    //   'script', {},
    //   `
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-BX7E3SHYKW');
    //   `
    // ],

    [
      "script",
      {
        "client": "ca-pub-6579111049316949",
        async: "true",
        crossorigin: "anonymous",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6579111049316949"
      }
    ]
  ], 
  themeConfig: {
    logo: { src: '/openai.svg', width: 24, height: 24 },

    nav: nav(),

    sidebar: {
      '/document/': { base: `${BASEURL}/document/`, items: document() },
      '/articles/': { base: `${BASEURL}/articles/`, items: articles() },
      // '/api-reference/': { base: '/api-reference/', items: sidebarReference() }
    },

 
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/openai' }
    // ],

 

    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '8J64VVRP8K',
    //     apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //     indexName: 'vitepress'
    //   }
    // },

 
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    
    {
      text: '资讯首页',
      link: `${BASEHOST}`,
      activeMatch: '/'
    },
    {
      text: 'Document',
      link: '/document/introduction',
      activeMatch: '/document/'
    },
    {
      text: 'Articles',
      link: '/articles/how_to_work_with_large_language_models',
      activeMatch: '/articles/'
    },
    // {
    //   text: 'API Reference',
    //   link: '/reference/site-config',
    //   activeMatch: '/reference/'
    // }, 
  ]
}

  
function articles(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Articles',
      collapsed: false,
      items: [
        { text: 'how_to_work_with_large_language_models', link: 'how_to_work_with_large_language_models' },
        { text: 'openai-harmony', link: 'openai-harmony' },
        { text: 'related_resources', link: 'related_resources' },
        { text: 'techniques_to_improve_reliability', link: 'techniques_to_improve_reliability' },
        { text: 'text_comparison_examples', link: 'text_comparison_examples' },
        { text: 'what_is_new_with_dalle_3', link: 'what_is_new_with_dalle_3' },
        { text: 'what_makes_documentation_good', link: 'what_makes_documentation_good' },
 

      ]
    },
    {
      text: 'GPT-OSS',
      collapsed: false,
      items: [ 
        { text: 'handle-raw-cot', link: 'handle-raw-cot' },
        { text: 'run-locally-lmstudio', link: 'run-locally-lmstudio' },
        { text: 'run-locally-ollama', link: 'run-locally-ollama' },
        { text: 'run-transformers', link: 'run-transformers' },
        { text: 'run-vllm', link: 'run-vllm' },
        { text: 'verifying-implementations', link: 'verifying-implementations' }, 

      ]
    },
  ]
}
 
function document(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'GET STARTED',
      collapsed: false,
      items: [
        { text: 'Introduction', link: 'introduction' },
        { text: 'Quickstart', link: 'quickstart' },
        { text: 'Models', link: 'models' },
        { text: 'Tutorials', link: 'tutorials' },
        { text: 'Changelog', link: 'changelog' }
      ]
    },
    {
      text: 'CAPABILITIES',
      collapsed: false,
      items: [
        { text: 'Text generation', link: 'text-generation' },
        { text: 'Function calling', link: 'function-calling' },
        { text: 'Embeddings', link: 'embeddings' },
        { text: 'Fine-tuning', link: 'fine-tuning' },
        { text: 'Image generation', link: 'image-generation' },
        { text: 'Vision', link: 'vision' },
        { text: 'Text-to-speech', link: 'text-to-speech' },
        { text: 'Speech-to-text', link: 'speech-to-text' },
        { text: 'Moderation', link: 'moderation' }, 
      ]
    },
    {
      text: 'ASSISTANTS',
      collapsed: false,
      items: [
        { text: 'Overview', link: 'overview' },
        { text: 'How Assistants work', link: 'how-assistants-work' },
        { text: 'Tools', link: 'tools' }, 
      ]
    },
    {
      text: 'GUIDES',
      collapsed: false,
      items: [
        { text: 'Prompt engineering', link: 'prompt-engineering' }, 
        { text: 'Production best practices', link: 'production-best-practices' }, 
        { text: 'Safety best practices', link: 'safety-best-practices' }, 
        { text: 'Rate limits', link: 'rate-limits' }, 
        { text: 'Error codes', link: 'error-codes' }, 
        { text: 'Libraries', link: 'libraries' }, 
        { text: 'Deprecations', link: 'deprecations' }, 
        { text: 'Policies', link: 'policies' },  
      ]
    }, 
    {
      text: 'CHATGPT',
      collapsed: false,
      items: [ 
        { text: 'Actions', link: 'actions' }, 
        { text: 'Plugins', link: 'plugins' },  
      ]
    }, 
  ]
}
 