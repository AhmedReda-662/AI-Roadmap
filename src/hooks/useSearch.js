import { useMemo } from 'react'
import { roadmap } from '../data/roadmap'
import { projects } from '../data/projects'

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.length < 2) return { lessons: [], projects: [], stages: [] }

    const q = query.toLowerCase()

    // Search stages
    const matchedStages = roadmap.filter(
      (stage) =>
        stage.title.toLowerCase().includes(q) ||
        stage.description.toLowerCase().includes(q)
    )

    // Search lessons
    const matchedLessons = []
    roadmap.forEach((stage) => {
      stage.topics.forEach((topic) => {
        topic.lessons.forEach((lesson) => {
          if (
            lesson.title.toLowerCase().includes(q) ||
            topic.title.toLowerCase().includes(q)
          ) {
            matchedLessons.push({ ...lesson, stageId: stage.id, stageTitle: stage.title, topicTitle: topic.title })
          }
        })
      })
    })

    // Search projects
    const matchedProjects = Object.values(projects).filter(
      (project) =>
        project.title.toLowerCase().includes(q) ||
        project.skills.some((s) => s.toLowerCase().includes(q))
    )

    return { lessons: matchedLessons, projects: matchedProjects, stages: matchedStages }
  }, [query])
}
