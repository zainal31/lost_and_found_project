import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout, getInitials } from "../lib/auth";

export default function Header({ isLoggedIn: isLoggedInProp }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(getUser());
	const [notifCount, setNotifCount] = useState(0);

	useEffect(() => {
		const currentUser = getUser();
		setUser(currentUser);
		setUser(getUser());
		if (currentUser && currentUser.role === "mahasiswa") {
			try {
				const allItems = JSON.parse(localStorage.getItem("clf_items") || "[]");
				const myLostItems = allItems.filter((i) => i.reporterNim === currentUser.nim && i.type === "lost" && i.status === "hilang");
				const foundItemsInWarehouse = allItems.filter((i) => i.type === "found" && i.status === "ditemukan");

				let matchCounter = 0;
				myLostItems.forEach((lostItem) => {
					const lostKeywords = lostItem.name
						.toLowerCase()
						.split(/\s+/)
						.filter((w) => w.length > 2);

					const hasMatch = foundItemsInWarehouse.some((found) => {
						if (found.category !== lostItem.category) return false;
						const foundName = found.name.toLowerCase();
						return lostKeywords.some((keyword) => foundName.includes(keyword));
					});

					if (hasMatch) matchCounter++;
				});

				setNotifCount(matchCounter);
			} catch (err) {
				console.error("Gagal menghitung notifikasi", err);
			}
		} else {
			setNotifCount(0);
		}
	}, [isLoggedInProp]);
	const isLoggedIn = isLoggedInProp ?? user !== null;

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50 px-4 md:px-8 h-20 flex justify-between items-center">
			<Link to="/beranda" className="font-bold text-kampus-blue text-xl md:text-2xl tracking-tight">
				Campus Lost and Found
			</Link>

			<nav className="hidden md:flex items-center space-x-6">
				<Link to="/lapor-kehilangan" className="text-gray-600 hover:text-kampus-blue font-medium">
					Lapor Kehilangan
				</Link>
				<Link to="/lapor-penemuan" className="text-gray-600 hover:text-kampus-blue font-medium">
					Lapor Penemuan
				</Link>
				<Link to="/katalog" className="text-gray-600 hover:text-kampus-blue font-medium transition-colors">
					Cari Barang
				</Link>

				{!isLoggedIn && (
					<Link to="/login" className="text-kampus-blue font-bold border-2 border-kampus-blue px-4 py-2 rounded-lg hover:bg-kampus-blue hover:text-white transition-all">
						Masuk/Daftar
					</Link>
				)}

				{isLoggedIn && (
					<div className="flex items-center space-x-5 border-l border-gray-200 pl-5">
						{user?.role === "mahasiswa" && (
							<Link
								to="/dashboard"
								className="relative p-2 text-gray-500 hover:text-kampus-blue transition-colors group"
								title={notifCount > 0 ? `${notifCount} Barang temuan cocok!` : "Tidak ada notifikasi baru"}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>

								{notifCount > 0 && (
									<span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">{notifCount}</span>
								)}
							</Link>
						)}
						<button type="button" onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors">
							Keluar
						</button>
						<Link
							to="/dashboard"
							className="w-10 h-10 rounded-full bg-kampus-blue text-white flex items-center justify-center font-bold text-sm border-2 border-transparent hover:border-kampus-gold hover:shadow-md transition-all"
							title={`Halo, ${user?.name || "Pengguna"}`}>
							{getInitials(user?.name)}
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
}
