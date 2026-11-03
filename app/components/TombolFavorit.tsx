"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number }) {
    const [favorit, setFavorit] = useState(false);

    useEffect(() => {
        const simpan: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorit(simpan.includes(id));
    }, [id]);

    function ubah() {
        const simpan: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");

        const baru = simpan.includes(id)
            ? simpan.filter((x) => x !== id)
            : [...simpan, id];
        localStorage.setItem("favorit", JSON.stringify(baru));
        setFavorit(baru.includes(id));
    }
    return (
        <button onClick={ubah} className="mt-3 rounded border px-3 py-1.5 text-sm">
            {favorit ? "❤︎⁠ Hapus dari favorit" : "♡ Tambah ke favorit"}
        </button>
    );
}