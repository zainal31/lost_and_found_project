import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Beranda() {
  return (
    <Layout isLoggedIn={false}>
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-kampus-blue leading-tight mb-6">
          Solusi Terpadu untuk
          <span className="text-kampus-gold"> Kehilangan</span> dan Penemuan Barang di Kampus
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          Menyediakan platform terpusat untuk pelaporan barang hilang dan barang ditemukan di lingkungan kampus. Platform web ini bisa diakses kapan saja dan di mana saja untuk mempermudah proses pencarian.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="bg-kampus-gold hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5">Laporkan Kehilangan</Link>
          <Link to="/login" className="border-2 border-kampus-gold text-kampus-gold hover:bg-kampus-gold hover:text-white font-medium py-3 px-8 rounded-full transition-all">Laporkan Penemuan</Link>
        </div>
      </section>
      
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-kampus-blue mb-2">Laporan Terbaru</h2>
          <p className="text-gray-500 mb-8">Daftar barang yang baru-baru ini dilaporkan hilang atau ditemukan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <article className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <header className="bg-red-50 px-4 py-3 border-b border-red-100 flex justify-between items-center">
                <h4 className="text-red-600 font-bold uppercase tracking-wider text-xs">Barang Hilang</h4>
                <time dateTime="2026-05-20" className="text-xs text-gray-500">2 Jam lalu</time>
              </header>
              <img src="" alt="Foto Dompet Hitam" className="w-full h-48 object-cover bg-gray-100" />
              <p className="px-5 mt-4 mb-2 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs"><strong>Kategori:</strong> Kartu & Dokumen</span>
              </p>
              <ul className="px-5 text-sm text-gray-600 mb-3 space-y-1">
                <li><strong className="text-gray-800">Nama Barang:</strong> Dompet</li>
                <li><strong className="text-gray-800">Lokasi:</strong> Perpustakaan</li>
                <li><strong className="text-gray-800">Tanggal:</strong> 20 Mei 2026</li>
              </ul>
              <p className="px-5 text-sm text-gray-600 mb-6 line-clamp-2"><strong className="text-gray-800">Deskripsi:</strong> Dompet hitam dengan logo kampus, berisi kartu identitas dan uang tunai.</p>
              <button className="mx-5 mb-5 mt-auto text-kampus-blue text-sm font-medium py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-kampus-blue hover:text-white transition-colors">
                Lihat Detail
              </button>
            </article>

            <article className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <header className="bg-green-50 px-4 py-3 border-b border-green-100 flex justify-between items-center">
                <h4 className="text-green-600 font-bold uppercase tracking-wider text-xs">Barang Ditemukan</h4>
                <time dateTime="2026-05-22" className="text-xs text-gray-500">22 Mei 2026</time>
              </header>
              <img src="" alt="Foto Kunci Motor" className="w-full h-48 object-cover bg-gray-100" />
              <p className="px-5 mt-4 mb-2 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs"><strong>Kategori:</strong> Kunci & Aksesoris</span>
              </p>
              <ul className="px-5 text-sm text-gray-600 mb-3 space-y-1">
                <li><strong className="text-gray-800">Nama Barang:</strong> Kunci Motor</li>
                <li><strong className="text-gray-800">Lokasi:</strong> Parkiran Utama</li>
                <li><strong className="text-gray-800">Tanggal:</strong> 22 Mei 2026</li>
              </ul>
              <p className="px-5 text-sm text-gray-600 mb-6 line-clamp-2"><strong className="text-gray-800">Deskripsi:</strong> Kunci motor dengan gantungan kunci berwarna merah.</p>
              <button className="mx-5 mb-5 mt-auto text-white text-sm font-medium py-2.5 bg-kampus-gold border border-kampus-gold rounded-lg hover:bg-yellow-600 transition-colors">Ini Barang Saya</button>
            </article>

          </div>
        </div>
      </section>
    </Layout>
  );
}