import Badge from '../components/ui/Badge'

const specializations = [
  {
    id: 'genai',
    title: 'Generative AI',
    topics: [
      'Advanced RAG',
      'Fine-tuning LLMs',
      'Multimodal Models',
      'Agent Systems',
      'AI System Design',
    ],
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    topics: [
      'Advanced YOLO',
      'Image Segmentation',
      'Pose Estimation',
      '3D Vision',
      'Video Analysis',
    ],
  },
  {
    id: 'nlp',
    title: 'Advanced NLP',
    topics: [
      'Advanced Transformers',
      'LLM Fine-tuning',
      'Retrieval Systems',
      'Multilingual NLP',
      '对话系统',
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    topics: [
      'Advanced ML Algorithms',
      'Feature Engineering',
      'Recommendation Systems',
      'Time Series Analysis',
      'AutoML',
    ],
  },
  {
    id: 'research',
    title: 'Research',
    topics: [
      'Reading Papers',
      'Reproducing Results',
      'Experiment Design',
      'Model Architecture Research',
      'Publishing',
    ],
  },
]

export default function SpecializationPage() {
  const total = specializations.length

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-16">
      {/* Header */}
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 font-medium mb-4">
        Specialization
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Choose where to go deeper
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          After the core line, pick a discipline to pursue further. Each path is a
          focused curriculum of five areas.
        </p>
      </header>

      {/* Grid — numbered entries, one border only */}
      <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden md:grid-cols-2">
        {specializations.map((spec, i) => (
          <div
            key={spec.id}
            className="bg-white dark:bg-slate-900/60 p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-sm text-slate-300 dark:text-slate-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800 group-hover:bg-primary-400/50 transition-colors" />
            </div>
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {spec.title}
            </h2>
            <ul className="space-y-2">
              {spec.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Journey complete marker */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800/60 pt-10">
        <Badge variant="primary">✦ {total} specializations</Badge>
        <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
          AI Engineer journey
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-500 max-w-md text-sm leading-relaxed">
          Complete the core line, then choose one specialization to continue. The
          road is long — this is where it bends.
        </p>
      </div>
    </div>
  )
}