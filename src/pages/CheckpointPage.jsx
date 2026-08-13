import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { roadmap } from '../data/roadmap'
import { questions as allQuestions } from '../data/quizzes'
import { saveCheckpointScore } from '../store/progressSlice'
import { calculateScore, isPassing, getWeakAreas, getQuestionResults } from '../utils/scoring'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'

export default function CheckpointPage() {
  const { stageId } = useParams()
  const dispatch = useDispatch()
  const stage = roadmap.find((s) => s.id === stageId)

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  // Get questions for this checkpoint — unconditionally (hooks rules). Guards for missing stage.
  const missing = !stage || !stage.checkpoint
  const questions = useMemo(() => {
    if (missing || !stage?.checkpoint) return []
    const qIds = stage.checkpoint.questionIds || []
    // If questionIds are defined, use them; otherwise grab first 10 for this stage
    if (qIds.length > 0) {
      return qIds.map((id) => allQuestions[id]).filter(Boolean)
    }
    // Fallback: get questions matching this stageId
    return Object.values(allQuestions)
      .filter((q) => q.stageId === stageId)
      .slice(0, 10)
  }, [stage, stageId, missing])

  if (missing) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Checkpoint not found</h1>
        <Link to="/roadmap" className="text-primary-400">Back to Roadmap</Link>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No questions available</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Questions for this checkpoint haven't been added yet.</p>
        <Link to={`/roadmap/${stageId}`}>
          <Button variant="secondary">Back to {stage.title}</Button>
        </Link>
      </div>
    )
  }

  const question = questions[currentQ]
  const totalQuestions = questions.length
  const score = submitted ? calculateScore(answers, questions) : null
  const passed = submitted ? isPassing(score, stage.checkpoint.passingScore) : null
  const weakAreas = submitted ? getWeakAreas(answers, questions) : []
  const results = submitted ? getQuestionResults(answers, questions) : []

  const handleSelectOption = (idx) => {
    if (submitted) return
    setSelectedOption(idx)
  }

  const handleNext = () => {
    // Save answer
    const newAnswers = { ...answers, [currentQ]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      // Submit
      const finalScore = calculateScore(newAnswers, questions)
      const passedResult = isPassing(finalScore, stage.checkpoint.passingScore)
      dispatch(
        saveCheckpointScore({
          checkpointId: stage.checkpoint.id,
          score: finalScore,
          passed: passedResult,
        })
      )
      setSubmitted(true)
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setAnswers({})
    setSelectedOption(null)
    setSubmitted(false)
  }

  // Results view
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Link
          to={`/roadmap/${stageId}`}
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {stage.title}
        </Link>

        <div className="text-center mb-10">
          <div className="mb-5 flex justify-center">
          <span className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${passed ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-slate-300 dark:border-slate-700'}`}>
            {passed ? (
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </span>
        </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {passed ? 'Checkpoint Passed!' : 'Not Quite There'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {passed
              ? 'Great job! You\'ve demonstrated understanding of this stage.'
              : 'You need 80% to pass. Review the weak areas below and try again.'}
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
                {score}%
              </div>
              <div className="text-sm text-slate-500">Score</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 dark:text-white">
                {results.filter((r) => r.isCorrect).length}/{totalQuestions}
              </div>
              <div className="text-sm text-slate-500">Correct</div>
            </div>
          </div>
        </div>

        {/* Weak areas */}
        {weakAreas.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Weak Areas</h3>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((w) => (
                <Badge key={w.tag} variant="danger">
                  {w.tag} ({w.count} wrong)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Question review */}
        <div className="space-y-4 mb-8">
          {results.map((r, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                r.isCorrect
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-lg ${r.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {r.isCorrect ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="text-slate-900 dark:text-white font-medium mb-2">{r.question.question}</p>
                  {!r.isCorrect && (
                    <div className="text-sm space-y-1">
                      <p className="text-red-400">Your answer: {r.question.options[r.selected]}</p>
                      <p className="text-emerald-400">Correct: {r.question.options[r.correct]}</p>
                    </div>
                  )}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{r.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleRetry} variant="secondary">
            Try Again
          </Button>
          {passed && (
            <Link to={stage.number < 15 ? `/roadmap` : '/specialization'}>
              <Button>
                {stage.number < 15 ? 'Continue to Next Stage' : 'View Specializations'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Quiz view
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link
        to={`/roadmap/${stageId}`}
        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {stage.title}
      </Link>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Checkpoint</h1>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Question {currentQ + 1} of {totalQuestions}
          </span>
        </div>
        <ProgressBar value={((currentQ) / totalQuestions) * 100} size="sm" />
      </div>

      {/* Question */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg text-slate-900 dark:text-white font-medium mb-6">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedOption === idx
                  ? 'border-primary-500 bg-primary-500/10 text-slate-900 dark:text-white'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="font-medium mr-3 text-slate-400 dark:text-slate-500">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => {
            if (currentQ > 0) {
              setCurrentQ(currentQ - 1)
              setSelectedOption(answers[currentQ - 1] ?? null)
            }
          }}
          disabled={currentQ === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={selectedOption === null}>
          {currentQ === totalQuestions - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
