import { Link } from 'react-router'
import { roadmap } from '../data/roadmap'
import { projects } from '../data/projects'
import { useProgress } from '../hooks/useProgress'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'

export default function DashboardPage() {
  const {
    overallProgress,
    currentLesson,
    completedLessons,
    completedProjects,
    checkpointScores,
    streak,
    getStageProgressPercent,
    getStatus,
  } = useProgress()

  const totalProjects = Object.keys(projects).length
  const passedCheckpoints = Object.values(checkpointScores).filter((s) => s.passed).length
  const totalCheckpoints = roadmap.filter((s) => s.checkpoint).length

  const stats = [
    { label: 'Overall progress', value: overallProgress, suffix: '%' },
    { label: 'Projects completed', value: completedProjects.length, suffix: `/${totalProjects}` },
    { label: 'Checkpoints passed', value: passedCheckpoints, suffix: `/${totalCheckpoints}` },
    { label: 'Learning streak', value: streak.count, suffix: streak.count === 1 ? ' day' : ' days' },
  ]

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-16">
      {/* Header */}
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 font-medium mb-4">
          Your journey
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
          The ascent so far
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl">
          Where you stand on the line, what's behind you, and what's next.
        </p>
      </header>

      {/* Stats — type-led, no emoji tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 mb-14 border-b border-slate-200 dark:border-slate-800/60 pb-12">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {stat.value}
              <span className="text-lg text-slate-400">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Continue learning */}
      {currentLesson && (
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-200 dark:border-slate-800/60 pb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-[0.15em] mb-2">
                <span className="h-px w-6 bg-primary-500" />
                Next up
              </div>
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                {currentLesson.lesson.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {currentLesson.stage.title} → {currentLesson.topic.title}
              </p>
            </div>
            <Link to={`/learn/${currentLesson.stage.id}/${currentLesson.lesson.id}`} className="shrink-0">
              <Button>Continue</Button>
            </Link>
          </div>
        </section>
      )}

      {/* Overall rail — always visible */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Overall ascent
          </span>
          <span className="font-display text-3xl text-slate-900 dark:text-white leading-none">
            {overallProgress}<span className="text-sm text-slate-400">%</span>
          </span>
        </div>
        <ProgressBar value={overallProgress} size="lg" color="primary" />
        <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {completedLessons.length} lessons completed
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-medium mb-6">
          Stage ledger
        </h2>
        <div className="border-t border-slate-200 dark:border-slate-800/60">
          {roadmap.map((stage) => {
            const progress = getStageProgressPercent(stage.id)
            const status = getStatus(stage)
            const score = checkpointScores[stage.checkpoint?.id]

            return (
              <Link
                key={stage.id}
                to={`/roadmap/${stage.id}`}
                className="group flex items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-white/[0.02] px-2 -mx-2 rounded-lg transition-colors"
              >
                {/* Stage index */}
                <span className="w-8 shrink-0 font-display text-sm text-slate-300 dark:text-slate-600">
                  {String(stage.number).padStart(2, '0')}
                </span>
                <div className="w-44 hidden sm:block shrink-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In progress' : status === 'available' ? 'Available' : 'Locked'}
                  </div>
                </div>
                <div className="flex-1 min-w-0 max-w-sm">
                  <ProgressBar value={progress} size="sm" color={status === 'completed' ? 'success' : 'primary'} />
                </div>
                <div className="flex-1 hidden md:block" />
                <div className="text-right shrink-0 w-14">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{progress}%</div>
                </div>
                {score && (
                  <div className={`text-xs shrink-0 w-16 text-right ${score.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                    {score.passed ? `✓ ${score.bestScore}%` : `Last ${score.score}%`}
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}