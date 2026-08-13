import { useParams, Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { roadmap } from '../data/roadmap'
import { projects } from '../data/projects'
import { useProgress } from '../hooks/useProgress'
import { completeProject, uncompleteProject } from '../store/progressSlice'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const dispatch = useDispatch()
  const { isProjectCompleted } = useProgress()
  const project = projects[projectId]

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary-400">Back to Projects</Link>
      </div>
    )
  }

  const stage = roadmap.find((s) => s.id === project.stageId)
  const completed = isProjectCompleted(projectId)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="mb-6">
        {stage && (
          <div className="text-sm text-slate-500 mb-2">
            {stage.icon} {stage.title}
          </div>
        )}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h1>

        {/* Difficulty */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className={`w-3 h-3 rounded-full ${
                  d <= project.difficulty ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Difficulty {project.difficulty}/5
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill) => (
            <Badge key={skill} variant="primary">{skill}</Badge>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Description</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Requirements */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Requirements</h2>
        <ul className="space-y-2">
          {project.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
              <span className="text-primary-400 mt-0.5">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Hint */}
      {project.hint && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6 bg-slate-50/50 dark:bg-slate-900/30">
          <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary-600 dark:text-primary-400 font-medium mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Hint
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.hint}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() =>
            completed
              ? dispatch(uncompleteProject(projectId))
              : dispatch(completeProject(projectId))
          }
          variant={completed ? 'secondary' : 'success'}
        >
          {completed ? '✓ Mark Incomplete' : 'Mark as Complete'}
        </Button>
        <Link to={`/roadmap/${project.stageId}`}>
          <Button variant="ghost">View Stage</Button>
        </Link>
      </div>
    </div>
  )
}
