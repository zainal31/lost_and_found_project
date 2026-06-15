import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  // State untuk menentukan form mana yang aktif ('mahasiswa' atau 'admin')
  const [role, setRole] = useState('mahasiswa');

  return (
    <Layout isLoggedIn={false}>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          
          {role === 'mahasiswa' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-kampus-blue mb-2">Selamat Datang Mahasiswa</h2>
                <p className="text-gray-500 text-sm">Silakan lengkapi form di bawah ini untuk masuk atau mendaftar ke sistem.</p>
              </div>
              
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    placeholder="Sesuai KTM"
                  />
                </div>
                <div>
                  <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">Nomor Induk Mahasiswa (NIM)</label>
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    placeholder="Contoh: 25210400012"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone/WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    placeholder="Contoh: 081234567890"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fakultas" className="block text-sm font-medium text-gray-700 mb-1">Fakultas</label>
                    <select
                      id="fakultas"
                      name="fakultas"
                      defaultValue=""
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    >
                      <option value="" disabled>Pilih Fakultas</option>
                      <option value="FIK">Fakultas Ilmu Komputer</option>
                      <option value="FEB">Fakultas Ekonomi & Bisnis</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="prodi" className="block text-sm font-medium text-gray-700 mb-1">Program Studi</label>
                    <select
                      id="prodi"
                      name="prodi"
                      defaultValue=""
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    >
                      <option value="" disabled>Pilih Prodi</option>
                      <option value="STI">Sistem dan Teknologi Informasi</option>
                      <option value="ILKOM">Ilmu Komputer</option>
                      <option value="DS">Sains Data</option>
                      <option value="BISDIG">Bisnis Digital</option>
                      <option value="FINANCE">Ekonomi & Keuangan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    id="semester"
                    name="semester"
                    defaultValue=""
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                  >
                    <option value="" disabled>Pilih Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-kampus-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors shadow-md">
                    Daftar dan Masuk
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-3">Bukan Mahasiswa?</p>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-kampus-gold hover:text-yellow-600 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Masuk sebagai Admin/Petugas
                </button>
              </div>
            </>
          )}

          {role === 'admin' && (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-kampus-gold mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-kampus-blue">Portal Admin/Petugas</h2>
                <p className="text-gray-500 text-sm mt-1">Masuk untuk memverifikasi klaim dan mengelola barang temuan.</p>
              </div>

              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700 mb-1">Username / NIP Pegawai</label>
                  <input
                    id="admin-id"
                    name="admin-id"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    placeholder="Contoh: ADM10293"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kampus-blue focus:border-kampus-blue outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-kampus-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors shadow-md">
                    Masuk Sistem Admin
                  </button>
                </div>
              </form>

              {/* Selector di bagian bawah form Admin */}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => setRole('mahasiswa')}
                  className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-kampus-blue transition-colors cursor-pointer font-medium"
                >
                  &larr; Kembali ke Portal Mahasiswa
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
}