// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme' 
import qrcode from '../../../src/components/qrcode.vue'
import ThemeLayout from '../../../src/components/ThemeLayout.vue'
import GoogleAdsense from '../../../src/components/GoogleAdsense.vue'

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('qrcode', qrcode)
    app.component('GoogleAdsense', GoogleAdsense)
  }
}

