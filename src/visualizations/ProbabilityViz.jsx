import { useState, useRef, useEffect, useMemo } from 'react'

// Normal distribution PDF
const normalPDF = (x, mean, std) => {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2)
}

// Binomial PMF
const binomialPMF = (k, n, p) => {
  const comb = (a, b) => {
    if (b > a) return 0
    if (b === 0 || b === a) return 1
    let result = 1
    for (let i = 0; i < b; i++) {
      result = (result * (a - i)) / (i + 1)
    }
    return result
  }
  return comb(n, k) * p ** k * (1 - p) ** (n - k)
}

export default function ProbabilityViz() {
  const canvasRef = useRef(null)
  const [distType, setDistType] = useState('normal')
  const [params, setParams] = useState({ mean: 0, std: 1, n: 20, p: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * w
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      const y = (i / 10) * h
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
    }

    const padding = 30
    const plotW = w - padding * 2
    const plotH = h - padding * 2

    if (distType === 'normal') {
      // Draw normal distribution
      const { mean, std } = params
      const xMin = mean - 4 * std
      const xMax = mean + 4 * std

      // Find max Y for scaling
      const maxY = normalPDF(mean, mean, std)

      ctx.strokeStyle = '#6366f1'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let px = 0; px <= plotW; px++) {
        const x = xMin + (px / plotW) * (xMax - xMin)
        const y = normalPDF(x, mean, std)
        const py = padding + plotH - (y / maxY) * plotH
        if (px === 0) ctx.moveTo(padding + px, py)
        else ctx.lineTo(padding + px, py)
      }
      ctx.stroke()

      // Fill
      ctx.globalAlpha = 0.15
      ctx.fillStyle = '#6366f1'
      ctx.lineTo(padding + plotW, padding + plotH)
      ctx.lineTo(padding, padding + plotH)
      ctx.fill()
      ctx.globalAlpha = 1

      // Mean line
      const meanPx = padding + ((mean - xMin) / (xMax - xMin)) * plotW
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(meanPx, padding)
      ctx.lineTo(meanPx, padding + plotH)
      ctx.stroke()
      ctx.setLineDash([])

      // Labels
      ctx.fillStyle = '#f59e0b'
      ctx.font = '11px sans-serif'
      ctx.fillText(`μ = ${mean}`, meanPx + 4, padding + 15)
      ctx.fillStyle = '#64748b'
      ctx.fillText(`σ = ${std}`, padding + 4, padding + 15)
      ctx.fillText(`N(${mean}, ${std}²)`, w - 80, padding + 15)

    } else {
      // Binomial
      const { n, p } = params
      const barW = plotW / (n + 1)

      let maxY = 0
      for (let k = 0; k <= n; k++) {
        maxY = Math.max(maxY, binomialPMF(k, n, p))
      }

      for (let k = 0; k <= n; k++) {
        const prob = binomialPMF(k, n, p)
        const barH = (prob / maxY) * plotH
        const x = padding + k * barW + barW * 0.1
        const y = padding + plotH - barH

        ctx.fillStyle = '#6366f1'
        ctx.fillRect(x, y, barW * 0.8, barH)

        // Label
        if (n <= 20 || k % 2 === 0) {
          ctx.fillStyle = '#64748b'
          ctx.font = '9px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(k, x + barW * 0.4, padding + plotH + 12)
        }
      }

      ctx.fillStyle = '#64748b'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(`B(${n}, ${p})`, padding + 4, padding + 15)
      ctx.fillText(`E[X] = ${(n * p).toFixed(1)}`, padding + 4, padding + 30)
    }
  }, [distType, params])

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Probability Distribution</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Explore how parameters affect the shape of probability distributions.
      </p>

      {/* Distribution type */}
      <div className="flex gap-2 mb-4">
        {['normal', 'binomial'].map((type) => (
          <button
            key={type}
            onClick={() => setDistType(type)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
              distType === type
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={450}
        height={250}
        className="w-full rounded-lg mb-4"
      />

      {/* Parameters */}
      <div className="grid grid-cols-2 gap-4">
        {distType === 'normal' ? (
          <>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Mean (μ): {params.mean}
              </label>
              <input
                type="range" min="-5" max="5" step="0.5" value={params.mean}
                onChange={(e) => setParams({ ...params, mean: parseFloat(e.target.value) })}
                className="w-full accent-primary-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Std Dev (σ): {params.std}
              </label>
              <input
                type="range" min="0.2" max="3" step="0.1" value={params.std}
                onChange={(e) => setParams({ ...params, std: parseFloat(e.target.value) })}
                className="w-full accent-primary-500"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Trials (n): {params.n}
              </label>
              <input
                type="range" min="1" max="40" step="1" value={params.n}
                onChange={(e) => setParams({ ...params, n: parseInt(e.target.value) })}
                className="w-full accent-primary-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">
                Probability (p): {params.p}
              </label>
              <input
                type="range" min="0.05" max="0.95" step="0.05" value={params.p}
                onChange={(e) => setParams({ ...params, p: parseFloat(e.target.value) })}
                className="w-full accent-primary-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
