export default function SectionHeading({ icon, title }) {
  return (
    <h2 className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3.5">
      <span className="text-indigo-400">{icon}</span>
      {title}
    </h2>
  )
}
