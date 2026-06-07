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
