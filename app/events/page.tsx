import { Suspense } from "react";
import type { Metadata } from "next";
import { ambilEvents } from "@/data/ambil";
import KatalogInteraktif from "@/app/components/KatalogInteraktif";
import SkeletonKatalog from "@/app/components/SkeletonKatalog";

export const metadata: Metadata = {
  title: "Katalog Event",
};

async function DaftarEvent() {
  const events = await ambilEvents();

  return <KatalogInteraktif events={events} />;
}

export default function Katalog() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Katalog Event</h1>
      <Suspense fallback={<SkeletonKatalog />}>
        <DaftarEvent />
      </Suspense>
    </div>
  );
}
