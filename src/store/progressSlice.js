import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  completedLessons: [],
  completedProjects: [],
  checkpointScores: {},
  currentStageId: 'programming',
  currentLessonId: null,
  notes: {},
  bookmarks: [],
  streak: {
    count: 0,
    lastActiveDate: null,
  },
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    completeLesson: (state, action) => {
      const lessonId = action.payload
      if (!state.completedLessons.includes(lessonId)) {
        state.completedLessons.push(lessonId)
      }
      state.currentLessonId = lessonId
      // Update streak
      const today = new Date().toISOString().split('T')[0]
      if (state.streak.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (state.streak.lastActiveDate === yesterday) {
          state.streak.count += 1
        } else if (state.streak.lastActiveDate !== today) {
          state.streak.count = 1
        }
        state.streak.lastActiveDate = today
      }
    },
    uncompleteLesson: (state, action) => {
      const lessonId = action.payload
      state.completedLessons = state.completedLessons.filter((id) => id !== lessonId)
    },
    completeProject: (state, action) => {
      const projectId = action.payload
      if (!state.completedProjects.includes(projectId)) {
        state.completedProjects.push(projectId)
      }
    },
    uncompleteProject: (state, action) => {
      const projectId = action.payload
      state.completedProjects = state.completedProjects.filter((id) => id !== projectId)
    },
    saveCheckpointScore: (state, action) => {
      const { checkpointId, score, passed } = action.payload
      const existing = state.checkpointScores[checkpointId]
      state.checkpointScores[checkpointId] = {
        score,
        passed,
        attempts: existing ? existing.attempts + 1 : 1,
        date: new Date().toISOString(),
        bestScore: existing ? Math.max(existing.bestScore, score) : score,
      }
    },
    setCurrentStage: (state, action) => {
      state.currentStageId = action.payload
    },
    setCurrentLesson: (state, action) => {
      state.currentLessonId = action.payload
    },
    setNote: (state, action) => {
      const { lessonId, note } = action.payload
      state.notes[lessonId] = note
    },
    toggleBookmark: (state, action) => {
      const lessonId = action.payload
      const idx = state.bookmarks.indexOf(lessonId)
      if (idx >= 0) {
        state.bookmarks.splice(idx, 1)
      } else {
        state.bookmarks.push(lessonId)
      }
    },
    resetProgress: () => initialState,
    hydrate: (state, action) => {
      const saved = action.payload
      return { ...state, ...saved }
    },
  },
})

export const {
  completeLesson,
  uncompleteLesson,
  completeProject,
  uncompleteProject,
  saveCheckpointScore,
  setCurrentStage,
  setCurrentLesson,
  setNote,
  toggleBookmark,
  resetProgress,
  hydrate,
} = progressSlice.actions

export default progressSlice.reducer
