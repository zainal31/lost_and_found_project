import Layout from '../components/Layout';

export default function LoginAdmin() {
  return (
    <Layout isLoggedIn={false}>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-kampus-blue">Portal Admin/Petugas</h2>
            <p className="text-gray-500 text-sm mt-1">Masuk untuk memverifikasi klaim dan mengelola barang temuan.</p>
          </div>
          <form className="space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700 mb-1">Username / NIP Pegawai</label>
              <input id="admin-id" name="admin-id" type="text" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors" placeholder="Contoh: ADM10293" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" name="password" type="password" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors" placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-kampus-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors shadow-md">Masuk Sistem Admin</button>
            </div>
          </form>
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <a href="/login-mahasiswa" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-kampus-blue transition-colors"> &larr; Kembali ke Portal Mahasiswa </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}