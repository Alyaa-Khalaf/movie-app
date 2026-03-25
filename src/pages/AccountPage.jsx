import { usePageTitle } from '@/hooks'

export default function AccountPage() {
  usePageTitle('My Account')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl text-primary mb-4">My Account</h1>
      <p className="text-[var(--color-text-muted)]">Account details will appear here.</p>
    </div>
  )
}