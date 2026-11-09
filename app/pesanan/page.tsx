import Link from "next/link";
import { cookies } from "next/headers";
import { batalkanPesanan } from "@/app/action";
import { rupiah } from "@/data/events";
import { pesanan } from "@/data/pesanan";

export const instant = false;

export default async function HalamanPesanan() {
  const namaSaya = (await cookies()).get("nama")?.value;
  const totalTiket = pesanan.reduce((total, item) => total + item.jumlah, 0);
  const pendapatan = pesanan.reduce((total, item) => total + item.total, 0);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Daftar Pesanan</h1>

      {pesanan.length === 0 ? (
        <p className="text-slate-500">
          Belum ada pesanan. Silakan pesan tiket di halaman{" "}
          <Link href="/event" className="text-blue-600 underline">
            Event
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-500">
            {pesanan.length} pesanan · {totalTiket} tiket · Pendapatan{" "}
            {rupiah(pendapatan)}
          </p>

          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Event</th>
                  <th className="p-2">Pemesan</th>
                  <th className="p-2">Tiket</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pesanan.map((item) => (
                  <tr key={item.nomor} className="border-t">
                    <td className="p-2">{item.nomor}</td>
                    <td className="p-2">{item.judul}</td>
                    <td className="p-2">{item.nama}</td>
                    <td className="p-2">{item.jumlah}</td>
                    <td className="p-2">{rupiah(item.total)}</td>
                    <td className="p-2">
                      {item.nama === namaSaya && (
                        <form action={batalkanPesanan}>
                          <input
                            type="hidden"
                            name="nomor"
                            value={item.nomor}
                          />
                          <button
                            type="submit"
                            className="text-red-600 underline hover:text-red-800"
                          >
                            Batalkan
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Link
        href="/event"
        className="mt-4 inline-block text-sm text-blue-600 underline"
      >
        Kembali ke daftar event
      </Link>
    </div>
  );
}
