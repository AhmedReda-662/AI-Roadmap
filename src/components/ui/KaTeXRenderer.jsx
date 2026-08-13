import { useMemo } from 'react'

export default function KaTeXRenderer({ math, display = false, className = '' }) {
  const html = useMemo(() => {
    if (!math || typeof window === 'undefined') return ''
    try {
      if (window.katex) {
        return window.katex.renderToString(math, {
          throwOnError: false,
          displayMode: display,
        })
      }
      // Fallback: render as styled code if KaTeX not loaded
      return `<code class="text-primary-400 font-mono">${math}</code>`
    } catch {
      return `<code class="text-primary-400 font-mono">${math}</code>`
    }
  }, [math, display])

  return (
    <span
      className={`${display ? 'block my-4 overflow-x-auto' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
