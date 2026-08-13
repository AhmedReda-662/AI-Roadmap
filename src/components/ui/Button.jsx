const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-700/30',
  secondary: 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 dark:text-slate-200 dark:border-slate-700',
  ghost: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/60 dark:text-slate-400 dark:hover:text-slate-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
