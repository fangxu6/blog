import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Evensoft Blog",
  description: "独立开发者的技术博客", 
  base: "/blog/",
  ignoreDeadLinks: [
    /^\/((member|notes|planet|settings|notifications|write|go|unfavorite|support|help|faq|tools|worldclock|pro|os|categories|tags|archives))\b/,
    /^\/\d{4}\//,
    /^\.\//,
    /^\/md\//
  ],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: '技术分类',
          items: [
            { text: 'Git版本控制', link: '/blog/git-version-control' },
            { text: 'Linux系统管理', link: '/blog/linux-system-management' },
            { text: 'AI技术', link: '/blog/ai-technology' },
            { text: '开发规范', link: '/blog/development-standards' },
            { text: '数据库技术', link: '/blog/database-technology' },
            { text: '开发经验', link: '/blog/development' },
            { text: '技术分享', link: '/blog/technology' },
            { text: '独立开发', link: '/blog/indie' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fangxu6' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Evensoft'
    }
  }
})
