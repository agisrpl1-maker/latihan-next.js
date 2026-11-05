import Link from "next/link";
import { rupiah, type Event } from "@/data/events";

export default function EventTerkait({
  event,
  events,
}: {
  event: Event;
  events: Event[];
}) {
  const terkait = events
    .filter((e) => e.id !== event.id && e.kategori === event.kategori)
    .slice(0, 3);

  if (terkait.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Event terkait</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {terkait.map((item) => (
          <Link
            key={item.id}
            href={`/events/${item.id}`}
            className="rounded-xl border bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {item.kategori}
            </span>
            <h3 className="mt-2 font-semibold text-slate-800">{item.judul}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.tanggal} · {item.lokasi}
            </p>
            <p className="mt-2 font-medium text-slate-700">{rupiah(item.harga)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
