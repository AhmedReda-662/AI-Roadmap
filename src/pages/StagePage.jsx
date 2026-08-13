import { useParams, Link } from 'react-router'
import { roadmap } from '../data/roadmap'
import { projects } from '../data/projects'
import { useProgress } from '../hooks/useProgress'
import { isLessonUnlocked } from '../utils/unlock'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function StagePage() {
  const { stageId } = useParams()
  const stage = roadmap.find((s) => s.id === stageId)
  const {
    getStageProgressPercent,
    getStatus,
    isLessonCompleted,
    completedLessons,
    checkpointScores,
    getIsStageUnlocked,
  } = useProgress()

  if (!stage) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Stage not found</h1>
        <Link to="/roadmap" className="text-primary-400 hover:text-primary-300">
          Back to Roadmap
        </Link>
      </div>
    )
  }

  const status = getStatus(stage)
  const progress = getStageProgressPercent(stageId)
  const unlocked = getIsStageUnlocked(stageId)
  const stageProjects = (stage.projectIds || [])
    .map((id) => projects[id])
    .filter(Boolean)
  const checkpointScore = checkpointScores[stage.checkpoint?.id]

  if (!unlocked) {
    return (
      <div className="text-center py-20">
        <div className="mb-5 flex justify-center">
          <span className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Stage Locked</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Complete the previous stage's checkpoint to unlock this stage.
        </p>
        <Link to="/roadmap">
          <Button variant="secondary">Back to Roadmap</Button>
        </Link>
      </div>
    )
  }

  const totalLessons = stage.topics.reduce((sum, t) => sum + t.lessons.length, 0)
  const completedCount = stage.topics.reduce(
    (sum, t) => sum + t.lessons.filter((l) => isLessonCompleted(l.id)).length,
    0
  )

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back link */}
      <Link
        to="/roadmap"
        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Roadmap
      </Link>

      {/* Stage header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{stage.icon}</span>
          <div>
            <div className="text-sm text-slate-500">Stage {stage.number}</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{stage.title}</h1>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{stage.description}</p>
        <div className="mt-4">
          <ProgressBar value={progress} size="md" color={status === 'completed' ? 'success' : 'primary'} showLabel />
          <div className="text-sm text-slate-500 mt-1">{completedCount} / {totalLessons} lessons completed</div>
        </div>
      </div>

      {/* Topics and lessons */}
      <div className="space-y-8">
        {stage.topics.map((topic) => (
          <div key={topic.id}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full" />
              {topic.title}
            </h2>
            <div className="space-y-2 ml-4">
              {topic.lessons.map((lesson) => {
                const completed = isLessonCompleted(lesson.id)
                const lessonUnlocked = isLessonUnlocked(lesson, completedLessons)

                return (
                  <div key={lesson.id}>
                    {lessonUnlocked ? (
                      <Link
                        to={`/learn/${stageId}/${lesson.id}`}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          completed
                            ? 'bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                            completed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {completed ? '✓' : ''}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${completed ? 'text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                            {lesson.title}
                          </div>
                          <div className="text-xs text-slate-500">{lesson.duration}</div>
                        </div>
                        {!completed && (
                          <svg className="w-4 h-4 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 opacity-60">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <svg className="w-3 h-3 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-500">{lesson.title}</div>
                          <div className="text-xs text-slate-400 dark:text-slate-600">Prerequisites required</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Checkpoint section */}
      {stage.checkpoint && (
        <div className="mt-10 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Checkpoint</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Test your knowledge with 10 questions. Score 80% to pass.
              </p>
            </div>
            {checkpointScore && (
              <Badge variant={checkpointScore.passed ? 'success' : 'danger'}>
                {checkpointScore.passed ? `✓ ${checkpointScore.bestScore}%` : `Last: ${checkpointScore.score}%`}
              </Badge>
            )}
          </div>
          <Link to={`/checkpoint/${stageId}`}>
            <Button variant={checkpointScore?.passed ? 'secondary' : 'primary'}>
              {checkpointScore?.passed ? 'Retake Checkpoint' : 'Take Checkpoint'}
            </Button>
          </Link>
        </div>
      )}

      {/* Projects section */}
      {stageProjects.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {stageProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <h3 className="text-slate-900 dark:text-white font-medium mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div
                      key={d}
                      className={`w-2 h-2 rounded-full ${
                        d <= project.difficulty ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
