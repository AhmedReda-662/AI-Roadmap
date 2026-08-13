import { useState, useMemo } from 'react'

const exampleSentences = [
  ['The', 'cat', 'sat', 'on', 'the', 'mat'],
  ['AI', 'is', 'changing', 'the', 'world', '.'],
  ['Attention', 'is', 'all', 'you', 'need', '.'],
  ['The', 'quick', 'brown', 'fox', 'jumps', '.'],
]

// Generate pseudo-attention weights (deterministic based on tokens)
function generateAttention(tokens) {
  const n = tokens.length
  const weights = []
  for (let i = 0; i < n; i++) {
    const row = []
    for (let j = 0; j < n; j++) {
      // Simple heuristic: adjacent tokens have higher attention
      const dist = Math.abs(i - j)
      const sameWord = tokens[i] === tokens[j] ? 0.3 : 0
      const val = Math.exp(-dist * 0.5) + sameWord + Math.random() * 0.1
      row.push(val)
    }
    // Normalize
    const sum = row.reduce((a, b) => a + b, 0)
    weights.push(row.map((v) => v / sum))
  }
  return weights
}

export default function AttentionViz() {
  const [sentenceIdx, setSentenceIdx] = useState(0)
  const [selectedToken, setSelectedToken] = useState(0)

  const tokens = exampleSentences[sentenceIdx]
  const attention = useMemo(() => generateAttention(tokens), [tokens])

  const getColor = (value) => {
    const intensity = Math.round(value * 255)
    return `rgba(99, 102, 241, ${value})`
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Attention Visualization</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Click a token to see how much attention each other token receives. Darker = more attention.
      </p>

      {/* Sentence selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {exampleSentences.map((sent, idx) => (
          <button
            key={idx}
            onClick={() => { setSentenceIdx(idx); setSelectedToken(0) }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              sentenceIdx === idx
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {sent.join(' ')}
          </button>
        ))}
      </div>

      {/* Tokens */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tokens.map((token, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedToken(idx)}
            className={`px-3 py-2 rounded-lg text-sm font-mono transition-all ${
              idx === selectedToken
                ? 'bg-primary-600 text-white ring-2 ring-primary-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {token}
          </button>
        ))}
      </div>

      {/* Attention matrix */}
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Header row */}
          <div className="flex">
            <div className="w-20 h-8" />
            {tokens.map((token, j) => (
              <div
                key={j}
                className="w-12 h-8 flex items-center justify-center text-xs text-slate-400 font-mono"
              >
                {token.slice(0, 4)}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {attention.map((row, i) => (
            <div key={i} className="flex">
              <div
                className={`w-20 h-10 flex items-center justify-center text-xs font-mono ${
                  i === selectedToken ? 'text-primary-400 font-bold' : 'text-slate-500'
                }`}
              >
                {tokens[i].slice(0, 6)}
              </div>
              {row.map((value, j) => (
                <div
                  key={j}
                  className="w-12 h-10 flex items-center justify-center text-xs font-mono rounded m-0.5 transition-all"
                  style={{
                    backgroundColor: getColor(value),
                    color: value > 0.3 ? 'white' : '#94a3b8',
                  }}
                  title={`${tokens[i]} → ${tokens[j]}: ${(value * 100).toFixed(1)}%`}
                >
                  {(value * 100).toFixed(0)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-500 dark:text-slate-400">
        <span className="text-primary-400 font-medium">Token "{tokens[selectedToken]}"</span> attends most to:
        {attention[selectedToken]
          .map((v, i) => ({ token: tokens[i], value: v, idx: i }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 3)
          .map((t, i) => (
            <span key={i}>
              {i > 0 && ','}{' '}
              <span className="text-slate-900 dark:text-white font-medium">"{t.token}"</span>
              {' '}({(t.value * 100).toFixed(0)}%)
            </span>
          ))}
      </div>
    </div>
  )
}
