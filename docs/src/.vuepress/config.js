const {description} = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'デザインツール Figma の紹介',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', {name: 'theme-color', content: '#3eaf7c'}],
    ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    [
      'meta',
      {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: '日本語化拡張',
        link:
          'https://chrome.google.com/webstore/detail/figma-%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%8C%96/ekodckpnalonppfcddgnkoapajahbahc?hl=ja',
      },
    ],
    sidebar: [
      ['/', '画面構成'],
      ['/toolbar/', 'ツールバー'],
      ['/layersPanel/', 'レイヤーパネル'],
      ['/propertiesPanel/', 'プロパティパネル'],
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
