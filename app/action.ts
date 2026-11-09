"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { events } from "@/data/events";
import { pesanan, tambahPesanan } from "@/data/pesanan";

export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    email?: string;
    jumlah?: string;
  };
  isian: {
    nama: string;
    email: string;
  };
};

export async function pesanTiket(
  _sebelum: HasilPesan,
  formData: FormData
): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const jumlah = Number(formData.get("jumlah"));
  const isian = { nama, email };

  console.log("Pesanan masuk:", nama, jumlah);
  await new Promise((resolve) => setTimeout(resolve, 800));

  const event = events.find((item) => item.id === eventId);
  if (!event) {
    return {
      berhasil: false,
      pesan: "Event tidak ditemukan.",
      galat: {},
      isian,
    };
  }

  const sisa = event.kuota - event.terisi;
  const galat: HasilPesan["galat"] = {};

  if (nama.length < 3) galat.nama = "Nama minimal 3 huruf.";
  else if (nama.length > 40) galat.nama = "Nama maksimal 40 huruf.";
  if (!email.includes("@")) galat.email = "Email harus memuat tanda @.";
  if (!Number.isInteger(jumlah) || jumlah < 1) {
    galat.jumlah = "Jumlah tiket minimal 1.";
  } else if (jumlah > 5) {
    galat.jumlah = "Maksimal 5 tiket per pesanan.";
  } else if (jumlah > sisa) {
    galat.jumlah = `Sisa tiket hanya ${sisa}.`;
  }

  if (Object.keys(galat).length > 0) {
    return {
      berhasil: false,
      pesan: "Periksa kembali data pemesanan.",
      galat,
      isian,
    };
  }

  event.terisi += jumlah;
  const nomor = tambahPesanan({
    eventId: event.id,
    judul: event.judul,
    nama,
    email,
    jumlah,
    total: event.harga * jumlah,
    waktu: new Date().toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set("nama", nama, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  revalidatePath("/events");
  revalidatePath(`/event/${eventId}`);
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/pesanan");

  return {
    berhasil: true,
    pesan: `Pesanan #${nomor} tersimpan: ${jumlah} tiket untuk ${nama}.`,
    galat: {},
    isian: { nama: "", email: "" },
  };
}

export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  if (!Number.isInteger(nomor) || nomor < 1) return;

  const namaSaya = (await cookies()).get("nama")?.value;
  if (!namaSaya) return;

  const index = pesanan.findIndex((item) => item.nomor === nomor);
  if (index === -1 || pesanan[index].nama !== namaSaya) return;

  const pesananAkanDibatalkan = pesanan[index];
  const event = events.find((item) => item.id === pesananAkanDibatalkan.eventId);
  if (!event) return;

  pesanan.splice(index, 1);
  event.terisi = Math.max(0, event.terisi - pesananAkanDibatalkan.jumlah);

  revalidatePath("/events");
  revalidatePath(`/event/${event.id}`);
  revalidatePath(`/events/${event.id}`);
  revalidatePath("/pesanan");
}
