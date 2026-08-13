import { useState } from 'react'
import { Link } from 'react-router'
import { roadmap } from '../data/roadmap'
import { projects } from '../data/projects'
import { useProgress } from '../hooks/useProgress'
import Badge from '../components/ui/Badge'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const { isProjectCompleted } = useProgress()

  const allProjects = Object.values(projects)
  const stages = roadmap.filter((s) => s.projectIds?.length > 0)

  const filteredProjects = allProjects.filter((p) => {
    const completed = isProjectCompleted(p.id)
    if (filter === 'completed') return completed
    if (filter === 'in-progress') return !completed
    if (filter === 'beginner') return p.difficulty <= 2
    if (filter === 'intermediate') return p.difficulty >= 3 && p.difficulty <= 4
    if (filter === 'advanced') return p.difficulty === 5
    return true
  })

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'completed', label: 'Completed' },
    { id: 'in-progress', label: 'In Progress' },
  ]

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Projects</h1>
        <p className="text-slate-500 dark:text-slate-400">Apply your knowledge with hands-on projects.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f.id
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const completed = isProjectCompleted(project.id)
          const stage = roadmap.find((s) => s.id === project.stageId)

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-slate-900 dark:text-white font-semibold">{project.title}</h3>
                {completed && <Badge variant="success">✓ Done</Badge>}
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((d) => (
                  <div
                    key={d}
                    className={`w-2 h-2 rounded-full ${
                      d <= project.difficulty ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-2">
                  {project.difficulty <= 2 ? 'Beginner' : project.difficulty <= 4 ? 'Intermediate' : 'Advanced'}
                </span>
              </div>

              {/* Stage */}
              {stage && (
                <div className="text-xs text-slate-500 mb-3">
                  {stage.icon} {stage.title}
                </div>
              )}

              {/* Skills */}
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
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-500">
          No projects match the current filter.
        </div>
      )}
    </div>
  )
}
