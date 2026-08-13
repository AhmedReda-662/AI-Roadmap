import { Link } from 'react-router'
import ProgressBar from '../ui/ProgressBar'

// Rail + node share a single x position (see RoadmapPage spine at left-[26px]).
const NODE_X = 'left-[26px]'

const statusConfig = {
  locked: {
    node: 'bg-slate-300 dark:bg-slate-700 border-slate-200 dark:border-slate-800',
    label: 'Locked',
    labelClass: 'text-slate-400 dark:text-slate-600',
    cardClass: 'opacity-60',
  },
  available: {
    node: 'bg-white dark:bg-slate-900 border-2 border-primary-500',
    label: 'Available',
    labelClass: 'text-primary-600 dark:text-primary-400',
    cardClass: 'hover:border-primary-400/60',
  },
  'in-progress': {
    node: 'bg-primary-500 border-primary-400',
    label: 'In progress',
    labelClass: 'text-primary-700 dark:text-primary-300',
    cardClass: 'border-primary-400/40',
  },
  completed: {
    node: 'bg-white dark:bg-slate-900 border-2 border-emerald-500',
    label: 'Completed',
    labelClass: 'text-emerald-600 dark:text-emerald-400',
    cardClass: 'border-emerald-400/30',
  },
}

export default function StageCard({ stage, status, progress, unlocked }) {
  const config = statusConfig[status]
  const isSpecialization = stage.id === 'specialization'
  const lessonCount = stage.topics.reduce((sum, t) => sum + t.lessons.length, 0)
  const done = status === 'completed'

  const cardContent = (
    <div
      className={`relative rounded-xl border border-slate-200 dark:border-slate-800 p-5 transition-all duration-300 bg-white dark:bg-slate-900/40 ${config.cardClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 font-medium">
            Stage {stage.number}
          </div>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 dark:text-white leading-tight">
            {stage.title}
          </h3>
          <span className={`inline-block mt-2 text-xs font-medium ${config.labelClass}`}>
            {done ? '✓ ' : ''}{config.label}
          </span>
        </div>
        <span
          className={`text-lg leading-none mt-1 ${isSpecialization ? 'text-slate-400 dark:text-slate-500' : 'text-slate-300 dark:text-slate-700'}`}
          aria-hidden="true"
        >
          {isSpecialization ? '◆' : '→'}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
        {stage.description}
      </p>

      {status !== 'locked' && (
        <div className="mt-4">
          <ProgressBar value={progress} size="sm" color={done ? 'success' : 'primary'} />
        </div>
      )}

      <div className="mt-4 flex items-center gap-5 text-xs text-slate-400 dark:text-slate-500">
        <span>{lessonCount} lessons</span>
        {stage.checkpoint && <span className="flex items-center gap-1.5">◆ Checkpoint</span>}
        {stage.projectIds?.length > 0 && <span>{stage.projectIds.length} projects</span>}
      </div>
    </div>
  )

  const inner = (
    <>
      <span
        className={`absolute top-7 ${NODE_X} -translate-x-1/2 w-3 h-3 rounded-full border-2 ring-4 ring-white dark:ring-slate-950 bg-clip-padding ${config.node}`}
        aria-hidden="true"
      />
      {cardContent}
    </>
  )

  if (isSpecialization) {
    return <div className="relative pl-14 md:pl-16"><Link to="/specialization">{inner}</Link></div>
  }
  if (!unlocked) {
    return <div className="relative pl-14 md:pl-16">{inner}</div>
  }
  return (
    <div className="relative pl-14 md:pl-16">
      <Link to={`/roadmap/${stage.id}`}>{inner}</Link>
    </div>
  )
}