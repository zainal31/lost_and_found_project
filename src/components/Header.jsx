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

				{!isLoggedIn && (
					<a href="/login-mahasiswa" className="text-kampus-blue font-bold border-2 border-kampus-blue px-4 py-2 rounded-lg hover:bg-kampus-blue hover:text-white transition-all">
						Masuk/Daftar
					</a>
				)}

				{isLoggedIn && (
					<div className="flex items-center space-x-4">
						<a href="/dashboard" className="text-gray-600 hover:text-kampus-blue font-medium">
							Dashboard
						</a>
						<button className="text-red-600 font-medium hover:underline">Keluar</button>
					</div>
				)}
			</nav>
		</header>
	);
}
