import { events, type Event } from "@/data/events";

function jeda(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function ambilEvents() {
  await jeda(1500);
  return events;
}

export async function ambilEvent(id: number) {
  await jeda(800);
  return events.find((event) => event.id === id);
}

export async function ambilTerkait(event: Event) {
  await jeda(2000);
  return events.filter(
    (item) => item.kategori === event.kategori && item.id !== event.id
  );
}