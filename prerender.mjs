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

  // 3. SSR 번들 로드 후 렌더링
  const { render } = await import(path.resolve(__dirname, 'dist-ssr/entry-server.js'))
  const appHtml = render()

  // 4. dist/index.html에 렌더링된 HTML 주입
  const indexPath = path.resolve(distDir, 'index.html')
  const template = fs.readFileSync(indexPath, 'utf-8')
  const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  fs.writeFileSync(indexPath, finalHtml)

  // 5. SSR 빌드 산출물 정리
  fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true })

  console.log('Pre-rendering complete!')
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
