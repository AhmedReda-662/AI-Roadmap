import { Link } from 'react-router'
import { useProgress } from '../hooks/useProgress'
import { roadmap } from '../data/roadmap'
import Button from '../components/ui/Button'

export default function HomePage() {
  const { overallProgress, currentLesson, streak } = useProgress()

  const stats = [
    { label: 'Stages', value: roadmap.length },
    { label: 'Lessons', value: '100+' },
    { label: 'Projects', value: '30+' },
  ]

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Hero — editorial, left-aligned, no gradients, no emoji */}
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 border-b border-slate-200 dark:border-slate-800/60">
        <div className="grid md:grid-cols-[1fr_220px] gap-10 items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 font-medium mb-6">
              Interactive platform
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              Become an
              <br />
              AI Engineer
            </h1>
            <p className="mt-7 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              A structured line from programming fundamentals to Machine Learning,
              Deep Learning, Generative AI, and engineering practice — one station at a time.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-start gap-3">
              <Link to={currentLesson ? `/learn/${currentLesson.stage.id}/${currentLesson.lesson.id}` : '/roadmap'}>
                <Button size="lg">
                  {overallProgress > 0 ? 'Continue learning' : 'Start learning'}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/roadmap">
                <Button variant="ghost" size="lg">See the line</Button>
              </Link>
            </div>
          </div>

          {/* Right rail — an abstract station list */}
          <div className="hidden md:block" aria-hidden="true">
            <div className="relative">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-primary-400 via-slate-300 dark:via-slate-700 to-transparent" />
              <div className="pl-5 space-y-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-primary-500 ring-4 ring-primary-500/15" />
                  <span className="text-slate-500 dark:text-slate-400">Fundamentals</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-slate-400 dark:text-slate-500">Math & Data</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-slate-400 dark:text-slate-500">Deep Learning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-slate-400 dark:text-slate-500">GenAI & Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — minimal, type-led, no emoji, no cards */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800/60">
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-6">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <span className="font-display text-4xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="ml-3 text-sm text-slate-500 dark:text-slate-400">{stat.label.toLowerCase()}</span>
              {i < stats.length - 1 && (
                <span className="hidden sm:inline ml-12 text-slate-200 dark:text-slate-700">/</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Continue learning CTA — only when progressed */}
      {overallProgress > 0 && currentLesson && (
        <section className="mt-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-primary-500" />
            <span className="text-xs uppercase tracking-[0.15em] text-ember-500">{streak.count}-day streak</span>
          </div>
          <h3 className="font-display text-xl text-slate-900 dark:text-white mb-1">Continue learning</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            {currentLesson.stage.title} → {currentLesson.topic.title} → {currentLesson.lesson.title}
          </p>
          <Link to={`/learn/${currentLesson.stage.id}/${currentLesson.lesson.id}`}>
            <Button size="sm">
              Continue: {currentLesson.lesson.title}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </section>
      )}
    </div>
  )
}