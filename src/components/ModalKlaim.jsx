import { useState } from 'react';
import { getUser } from '../lib/auth';

export default function ModalKlaim({ isOpen, onClose, item }) {
  const user = getUser();
  const [jawaban, setJawaban] = useState('');
  const [deskripsiRahasia, setDeskripsiRahasia] = useState('');
  const [buktiFoto, setBuktiFoto] = useState('');
  const [ktmFoto, setKtmFoto] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !item) return null;

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Sesi login telah berakhir. Silakan login kembali.');
      setLoading(false);
      return;
    }

    if (!jawaban.trim() || !deskripsiRahasia.trim() || !ktmFoto) {
      setError('Mohon lengkapi jawaban verifikasi, deskripsi detail, dan upload foto KTM Anda.');
      setLoading(false);
      return;
    }

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const newClaim = {
        id: `claim_${Date.now()}`,
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
        itemLocation: item.location,
        verificationQuestion: item.verificationQuestion,
        claimerNim: user.nim,
        claimerName: user.name,
        claimerPhone: user.phone,
        jawaban: jawaban,
        deskripsiRahasia: deskripsiRahasia,
        buktiFoto: buktiFoto,
        ktmFoto: ktmFoto,
        status: 'menunggu', // menunggu, disetujui, ditolak
        createdAt: new Date().toISOString(),
      };

      // Save claim
      let claims = [];
      try {
        const raw = localStorage.getItem('clf_claims');
        claims = raw ? JSON.parse(raw) : [];
      } catch {
        claims = [];
      }
      claims.unshift(newClaim);
      localStorage.setItem('clf_claims', JSON.stringify(claims));

      // Update item status to 'proses klaim'
      let items = [];
      try {
        const raw = localStorage.getItem('clf_items');
        items = raw ? JSON.parse(raw) : [];
      } catch {
        items = [];
      }
      const itemIdx = items.findIndex(i => i.id === item.id);
      if (itemIdx !== -1) {
        items[itemIdx].status = 'proses klaim';
        localStorage.setItem('clf_items', JSON.stringify(items));
      }

      setLoading(false);
      setJawaban('');
      setDeskripsiRahasia('');
      setBuktiFoto('');
      setKtmFoto('');
      onClose();
      alert('Klaim kepemilikan berhasil diajukan! Admin akan meninjau pengajuan Anda.');
      window.location.reload(); // Reload to update UI state
    } catch (err) {
      setError('Terjadi kesalahan saat mengajukan klaim.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 items-center justify-center z-50 p-4 flex">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-bold text-gray-900 text-xl">Ajukan Klaim Kepemilikan</h3>
            <p className="text-xs text-gray-500 mt-0.5">Selesaikan form verifikasi berikut untuk direview oleh admin.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl outline-none">&times;</button>
        </header>

        {error && (
          <div className="mx-6 mt-4 px-4 py-2 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="p-6 space-y-5 flex-grow overflow-y-auto" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-kampus-blue uppercase tracking-wider border-b border-blue-100 pb-1">Langkah 1: Pertanyaan Verifikasi</h4>
            <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-100">
              <label htmlFor="jawaban_verifikasi" className="block text-sm font-semibold text-amber-900 mb-1">
                Pertanyaan dari Penemu:
              </label>
              <p className="text-sm text-amber-800 italic mb-2">"{item.verificationQuestion}"</p>
              <input
                id="jawaban_verifikasi"
                name="jawaban_verifikasi"
                type="text"
                required
                value={jawaban}
                onChange={(e) => setJawaban(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-kampus-blue outline-none"
                placeholder="Ketik jawaban Anda disini..."
              />
            </div>
            <div>
              <label htmlFor="deskripsi_rahasia" className="block text-sm font-semibold text-gray-700 mb-1">
                Deskripsikan Detail yang Tidak Terlihat di Foto <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deskripsi_rahasia"
                name="deskripsi_rahasia"
                rows="3"
                required
                value={deskripsiRahasia}
                onChange={(e) => setDeskripsiRahasia(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-kampus-blue outline-none resize-none"
                placeholder="Contoh: Ada bekas goresan di sisi belakang, isi dokumen di dalam folder tersembunyi, dll..."></textarea>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-kampus-blue uppercase tracking-wider border-b border-blue-100 pb-1">Langkah 2: Unggah Bukti Pendukung</h4>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Foto Barang Serupa / Bukti Kepemilikan (Opsional)</label>
              <p className="text-[11px] text-gray-500 mb-2">Foto barang dari sudut berbeda sebelum hilang atau nota pembelian resmi.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(setBuktiFoto)}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-kampus-blue hover:file:bg-gray-200"
              />
              {buktiFoto && <img src={buktiFoto} alt="Bukti" className="mt-2 max-h-20 object-contain rounded" />}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Foto Kartu Tanda Mahasiswa (KTM) <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-gray-500 mb-2">Wajib diunggah untuk dicocokkan dengan profil akun pelapor Anda.</p>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange(setKtmFoto)}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-kampus-blue hover:file:bg-gray-200"
              />
              {ktmFoto && <img src={ktmFoto} alt="KTM" className="mt-2 max-h-20 object-contain rounded" />}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex gap-3 bg-white">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-kampus-blue text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-900 transition-colors text-sm shadow-md disabled:opacity-60">
              {loading ? 'Mengirim...' : 'Ajukan Klaim Sekarang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
