import Layout from "../components/Layout";

export default function KatalogBarang() {
	return (
		<Layout isLoggedIn={true}>
			<section className="bg-white border-b border-gray-200 shadow-sm sticky top-20 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<h1 className="text-2xl font-bold text-kampus-blue mb-4">Katalog & Pencarian Barang</h1>

					<form className="grid grid-cols-1 md:grid-cols-5 gap-4" action="#" method="GET">
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
									name="search"
									className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
									placeholder="Cari nama barang, ciri, atau NIM..."
								/>
							</div>
						</div>

						<div>
							<label htmlFor="status" className="sr-only">
								Status Barang
							</label>
							<select id="status" name="status" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue outline-none">
								<option value="semua">Semua Status</option>
								<option value="hilang">Barang Hilang</option>
								<option value="ditemukan">Barang Ditemukan</option>
							</select>
						</div>

						<div>
							<label htmlFor="kategori" className="sr-only">
								Kategori
							</label>
							<select id="kategori" name="kategori" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue outline-none">
								<option value="semua">Semua Kategori</option>
								<option value="elektronik">Elektronik & Gadget</option>
								<option value="dokumen">Kartu & Dokumen</option>
								<option value="kunci">Kunci & Aksesoris</option>
								<option value="tas">Tas, Dompet & Isinya</option>
								<option value="buku">Buku & Alat Tulis</option>
								<option value="pakaian">Pakaian & Perlengkapan</option>
								<option value="uang">Uang Tunai</option>
							</select>
						</div>

						<div>
							<button type="submit" className="w-full bg-kampus-blue hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
								Cari Barang
							</button>
						</div>
					</form>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6 flex justify-between items-center">
					<p className="text-gray-600">Daftar barang yang baru-baru ini dilaporkan hilang atau ditemukan:</p>
					<select className="border-gray-300 rounded-lg text-sm py-1.5 pl-3 pr-8 focus:ring-kampus-blue bg-white">
						<option>Terbaru</option>
						<option>Terlama</option>
					</select>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
						<header className="bg-green-50 px-4 py-3 border-b border-green-100 flex justify-between items-center">
							<h4 className="text-green-600 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-green-500"></span> Ditemukan
							</h4>
							<time className="text-xs text-gray-500">22 Mei 2026</time>
						</header>
						<div className="relative h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100">
							<span className="text-gray-400 text-sm font-medium">Tidak ada foto</span>
						</div>
						<div className="p-5 flex-grow flex flex-col">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-bold text-gray-900 text-lg">Kunci Motor RX-King</h3>
							</div>
							<ul className="text-sm text-gray-600 mb-4 space-y-1">
								<li>
									<span className="text-gray-400">Kategori:</span> Kunci & Aksesoris
								</li>
								<li>
									<span className="text-gray-400">Lokasi:</span> Area Parkir Utama
								</li>
							</ul>
							<p className="text-sm text-gray-600 mb-6 line-clamp-2">Kunci motor dengan gantungan logo klub motor warna merah. Ditemukan tergeletak di dekat pos satpam parkiran.</p>
							<button className="mt-auto w-full text-white text-sm font-bold py-2.5 bg-kampus-blue rounded-lg hover:bg-blue-900 transition-colors shadow-sm">Lihat Detail / Klaim</button>
						</div>
					</article>

					<article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
						<header className="bg-red-50 px-4 py-3 border-b border-red-100 flex justify-between items-center">
							<h4 className="text-red-600 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-red-500"></span> Hilang
							</h4>
							<time className="text-xs text-gray-500">21 Mei 2026</time>
						</header>
						<div className="relative h-48 bg-gray-100">
							<div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Preview Gambar</div>
						</div>
						<div className="p-5 flex-grow flex flex-col">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-bold text-gray-900 text-lg">Dompet Kulit Coklat</h3>
								<span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Reward</span>
							</div>
							<ul className="text-sm text-gray-600 mb-4 space-y-1">
								<li>
									<span className="text-gray-400">Kategori:</span> Tas & Dompet
								</li>
								<li>
									<span className="text-gray-400">Lokasi Terakhir:</span> Kantin FIK
								</li>
							</ul>
							<p className="text-sm text-gray-600 mb-6 line-clamp-2">Berisi KTM, KTP, dan beberapa kartu ATM. Terdapat sedikit goresan di bagian ujung kanan bawah dompet.</p>
							<button className="mt-auto w-full text-kampus-blue border border-kampus-blue text-sm font-bold py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors">
								Hubungi Pemilik / Lapor Temuan
							</button>
						</div>
					</article>

					<article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
						<header className="bg-red-50 px-4 py-3 border-b border-red-100 flex justify-between items-center">
							<h4 className="text-red-600 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-red-500"></span> Hilang
							</h4>
							<time className="text-xs text-gray-500">19 Mei 2026</time>
						</header>
						<div className="relative h-48 bg-gray-100">
							<div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Preview Gambar</div>
						</div>
						<div className="p-5 flex-grow flex flex-col">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-bold text-gray-900 text-lg">iPad Pro 11-inch</h3>
							</div>
							<ul className="text-sm text-gray-600 mb-4 space-y-1">
								<li>
									<span className="text-gray-400">Kategori:</span> Elektronik
								</li>
								<li>
									<span className="text-gray-400">Lokasi Terakhir:</span> Perpustakaan Lt. 2
								</li>
							</ul>
							<p className="text-sm text-gray-600 mb-6 line-clamp-2">iPad warna Space Gray dengan casing bening. Terakhir dipakai saat mengerjakan tugas di meja dekat jendela.</p>
							<button className="mt-auto w-full text-kampus-blue border border-kampus-blue text-sm font-bold py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors">
								Hubungi Pemilik / Lapor Temuan
							</button>
						</div>
					</article>
				</div>
			</section>
		</Layout>
	);
}
