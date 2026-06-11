// Fetches one relevant, real photo per blog post from Unsplash, then resizes +
// optimises it (jpg + webp) into public/images/blog/. The access key stays here
// (server-side script) and is NEVER shipped in the client bundle.
//
// Setup (once):
//   1. Create a free app at https://unsplash.com/developers
//   2. Copy the "Access Key"
//   3. Put it in client/.env  ->  UNSPLASH_ACCESS_KEY=your_key_here
//   4. From client/:  npm run blog:images
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const KEY = process.env.UNSPLASH_ACCESS_KEY
const OUT = path.resolve('public/images/blog')
const WIDTH = 1200

// post id -> Unsplash search query (curated for relevance)
const QUERIES = {
  'hidden-himalayan-villages': 'himalayan village uttarakhand mountains',
  'slow-travel-2026': 'himalaya mountains calm morning mist',
  'babaji-cave-guide': 'himalayan temple meditation himalaya',
  'panchachuli-sunrise': 'himalaya sunrise snow peaks',
  'pack-light-kumaon-trek': 'himalaya trekking trail backpack',
  'homestays-over-hotels': 'himalayan village house mountains',
  'monsoon-binsar': 'himalaya green forest waterfall monsoon',
  'digital-detox-retreats': 'himalaya pine forest solitude cabin',
}

if (!KEY) {
  console.error('\n[blog:images] Missing UNSPLASH_ACCESS_KEY.')
  console.error('  1) Get a free key at https://unsplash.com/developers')
  console.error('  2) Add to client/.env:  UNSPLASH_ACCESS_KEY=your_key')
  console.error('  3) Re-run:  npm run blog:images\n')
  process.exit(1)
}

async function fetchOne(id, query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&per_page=1`
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } })
  if (!res.ok) throw new Error(`Unsplash ${res.status} for "${query}"`)
  const data = await res.json()
  const photo = data.results?.[0]
  if (!photo) throw new Error(`No photo found for "${query}"`)

  // Unsplash API guideline: ping the download endpoint to credit the photographer.
  fetch(`${photo.links.download_location}&client_id=${KEY}`).catch(() => {})

  const imgRes = await fetch(`${photo.urls.raw}&w=${WIDTH}&q=80&fm=jpg`)
  const buf = Buffer.from(await imgRes.arrayBuffer())

  const base = sharp(buf).resize({ width: WIDTH, withoutEnlargement: true })
  await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${id}.jpg`))
  await base.clone().webp({ quality: 76 }).toFile(path.join(OUT, `${id}.webp`))

  return `${photo.user.name} (@${photo.user.username})`
}

async function run() {
  await mkdir(OUT, { recursive: true })
  const ids = Object.keys(QUERIES)
  const credits = []
  for (const id of ids) {
    try {
      const credit = await fetchOne(id, QUERIES[id])
      credits.push(`${id}: ${credit}`)
      console.log(`✓ ${id.padEnd(28)} ${credit}`)
    } catch (e) {
      console.warn(`✗ ${id.padEnd(28)} ${e.message}`)
    }
  }
  console.log(`\nDone. ${credits.length}/${ids.length} images saved to public/images/blog/`)
  console.log('Photo credits (Unsplash):')
  credits.forEach((c) => console.log('  ' + c))
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
