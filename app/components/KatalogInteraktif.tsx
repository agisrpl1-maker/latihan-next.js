"use client";

import { useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimalText, setHargaMaksimalText] = useState("");

  const daftarKategori = ["Semua", ...new Set(events.map((event) => event.kategori))];

  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const sisa = e.kuota - e.terisi;
    const cocokKetersediaan = !hanyaTersedia || sisa > 0;
    const batasHarga = hargaMaksimalText === "" ? Number.POSITIVE_INFINITY : Number(hargaMaksimalText);
    const cocokHarga = e.harga <= batasHarga;

    return cocokCari && cocokKategori && cocokKetersediaan && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urut}
          onChange={(e) => setUrut(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => setHanyaTersedia(e.target.checked)}
          />
          Hanya yang masih ada tiket
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <span>Harga maksimal</span>
          <input
            type="number"
            min="0"
            value={hargaMaksimalText}
            onChange={(e) => setHargaMaksimalText(e.target.value)}
            placeholder="Kosong = tanpa batas"
            className="w-40 rounded border bg-white px-2 py-1.5"
          />
        </label>
      </div>

      <p className="mb-3 text-sm text-slate-500">{tersusun.length} event ditemukan</p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tersusun.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}