// One-time image optimizer: resizes + recompresses heavy photos in place and
// emits a .webp sibling for each. Originals are backed up to ../.image-backup
// (outside /public so they are NOT shipped in the build).
//
// Run from client/:  node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, mkdir, copyFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const IMAGES_DIR = path.resolve('public/images')
const BACKUP_DIR = path.resolve('.image-backup')
const JPEG_QUALITY = 78
const WEBP_QUALITY = 76
const SKIP = /logo/i // keep tiny logos untouched (used by the canvas knockout)

// Full-bleed banners need the resolution; card/gallery photos display small.
const isHero = (name) => /(hero|banner|contact)/i.test(name)
const widthFor = (name) => (isHero(name) ? 1600 : 1100)

const KB = (b) => `${(b / 1024).toFixed(0)} KB`

async function run() {
  await mkdir(BACKUP_DIR, { recursive: true })
  const files = await readdir(IMAGES_DIR)
  const photos = files.filter((f) => /\.(jpe?g)$/i.test(f) && !SKIP.test(f))

  let beforeTotal = 0
  let afterTotal = 0

  for (const file of photos) {
    const input = path.join(IMAGES_DIR, file)
    const backup = path.join(BACKUP_DIR, file)
    const before = (await stat(input)).size
    beforeTotal += before

    // Back up the original once.
    if (!existsSync(backup)) await copyFile(input, backup)

    // Always process from the pristine backup so re-runs stay lossless-ish.
    const base = sharp(backup).rotate().resize({ width: widthFor(file), withoutEnlargement: true })

    const jpgBuf = await base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
    await sharp(jpgBuf).toFile(input)

    const webpPath = input.replace(/\.(jpe?g)$/i, '.webp')
    await base.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath)

    const after = (await stat(input)).size
    const webpSize = (await stat(webpPath)).size
    afterTotal += after

    console.log(
      `${file.padEnd(34)} ${KB(before).padStart(9)} -> jpg ${KB(after).padStart(8)}  webp ${KB(webpSize).padStart(8)}`,
    )
  }

  console.log('\n----------------------------------------------')
  console.log(`Optimised ${photos.length} images`)
  console.log(`JPEG total: ${KB(beforeTotal)} -> ${KB(afterTotal)}  (${(100 - (afterTotal / beforeTotal) * 100).toFixed(0)}% smaller)`)
  console.log(`Originals backed up in ${BACKUP_DIR}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
