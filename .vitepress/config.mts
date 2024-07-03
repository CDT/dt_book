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
            { text: '100个历史典故', link: '/history/china/100' },
          ]
        }, {
          text: '世界史',
          items: [
            { text: '欧洲', link: '/history/world/europe' },
            { text: '世界大战', link: '/history/world/war' },
            { text: '独裁者和邪恶政权', link: '/history/world/dictators' }
          ]
        }, {
          text: '其他',
          items: [
            { text: '商君书', link: '/history/misc/book_of_lord_shang' }
          ]
        }
      ],   
      '/music/': [{
          text: '概述',
          link: '/music/'
        }, {
          text: 'Musescore',
          items: [
            { text: 'Basics', link: '/music/musescore/basics' }
          ]
        }, {
          text: 'Sheet music',
          items: [
            { text: 'Pachelbel\'s Canon', link: '/music/sheet/canon' },
            { text: 'Bizet\'s Minuet', link: '/music/sheet/bizet_minuet' },
            { text: 'One Summer\'s Day', link: '/music/sheet/one_summers_day' },
            { text: 'Merry-Go-Round of Life', link: '/music/sheet/merry_go_round_of_life' }
          ]
        }, {
          text: 'Instruments',
          items: [
            { text: 'Piano', link: '/music/instruments/piano' },
            { text: 'Guitar', link: '/music/instruments/guitar' },
            { text: 'Harmonica', link: '/music/instruments/harmonica' },
            { text: 'Melodica', link: '/music/instruments/melodica' },
            { text: 'Recorder', link: '/music/instruments/recorder' }
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
          { text: 'CSS', link: '/tech/frontend/css' },
          { text: 'Snippets', link: '/tech/frontend/snippets' },
          { text: 'Quasar', link: '/tech/frontend/quasar' },
          { text: 'Tauri', link: '/tech/frontend/tauri' },
          { text: 'FAQ', link: '/tech/frontend/faq' }
        ]
      }, {
        text: '后端',
        items: [
          { text: 'Node.js & Javascript', link: '/tech/backend/nodejs' },
          { text: 'Nginx & Apache', link: '/tech/backend/nginx_apache' },
          { text: 'PostgreSQL', link: '/tech/backend/postgresql' },
          { text: 'Oracle', link: '/tech/backend/oracle'},
          { text: 'Docker', link: '/tech/backend/docker' },
          { text: 'Open Source BIs', link: '/tech/backend/opensourcebis' },
          { text: 'Superset', link: '/tech/backend/superset' },
          { text: 'Low Code', link: '/tech/backend/lowcode' },
          { text: 'Snippets', link: '/tech/backend/snippets' },
          { text: 'FAQ', link: '/tech/backend/faq' }
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
      },{
        text: '摘录段落',
        link: '/literature/excerpts'
      },{
        text: '刘慈欣',
        link: '/literature/lcx'
      },{
        text: '涂沐',
        items: [{
          text: '诸色界之序',
          link: '/literature/tm/zsjzx'
        },{
          text: '诸色界之阴阳眼',
          link: '/literature/tm/zsjzyyy'
        },{
          text: '诸色界之绯之月轮',
          link: '/literature/tm/zsjzfzyl'
        },{
          text: '诸色界之雪葬谷',
          link: '/literature/tm/zsjzxzg'
        }/*,{
          text: '诸色界之尘缘',
          link: '/literature/tm/zsjzcy'
        }*/,{
          text: '诸色界之雪葬谷',
          link: '/literature/tm/zsjzxzg'
        }]
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
          { text: '基础', link: '/misc/study_abroad/' },
          { text: '马来西亚大学申请', link: '/misc/study_abroad/malaysia_universities' },
          { text: '马来西亚短期游学项目', link: '/misc/study_abroad/study_tours' },
          { text: '案例', items: [
            { text: '案例1：美术生申请马来西亚大学', link: '/misc/study_abroad/cases/case1.md'}
          ]}
        ]
      }, {
        text: '其他',
        items: [
          { text: 'Insomnia Treatment', link: '/misc/others/insomnia_treatment' },
          { text: '段子', link: '/misc/others/skits' },
          { text: '段子 - 2', link: '/misc/others/skits2' },
          { text: '段子 - 3', link: '/misc/others/skits3' },
          { text: '段子 - 4', link: '/misc/others/skits4' },
          { text: '其他段子', link: '/misc/others/otherskits'},
          { text: 'AI应用', link: '/misc/others/ai_apps'}
        ]
      }]
    },

    // socialLinks: [
    //   { icon: wechatIcon, link: '/images/wechat.jpg' }
    // ],
    search: {
      provider: 'local'
    }
  },
  ignoreDeadLinks: true
})
