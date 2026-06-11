import { ArrowRight } from './icons'
import { Reveal, motion } from './motion'

export default function SectionHead({ title, subtitle, linkLabel, linkHref = '#' }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <Reveal y={20}>
        <h2 className="font-display text-[2rem] font-bold leading-none tracking-tight text-navy-800 sm:text-[2.45rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 block h-0.5 w-14 origin-left rounded bg-gold-500"
        />
      </Reveal>
      {linkLabel && (
        <a
          href={linkHref}
          className="group hidden whitespace-nowrap text-sm font-semibold text-navy-700 transition hover:text-gold-700 sm:inline-flex sm:items-center sm:gap-1.5"
        >
          {linkLabel} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      )}
    </div>
  )
}
