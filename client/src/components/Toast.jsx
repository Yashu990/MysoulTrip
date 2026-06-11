export default function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-lg bg-navy-800 text-white text-sm px-5 py-3 shadow-xl ring-1 ring-white/10 animate-[fadeIn_.2s_ease]">
      {message}
    </div>
  )
}
