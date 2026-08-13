// Rail-to-rail connector, anchored to the same x as the spine (left-[26px]).
export default function StageConnector({ nextStatus }) {
  const color = nextStatus === 'locked'
    ? 'from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700'
    : 'from-slate-200 to-primary-400 dark:from-slate-700 dark:to-primary-500/60'

  return (
    <div className="relative py-1.5">
      <div
        className={`absolute left-[26px] top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b ${color} transition-colors`}
        aria-hidden="true"
      />
    </div>
  )
}