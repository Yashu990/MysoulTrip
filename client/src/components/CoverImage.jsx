import { useState } from 'react'
import Img from './Img'
import BlogCover from './BlogCover'

/**
 * Blog cover that prefers a real fetched photo (/images/blog/<id>.jpg, produced
 * by `npm run blog:images`) and gracefully falls back to the generated scenic
 * art until those photos exist. So the site looks fine before AND after fetching.
 */
export default function CoverImage({ id, theme, className = '', big = false, alt = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <BlogCover theme={theme} className={className} big={big} />
  return (
    <Img
      src={`/images/blog/${id}.jpg`}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
