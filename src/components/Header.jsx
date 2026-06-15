export default function Header({ isLoggedIn }) {
	return (
		<header className="bg-white shadow-sm sticky top-0 z-50 px-4 md:px-8 h-20 flex justify-between items-center">
			<a href="/" className="font-bold text-kampus-blue text-xl md:text-2xl tracking-tight">
				Campus Lost and Found
			</a>

			<nav className="hidden md:flex items-center space-x-6">
				<a href="#" className="text-gray-600 hover:text-kampus-blue font-medium">
					Lapor Kehilangan
				</a>
				<a href="#" className="text-gray-600 hover:text-kampus-blue font-medium">
					Lapor Penemuan
				</a>
				<a href="#" className="text-gray-600 hover:text-kampus-blue font-medium transition-colors">
					Cari Barang
				</a>

				{!isLoggedIn && (
					<a href="/login-mahasiswa" className="text-kampus-blue font-bold border-2 border-kampus-blue px-4 py-2 rounded-lg hover:bg-kampus-blue hover:text-white transition-all">
						Masuk/Daftar
					</a>
				)}

				{isLoggedIn && (
					<div className="flex items-center space-x-5 border-l border-gray-200 pl-5">
						<button className="text-gray-400 hover:text-kampus-blue transition-colors relative group">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
							<span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
							<div className="absolute right-0 top-8 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden text-left hidden">
								<header className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
									<span className="font-bold text-sm text-gray-900">Notifikasi</span>
									<span className="text-xs text-kampus-blue hover:underline font-semibold cursor-pointer">Tandai semua dibaca</span>
								</header>
								<div className="divide-y divide-gray-100 max-h-80 overflow-y-auto font-normal normal-case">
									<div className="p-4 bg-amber-50/60 hover:bg-amber-50 transition-colors cursor-pointer">
										<p className="text-xs font-semibold text-amber-800 flex items-center gap-1 mb-1">Kemungkinan Cocok (Auto-Match)</p>
										<p className="text-xs text-gray-700">Sistem mendeteksi kecocokan antara laporan Dompet Kulit Anda dengan laporan penemu!</p>
										<time className="text-[10px] text-gray-400 mt-1 block">5 menit yang lalu</time>
									</div>
								</div>
							</div>
						</button>
						<a
							href="#"
							className="w-10 h-10 rounded-full bg-kampus-blue text-white flex items-center justify-center font-bold text-sm border-2 border-transparent hover:border-kampus-gold hover:shadow-md transition-all"
							title="Ke Dashboard Profil">
							BL
						</a>
					</div>
				)}
			</nav>
		</header>
	);
}
