import { roadmap } from '../data/roadmap'
import { getStageProgress } from './progress'

/**
 * Check if a stage is unlocked.
 * Stage 1 is always unlocked.
 * Other stages require all prerequisite stages to have a passing checkpoint score.
 */
export function isStageUnlocked(stageId, checkpointScores) {
  const stageIdx = roadmap.findIndex((s) => s.id === stageId)
  if (stageIdx <= 0) return true // First stage always unlocked

  const stage = roadmap[stageIdx]
  if (!stage.prerequisites || stage.prerequisites.length === 0) {
    // No explicit prerequisites — require previous stage checkpoint
    const prevStage = roadmap[stageIdx - 1]
    const prevScore = checkpointScores[prevStage.checkpoint?.id]
    return prevScore?.passed === true
  }

  // Check all explicit prerequisites
  return stage.prerequisites.every((prereqId) => {
    const prereqStage = roadmap.find((s) => s.id === prereqId)
    if (!prereqStage) return true
    const score = checkpointScores[prereqStage.checkpoint?.id]
    return score?.passed === true
  })
}

/**
 * Check if a lesson's prerequisites are met.
 */
export function isLessonUnlocked(lesson, completedLessons) {
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) return true
  return lesson.prerequisites.every((prereqId) =>
    completedLessons.includes(prereqId)
  )
}

/**
 * Get the list of unmet prerequisites for a lesson.
 */
export function getUnmetPrerequisites(lesson, completedLessons) {
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) return []
  return lesson.prerequisites.filter(
    (prereqId) => !completedLessons.includes(prereqId)
  )
}

/**
 * Get the stage status: locked | available | in-progress | completed
 */
export function getStageStatus(stage, completedLessons, checkpointScores) {
  const unlocked = isStageUnlocked(stage.id, checkpointScores)
  if (!unlocked) return 'locked'

  const progress = getStageProgress(stage, completedLessons)
  if (progress === 0) return 'available'

  const score = checkpointScores[stage.checkpoint?.id]
  if (score?.passed) return 'completed'

  return 'in-progress'
}
