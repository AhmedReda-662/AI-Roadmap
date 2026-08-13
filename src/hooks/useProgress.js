import { useSelector } from 'react-redux'
import { roadmap } from '../data/roadmap'
import { getOverallProgress, getStageProgress, getCurrentLesson, getStageTotalLessons, getStageCompletedLessons } from '../utils/progress'
import { isStageUnlocked, isLessonUnlocked, getStageStatus } from '../utils/unlock'

export function useProgress() {
  const { completedLessons, completedProjects, checkpointScores, streak } = useSelector(
    (state) => state.progress
  )

  const overallProgress = getOverallProgress(roadmap, completedLessons)
  const currentLesson = getCurrentLesson(roadmap, completedLessons)

  const getStageProgressPercent = (stageId) => {
    const stage = roadmap.find((s) => s.id === stageId)
    if (!stage) return 0
    return getStageProgress(stage, completedLessons)
  }

  const getIsStageUnlocked = (stageId) => {
    return isStageUnlocked(stageId, checkpointScores)
  }

  const getIsLessonUnlocked = (lesson) => {
    return isLessonUnlocked(lesson, completedLessons)
  }

  const getStatus = (stage) => {
    return getStageStatus(stage, completedLessons, checkpointScores)
  }

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId)
  }

  const isProjectCompleted = (projectId) => {
    return completedProjects.includes(projectId)
  }

  const totalLessons = roadmap.reduce(
    (sum, stage) => sum + getStageTotalLessons(stage),
    0
  )

  const totalProjects = Object.keys(
    // Will be imported from projects data
    {}
  ).length

  return {
    completedLessons,
    completedProjects,
    checkpointScores,
    streak,
    overallProgress,
    currentLesson,
    totalLessons,
    completedLessonsCount: completedLessons.length,
    getStageProgressPercent,
    getIsStageUnlocked,
    getIsLessonUnlocked,
    getStatus,
    isLessonCompleted,
    isProjectCompleted,
  }
}
