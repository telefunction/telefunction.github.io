const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  Java: '#b07219',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Dart: '#00b4ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

const FALLBACK_COLOR = '#3b82f6'

export function getLanguageColor(language: string | null): string {
  return (language && LANGUAGE_COLORS[language]) || FALLBACK_COLOR
}
