import { useParams, Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { roadmap } from '../data/roadmap'
import { useProgress } from '../hooks/useProgress'
import { isLessonUnlocked } from '../utils/unlock'
import { completeLesson, uncompleteLesson } from '../store/progressSlice'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function LessonViewPage() {
  const { stageId, lessonId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { completedLessons } = useSelector((state) => state.progress)
  const { isLessonCompleted } = useProgress()

  const stage = roadmap.find((s) => s.id === stageId)
  if (!stage) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Stage not found</h1>
        <Link to="/roadmap" className="text-primary-400 hover:text-primary-300">Back to Roadmap</Link>
      </div>
    )
  }

  // Find the lesson across all topics
  let lesson = null
  let topic = null
  let lessonIndex = 0
  let totalLessons = 0

  for (const t of stage.topics) {
    for (const l of t.lessons) {
      totalLessons++
      if (l.id === lessonId) {
        lesson = l
        topic = t
      }
      if (lesson && lesson.id !== lessonId) {
        lessonIndex++
      }
    }
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Lesson not found</h1>
        <Link to={`/roadmap/${stageId}`} className="text-primary-400 hover:text-primary-300">Back to Stage</Link>
      </div>
    )
  }

  // Check prerequisites
  const unlocked = isLessonUnlocked(lesson, completedLessons)
  const completed = isLessonCompleted(lessonId)

  // Find prev/next lessons
  const allLessons = stage.topics.flatMap((t) => t.lessons)
  const currentIdx = allLessons.findIndex((l) => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  const handleToggleComplete = () => {
    if (completed) {
      dispatch(uncompleteLesson(lessonId))
    } else {
      dispatch(completeLesson(lessonId))
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <div className="mb-5 flex justify-center">
          <span className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Prerequisites Required</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Complete the required lessons first.</p>
        <Link to={`/roadmap/${stageId}`}>
          <Button variant="secondary">Back to {stage.title}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Back link */}
      <Link
        to={`/roadmap/${stageId}`}
        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {stage.title}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary">Stage {stage.number}</Badge>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">{topic.title}</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span className="text-sm text-slate-500">Lesson {currentIdx + 1} of {totalLessons}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
        <div className="text-sm text-slate-500 mt-2">{lesson.duration}</div>
      </div>

      {/* Prerequisites */}
      {lesson.prerequisites && lesson.prerequisites.length > 0 && (
        <div className="mb-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Prerequisites:</div>
          <div className="flex flex-wrap gap-2">
            {lesson.prerequisites.map((prereqId) => {
              const prereqDone = completedLessons.includes(prereqId)
              return (
                <Badge key={prereqId} variant={prereqDone ? 'success' : 'warning'}>
                  {prereqDone ? '✓' : '○'} {prereqId}
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* Content sections */}
      <div className="space-y-8">
        {/* What */}
        <ContentSection
          title="What is it?"
          icon={<div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 text-sm font-bold">?</div>}
          content={lesson.content.what}
        />

        {/* Why */}
        <ContentSection
          title="Why does it matter?"
          icon={<div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-sm font-bold">!</div>}
          content={lesson.content.why}
        />

        {/* How */}
        <ContentSection
          title="How does it work?"
          icon={<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-bold">→</div>}
          content={lesson.content.how}
        />

        {/* AI Connection */}
        <ContentSection
          title="Where is it used in AI?"
          icon={<div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-bold">🧠</div>}
          content={lesson.content.ai}
        />
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevLesson ? (
          <Link
            to={`/learn/${stageId}/${prevLesson.id}`}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}

        <Button
          onClick={handleToggleComplete}
          variant={completed ? 'secondary' : 'success'}
          size="sm"
        >
          {completed ? '✓ Completed' : 'Mark Complete'}
        </Button>

        {nextLesson ? (
          <Link
            to={`/learn/${stageId}/${nextLesson.id}`}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
          >
            {nextLesson.title}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            to={`/checkpoint/${stageId}`}
            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium"
          >
            Take Checkpoint
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

function ContentSection({ title, icon, content }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{content}</div>
    </div>
  )
}
