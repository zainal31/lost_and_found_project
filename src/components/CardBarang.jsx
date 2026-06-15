import { getUser } from "../lib/auth";

export default function CardBarang({ item, onActionClick }) {
	const currentUser = getUser();

	const isOwner = currentUser && currentUser.nim === item.reporterNim;
	const isFound = item.type === "found";

	return (
		<article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
			<header className={`px-4 py-3 border-b flex justify-between items-center ${isFound ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
				<h4 className={`font-bold uppercase tracking-wider text-xs flex items-center gap-1 ${isFound ? "text-green-600" : "text-red-600"}`}>
					<span className={`w-2 h-2 rounded-full ${isFound ? "bg-green-500" : "bg-red-500"}`}></span>
					{isFound ? "Barang Ditemukan" : "Barang Hilang"}
				</h4>
				<time className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</time>
			</header>

			<div className="relative h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100 overflow-hidden">
				{item.image ? (
					<img src={item.image} alt={item.name} className="w-full h-full object-cover" />
				) : (
					<div className="text-center text-gray-400">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span className="text-xs font-medium">Tidak ada foto</span>
					</div>
				)}
			</div>

			<div className="p-5 flex-grow flex flex-col">
				<div className="flex justify-between items-start mb-2 gap-2">
					<h3 className="font-bold text-gray-900 text-lg truncate" title={item.name}>
						{item.name}
					</h3>
					{!isFound && item.hasReward && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0">Reward</span>}
				</div>

				<ul className="text-sm text-gray-600 mb-3 space-y-1">
					<li>
						<span className="text-gray-400">Kategori: </span>
						<span className="capitalize">{item.category}</span>
					</li>
					<li>
						<span className="text-gray-400">{isFound ? "Lokasi Penemuan: " : "Lokasi Terakhir: "}</span>
						{item.location}
					</li>
				</ul>

				<p className="text-sm text-gray-600 mb-6 line-clamp-2">{item.description}</p>

				<div className="mt-auto">
					{isFound ? (
						item.status === "selesai" ? (
							<button disabled className="w-full text-center text-emerald-600 font-bold py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm cursor-not-allowed">
								✓ Sudah Dikembalikan
							</button>
						) : isOwner ? (
							<button disabled className="w-full text-gray-500 text-sm font-bold py-2.5 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
								Laporan Anda
							</button>
						) : (
							<button
								onClick={() => onActionClick && onActionClick(item)}
								className={`w-full text-sm font-bold py-2.5 rounded-lg transition-colors text-white text-center cursor-pointer ${
									item.status === "proses klaim" ? "bg-amber-500 hover:bg-amber-600" : "bg-kampus-blue hover:bg-blue-900"
								}`}>
								{item.status === "proses klaim" ? "Lihat / Ajukan Klaim Lagi" : "Ini Barang Saya / Klaim"}
							</button>
						)
					) : isOwner ? (
						<button disabled className="w-full text-gray-500 text-sm font-bold py-2.5 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
							Laporan Anda
						</button>
					) : (
						<a
							href={`https://wa.me/${item.reporterPhone?.replace(/^0/, "62")}`}
							target="_blank"
							rel="noreferrer"
							className="w-full text-center text-kampus-blue border border-kampus-blue text-sm font-bold py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors block">
							Hubungi Pemilik: {item.reporterName}
						</a>
					)}
				</div>
			</div>
		</article>
	);
}
