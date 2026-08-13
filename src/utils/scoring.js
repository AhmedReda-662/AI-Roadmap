/**
 * Calculate quiz score as percentage.
 */
export function calculateScore(answers, questions) {
  if (!questions.length) return 0
  let correct = 0
  questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      correct++
    }
  })
  return Math.round((correct / questions.length) * 100)
}

/**
 * Check if score meets passing threshold.
 */
export function isPassing(score, passingScore = 80) {
  return score >= passingScore
}

/**
 * Get weak areas from wrong answers.
 * Groups by tags to identify problem topics.
 */
export function getWeakAreas(answers, questions) {
  const weakTags = {}
  questions.forEach((q, idx) => {
    if (answers[idx] !== q.correctIndex) {
      ;(q.tags || []).forEach((tag) => {
        weakTags[tag] = (weakTags[tag] || 0) + 1
      })
    }
  })

  return Object.entries(weakTags)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
}

/**
 * Get question result (correct/incorrect) with explanation.
 */
export function getQuestionResults(answers, questions) {
  return questions.map((q, idx) => ({
    question: q,
    selected: answers[idx],
    correct: q.correctIndex,
    isCorrect: answers[idx] === q.correctIndex,
    explanation: q.explanation,
  }))
}
