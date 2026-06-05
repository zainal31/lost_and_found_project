import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, isLoggedIn }) {
	return (
		<div className="bg-kampus-bg font-sans text-gray-800 flex flex-col min-h-screen antialiased">
			<Header isLoggedIn={isLoggedIn} />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
