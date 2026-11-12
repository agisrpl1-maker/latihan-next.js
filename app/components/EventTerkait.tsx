import Link from "next/link";
import { ambilTerkait } from "@/data/ambil";
import type { Event } from "@/data/events";

export default async function EventTerkait({ event }: { event: Event }) {
  const terkait = await ambilTerkait(event);

  if (terkait.length === 0) {
    return <p className="text-sm text-slate-500">Belum ada event terkait.</p>;
  }

  return (
    <ul className="mt-1 space-y-1">
      {terkait.map((item) => (
        <li key={item.id}>
          <Link
            href={`/event/${item.id}`}
            className="text-blue-600 hover:underline"
          >
            {item.judul}
          </Link>
        </li>
      ))}
    </ul>
  );
}
