import { Suspense } from "react";
import { ambilEvents } from "@/data/ambil";
import KatalogInteraktif from "@/app/components/KatalogInteraktif";
import SkeletonKatalog from "@/app/components/SkeletonKatalog";

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
