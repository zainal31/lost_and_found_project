import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../components/Layout";
import { getUser } from '../lib/auth';

export default function LaporPenemuan() {
  const navigate = useNavigate();
  const user = getUser();

  const [formData, setFormData] = useState({
    nama_barang: '',
    kategori: '',
    lokasi_penemuan: '',
    detail_lokasi: '',
    waktu: '',
    status_penyerahan: 'center',
    pertanyaan_verifikasi: '',
    deskripsi: '',
  });
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran foto terlalu besar. Maksimal 5MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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

    // Validation
    if (!formData.nama_barang.trim() || !formData.kategori || !formData.lokasi_penemuan || !formData.detail_lokasi.trim() || !formData.waktu || !formData.deskripsi.trim()) {
      setError('Mohon lengkapi semua kolom yang wajib diisi (*).');
      setLoading(false);
      return;
    }

    if (!image) {
      setError('Wajib menyertakan minimal 1 foto barang temuan untuk verifikasi.');
      setLoading(false);
      return;
    }

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const newItem = {
        id: `found_${Date.now()}`,
        type: 'found',
        name: formData.nama_barang,
        category: formData.kategori,
        location: formData.lokasi_penemuan,
        detailLocation: formData.detail_lokasi,
        date: formData.waktu,
        statusPenyerahan: formData.status_penyerahan,
        verificationQuestion: formData.pertanyaan_verifikasi || 'Bagaimana ciri khusus atau detail barang ini?',
        description: formData.deskripsi,
        image: image,
        status: 'ditemukan', // Status: ditemukan, proses klaim, kembali
        reporterNim: user.nim,
        reporterName: user.name,
        reporterPhone: user.phone,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      let items = [];
      try {
        const raw = localStorage.getItem('clf_items');
        items = raw ? JSON.parse(raw) : [];
      } catch {
        items = [];
      }

      items.unshift(newItem);
      localStorage.setItem('clf_items', JSON.stringify(items));

      setLoading(false);
      navigate('/dashboard-mahasiswa');
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan laporan.');
      setLoading(false);
    }
  };

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <header className="mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-3xl font-bold text-kampus-blue">Form Lapor Penemuan</h2>
            <p className="text-gray-500 text-sm mt-1">Isi form ini jika Anda mengamankan barang milik orang lain di wilayah kampus.</p>
          </header>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="nama_barang" className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Barang Temuan <span className="text-red-500">*</span>
              </label>
              <input
                id="nama_barang"
                name="nama_barang"
                type="text"
                required
                value={formData.nama_barang}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                placeholder="Contoh: Kunci Motor Yamaha, Flashdisk"
              />
            </div>

            <div>
              <label htmlFor="kategori" className="block text-sm font-semibold text-gray-700 mb-1">
                Kategori Barang <span className="text-red-500">*</span>
              </label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors">
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="elektronik">Elektronik & Gadget</option>
                <option value="dokumen">Kartu & Dokumen (KTM, KTP, SIM, Bank)</option>
                <option value="kunci">Kunci & Aksesoris</option>
                <option value="tas">Tas, Dompet & Isinya</option>
                <option value="buku">Buku & Alat Tulis</option>
                <option value="pakaian">Pakaian & Perlengkapan</option>
                <option value="uang">Uang Tunai</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Foto Barang <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">Wajib sertakan minimal 1 foto dari berbagai sudut untuk memudahkan verifikasi pemilik asli.</p>
              <div className="relative group border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-kampus-blue transition-all cursor-pointer">
                <input 
                  id="foto" 
                  name="foto" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  required 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="text-center flex flex-col items-center">
                  {image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={image} alt="Preview" className="max-h-32 object-contain rounded-lg border border-gray-200" />
                      <p className="text-xs text-gray-500 font-semibold">Klik atau drag untuk mengganti</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-kampus-blue transition-colors mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-kampus-blue transition-colors">Klik untuk upload atau drag & drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Maks. 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lokasi_penemuan" className="block text-sm font-semibold text-gray-700 mb-1">
                  Lokasi Penemuan <span className="text-red-500">*</span>
                </label>
                <select
                  id="lokasi_penemuan"
                  name="lokasi_penemuan"
                  value={formData.lokasi_penemuan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors">
                  <option value="" disabled>
                    Pilih Gedung/Area
                  </option>
                  <option value="Pintu Utama">Lobby Utama(Pintu Utama)</option>
                  <option value="Admission">Lobby Admission</option>
                  <option value="Perpustakaan">Perpustakaan</option>
                  <option value="Ruang Kelas">Ruang Kelas</option>
                  <option value="Lorong Kelas">Lorong Kelas</option>
                  <option value="Area Parkir">Area Parkir</option>
                  <option value="Toilet">Toilet</option>
                  <option value="Musholla">Musholla</option>
                </select>
              </div>

              <div>
                <label htmlFor="detail_lokasi" className="block text-sm font-semibold text-gray-700 mb-1">
                  Detail Lokasi Penemuan <span className="text-red-500">*</span>
                </label>
                <input
                  id="detail_lokasi"
                  name="detail_lokasi"
                  type="text"
                  required
                  value={formData.detail_lokasi}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                  placeholder="Contoh: Terjatuh di dekat pot meja kantin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="waktu" className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal & Waktu Penemuan <span className="text-red-500">*</span>
              </label>
              <input
                id="waktu"
                name="waktu"
                type="datetime-local"
                required
                value={formData.waktu}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status Penyimpanan Barang <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 font-medium text-sm text-gray-600 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="status_penyerahan" 
                    value="center" 
                    checked={formData.status_penyerahan === 'center'} 
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-kampus-blue border-gray-300 focus:ring-kampus-blue" 
                  />
                  <div>
                    <p className="text-gray-800">Diserahkan ke Lost & Found Center</p>
                    <p className="text-xs text-gray-500 font-normal mt-0.5">Barang sudah dititipkan ke Pusat Info atau Satpam Kampus.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 font-medium text-sm text-gray-600 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="status_penyerahan" 
                    value="penemu" 
                    checked={formData.status_penyerahan === 'penemu'}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-kampus-blue border-gray-300 focus:ring-kampus-blue" 
                  />
                  <div>
                    <p className="text-gray-800">Masih saya simpan sendiri</p>
                    <p className="text-xs text-gray-500 font-normal mt-0.5">Saya bersedia dihubungi jika pemilik barang sudah terkonfirmasi.</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <label htmlFor="pertanyaan_verifikasi" className="block text-sm font-semibold text-gray-700 mb-1">
                Pertanyaan Verifikasi <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Pertanyaan rahasia yang hanya bisa dijawab pemilik asli (Contoh: "Apa warna casing HP-nya?" atau "Berapa jumlah nominal uang di dalamnya?")</p>
              <input
                id="pertanyaan_verifikasi"
                name="pertanyaan_verifikasi"
                type="text"
                value={formData.pertanyaan_verifikasi}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                placeholder="Masukkan pertanyaan verifikasi jika ada..."
              />
            </div>

            <div>
              <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-1">
                Deskripsi Ciri Utama <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows="4"
                required
                value={formData.deskripsi}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors resize-none"
                placeholder="Tulis ciri-ciri detail barang (termasuk detail rahasia yang tidak tampak pada foto untuk mempermudah validasi admin)..."></textarea>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-kampus-gold text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-md disabled:opacity-60">
                {loading ? 'Mengirim Laporan...' : 'Kirim Laporan Penemuan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
