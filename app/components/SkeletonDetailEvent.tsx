export default function SkeletonDetailEvent() {
  return (
    <article
      aria-busy="true"
      aria-label="Memuat detail event"
      className="rounded-xl border bg-white p-6"
    >
      <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-9 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="mt-5 h-6 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-9 w-36 animate-pulse rounded bg-slate-200" />

      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    </article>
  );
}
