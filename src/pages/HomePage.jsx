import { usePageTitle } from '@/hooks'

export default function HomePage() {
  usePageTitle('Home')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl text-primary mb-4">Now Playing</h1>
      <p className="text-[var(--color-text-muted)]">Movies will appear here.</p>
    </div>
  )
}