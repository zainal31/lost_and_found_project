import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CardBarang from "../components/CardBarang";
import { isLoggedIn } from "../lib/auth";

export default function Beranda() {
	const navigate = useNavigate();
	const [terbaruItems, setTerbaruItems] = useState([]);

	useEffect(() => {
		try {
			const raw = localStorage.getItem("clf_items");
			if (raw) {
				const allItems = JSON.parse(raw);

				const sorted = allItems.sort((a, b) => {
					return new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime();
				});

				setTerbaruItems(sorted.slice(0, 3));
			}
		} catch (error) {
			console.error("Gagal memuat data di beranda:", error);
		}
	}, []);

	return (
		<Layout isLoggedIn={isLoggedIn()}>
			<section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
				<h1 className="text-4xl md:text-5xl font-bold text-kampus-blue leading-tight mb-6">
					Solusi Terpadu untuk
					<span className="text-kampus-gold"> Kehilangan</span> dan Penemuan Barang di Kampus
				</h1>
				<p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
					Menyediakan platform terpusat untuk pelaporan barang hilang dan barang ditemukan di lingkungan kampus. Platform web ini bisa diakses kapan saja dan di mana saja untuk mempermudah proses
					pencarian.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Link to="/login" className="bg-kampus-gold hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5">
						Laporkan Kehilangan
					</Link>
					<Link to="/login" className="border-2 border-kampus-gold text-kampus-gold hover:bg-kampus-gold hover:text-white font-medium py-3 px-8 rounded-full transition-all">
						Laporkan Penemuan
					</Link>
				</div>
			</section>

			<section className="bg-white py-16 border-t border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-kampus-blue mb-2">Laporan Terbaru</h2>
					<p className="text-gray-500 mb-8">Daftar barang yang baru-baru ini dilaporkan hilang atau ditemukan:</p>

					{terbaruItems.length === 0 ? (
						<div className="text-center py-8 text-gray-400">Belum ada laporan barang masuk.</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{terbaruItems.map((item) => (
								<CardBarang key={item.id} item={item} onActionClick={() => navigate("/katalog")} />
							))}
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
}
