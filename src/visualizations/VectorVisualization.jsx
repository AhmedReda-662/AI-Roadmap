import { useState, useRef, useEffect } from 'react'

export default function VectorVisualization() {
  const canvasRef = useRef(null)
  const [vec1, setVec1] = useState({ x: 3, y: 2 })
  const [vec2, setVec2] = useState({ x: 1, y: 4 })

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    const scale = 40

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath()
      ctx.moveTo(cx + i * scale, 0)
      ctx.lineTo(cx + i * scale, h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, cy + i * scale)
      ctx.lineTo(w, cy + i * scale)
      ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, cy)
    ctx.lineTo(w, cy)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx, 0)
    ctx.lineTo(cx, h)
    ctx.stroke()

    // Draw vector function
    const drawVec = (vx, vy, color, label) => {
      const ex = cx + vx * scale
      const ey = cy - vy * scale

      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(ex, ey)
      ctx.stroke()

      // Arrowhead
      const angle = Math.atan2(cy - ey, ex - cx)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(ex, ey)
      ctx.lineTo(ex - 12 * Math.cos(angle - 0.3), ey + 12 * Math.sin(angle - 0.3))
      ctx.lineTo(ex - 12 * Math.cos(angle + 0.3), ey + 12 * Math.sin(angle + 0.3))
      ctx.fill()

      // Label
      ctx.fillStyle = color
      ctx.font = 'bold 12px sans-serif'
      ctx.fillText(label, ex + 8, ey - 8)

      // Magnitude
      const mag = Math.sqrt(vx * vx + vy * vy).toFixed(2)
      ctx.font = '10px sans-serif'
      ctx.fillText(`|${label}| = ${mag}`, ex + 8, ey + 12)
    }

    drawVec(vec1.x, vec1.y, '#6366f1', 'A')
    drawVec(vec2.x, vec2.y, '#10b981', 'B')

    // Dot product
    const dot = vec1.x * vec2.x + vec1.y * vec2.y
    ctx.fillStyle = '#f59e0b'
    ctx.font = '12px monospace'
    ctx.fillText(`A · B = ${dot.toFixed(2)}`, 10, 20)
    ctx.fillText(`cos(θ) = ${(dot / (Math.sqrt(vec1.x ** 2 + vec1.y ** 2) * Math.sqrt(vec2.x ** 2 + vec2.y ** 2))).toFixed(3)}`, 10, 36)
  }

  useEffect(() => {
    draw()
  }, [vec1, vec2])

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Vector Visualization</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Adjust vector components to see how they relate. The dot product measures alignment.
      </p>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full rounded-lg mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-primary-400">Vector A</div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 w-8">x:</label>
            <input
              type="range" min="-5" max="5" step="0.5" value={vec1.x}
              onChange={(e) => setVec1({ ...vec1, x: parseFloat(e.target.value) })}
              className="flex-1 accent-primary-500"
            />
            <span className="text-xs text-slate-900 dark:text-white w-8">{vec1.x}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 w-8">y:</label>
            <input
              type="range" min="-5" max="5" step="0.5" value={vec1.y}
              onChange={(e) => setVec1({ ...vec1, y: parseFloat(e.target.value) })}
              className="flex-1 accent-primary-500"
            />
            <span className="text-xs text-slate-900 dark:text-white w-8">{vec1.y}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-emerald-400">Vector B</div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 w-8">x:</label>
            <input
              type="range" min="-5" max="5" step="0.5" value={vec2.x}
              onChange={(e) => setVec2({ ...vec2, x: parseFloat(e.target.value) })}
              className="flex-1 accent-emerald-500"
            />
            <span className="text-xs text-slate-900 dark:text-white w-8">{vec2.x}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 w-8">y:</label>
            <input
              type="range" min="-5" max="5" step="0.5" value={vec2.y}
              onChange={(e) => setVec2({ ...vec2, y: parseFloat(e.target.value) })}
              className="flex-1 accent-emerald-500"
            />
            <span className="text-xs text-slate-900 dark:text-white w-8">{vec2.y}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
