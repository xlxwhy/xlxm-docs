
// const BASEPATH="https://xlxf.cn"
// const BASEPATH="http://localhost:5173"
const BASEPATH = ""


module.exports = {
  outline: {
    label: "目录大纲"
  },
  lastUpdatedText: "最近更新",

  nav: [

    // {
    //   text: '技术文档',
    //   items: [
    //     { text: 'OpenAPI', link: `${BASEPATH}/document/openai/document/introduction` },
    //     { text: 'ViteJS', link: `${BASEPATH}/document/vitejs/guide/` },
    //     { text: 'VitePress', link: `${BASEPATH}/document/vitepress/guide/what-is-vitepress` },
    //   ]
    // },

    { text: '技术文章', link: `${BASEPATH}/zh/article/content` },
    { text: '技术文档', link: `${BASEPATH}/zh/document/content` },
    { text: '热点资讯', link: `${BASEPATH}/zh/news/content` },
  ],

  sidebar: {
    "/zh/news/": [
      {
        text: '热点资讯',
        items: [
          { link: `${BASEPATH}/zh/news/content`, text: '最新资讯' },
          { link: `${BASEPATH}/zh/news/75927920-microsoft`, text: '微软技术故障' },
        ]

      }
    ],
    "/zh/document/": [
      {
        text: '技术文档',
        items: [
          { text: 'MES', link: `${BASEPATH}/zh/document/75927920-mes` },
        ]
      }
    ],
    "/zh/article/": [
      {
        text: '技术文章',
        items: [
          { text: 'OpenAPI标准', link: `${BASEPATH}/zh/article/75927920-openapi` },
        ]
      }
    ]
  },
  footer: {
    message: '<a href="/zh/site/about.html">关于我们</a> | <a href="/zh/site/contact.html">联系我们</a> | <a href="/zh/site/disclaimer.html">免责声明</a> | <a href="/zh/site/privacy.html">隐私条款</a> | <a href="/sitemap.xml">网站地图</a>',
    copyright: 'Copyright © 2018-present xlxm.cn ICP备案 '
  },
  docFooter: { prev: "上一篇", next: "下一篇" }
}


