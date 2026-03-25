import { usePageTitle } from '@/hooks'

export default function MovieDetails() {
  usePageTitle('Movie Details')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl text-primary mb-4">Movie Details</h1>
      <p className="text-[var(--color-text-muted)]">Movie details will appear here.</p>
    </div>
  )
}