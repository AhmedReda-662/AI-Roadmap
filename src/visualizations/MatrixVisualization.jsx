import { useState } from 'react'

export default function MatrixVisualization() {
  const [matA, setMatA] = useState([[1, 2], [3, 4]])
  const [matB, setMatB] = useState([[5, 6], [7, 8]])

  // Compute A × B
  const multiply = (a, b) => {
    const rows = a.length
    const cols = b[0].length
    const inner = b.length
    const result = []
    for (let i = 0; i < rows; i++) {
      const row = []
      for (let j = 0; j < cols; j++) {
        let sum = 0
        for (let k = 0; k < inner; k++) {
          sum += a[i][k] * b[k][j]
        }
        row.push(sum)
      }
      result.push(row)
    }
    return result
  }

  const result = multiply(matA, matB)

  const updateMat = (setMat, mat, row, col, val) => {
    const newMat = mat.map((r) => [...r])
    newMat[row][col] = parseFloat(val) || 0
    setMat(newMat)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Matrix Multiplication</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Edit the matrices and see the result. Each element is computed as the dot product of a row and column.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
        {/* Matrix A */}
        <div>
          <div className="text-sm text-primary-400 font-medium mb-2 text-center">A</div>
          <div className="grid grid-cols-2 gap-1">
            {matA.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateMat(setMatA, matA, i, j, e.target.value)}
                  className="w-14 h-10 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-center text-slate-900 dark:text-white text-sm focus:border-primary-500 focus:outline-none"
                />
              ))
            )}
          </div>
        </div>

        <div className="text-2xl text-slate-500 font-bold">×</div>

        {/* Matrix B */}
        <div>
          <div className="text-sm text-emerald-400 font-medium mb-2 text-center">B</div>
          <div className="grid grid-cols-2 gap-1">
            {matB.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateMat(setMatB, matB, i, j, e.target.value)}
                  className="w-14 h-10 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-center text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              ))
            )}
          </div>
        </div>

        <div className="text-2xl text-slate-500 font-bold">=</div>

        {/* Result */}
        <div>
          <div className="text-sm text-amber-400 font-medium mb-2 text-center">Result</div>
          <div className="grid grid-cols-2 gap-1">
            {result.map((row, i) =>
              row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-14 h-10 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center text-amber-400 text-sm font-medium"
                >
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Step by step */}
      <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="font-medium text-slate-900 dark:text-white mb-2">How it works:</div>
        <div className="font-mono text-xs space-y-1">
          {result.map((row, i) =>
            row.map((val, j) => (
              <div key={`${i}-${j}`}>
                C[{i},{j}] = {matA[i].map((v, k) => `${v}×${matB[k][j]}`).join(' + ')} = <span className="text-amber-400">{val}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
