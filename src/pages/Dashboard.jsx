import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getUser } from "../lib/auth";

const formatDate = (isoString) => {
	if (!isoString) return "-";
	const date = new Date(isoString);
	return date.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export default function Dashboard() {
	const user = getUser();
	const isAdmin = user?.role === "admin";

	const [items, setItems] = useState([]);
	const [claims, setClaims] = useState([]);

	// Fungsi untuk memuat ulang data dari localStorage
	const loadData = () => {
		try {
			const rawItems = localStorage.getItem("clf_items");
			setItems(rawItems ? JSON.parse(rawItems) : []);

			const rawClaims = localStorage.getItem("clf_claims");
			setClaims(rawClaims ? JSON.parse(rawClaims) : []);
		} catch (error) {
			console.error("Gagal memuat data", error);
			setItems([]);
			setClaims([]);
		}
	};

	useEffect(() => {
		loadData();
	}, [user?.nim]);

	// DATA & LOGIKA UNTUK MAHASISWA
	const myItems = items.filter((item) => item.reporterNim === user?.nim);
	const myClaims = claims.filter((claim) => claim.claimerNim === user?.nim);

	const mhsTotalLaporan = myItems.length;
	const mhsKlaimBerjalan = myClaims.filter((c) => c.status === "menunggu").length;
	const mhsBarangKembali = myItems.filter((i) => i.status === "selesai" || i.status === "kembali").length + myClaims.filter((c) => c.status === "disetujui").length;

	// DATA & LOGIKA UNTUK ADMIN
	const pendingClaims = claims.filter((c) => c.status === "menunggu");

	const adminTotalLaporan = items.length;
	const adminBarangGudang = items.filter((i) => i.type === "found" && i.status === "ditemukan").length;
	const adminKlaimMenunggu = pendingClaims.length;
	const adminBarangSelesai = items.filter((i) => i.status === "selesai" || i.status === "kembali").length;

	const handleApprove = (claimId, itemId) => {
		if (!window.confirm("Apakah Anda yakin menyetujui klaim ini dan menandai barang telah diserahkan?")) return;

		const updatedClaims = claims.map((c) => {
			if (c.id === claimId) return { ...c, status: "disetujui" };
			if (c.itemId === itemId && c.status === "menunggu") return { ...c, status: "ditolak" };
			return c;
		});
		localStorage.setItem("clf_claims", JSON.stringify(updatedClaims));

		const updatedItems = items.map((i) => (i.id === itemId ? { ...i, status: "selesai" } : i));
		localStorage.setItem("clf_items", JSON.stringify(updatedItems));

		alert("Klaim disetujui! Barang ditandai sudah dikembalikan.");
		loadData();
	};

	const handleReject = (claimId, itemId) => {
		if (!window.confirm('Tolak klaim ini? Status barang akan kembali menjadi "Ditemukan".')) return;

		const updatedClaims = claims.map((c) => (c.id === claimId ? { ...c, status: "ditolak" } : c));
		localStorage.setItem("clf_claims", JSON.stringify(updatedClaims));

		const updatedItems = items.map((i) => (i.id === itemId ? { ...i, status: "ditemukan" } : i));
		localStorage.setItem("clf_items", JSON.stringify(updatedItems));

		alert("Klaim ditolak.");
		loadData();
	};

	const getClaimsForItem = (itemId) => {
		return claims.filter((c) => c.itemId === itemId && c.status === "menunggu");
	};

	const findMatch = (lostItem) => {
		if (lostItem.type !== "lost" || lostItem.status !== "hilang") return null;

		const allFoundItems = items.filter((item) => item.type === "found" && item.status === "ditemukan");

		const lostKeywords = lostItem.name
			.toLowerCase()
			.split(/\s+/)
			.filter((w) => w.length > 2);

		return allFoundItems.find((found) => {
			if (found.category !== lostItem.category) return false;
			const foundName = found.name.toLowerCase();
			return lostKeywords.some((keyword) => foundName.includes(keyword));
		});
	};

	const handleDeleteItem = (itemId) => {
		if (!window.confirm("Apakah Anda yakin ingin menghapus laporan barang ini?")) return;

		const updatedItems = items.filter((item) => item.id !== itemId);
		localStorage.setItem("clf_items", JSON.stringify(updatedItems));

		const updatedClaims = claims.filter((claim) => claim.itemId !== itemId);
		localStorage.setItem("clf_claims", JSON.stringify(updatedClaims));

		alert("Laporan berhasil dihapus.");
		loadData();
	};

	return (
		<Layout isLoggedIn={true}>
			<div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
				{isAdmin ? (
					//Tampilan Admin
					<>
						<section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-l-kampus-blue">
							<div>
								<h2 className="text-2xl font-bold text-kampus-blue">Portal Petugas & Admin</h2>
								<p className="text-gray-500 text-sm mt-1">
									Selamat bekerja, {user?.name || "Admin"} (NIP: {user?.nip})
								</p>
							</div>
						</section>

						<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							<article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
								<p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Semua Laporan</p>
								<h3 className="text-3xl font-bold text-kampus-blue">{adminTotalLaporan}</h3>
							</article>
							<article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
								<p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Barang di Gudang L&F</p>
								<h3 className="text-3xl font-bold text-kampus-blue">{adminBarangGudang}</h3>
							</article>
							<article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
								<p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Klaim Menunggu Review</p>
								<h3 className="text-3xl font-bold text-amber-500">{adminKlaimMenunggu}</h3>
							</article>
							<article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
								<p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Barang Dikembalikan</p>
								<h3 className="text-3xl font-bold text-emerald-500">{adminBarangSelesai}</h3>
							</article>
						</section>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
							<div className="lg:col-span-2 space-y-8">
								<section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
									<header className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
										<h3 className="font-bold text-gray-900 text-lg">Antrean Verifikasi Klaim</h3>
										<span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">{pendingClaims.length} Menunggu</span>
									</header>

									<div className="divide-y divide-gray-100">
										{pendingClaims.length === 0 ? (
											<p className="p-6 text-gray-500 text-center text-sm">Tidak ada klaim baru yang menunggu verifikasi.</p>
										) : (
											pendingClaims.map((claim) => {
												const itemClaims = getClaimsForItem(claim.itemId);
												const isDisputed = itemClaims.length >= 2;

												return (
													<article key={claim.id} className="p-6 hover:bg-gray-50 transition-colors">
														<div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
															<div>
																<div className="flex items-center gap-2 mb-1">
																	<h4 className="font-bold text-gray-900 text-base">{claim.itemName}</h4>
																	{isDisputed && (
																		<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 uppercase animate-pulse">
																			Dispute / Klaim Ganda ({itemClaims.length})
																		</span>
																	)}
																</div>
																<p className="text-sm text-gray-600">
																	Diklaim oleh:{" "}
																	<span className="font-semibold text-gray-800">
																		{claim.claimerName} (NIM: {claim.claimerNim})
																	</span>
																</p>
															</div>
														</div>

														<div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
															<h5 className="text-xs font-bold text-gray-700 mb-2 uppercase">Bukti Verifikasi</h5>
															<p className="text-sm text-gray-800 mb-1">
																<span className="text-gray-500">Tanya:</span> "{claim.verificationQuestion || "Apa ciri khususnya?"}"
															</p>
															<p className="text-sm font-semibold text-kampus-blue mb-3">
																<span className="text-gray-500 font-normal">Jawab:</span> "{claim.jawaban}"
															</p>
															<p className="text-sm text-gray-800 mb-1">
																<span className="text-gray-500">Deskripsi Rahasia:</span>
															</p>
															<p className="text-sm font-medium text-gray-800 italic">"{claim.deskripsiRahasia}"</p>
														</div>
														{isDisputed && (
															<div className="mb-4 px-4 py-2 bg-red-50 border border-red-100 text-xs text-red-700 rounded-lg">
																Perhatian Petugas: Ada {itemClaims.length} pengajuan klaim untuk barang ini. Harap periksa detail deskripsi rahasia dengan sangat teliti sebelum mengambil keputusan!
															</div>
														)}

														<div className="flex gap-3">
															<button
																onClick={() => handleApprove(claim.id, claim.itemId)}
																className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg text-sm shadow-sm transition-colors cursor-pointer">
																Setujui
															</button>
															<button
																onClick={() => handleReject(claim.id, claim.itemId)}
																className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-6 rounded-lg text-sm border border-red-200 transition-colors cursor-pointer">
																Tolak
															</button>
														</div>
													</article>
												);
											})
										)}
									</div>
								</section>
							</div>

							<aside className="space-y-8">
								<section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
									<header className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
										<h3 className="font-bold text-gray-900 text-base">Gudang L&F Center</h3>
									</header>
									<div className="p-4 border-t border-gray-100 bg-gray-50/30">
										<Link to="/lapor-penemuan" className="w-full text-center text-sm font-bold text-kampus-blue border border-kampus-blue py-2 rounded-lg hover:bg-blue-50 transition-colors block">
											+ Input Barang Temuan Baru
										</Link>
									</div>
								</section>
							</aside>
						</div>
					</>
				) : (
					//Tampilan Mahasiswa
					<>
						<section className="bg-white rounded-xl shadow-xs p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<header>
								<h2 className="text-2xl font-bold text-kampus-blue">Selamat Datang, {user?.name || "Mahasiswa"}!</h2>
								<p className="text-gray-500 text-sm mt-1">
									NIM: {user?.nim} • {user?.fakultas} • {user?.prodi}
								</p>
							</header>
							<nav className="flex gap-3 w-full md:w-auto">
								<Link to="/lapor-kehilangan" className="flex-1 text-center bg-kampus-blue text-white font-semibold px-4 py-2.5 rounded-lg text-sm block shadow-xs hover:bg-opacity-90 transition-all">
									+ Lapor Kehilangan
								</Link>
								<Link
									to="/lapor-penemuan"
									className="flex-1 text-center bg-white text-kampus-blue border border-kampus-blue font-semibold px-4 py-2.5 rounded-lg text-sm block hover:bg-gray-50 transition-all">
									+ Lapor Penemuan
								</Link>
							</nav>
						</section>

						<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
								<p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Laporan Saya</p>
								<h3 className="text-3xl font-bold text-kampus-blue mt-1">{mhsTotalLaporan}</h3>
							</article>
							<article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
								<p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Klaim Berjalan</p>
								<h3 className="text-3xl font-bold text-amber-600 mt-1">{mhsKlaimBerjalan}</h3>
							</article>
							<article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
								<p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Barang Kembali</p>
								<h3 className="text-3xl font-bold text-emerald-600 mt-1">{mhsBarangKembali}</h3>
							</article>
						</section>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
							<div className="lg:col-span-2 space-y-8">
								<section className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
									<header className="px-6 py-4 border-b border-gray-100">
										<h3 className="font-bold text-gray-900 text-lg">Daftar Laporan Anda</h3>
									</header>
									<div className="divide-y divide-gray-100">
										{myItems.length === 0 ? (
											<p className="p-6 text-gray-500 text-center text-sm">Anda belum membuat laporan apapun.</p>
										) : (
											myItems.map((item) => {
												const match = findMatch(item);

												return (
													<article key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
														<header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
															<div className="flex items-center space-x-3">
																<span className={`text-xs font-bold px-2.5 py-1 rounded-sm uppercase ${item.type === "lost" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
																	{item.type === "lost" ? "Kehilangan" : "Ditemukan"}
																</span>
																<h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
															</div>
															<div className="flex items-center gap-3">
																<span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600 uppercase">Status: {item.status}</span>
																<button
																	type="button"
																	onClick={() => handleDeleteItem(item.id)}
																	className="text-xs text-red-600 hover:text-red-800 font-semibold border border-red-200 px-2.5 py-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer">
																	Hapus
																</button>
															</div>
														</header>
														<p className="text-sm text-gray-600">{item.description}</p>
														{item.type === "lost" && match && (
															<div className="mt-4 p-3.5 bg-amber-50 border border-dashed border-amber-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
																<div className="text-xs text-amber-800 font-medium">
																	<span className="font-bold">Sistem Mencocokkan:</span> Seseorang melaporkan barang yang mirip dengan kehilangan Anda, yaitu{" "}
																	<span className="font-bold text-amber-900">"{match.name}"</span> di area <span className="font-semibold">{match.location}</span>. Apakah ini barang Anda?
																</div>
																<Link
																	to={`/katalog?search=${encodeURIComponent(match.name)}`}
																	className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-md transition-all shadow-sm shrink-0">
																	Lihat & Klaim
																</Link>
															</div>
														)}
													</article>
												);
											})
										)}
									</div>
								</section>
							</div>

							<aside className="space-y-8">
								<section className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
									<h3 className="font-bold text-gray-900 text-lg mb-4">Riwayat Aktivitas</h3>
									<ol className="relative border-l border-gray-200 ml-2 space-y-6">
										{myItems.map((item, idx) => (
											<li key={`item-${idx}`} className="mb-6 ml-6">
												<span
													className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${item.type === "lost" ? "bg-red-50 border border-red-200 text-red-500" : "bg-green-50 border border-green-200 text-green-500"} text-xs`}>
													●
												</span>
												<p className="text-sm text-gray-600">
													Melaporkan barang {item.type === "lost" ? "hilang" : "temuan"}: <span className="font-semibold text-gray-900">{item.name}</span>.
												</p>
												<time className="block mb-1 text-xs font-normal text-gray-400">{formatDate(item.createdAt)}</time>
											</li>
										))}

										{myClaims.map((claim, idx) => (
											<li key={`claim-${idx}`} className="mb-6 ml-6">
												<span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-amber-50 border border-amber-200 text-amber-500 text-xs">▲</span>
												<p className="text-sm text-gray-600">
													Mengajukan klaim kepemilikan untuk <span className="font-semibold text-gray-900">{claim.itemName}</span>.
												</p>
												<time className="block mb-1 text-xs font-normal text-gray-400">{formatDate(claim.createdAt)}</time>
											</li>
										))}

										{myItems.length === 0 && myClaims.length === 0 && <li className="ml-6 text-xs text-gray-400">Belum ada aktivitas.</li>}
									</ol>
								</section>
							</aside>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}
