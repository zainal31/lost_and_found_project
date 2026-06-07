import Layout from '../components/Layout';

export default function DashboardMahasiswa() {
  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        <section className="bg-white rounded-xl shadow-xs p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <header>
            <h2 className="text-2xl font-bold text-kampus-blue">Selamat Datang, Budi Laksana!</h2>
            <p className="text-gray-500 text-sm mt-1">NIM: 25130600025 • Fakultas Ilmu Komputer • Sistem dan Teknologi Informasi</p>
          </header>
          <nav className="flex gap-3 w-full md:w-auto">
            {/* Arahkan ke rute halaman yang sudah kita buat */}
            <a href="/lapor-kehilangan" className="flex-1 text-center bg-kampus-blue text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all text-sm shadow-xs block">
              + Lapor Kehilangan
            </a>
            <a href="/lapor-penemuan" className="flex-1 text-center bg-white text-kampus-blue border border-kampus-blue font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm block">
              + Lapor Penemuan
            </a>
          </nav>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Laporan Saya</p>
              <h3 className="text-3xl font-bold text-kampus-blue mt-1">2</h3>
            </header>
          </article>
          
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Klaim Berjalan</p>
              <h3 className="text-3xl font-bold text-amber-600 mt-1">1</h3>
            </header>
          </article>
          
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Barang Kembali</p>
              <h3 className="text-3xl font-bold text-emerald-600 mt-1">1</h3>
            </header>
          </article>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Daftar Semua Laporan Saya</h3>
              </header>
              
              <div className="divide-y divide-gray-100">
                {/* Item Laporan Kehilangan dengan Auto-Match */}
                <article className="p-6 hover:bg-gray-50 transition-colors">
                  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-sm uppercase bg-red-100 text-red-700">Kehilangan</span>
                      <h4 className="font-semibold text-gray-900 text-base">Dompet Kulit Hitam</h4>
                    </div>
                    <time className="text-xs text-gray-400">22 Mei 2026</time>
                  </header>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">Isi KTM atas nama Budi Laksana, SIM C, dan kartu ATM. Terakhir kali terlihat di area Kantin FIK setelah jam kuliah kedua.</p>
                  
                  <section className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h5 className="text-xs font-semibold text-gray-500 mb-3">Status Tracking:</h5>
                    
                    <div className="flex items-center justify-between relative w-full text-center">
                      <span className="absolute left-0 right-0 top-3 h-0.5 bg-gray-200 z-0"></span>
                      
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-kampus-blue text-white">✓</span>
                        <span className="text-[11px] font-medium text-gray-700 mt-1">Dilaporkan</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-amber-500 text-white">!</span>
                        <span className="text-[11px] font-bold text-amber-600 mt-1">Auto-Match</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center bg-gray-200 text-gray-400">3</span>
                        <span className="text-[11px] font-medium text-gray-400 mt-1">Verifikasi</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center bg-gray-200 text-gray-400">4</span>
                        <span className="text-[11px] font-medium text-gray-400 mt-1">Selesai</span>
                      </span>
                    </div>
                    
                    <footer className="mt-4 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center bg-amber-50/50 -mx-4 -mb-4 p-3 rounded-b-lg">
                      <span className="text-xs text-amber-800 font-medium">Sistem mendeteksi 1 kecocokan deskripsi barang temuan!</span>
                      <a href="#" className="text-xs bg-amber-600 text-white font-bold px-3 py-1.5 rounded hover:bg-amber-700 transition-all">Lihat</a>
                    </footer>
                  </section>
                </article>

                {/* Item Laporan Penemuan */}
                <article className="p-6 hover:bg-gray-50 transition-colors">
                  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-sm uppercase bg-emerald-100 text-emerald-700">Penemuan</span>
                      <h4 className="font-semibold text-gray-900 text-base">Flashdisk Kingston 64GB</h4>
                    </div>
                    <time className="text-xs text-gray-400">15 Mei 2026</time>
                  </header>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">Ditemukan terpasang di PC Lab Rekayasa Perangkat Lunak (RPL). Sudah diserahkan langsung ke Satpam Gedung B.</p>
                  
                  <section className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between relative w-full text-center">
                      <span className="absolute left-0 right-0 top-3 h-0.5 bg-emerald-500 z-0"></span>
                      
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-emerald-600 text-white">✓</span>
                        <span className="text-[11px] font-medium text-emerald-600 mt-1">Dilaporkan</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-emerald-600 text-white">✓</span>
                        <span className="text-[11px] font-medium text-emerald-600 mt-1">Diserahkan</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-emerald-600 text-white">✓</span>
                        <span className="text-[11px] font-medium text-emerald-600 mt-1">Verifikasi</span>
                      </span>
                      <span className="relative z-10 flex flex-col items-center">
                        <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-emerald-600 text-white">✓</span>
                        <span className="text-[11px] font-bold text-emerald-600 mt-1">Selesai</span>
                      </span>
                    </div>
                  </section>
                </article>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Daftar Klaim Saya (Claim Process)</h3>
              </header>
              <div className="p-6">
                <article className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <header>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-800">Menunggu Review Admin</span>
                    <h4 className="font-semibold text-gray-900 mt-1">Kunci Motor Yamaha RX-King</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Mengajukan klaim atas barang temuan Farhan Firdaus di Area Parkir Utama.</p>
                  </header>
                  <footer>
                    <button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs px-3 py-1.5 rounded transition-colors">
                      Lihat Bukti Klaim
                    </button>
                  </footer>
                </article>
              </div>
            </section>

          </div>
          <aside className="space-y-8">
            <section className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
              <header>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Riwayat Aktivitas</h3>
              </header>
              
              <ol className="relative border-l border-gray-200 ml-2 space-y-6">                  
                <li className="mb-6 ml-6">            
                  <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-red-50 border border-red-200 text-red-500 text-xs">
                    ●
                  </span>
                  <p className="text-sm text-gray-600">Membuat laporan kehilangan baru: <span className="font-medium text-gray-900">Dompet Kulit Hitam</span>.</p>
                  <time className="block mb-1 text-xs font-normal leading-none text-gray-400">22 Mei 2026</time>
                </li>
                <li className="mb-6 ml-6">            
                  <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-amber-50 border border-amber-200 text-amber-500 text-xs">
                    ▲
                  </span>
                  <p className="text-sm text-gray-600">Mengajukan klaim verifikasi kepemilikan untuk <span className="font-medium text-gray-900">Kunci Motor RX-King</span>.</p>
                  <time className="block mb-1 text-xs font-normal leading-none text-gray-400">18 Mei 2026</time>
                </li>
                <li className="mb-6 ml-6">            
                  <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-emerald-50 border border-emerald-200 text-emerald-500 text-xs">
                    ✓
                  </span>
                  <p className="text-sm text-gray-600">Status laporan <span className="font-medium text-gray-900">Flashdisk Kingston</span> diubah menjadi Selesai (Returned).</p>
                  <time className="block mb-1 text-xs font-normal leading-none text-gray-400">15 Mei 2026</time>
                </li>
              </ol>
            </section>
          </aside>
          
        </div>
      </div>
    </Layout>
  );
}