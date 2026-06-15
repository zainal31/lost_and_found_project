import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getUser } from '../lib/auth';

export default function DashboardMahasiswa() {
  const user = getUser();
  const [myItems, setMyItems] = useState([]);
  const [myClaims, setMyClaims] = useState([]);
  const [allFoundItems, setAllFoundItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Load items
    let items = [];
    try {
      const raw = localStorage.getItem('clf_items');
      items = raw ? JSON.parse(raw) : [];
    } catch {
      items = [];
    }

    // Load claims
    let claims = [];
    try {
      const raw = localStorage.getItem('clf_claims');
      claims = raw ? JSON.parse(raw) : [];
    } catch {
      claims = [];
    }

    setMyItems(items.filter(item => item.reporterNim === user.nim));
    setAllFoundItems(items.filter(item => item.type === 'found' && item.status !== 'kembali'));
    setMyClaims(claims.filter(claim => claim.claimerNim === user.nim));
  }, [user?.nim]);

  // Statistics calculation
  const totalLaporan = myItems.length;
  const klaimBerjalan = myClaims.filter(c => c.status === 'menunggu').length;
  const barangKembali = 
    myItems.filter(i => i.status === 'kembali').length + 
    myClaims.filter(c => c.status === 'disetujui').length;

  // Simple auto-match helper
  const findMatch = (lostItem) => {
    if (lostItem.type !== 'lost') return null;
    
    // Find any found item that matches category OR has keyword overlap
    const lostKeywords = lostItem.name.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    return allFoundItems.find(found => {
      // Must be same category
      if (found.category !== lostItem.category) return false;
      
      // Or share some keyword
      const foundName = found.name.toLowerCase();
      const hasKeywordOverlap = lostKeywords.some(keyword => foundName.includes(keyword));
      
      return hasKeywordOverlap;
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (!user) {
    return (
      <Layout isLoggedIn={false}>
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
          <p className="text-gray-650 text-base">Silakan login terlebih dahulu.</p>
          <Link to="/login" className="mt-4 bg-kampus-blue text-white px-6 py-2 rounded-lg font-bold">Login</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* Welcome Section */}
        <section className="bg-white rounded-xl shadow-xs p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <header>
            <h2 className="text-2xl font-bold text-kampus-blue">Selamat Datang, {user.name}!</h2>
            <p className="text-gray-500 text-sm mt-1">
              NIM: {user.nim} • Fakultas {user.fakultas} • {user.prodi} • Semester {user.semester}
            </p>
          </header>
          <nav className="flex gap-3 w-full md:w-auto">
            <Link to="/lapor-kehilangan" className="flex-1 text-center bg-kampus-blue text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all text-sm shadow-xs block">
              + Lapor Kehilangan
            </Link>
            <Link to="/lapor-penemuan" className="flex-1 text-center bg-white text-kampus-blue border border-kampus-blue font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm block">
              + Lapor Penemuan
            </Link>
          </nav>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Laporan Saya</p>
              <h3 className="text-3xl font-bold text-kampus-blue mt-1">{totalLaporan}</h3>
            </header>
          </article>
          
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Klaim Berjalan</p>
              <h3 className="text-3xl font-bold text-amber-600 mt-1">{klaimBerjalan}</h3>
            </header>
          </article>
          
          <article className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between">
            <header>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Barang Kembali</p>
              <h3 className="text-3xl font-bold text-emerald-600 mt-1">{barangKembali}</h3>
            </header>
          </article>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Laporan List */}
            <section className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Daftar Semua Laporan Saya</h3>
              </header>
              
              <div className="divide-y divide-gray-100">
                {myItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    Anda belum membuat laporan kehilangan atau penemuan.
                  </div>
                ) : (
                  myItems.map((item) => {
                    const match = findMatch(item);
                    return (
                      <article key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center space-x-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase ${
                              item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {item.type === 'lost' ? 'Kehilangan' : 'Penemuan'}
                            </span>
                            <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
                          </div>
                          <time className="text-xs text-gray-400">{formatDate(item.createdAt)}</time>
                        </header>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        
                        {/* Status Tracker */}
                        <section className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h5 className="text-xs font-semibold text-gray-500 mb-3">Status Tracking:</h5>
                          
                          <div className="flex items-center justify-between relative w-full text-center">
                            <span className="absolute left-0 right-0 top-3 h-0.5 bg-gray-200 z-0"></span>
                            
                            <span className="relative z-10 flex flex-col items-center">
                              <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold bg-kampus-blue text-white">✓</span>
                              <span className="text-[11px] font-medium text-gray-700 mt-1">Dilaporkan</span>
                            </span>
                            
                            <span className="relative z-10 flex flex-col items-center">
                              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
                                match ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'
                              }`}>
                                {match ? '!' : '2'}
                              </span>
                              <span className={`text-[11px] font-bold mt-1 ${match ? 'text-amber-600' : 'text-gray-400'}`}>
                                Auto-Match
                              </span>
                            </span>
                            
                            <span className="relative z-10 flex flex-col items-center">
                              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                                item.status === 'proses klaim' || item.status === 'kembali'
                                  ? 'bg-kampus-blue text-white font-bold'
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                3
                              </span>
                              <span className={`text-[11px] font-medium mt-1 ${
                                item.status === 'proses klaim' || item.status === 'kembali' ? 'text-gray-700' : 'text-gray-400'
                              }`}>
                                Verifikasi
                              </span>
                            </span>
                            
                            <span className="relative z-10 flex flex-col items-center">
                              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                                item.status === 'kembali' ? 'bg-emerald-600 text-white font-bold' : 'bg-gray-200 text-gray-400'
                              }`}>
                                4
                              </span>
                              <span className={`text-[11px] font-medium mt-1 ${
                                item.status === 'kembali' ? 'text-emerald-600 font-bold' : 'bg-gray-400'
                              }`}>
                                Selesai
                              </span>
                            </span>
                          </div>
                          
                          {item.type === 'lost' && match && (
                            <footer className="mt-4 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center bg-amber-50/50 -mx-4 -mb-4 p-3 rounded-b-lg">
                              <span className="text-xs text-amber-800 font-medium">
                                Sistem mencocokkan laporan Anda dengan barang temuan: "{match.name}"!
                              </span>
                              <Link 
                                to={`/katalog?search=${encodeURIComponent(match.name)}`} 
                                className="text-xs bg-amber-650 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded transition-all shadow-xs">
                                Lihat
                              </Link>
                            </footer>
                          )}
                        </section>
                      </article>
                    );
                  })
                )}
              </div>
            </section>

            {/* Klaim List */}
            <section className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Daftar Klaim Saya (Claim Process)</h3>
              </header>
              <div className="p-6 space-y-4">
                {myClaims.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    Belum ada pengajuan klaim kepemilikan yang Anda ajukan.
                  </div>
                ) : (
                  myClaims.map((claim) => (
                    <article key={claim.id} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <header>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          claim.status === 'menunggu' 
                            ? 'bg-amber-100 text-amber-800' 
                            : claim.status === 'disetujui' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {claim.status === 'menunggu' ? 'Menunggu Review Admin' : claim.status === 'disetujui' ? 'Disetujui / Diambil' : 'Ditolak'}
                        </span>
                        <h4 className="font-semibold text-gray-900 mt-1">{claim.itemName}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Mengajukan klaim pada {formatDate(claim.createdAt)}.
                        </p>
                      </header>
                      <footer>
                        <div className="text-xs font-semibold text-gray-700 bg-gray-50 border px-3 py-1.5 rounded">
                          Tanya: "{claim.verificationQuestion}" <br />
                          Jawab: <span className="text-kampus-blue">"{claim.jawaban}"</span>
                        </div>
                      </footer>
                    </article>
                  ))
                )}
              </div>
            </section>

          </div>
          
          <aside className="space-y-8">
            <section className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
              <header>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Riwayat Aktivitas</h3>
              </header>
              
              <ol className="relative border-l border-gray-200 ml-2 space-y-6">                  
                {myItems.map((item, idx) => (
                  <li key={idx} className="mb-6 ml-6">            
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 border text-xs ${
                      item.type === 'lost' ? 'bg-red-50 border-red-200 text-red-500' : 'bg-emerald-50 border-emerald-200 text-emerald-500'
                    }`}>
                      {item.type === 'lost' ? '●' : '✚'}
                    </span>
                    <p className="text-sm text-gray-655">
                      Melaporkan barang {item.type === 'lost' ? 'hilang' : 'temuan'}: <span className="font-semibold text-gray-900">{item.name}</span>.
                    </p>
                    <time className="block mb-1 text-xs font-normal leading-none text-gray-400">{formatDate(item.createdAt)}</time>
                  </li>
                ))}
                
                {myClaims.map((claim, idx) => (
                  <li key={idx} className="mb-6 ml-6">            
                    <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-amber-50 border border-amber-200 text-amber-500 text-xs">
                      ▲
                    </span>
                    <p className="text-sm text-gray-655">
                      Mengajukan klaim verifikasi kepemilikan untuk <span className="font-semibold text-gray-900">{claim.itemName}</span>.
                    </p>
                    <time className="block mb-1 text-xs font-normal leading-none text-gray-400">{formatDate(claim.createdAt)}</time>
                  </li>
                ))}

                {myItems.length === 0 && myClaims.length === 0 && (
                  <li className="ml-6 text-xs text-gray-400">Belum ada aktivitas.</li>
                )}
              </ol>
            </section>
          </aside>
          
        </div>
      </div>
    </Layout>
  );
}