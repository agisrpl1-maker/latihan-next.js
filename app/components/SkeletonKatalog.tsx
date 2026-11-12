export default function SkeletonKatalog() {
  return (
    <div aria-busy="true" aria-label="Memuat katalog event">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            className="h-44 animate-pulse rounded-xl border bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
