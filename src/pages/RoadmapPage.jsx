import { roadmap } from '../data/roadmap'
import { useProgress } from '../hooks/useProgress'
import StageCard from '../components/roadmap/StageCard'
import StageConnector from '../components/roadmap/StageConnector'

export default function RoadmapPage() {
  const { getStatus, getStageProgressPercent, getIsStageUnlocked } = useProgress()

  return (
    <div className="pt-6 pb-16">
      {/* Editorial header */}
      <header className="mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 font-medium mb-4">
          The line
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
          AI Learning Roadmap
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
          A structured path from programming fundamentals to production AI engineering —
          fifteen stations, each building on the last.
        </p>
      </header>

      {/* Timeline — one running rail on the left */}
      <div className="relative max-w-2xl">
        {/* Vertical spine */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-1">
          {roadmap.map((stage, index) => {
            const status = getStatus(stage)
            const progress = getStageProgressPercent(stage.id)
            const unlocked = getIsStageUnlocked(stage.id)

            return (
              <div key={stage.id}>
                <StageCard
                  stage={stage}
                  status={status}
                  progress={progress}
                  unlocked={unlocked}
                />
                {index < roadmap.length - 1 && (
                  <StageConnector
                    isLast={index === roadmap.length - 2}
                    nextStatus={getStatus(roadmap[index + 1])}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}