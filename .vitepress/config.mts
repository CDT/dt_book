import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DT Book",
  description: "Chen Dongtian's Notebook",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '历史', link: '/history/' },
      { text: '文学', link: '/literature/' },
      { text: '音乐', link: '/music/' },
      { text: '科学', link: '/science/' },
      { text: '技术', link: '/tech/' },
      { text: '其他', link: '/misc/' }
    ],
    logo: '/favicon.ico',

    sidebar: {
      '/history/': [{
          text: '概述',
          link: '/history/'
        }, {
          text: '中国史',
          items: [
            { text: '古代史', link: '/history/china/ancient.md' },
            { text: '近代史', link: '/history/china/contemporary.md' },
            { text: '现代史', link: '/history/china/modern.md' },
          ]
        }
      ],      
      '/tech/': [{
        text: '概述',
        link: '/tech/'
      }, {
        text: '前端',
        items: [
          { text: 'Vue', link: '/tech/frontend/vue.md' }
        ]
      }, {
        text: '后端',
        items: [
          { text: 'Node.js', link: '/tech/backend/nodejs.md' }
        ]
      }, {
        text: '应用',
        items: [
          { text: 'Flarum', link: '/tech/applications/Flarum.md' }
        ]
      }
    ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  }
})
