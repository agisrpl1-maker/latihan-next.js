"use client";

import { useActionState, useState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/action";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({
  event,
  namaAwal,
}: {
  event: Event;
  namaAwal: string;
}) {
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: "", email: "" },
  };
  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);
  const [nama, setNama] = useState(namaAwal);
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const sisa = event.kuota - event.terisi;

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form action={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>
      {nama && (
        <p className="text-sm text-slate-600">Kamu, {nama}! Selamat datang kembali.</p>
      )}
      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <input
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama pemesan"
          aria-invalid={Boolean(hasil.galat.nama)}
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.nama && (
          <p className="text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-invalid={Boolean(hasil.galat.email)}
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.email && (
          <p className="text-sm text-red-600">{hasil.galat.email}</p>
        )}
      </div>

      <div>
        <input
          name="jumlah"
          type="number"
          min="1"
          max="5"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          aria-invalid={Boolean(hasil.galat.jumlah)}
          className="block w-32 rounded border px-3 py-2"
        />
        {hasil.galat.jumlah && (
          <p className="text-sm text-red-600">{hasil.galat.jumlah}</p>
        )}
      </div>

      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p className={hasil.berhasil ? "text-green-700" : "text-red-600"}>
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Memproses..." : "Pesan"}
      </button>
    </form>
  );
}
