// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
// import AdComponent from './AdComponent.vue'
 
import ThemeLayout from '../../../../src/components/ThemeLayout.vue'
import GoogleAdsense from '../../../../src/components/GoogleAdsense.vue'


export default {
  // ...DefaultTheme,
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     // 'doc-before': () => h(GoogleAdSense)
  //     'doc-before': () => h(AdComponent)
  //   })
  // }
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    // app.component('qrcode', qrcode)
    app.component('GoogleAdsense', GoogleAdsense)
  }
}


