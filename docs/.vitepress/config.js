
const configEn=require("./configs/config-en.js")
const configZh=require("./configs/config-zh.js")
 
 
module.exports = {
  lang: "zh",
  base:"/",
  lastUpdated: true,
  appearance: "light", 
  ignoreDeadLinks: true,
  locales: {
    root: { 
      title: '聚合资讯及服务',
      description: '聚合资讯及服务',
      themeConfig: configZh
    },
    // "zh": {
    //   label: '中文', 
    //   title: 'xlxm',
    //   description: '云平台技术资讯及服务',
    //   themeConfig: configZh
    // },
    // "en": {
    //   label: 'English', 
    //   title: 'XiaoLu School',
    //   description: 'A network school',
    //   themeConfig: configEn
    // }
  },
  
  // vitepress对自动广告的适应比较差
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
    // Adsense
    [
      "script",
      {
        "client": "ca-pub-6579111049316949",
        async: true,
        crossorigin: "anonymous",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6579111049316949"
      }
    ]
    ,
    // Adsense 广告拦截收入挽回，无法访问google.com
    // [
    //   "script",
    //   { 
    //     nonce: "8_Y3EEAzCOpbhbeJJhVnDQ",
    //     async: true,
    //     crossorigin: "anonymous",
    //     src: "https://fundingchoicesmessages.google.com/i/pub-6579111049316949?ers=1"
    //   }
    // ],
    // [
    //   'script', {nonce: "8_Y3EEAzCOpbhbeJJhVnDQ"},
    //   `
    //   (function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();
    //   `
    // ],
 
    // [
    //   "script",
    //   {  
    //     async: true, 
    //     src: "https://docs.opencv.org/master/opencv.js"
    //   }
    // ],
 
 
  ],

  markdown: {
      lineNumbers: true
  },
  themeConfig: {
    logo: '/favicon.svg',
    aside: false,
    outline: {
      level: "deep", 
    },    


    locales: {
      // 原本 themeConfig 下所有需要转换的信息通过手动写两套配置的方式全部处理一下
      // 例如 
      // 中文展示 docFooter: { prev: "上一页", next: "下一页" }
      // 英文展示 docFooter: { prev: "Pre page", next: "Next page" }
      "/zh": configZh,
      "/en/": configEn
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/whimpark/xlxf.github.io' }
    // ],
    search: {
      provider: 'local'
    }
  },
  sitemap: {
    hostname: 'https://docs.xlxm.cn'
  }
}


