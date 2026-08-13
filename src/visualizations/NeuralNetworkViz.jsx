import { useState, useRef, useEffect } from 'react'

export default function NeuralNetworkViz() {
  const canvasRef = useRef(null)
  const [layers, setLayers] = useState([3, 4, 4, 2])
  const [animate, setAnimate] = useState(false)
  const [activeLayer, setActiveLayer] = useState(-1)

  const layerLabels = ['Input', 'Hidden 1', 'Hidden 2', 'Output']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    const padding = 60
    const layerSpacing = (w - padding * 2) / (layers.length - 1)
    const maxNeurons = Math.max(...layers)

    // Draw connections
    for (let l = 0; l < layers.length - 1; l++) {
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          const x1 = padding + l * layerSpacing
          const y1 = h / 2 + (i - (layers[l] - 1) / 2) * 50
          const x2 = padding + (l + 1) * layerSpacing
          const y2 = h / 2 + (j - (layers[l + 1] - 1) / 2) * 50

          const isActive = animate && (l === activeLayer || l === activeLayer - 1)
          ctx.strokeStyle = isActive ? '#6366f1' : '#1e293b'
          ctx.lineWidth = isActive ? 2 : 1
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }
    }

    // Draw neurons
    for (let l = 0; l < layers.length; l++) {
      for (let i = 0; i < layers[l]; i++) {
        const x = padding + l * layerSpacing
        const y = h / 2 + (i - (layers[l] - 1) / 2) * 50

        const isActive = animate && l <= activeLayer
        const isCurrentLayer = animate && l === activeLayer

        // Glow
        if (isCurrentLayer) {
          ctx.shadowColor = '#6366f1'
          ctx.shadowBlur = 15
        }

        ctx.fillStyle = isActive ? '#6366f1' : '#334155'
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = isActive ? '#818cf8' : '#475569'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      }

      // Layer labels
      const x = padding + l * layerSpacing
      ctx.fillStyle = '#64748b'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(layerLabels[l] || `Layer ${l}`, x, h - 15)
      ctx.fillText(`${layers[l]} neurons`, x, 20)
    }
  }, [layers, animate, activeLayer])

  const handleAnimate = () => {
    setAnimate(true)
    setActiveLayer(0)
    let l = 0
    const interval = setInterval(() => {
      l++
      if (l >= layers.length) {
        clearInterval(interval)
        setTimeout(() => {
          setAnimate(false)
          setActiveLayer(-1)
        }, 800)
      } else {
        setActiveLayer(l)
      }
    }, 600)
  }

  const addLayer = () => {
    if (layers.length < 6) {
      setLayers([...layers, 4])
    }
  }

  const removeLayer = () => {
    if (layers.length > 2) {
      setLayers(layers.slice(0, -1))
    }
  }

  const updateNeurons = (idx, delta) => {
    const newLayers = [...layers]
    newLayers[idx] = Math.max(1, Math.min(8, newLayers[idx] + delta))
    setLayers(newLayers)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Neural Network</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Visualize how data flows through layers. Each neuron connects to every neuron in the next layer.
      </p>

      <canvas
        ref={canvasRef}
        width={500}
        height={280}
        className="w-full rounded-lg mb-4"
      />

      {/* Layer controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        {layers.map((neurons, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 w-16">{layerLabels[idx] || `L${idx}`}</span>
            <button
              onClick={() => updateNeurons(idx, -1)}
              className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm flex items-center justify-center"
            >
              −
            </button>
            <span className="text-sm text-slate-900 dark:text-white w-4 text-center">{neurons}</span>
            <button
              onClick={() => updateNeurons(idx, 1)}
              className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm flex items-center justify-center"
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAnimate}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          ▶ Forward Pass
        </button>
        <button
          onClick={addLayer}
          className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm transition-colors"
        >
          + Layer
        </button>
        <button
          onClick={removeLayer}
          className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm transition-colors"
        >
          − Layer
        </button>
      </div>
    </div>
  )
}
