 
import { defineConfig, type DefaultTheme } from 'vitepress'

const BASEHOST="https://xlxm.cn"
// const BASEHOST="http://localhost:5173"

const BASEPATH="/document/akshare"
const BASEURL=`${BASEHOST}${BASEPATH}`
 
export default defineConfig({
  lang: 'en-US',
  title: 'AKShare',
  description: 'AKShare documents',
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
    logo: { src: '/favicon.svg', width: 24, height: 24 },

    nav: nav(),

    sidebar: {
      '/document/': { base: `${BASEURL}/document/`, items: document() },
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
      link: '/',
      activeMatch: '/'
    },
    {
      text: 'Document',
      link: '/document/tutorial',
      activeMatch: '/document/'
    },
 
  ]
}

 
 
function document(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'AKShare',
      collapsed: false,
      items: [
        { text: 'Tutorial', link: 'tutorial' },
        { text: 'Platform', link: 'platform' }, 
        { text: 'Dependency', link: 'dependency' },  
        { text: 'Demo', link: 'demo' }, 
        { text: 'Installation', link: 'installation' }, 
      ]
    },
    {
      text: 'Data',
      collapsed: false,
      items: [
        { text: 'bank', link: 'data/bank/bank' },
        { text: 'currency', link: 'data/currency/currency' }, 
        { text: 'fund', link: 'data/fund/fund_public' },  
        { text: 'stock', link: 'data/stock/stock' }, 
        { text: 'event', link: 'data/event/event' }, 
      ]
    },
  ]
}
 