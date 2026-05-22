import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const baseUrl = 'https://tarunvemuri.vercel.app'
const routes = ['/', '/projects', '/about']
const generatedAt = new Date().toISOString()

const buildUrl = (path) => (path === '/' ? baseUrl : `${baseUrl}${path}`)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = buildUrl(route)
    const priority = route === '/' ? '1.0' : '0.7'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${generatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

const writeSitemap = (targetDir) => {
  mkdirSync(targetDir, { recursive: true })
  writeFileSync(join(targetDir, 'sitemap.xml'), xml, 'utf8')
}

const publicDir = join(process.cwd(), 'public')
writeSitemap(publicDir)

const distDir = join(process.cwd(), 'dist')
if (existsSync(distDir)) {
  writeSitemap(distDir)
}
