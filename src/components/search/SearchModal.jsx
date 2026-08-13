import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { closeSearch, openSearch, setSearchQuery } from '../../store/uiSlice'
import { useSearch } from '../../hooks/useSearch'

export default function SearchModal() {
  const { searchOpen, searchQuery } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const { lessons, projects, stages } = useSearch(searchQuery)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (searchOpen) {
          dispatch(closeSearch())
        } else {
          dispatch(openSearch())
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, dispatch])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  if (!searchOpen) return null

  const handleSelect = (path) => {
    dispatch(closeSearch())
    navigate(path)
  }

  const hasResults = lessons.length > 0 || projects.length > 0 || stages.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => dispatch(closeSearch())} />
      <div className="relative bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, lessons, projects..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 dark:text-white dark:placeholder-slate-500 outline-none text-sm"
          />
          <kbd className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {!searchQuery && (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">
              Start typing to search across all content...
            </div>
          )}

          {searchQuery && !hasResults && (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">
              No results found for "{searchQuery}"
            </div>
          )}

          {/* Stages */}
          {stages.length > 0 && (
            <div className="px-2 py-2">
              <div className="px-3 py-1 text-xs font-medium text-slate-500 uppercase">Stages</div>
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => handleSelect(`/roadmap/${stage.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <span className="text-lg">{stage.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{stage.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Stage {stage.number}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Lessons */}
          {lessons.length > 0 && (
            <div className="px-2 py-2">
              <div className="px-3 py-1 text-xs font-medium text-slate-500 uppercase">Lessons</div>
              {lessons.slice(0, 10).map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelect(`/learn/${lesson.stageId}/${lesson.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{lesson.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{lesson.stageTitle} → {lesson.topicTitle}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="px-2 py-2">
              <div className="px-3 py-1 text-xs font-medium text-slate-500 uppercase">Projects</div>
              {projects.slice(0, 5).map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelect(`/projects/${project.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{project.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{project.skills.slice(0, 3).join(' · ')}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
