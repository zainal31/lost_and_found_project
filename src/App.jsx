import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Beranda from './pages/Beranda';
import Login from './pages/Login';
import LaporKehilangan from './pages/LaporKehilangan';
import LaporPenemuan from './pages/LaporPenemuan';
import KatalogBarang from './pages/KatalogBarang';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import DashboardAdmin from './pages/DashboardAdmin';
import ProtectedRoute from './components/ProtectedRoute';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kampus-bg px-4 text-center">
      <p className="text-6xl font-bold text-kampus-blue">404</p>
      <p className="mt-2 text-gray-600">Halaman yang kamu cari tidak ditemukan.</p>
      <a href="/" className="mt-6 inline-block bg-kampus-blue text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-900 transition-colors">
        Kembali ke Beranda
      </a>
    </div>
  );
}

function RootRedirect() {
  return <Navigate to="/beranda" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/katalog" element={<KatalogBarang />} />
        <Route path="/lapor-kehilangan" element={<LaporKehilangan />} />
        <Route path="/lapor-penemuan" element={<LaporPenemuan />} />
        <Route
          path="/dashboard-mahasiswa"
          element={
            <ProtectedRoute role="mahasiswa">
              <DashboardMahasiswa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
