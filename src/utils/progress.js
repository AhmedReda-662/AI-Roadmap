/**
 * Calculate completion percentage for a single stage.
 */
export function getStageProgress(stage, completedLessons) {
  const totalLessons = stage.topics.reduce(
    (sum, topic) => sum + topic.lessons.length,
    0
  )
  if (totalLessons === 0) return 0
  const completed = stage.topics.reduce((sum, topic) => {
    return (
      sum +
      topic.lessons.filter((l) => completedLessons.includes(l.id)).length
    )
  }, 0)
  return Math.round((completed / totalLessons) * 100)
}

/**
 * Calculate overall progress across all stages.
 */
export function getOverallProgress(roadmap, completedLessons) {
  const totalLessons = roadmap.reduce(
    (sum, stage) =>
      sum +
      stage.topics.reduce((s, topic) => s + topic.lessons.length, 0),
    0
  )
  if (totalLessons === 0) return 0
  const completed = completedLessons.length
  return Math.round((completed / totalLessons) * 100)
}

/**
 * Find the current/next lesson the user should work on.
 */
export function getCurrentLesson(roadmap, completedLessons) {
  for (const stage of roadmap) {
    for (const topic of stage.topics) {
      for (const lesson of topic.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { stage, topic, lesson }
        }
      }
    }
  }
  return null // All complete
}

/**
 * Get total lesson count for a stage.
 */
export function getStageTotalLessons(stage) {
  return stage.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
}

/**
 * Get completed lesson count for a stage.
 */
export function getStageCompletedLessons(stage, completedLessons) {
  return stage.topics.reduce((sum, topic) => {
    return (
      sum +
      topic.lessons.filter((l) => completedLessons.includes(l.id)).length
    )
  }, 0)
}
