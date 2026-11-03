import Link from "next/link";
import { events } from "@/data/events";
import KartuEvent from "@/app/components/KartuEvent";

export default function BerandaPage() {
  const terdekat = events.slice(0, 3);
  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold">Temukan Event Seru Di Sekolahmu</h1>
        <p className="mt-3 text-slate-600">
          Workshop, Musik, Lomba, dan bazar. pesan tiketnya di sini.
          </p>
        <Link
          href="/events"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          lihat semua event
        </Link>
      </section>
      <h2 className="mb-3 text-xl font-semibold">Event Terdekat</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terdekat.map((event) => (
          <KartuEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}