import { defineConfig } from 'vitepress'
import wechatIcon from './wechat-icon'

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
      '/music/': [{
          text: '概述',
          link: '/music/'
        }, {
          text: 'Theory',
          items: [
            { text: 'Scales', link: '/music/theory/scales' },
            { text: 'Intervals', link: '/music/theory/intervals' },
            { text: 'Chords', link: '/music/theory/chords' },
            { text: 'Rhythm', link: '/music/theory/rhythm' },
            { text: 'Harmony', link: '/music/theory/harmony' },
            { text: 'Keys', link: '/music/theory/keys' },
            { text: 'Tempo', link: '/music/theory/tempo' },
            { text: 'Notation', link: '/music/theory/notation' },
            { text: 'Dynamics', link: '/music/theory/dynamics' },
            { text: 'Beats', link: '/music/theory/beats' },
            { text: 'Ear Training', link: '/music/theory/eartraining' },
            { text: 'Texture', link: '/music/theory/texture' },
            { text: 'Timbre', link: '/music/theory/timbre' }
          ]
        }, {
          text: 'Sheet music',
          items: [
            { text: 'Pachelbel\'s Canon', link: '/music/sheet/canon' },
            { text: 'Bizet\'s Minuet', link: '/music/sheet/bizet_minuet' },
            { text: 'One Summer\'s Day', link: '/music/sheet/one_summers_day' },
            { text: 'Merry-Go-Round of Life', link: '/music/sheet/merry_go_round_of_life' }
          ]
        }
      ],
      '/tech/': [{
        text: '概述',
        link: '/tech/'
      }, {
        text: '前端',
        items: [
          { text: 'Vue', link: '/tech/frontend/vue' },
          { text: 'PWA', link: '/tech/frontend/pwa' },
          { text: 'Typescript', link: '/tech/frontend/typescript' },
          { text: 'Responsive Web Design', link: '/tech/frontend/responsive' },
          { text: 'CSS', link: '/tech/frontend/css' }
        ]
      }, {
        text: '后端',
        items: [
          { text: 'Node.js', link: '/tech/backend/nodejs' },
          { text: 'Nginx & Apache', link: '/tech/backend/nginx_apache' },
          { text: 'PostgreSQL', link: '/tech/backend/postgresql' },
          { text: 'Docker', link: '/tech/backend/docker' },
          { text: 'Snippets', link: '/tech/backend/snippets' }
        ]
      }, {
        text: '应用',
        items: [
          { text: 'Flarum', link: '/tech/applications/flarum' },
          { text: 'Linux系统操作', link: '/tech/applications/linux' },
          { text: 'Git', link: '/tech/applications/git' },
          { text: 'Windows', link: '/tech/applications/windows' },
          { text: 'FAQ', link: '/tech/applications/faq' }
        ]
      }],
      '/literature/': [{
        text: '概述',
        link: '/literature/'
      },{
        text: '诗词',
        link: '/literature/poetry'
      },{
        text: '增广贤文',
        link: '/literature/zgxw'
      }],
      '/misc/': [
      { text: '概述', link : '/misc/' },  
      {
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
          { text: '基础', link: '/misc/university_application/' },
          { text: '马来西亚大学申请', link: '/misc/university_application/malaysia_universities' },
          { text: '案例', items: [
            { text: '案例1：美术生申请马来西亚大学', link: '/misc/university_application/cases/case1.md'}
          ]}
        ]
      }, {
        text: '其他',
        items: [
          { text: 'Insomnia Treatment', link: '/misc/others/insomnia_treatment' }
        ]
      }]
    },

    socialLinks: [
      { icon: wechatIcon, link: '/images/wechat.jpg' }
    ],
    search: {
      provider: 'local'
    }
  },
  ignoreDeadLinks: true
})
