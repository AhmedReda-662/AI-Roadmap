import { useState, useRef, useEffect, useCallback } from 'react'

export default function GradientDescentViz() {
  const canvasRef = useRef(null)
  const [learningRate, setLearningRate] = useState(0.1)
  const [startX, setStartX] = useState(-2)
  const [steps, setSteps] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const animRef = useRef(null)

  // Simple quadratic loss: f(x) = (x-1)^2
  const loss = (x) => (x - 1) ** 2
  const gradient = (x) => 2 * (x - 1)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // Background
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * w
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
      const y = (i / 10) * h
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // Loss curve
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let px = 0; px < w; px++) {
      const x = -3 + (px / w) * 6
      const y = loss(x)
      const py = h - 20 - (y / 10) * (h - 40)
      if (px === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.stroke()

    // Axes labels
    ctx.fillStyle = '#64748b'
    ctx.font = '11px sans-serif'
    ctx.fillText('Loss', 5, 15)
    ctx.fillText('x', w - 15, h - 5)
    ctx.fillText('x = 1 (minimum)', w / 2 - 30, h - 5)

    // Steps
    if (steps.length > 0) {
      steps.forEach((step, idx) => {
        if (idx > currentStep) return
        const px = ((step.x + 3) / 6) * w
        const py = h - 20 - (loss(step.x) / 10) * (h - 40)

        // Line to previous
        if (idx > 0 && idx <= currentStep) {
          const prev = steps[idx - 1]
          const ppx = ((prev.x + 3) / 6) * w
          const ppy = h - 20 - (loss(prev.x) / 10) * (h - 40)
          ctx.strokeStyle = idx <= currentStep ? '#f59e0b' : '#334155'
          ctx.lineWidth = 1.5
          ctx.setLineDash([4, 4])
          ctx.beginPath()
          ctx.moveTo(ppx, ppy)
          ctx.lineTo(px, py)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Point
        ctx.fillStyle = idx === currentStep ? '#f59e0b' : '#6366f1'
        ctx.beginPath()
        ctx.arc(px, py, idx === currentStep ? 6 : 4, 0, Math.PI * 2)
        ctx.fill()

        if (idx === currentStep) {
          ctx.strokeStyle = '#f59e0b'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(px, py, 10, 0, Math.PI * 2)
          ctx.stroke()
        }
      })
    }
  }, [steps, currentStep])

  useEffect(() => {
    draw()
  }, [draw])

  const computeSteps = () => {
    const result = [{ x: startX }]
    let x = startX
    for (let i = 0; i < 20; i++) {
      const g = gradient(x)
      x = x - learningRate * g
      result.push({ x })
      if (Math.abs(g) < 0.001) break
    }
    return result
  }

  const handleStart = () => {
    const s = computeSteps()
    setSteps(s)
    setCurrentStep(0)
    setIsRunning(true)

    let idx = 0
    const animate = () => {
      idx++
      if (idx < s.length) {
        setCurrentStep(idx)
        animRef.current = setTimeout(animate, 400)
      } else {
        setIsRunning(false)
      }
    }
    animRef.current = setTimeout(animate, 400)
  }

  const handleReset = () => {
    if (animRef.current) clearTimeout(animRef.current)
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
    draw()
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Gradient Descent Visualizer</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Minimizing f(x) = (x - 1)². Adjust the learning rate and starting point to see how gradient descent converges.
      </p>

      <canvas
        ref={canvasRef}
        width={500}
        height={250}
        className="w-full rounded-lg mb-4"
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-slate-400 block mb-1">
            Learning Rate: {learningRate}
          </label>
          <input
            type="range"
            min="0.01"
            max="0.9"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-primary-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">
            Start X: {startX}
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={startX}
            onChange={(e) => setStartX(parseFloat(e.target.value))}
            className="w-full accent-primary-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {isRunning ? 'Running...' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {steps.length > 0 && (
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="text-amber-400 font-medium">Step {currentStep + 1}/{steps.length}</span>
          {' · '}
          x = {steps[currentStep]?.x.toFixed(4)}
          {' · '}
          Loss = {loss(steps[currentStep]?.x).toFixed(6)}
        </div>
      )}
    </div>
  )
}
