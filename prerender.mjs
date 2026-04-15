import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

async function prerender() {
  // 1. 클라이언트 빌드
  await build({ configFile: path.resolve(__dirname, 'vite.config.js') })

  // 2. SSR 빌드
  await build({
    configFile: path.resolve(__dirname, 'vite.config.js'),
    build: {
      ssr: path.resolve(__dirname, 'src/entry-server.jsx'),
      outDir: path.resolve(__dirname, 'dist-ssr'),
    },
  })

  // 3. SSR 번들 로드
  const { render } = await import(path.resolve(__dirname, 'dist-ssr/entry-server.js'))
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  // 4. 메인 페이지 프리렌더링
  const mainHtml = render('/')
  const mainPage = template.replace('<div id="root"></div>', `<div id="root">${mainHtml}</div>`)
  fs.writeFileSync(path.resolve(distDir, 'index.html'), mainPage)

  // 5. 포스트별 프리렌더링
  const portfolio = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'src/data/portfolio.json'), 'utf-8')
  )

  for (const project of portfolio.projects) {
    for (const post of project.posts || []) {
      if (!post.postPath) continue
      const slug = post.slug || post.postPath
      const mdPath = path.resolve(__dirname, 'public/posts', `${post.postPath}.md`)
      const mdContent = fs.readFileSync(mdPath, 'utf-8')
      const postHtml = render(`/portfolio/posts/${slug}`, mdContent)
      const page = template.replace('<div id="root"></div>', `<div id="root">${postHtml}</div>`)

      const postDir = path.resolve(distDir, 'posts', slug)
      fs.mkdirSync(postDir, { recursive: true })
      fs.writeFileSync(path.resolve(postDir, 'index.html'), page)
      console.log(`  ✓ /posts/${slug}`)
    }
  }

  // 6. 404.html (SPA fallback)
  fs.copyFileSync(
    path.resolve(distDir, 'index.html'),
    path.resolve(distDir, '404.html')
  )

  // 7. SSR 빌드 산출물 정리
  fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true })

  console.log('Pre-rendering complete!')
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
