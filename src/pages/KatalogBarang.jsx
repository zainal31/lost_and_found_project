import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ModalKlaim from "../components/ModalKlaim";
import CardBarang from "../components/CardBarang";
import { getUser } from "../lib/auth";

const DEFAULT_MOCK_ITEMS = [
	{
		id: "mock_1",
		type: "found",
		name: "Kunci Motor Yamaha RX-King",
		category: "kunci",
		location: "Area Parkir",
		detailLocation: "Dekat pos satpam parkiran utama",
		date: "2026-05-22T09:30",
		description: "Kunci motor dengan gantungan logo klub motor warna merah. Ditemukan tergeletak di dekat pos satpam parkiran.",
		verificationQuestion: "Apa logo klub motor atau tulisan apa yang ada di gantungan kuncinya?",
		status: "ditemukan",
		reporterNim: "25110900012",
		reporterName: "Farhan Firdaus",
		reporterPhone: "081298765432",
		createdAt: "2026-05-22T09:35:00.000Z",
		image: "/images/kunci_motor.jpg",
	},
	{
		id: "mock_2",
		type: "lost",
		name: "Dompet Kulit Coklat",
		category: "tas",
		location: "Toilet",
		detailLocation: "Kantin FIK lantai 1",
		date: "2026-05-21T12:15",
		description: "Berisi KTM atas nama Budi, KTP, dan beberapa kartu ATM. Terdapat sedikit goresan di bagian ujung kanan bawah dompet.",
		reward: "Uang tunai / makanan gratis",
		status: "hilang",
		reporterNim: "25130600025",
		reporterName: "Budi Laksana",
		reporterPhone: "085712345678",
		createdAt: "2026-05-21T12:30:00.000Z",
		image: "/images/dompet.jpg",
	},
	{
		id: "mock_3",
		type: "lost",
		name: "iPad Pro 11-inch",
		category: "elektronik",
		location: "Perpustakaan",
		detailLocation: "Lt. 2 dekat meja jendela sebelah kanan",
		date: "2026-05-19T15:00",
		description: "iPad warna Space Gray dengan casing bening. Terakhir dipakai saat mengerjakan tugas di meja dekat jendela.",
		reward: "",
		status: "hilang",
		reporterNim: "25130600025",
		reporterName: "Budi Laksana",
		reporterPhone: "085712345678",
		createdAt: "2026-05-19T15:15:00.000Z",
		image: "/images/ipad.png",
	},
];

export default function KatalogBarang() {
	const user = getUser();
	const [items, setItems] = useState([]);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("semua");
	const [categoryFilter, setCategoryFilter] = useState("semua");
	const [sortBy, setSortBy] = useState("terbaru");

	const [selectedItem, setSelectedItem] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		let storedItems = [];
		try {
			const raw = localStorage.getItem("clf_items");
			if (raw) {
				storedItems = JSON.parse(raw);
			} else {
				storedItems = DEFAULT_MOCK_ITEMS;
				localStorage.setItem("clf_items", JSON.stringify(DEFAULT_MOCK_ITEMS));
			}
		} catch {
			storedItems = DEFAULT_MOCK_ITEMS;
		}
		setItems(storedItems);
	}, []);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
	};

	const handleClaimClick = (item) => {
		setSelectedItem(item);
		setIsModalOpen(true);
	};

	// Filter & Sort Logic
	const filteredItems = items
		.filter((item) => {
			// Search matching
			const query = search.toLowerCase().trim();
			const matchesSearch =
				!query ||
				item.name.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query) ||
				item.location.toLowerCase().includes(query) ||
				(item.reporterNim && item.reporterNim.includes(query)) ||
				(item.reporterName && item.reporterName.toLowerCase().includes(query));

			// Status matching
			const matchesStatus = statusFilter === "semua" || (statusFilter === "hilang" && item.type === "lost") || (statusFilter === "ditemukan" && item.type === "found");

			// Category matching
			const matchesCategory = categoryFilter === "semua" || item.category === categoryFilter;

			return matchesSearch && matchesStatus && matchesCategory;
		})
		.sort((a, b) => {
			const timeA = new Date(a.createdAt || 0).getTime();
			const timeB = new Date(b.createdAt || 0).getTime();
			return sortBy === "terbaru" ? timeB - timeA : timeA - timeB;
		});

	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const date = new Date(dateStr);
		return date.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<Layout isLoggedIn={user !== null}>
			<section className="bg-white border-b border-gray-200 shadow-sm sticky top-20 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<h1 className="text-2xl font-bold text-kampus-blue mb-4">Katalog & Pencarian Barang</h1>

					<form className="grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={handleSearchSubmit}>
						<div className="md:col-span-2">
							<label htmlFor="search" className="sr-only">
								Cari kata kunci
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
									</svg>
								</div>
								<input
									type="text"
									id="search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
									placeholder="Cari nama barang, ciri, lokasi, atau pelapor..."
								/>
							</div>
						</div>

						<div>
							<label htmlFor="status" className="sr-only">
								Status Barang
							</label>
							<select
								id="status"
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue outline-none">
								<option value="semua">Semua Status</option>
								<option value="hilang">Barang Hilang</option>
								<option value="ditemukan">Barang Ditemukan</option>
							</select>
						</div>

						<div>
							<label htmlFor="kategori" className="sr-only">
								Kategori
							</label>
							<select
								id="kategori"
								value={categoryFilter}
								onChange={(e) => setCategoryFilter(e.target.value)}
								className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue outline-none">
								<option value="semua">Semua Kategori</option>
								<option value="elektronik">Elektronik & Gadget</option>
								<option value="dokumen">Kartu & Dokumen</option>
								<option value="kunci">Kunci & Aksesoris</option>
								<option value="tas">Tas, Dompet & Isinya</option>
								<option value="buku">Buku & Alat Tulis</option>
								<option value="pakaian">Pakaian & Perlengkapan</option>
								<option value="uang">Uang Tunai</option>
								<option value="lainnya">Lainnya</option>
							</select>
						</div>

						<div>
							<button type="submit" className="w-full bg-kampus-blue hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
								Filter Aktif
							</button>
						</div>
					</form>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6 flex justify-between items-center">
					<p className="text-gray-600">Ditemukan {filteredItems.length} barang cocok dengan pencarian Anda:</p>
					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-gray-300 rounded-lg text-sm py-1.5 pl-3 pr-8 focus:ring-kampus-blue bg-white">
						<option value="terbaru">Terbaru</option>
						<option value="terlama">Terlama</option>
					</select>
				</div>

				{filteredItems.length === 0 ? (
					<div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
						<p className="text-gray-500">Tidak ada barang yang cocok dengan pencarianmu.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredItems.map((item) => (
							<CardBarang
								key={item.id}
								item={item}
								onActionClick={(selectedItem) => {
									setSelectedItem(selectedItem);
									setIsModalOpen(true);
								}}
							/>
						))}
					</div>
				)}
			</section>

			<ModalKlaim isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
		</Layout>
	);
}
