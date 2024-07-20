
module.exports = {
  outline: {
    label: "Content"
  },
  lastUpdatedText: "Last Updated",
  nav: [
    { text: 'Home', link: '/en/index' },
    {
      text: 'Note',
      items: [
        { text: 'Idea', link: '/en/note/997-231008-idea' },
        { text: 'Stock Predict', link: '/en/note/996-231008-stock' },
        { text: 'VuePress', link: '/en/note/997-231008-vuepress' }
      ]
    },
    {
      text: 'News',
      items: [
        { text: 'International News', link: '/en/news/wikipedia/index' },
      ]
    }
  ],

  sidebar: [
    {
      text: 'Note',
      items: [
        { link: '/en/note/996-231008-stock', text: 'Stock Predict' },
        { link: '/en/note/996-231008-seo', text: 'Adsense' },
        { link: '/en/note/996-231009-webservice', text: 'WebService' },
        { link: '/en/note/997-231008-vitepress', text: 'VitePress' },
        { link: '/en/note/997-231008-vuepress', text: 'VuePress' },
        { link: '/en/note/997-231008-idea', text: 'Idea' },
      ]
    }
  ],

  footer: {
    message: '<a href="/en/site/about.html">About</a> | <a href="/en/site/contact.html">Contact</a>',
    copyright: 'Copyright © 2018-present xlxf.cn ICP备案 '
  },
  docFooter: { prev: "Previos page", next: "Next page" }
}

