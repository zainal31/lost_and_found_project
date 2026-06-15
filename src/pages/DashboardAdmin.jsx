import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function DashboardAdmin() {
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'all_items', 'all_claims'

  const loadData = () => {
    // Load items
    let storedItems = [];
    try {
      const raw = localStorage.getItem('clf_items');
      storedItems = raw ? JSON.parse(raw) : [];
    } catch {
      storedItems = [];
    }

    // Load claims
    let storedClaims = [];
    try {
      const raw = localStorage.getItem('clf_claims');
      storedClaims = raw ? JSON.parse(raw) : [];
    } catch {
      storedClaims = [];
    }

    setItems(storedItems);
    setClaims(storedClaims);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Actions
  const handleApprove = (claimId, itemId) => {
    if (!window.confirm('Apakah Anda yakin menyetujui klaim ini dan menandai barang telah diserahkan/kembali?')) return;

    // Update claim status to 'disetujui'
    const updatedClaims = claims.map(c => {
      if (c.id === claimId) {
        return { ...c, status: 'disetujui' };
      }
      // Automatically reject other pending claims for the same item
      if (c.itemId === itemId && c.id !== claimId && c.status === 'menunggu') {
        return { ...c, status: 'ditolak' };
      }
      return c;
    });

    // Update item status to 'kembali'
    const updatedItems = items.map(i => {
      if (i.id === itemId) {
        return { ...i, status: 'kembali' };
      }
      return i;
    });

    localStorage.setItem('clf_claims', JSON.stringify(updatedClaims));
    localStorage.setItem('clf_items', JSON.stringify(updatedItems));
    
    loadData();
    alert('Klaim disetujui! Barang resmi ditandai telah dikembalikan.');
  };

  const handleReject = (claimId, itemId) => {
    if (!window.confirm('Apakah Anda yakin menolak klaim kepemilikan ini?')) return;

    // Update claim status to 'ditolak'
    const updatedClaims = claims.map(c => {
      if (c.id === claimId) {
        return { ...c, status: 'ditolak' };
      }
      return c;
    });

    // Check if there are other pending claims for this item
    const otherPending = updatedClaims.some(c => c.itemId === itemId && c.status === 'menunggu');

    // Update item status: if no other pending claims, revert status to 'ditemukan'
    const updatedItems = items.map(i => {
      if (i.id === itemId) {
        return { ...i, status: otherPending ? 'proses klaim' : 'ditemukan' };
      }
      return i;
    });

    localStorage.setItem('clf_claims', JSON.stringify(updatedClaims));
    localStorage.setItem('clf_items', JSON.stringify(updatedItems));

    loadData();
    alert('Klaim ditolak.');
  };

  // Helper to count claims per item (for dispute detection)
  const getClaimsForItem = (itemId) => {
    return claims.filter(c => c.itemId === itemId && c.status === 'menunggu');
  };

  // Calculations
  const totalItemsInWarehouse = items.filter(i => i.type === 'found' && i.status !== 'kembali').length;
  const pendingClaimsCount = claims.filter(c => c.status === 'menunggu').length;
  const returnedItemsCount = items.filter(i => i.status === 'kembali').length;

  // Dispute detection: items that have 2 or more pending claims
  const itemsWithDisputes = items.filter(i => i.type === 'found' && getClaimsForItem(i.id).length >= 2);
  const disputeCount = itemsWithDisputes.length;

  const pendingClaims = claims.filter(c => c.status === 'menunggu');
  const warehouseItems = items.filter(i => i.type === 'found');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  };

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* Portal Header */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-l-kampus-blue">
          <div>
            <h2 className="text-2xl font-bold text-kampus-blue">Portal Petugas & Admin</h2>
            <p className="text-gray-500 text-sm mt-1">Kelola laporan kehilangan, verifikasi klaim, dan inventaris Lost & Found Center.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link 
              to="/lapor-penemuan" 
              className="flex-1 text-center bg-kampus-blue text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all text-sm shadow-sm block">
              + Input Barang Baru
            </Link>
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ items, claims }, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `laporan_lost_and_found_${Date.now()}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="flex-1 bg-white text-gray-700 border border-gray-300 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm shadow-sm">
              Unduh Laporan JSON
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Barang di L&F</p>
            <h3 className="text-3xl font-bold text-kampus-blue">{totalItemsInWarehouse}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">Aktif di gudang</p>
          </article>
          
          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Klaim Menunggu Review</p>
            <h3 className="text-3xl font-bold text-amber-500">{pendingClaimsCount}</h3>
            <p className="text-xs text-amber-600 font-medium mt-2">Butuh verifikasi segera</p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Barang Dikembalikan</p>
            <h3 className="text-3xl font-bold text-emerald-500">{returnedItemsCount}</h3>
            <p className="text-xs text-gray-400 font-medium mt-2">Selesai diserahkan</p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sengketa (Dispute)</p>
            <h3 className="text-3xl font-bold text-red-500">{disputeCount}</h3>
            <p className="text-xs text-red-500 font-medium mt-2">{disputeCount} barang memiliki klaim ganda</p>
          </article>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Verification Queue */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-lg">Antrean Verifikasi Klaim</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  {pendingClaims.length} Menunggu
                </span>
              </header>
              
              <div className="divide-y divide-gray-100">
                {pendingClaims.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    Tidak ada pengajuan klaim yang menunggu peninjauan saat ini.
                  </div>
                ) : (
                  pendingClaims.map((claim) => {
                    const itemClaims = getClaimsForItem(claim.itemId);
                    const isDisputed = itemClaims.length >= 2;

                    return (
                      <article key={claim.id} className={`p-6 transition-colors ${isDisputed ? 'bg-red-50/20' : 'hover:bg-gray-50'}`}>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-bold text-gray-900 text-base">{claim.itemName}</h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                isDisputed ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {isDisputed ? 'DISPUTE / KLAIM GANDA' : `ID: ${claim.itemId}`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Diklaim oleh: <span className="font-semibold text-gray-800">{claim.claimerName} (NIM: {claim.claimerNim})</span>
                            </p>
                            <p className="text-xs text-gray-500">No. HP: {claim.claimerPhone}</p>
                            <time className="text-xs text-gray-400 mt-1 block">Diajukan: {formatDate(claim.createdAt)}</time>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4 space-y-3">
                          <div>
                            <h5 className="text-xs font-bold text-gray-700 mb-1 uppercase">Pertanyaan Verifikasi Penemu:</h5>
                            <p className="text-sm text-gray-800 italic">"{claim.verificationQuestion}"</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-gray-700 mb-1 uppercase">Jawaban Pengklaim:</h5>
                            <p className="text-sm font-semibold text-kampus-blue">"{claim.jawaban}"</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-gray-700 mb-1 uppercase">Detail Tambahan (Rahasia):</h5>
                            <p className="text-sm text-gray-800 font-medium">"{claim.deskripsiRahasia}"</p>
                          </div>
                        </div>

                        {/* Uploaded Evidence Previews */}
                        <div className="flex gap-4 mb-4 flex-wrap">
                          {claim.buktiFoto && (
                            <div>
                              <p className="text-xs text-gray-450 font-bold mb-1 uppercase">Bukti Kepemilikan:</p>
                              <a href={claim.buktiFoto} target="_blank" rel="noreferrer" className="block w-24 h-24 border rounded overflow-hidden shadow-xs hover:opacity-90">
                                <img src={claim.buktiFoto} alt="Bukti" className="w-full h-full object-cover" />
                              </a>
                            </div>
                          )}
                          {claim.ktmFoto && (
                            <div>
                              <p className="text-xs text-gray-450 font-bold mb-1 uppercase">KTM Pengklaim:</p>
                              <a href={claim.ktmFoto} target="_blank" rel="noreferrer" className="block w-24 h-24 border rounded overflow-hidden shadow-xs hover:opacity-90">
                                <img src={claim.ktmFoto} alt="KTM" className="w-full h-full object-cover" />
                              </a>
                            </div>
                          )}
                        </div>

                        {isDisputed && (
                          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg">
                            Peringatan: Ada {itemClaims.length} mahasiswa mengajukan klaim untuk barang ini. Harap verifikasi bukti kepemilikan dengan seksama sebelum menyetujui salah satu klaim.
                          </div>
                        )}

                        <div className="flex gap-3 flex-wrap">
                          <button 
                            onClick={() => handleApprove(claim.id, claim.itemId)}
                            className="flex-grow sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm shadow-sm flex justify-center items-center gap-2">
                            <span>✓</span> Setujui (Approve)
                          </button>
                          <button 
                            onClick={() => handleReject(claim.id, claim.itemId)}
                            className="flex-grow sm:flex-none bg-red-50 hover:bg-red-100 text-red-650 font-bold py-2 px-6 rounded-lg transition-colors text-sm border border-red-200">
                            Tolak (Reject)
                          </button>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            {/* L&F Warehouse */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <header className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-base">Gudang L&F Center</h3>
                <Link to="/katalog" className="text-xs text-kampus-blue font-bold hover:underline">Lihat Semua</Link>
              </header>
              
              <div className="p-4 space-y-4">
                {warehouseItems.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    Gudang L&F kosong.
                  </div>
                ) : (
                  warehouseItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-lg hover:shadow-xs transition-shadow bg-white">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 border border-gray-250 flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-gray-400 font-semibold text-center">No Pic</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate" title={item.name}>{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">Lokasi: {item.location}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'kembali' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : item.status === 'proses klaim' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status === 'kembali' ? 'Dikembalikan' : item.status === 'proses klaim' ? 'Proses Klaim' : 'Tersedia'}
                          </span>
                          <span className="text-[10px] text-gray-400">1 hr lalu</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <Link 
                  to="/lapor-penemuan" 
                  className="w-full text-center text-sm font-bold text-kampus-blue border border-kampus-blue py-2 rounded-lg hover:bg-blue-50 transition-colors block">
                  + Input Barang Temuan Baru
                </Link>
              </div>
            </section>
          </aside>

        </div>
      </div>
    </Layout>
  );
}