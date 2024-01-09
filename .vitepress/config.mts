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
            { text: '古代史', link: '/history/china/ancient' },
            { text: '近代史', link: '/history/china/contemporary' },
            { text: '现代史', link: '/history/china/modern' },
          ]
        }
      ],      
      '/tech/': [{
        text: '概述',
        link: '/tech/'
      }, {
        text: '前端',
        items: [
          { text: 'Vue', link: '/tech/frontend/vue' }
        ]
      }, {
        text: '后端',
        items: [
          { text: 'Node.js', link: '/tech/backend/nodejs' }
        ]
      }, {
        text: '应用',
        items: [
          { text: 'Flarum', link: '/tech/applications/Flarum' }
        ]
      }],
      '/literature/': [{
        text: '概述',
        link: '/literature/'
      },{
        text: '诗词',
        link: '/literature/poetry'
      }],
      '/misc/': [{
        text: '新能源',
        items: [
          { text: '应用', link: '/misc/power_solutions/healthcare' }
        ]
      }, {
        text: '雅思',
        items: [
          { text: '词汇', link: '/misc/ielts/vocab' }
        ]
      }, {
        text: '留学',
        items: [
          { text: '马来西亚大学申请', link: '/misc/university_application/malaysia_universities' }
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  }
})
