import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout, getInitials } from '../lib/auth';

export default function Header({ isLoggedIn: isLoggedInProp }) {
  const navigate = useNavigate();
  const user = getUser();
  const isLoggedIn = isLoggedInProp ?? user !== null;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const dashboardHref = user?.role === 'admin' ? '/dashboard-admin' : '/dashboard-mahasiswa';

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
            <button type="button" onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors">
              Keluar
            </button>
            <Link
              to={dashboardHref}
              className="w-10 h-10 rounded-full bg-kampus-blue text-white flex items-center justify-center font-bold text-sm border-2 border-transparent hover:border-kampus-gold hover:shadow-md transition-all"
              title={`Halo, ${user?.name || 'Pengguna'}`}
            >
              {getInitials(user?.name)}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
