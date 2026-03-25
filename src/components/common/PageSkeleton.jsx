export default function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="skeleton h-8 w-48 mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="skeleton aspect-[2/3] rounded-xl" />
        ))}
      </div>
    </div>
  )
}