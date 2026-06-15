import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { loginMahasiswa, loginAdmin, getUser } from '../lib/auth';

const INITIAL_MAHASISWA = {
  name: '',
  nim: '',
  phone: '',
  fakultas: '',
  prodi: '',
  semester: '',
};

const INITIAL_ADMIN = {
  username: '',
  password: '',
};

function validateMahasiswa(values) {
  const errors = {};
  if (values.name.trim().length < 3) {
    errors.name = 'Nama lengkap minimal 3 karakter.';
  }
  if (!/^\d{10,12}$/.test(values.nim.trim())) {
    errors.nim = 'NIM harus 10-12 digit angka.';
  }
  if (!/^\d{10,13}$/.test(values.phone.trim())) {
    errors.phone = 'Nomor HP harus 10-13 digit angka.';
  }
  if (!values.fakultas) errors.fakultas = 'Fakultas wajib dipilih.';
  if (!values.prodi) errors.prodi = 'Program studi wajib dipilih.';
  if (!values.semester) errors.semester = 'Semester wajib dipilih.';
  return errors;
}

function validateAdmin(values) {
  const errors = {};
  if (values.username.trim().length < 3) {
    errors.username = 'Username minimal 3 karakter.';
  }
  if (values.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.';
  }
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('mahasiswa');
  const [mahasiswa, setMahasiswa] = useState(INITIAL_MAHASISWA);
  const [admin, setAdmin] = useState(INITIAL_ADMIN);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const existingUser = getUser();
  if (existingUser) {
    const target = existingUser.role === 'admin' ? '/dashboard-admin' : '/dashboard-mahasiswa';
    return <Navigate to={target} replace />;
  }

  const switchRole = (next) => {
    setRole(next);
    setErrors({});
    setTouched({});
    setGlobalError('');
  };

  const updateMahasiswa = (field) => (e) => {
    const value = e.target.value;
    const next = { ...mahasiswa, [field]: value };
    setMahasiswa(next);
    if (touched[field]) {
      setErrors(validateMahasiswa(next));
    }
  };

  const updateAdmin = (field) => (e) => {
    const value = e.target.value;
    const next = { ...admin, [field]: value };
    setAdmin(next);
    if (touched[field]) {
      setErrors(validateAdmin(next));
    }
  };

  const markTouched = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const submitMahasiswa = async (e) => {
    e.preventDefault();
    setGlobalError('');
    const validation = validateMahasiswa(mahasiswa);
    setErrors(validation);
    setTouched({
      name: true,
      nim: true,
      phone: true,
      fakultas: true,
      prodi: true,
      semester: true,
    });
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    loginMahasiswa(mahasiswa);
    setLoading(false);
    navigate('/dashboard-mahasiswa', { replace: true });
  };

  const submitAdmin = async (e) => {
    e.preventDefault();
    setGlobalError('');
    const validation = validateAdmin(admin);
    setErrors(validation);
    setTouched({ username: true, password: true });
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = loginAdmin(admin);
    setLoading(false);
    if (!result) {
      setGlobalError('Username atau password salah. Coba lagi.');
      return;
    }
    navigate('/dashboard-admin', { replace: true });
  };

  const inputClass = (hasError) =>
    [
      'w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-kampus-blue outline-none transition-colors',
      hasError ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-kampus-blue',
    ].join(' ');

  const selectClass = (hasError) =>
    [
      'w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:border-kampus-blue outline-none transition-colors',
      hasError ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-kampus-blue',
    ].join(' ');

  const renderError = (show, message) =>
    show && message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

  return (
    <Layout isLoggedIn={false}>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => switchRole('mahasiswa')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                role === 'mahasiswa' ? 'bg-white text-kampus-blue shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portal Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => switchRole('admin')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                role === 'admin' ? 'bg-white text-kampus-blue shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portal Admin
            </button>
          </div>

          {globalError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {globalError}
            </div>
          )}

          {role === 'mahasiswa' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-kampus-blue mb-2">Selamat Datang Mahasiswa</h2>
                <p className="text-gray-500 text-sm">Lengkapi data untuk mendaftar sekaligus masuk ke sistem.</p>
              </div>

              <form className="space-y-5" onSubmit={submitMahasiswa} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={mahasiswa.name}
                    onChange={updateMahasiswa('name')}
                    onBlur={markTouched('name')}
                    className={inputClass(!!errors.name)}
                    placeholder="Sesuai KTM"
                  />
                  {renderError(touched.name, errors.name)}
                </div>

                <div>
                  <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">Nomor Induk Mahasiswa (NIM)</label>
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    required
                    inputMode="numeric"
                    value={mahasiswa.nim}
                    onChange={updateMahasiswa('nim')}
                    onBlur={markTouched('nim')}
                    className={inputClass(!!errors.nim)}
                    placeholder="Contoh: 25210400012"
                  />
                  {renderError(touched.nim, errors.nim)}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone/WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    value={mahasiswa.phone}
                    onChange={updateMahasiswa('phone')}
                    onBlur={markTouched('phone')}
                    className={inputClass(!!errors.phone)}
                    placeholder="Contoh: 081234567890"
                  />
                  {renderError(touched.phone, errors.phone)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fakultas" className="block text-sm font-medium text-gray-700 mb-1">Fakultas</label>
                    <select
                      id="fakultas"
                      name="fakultas"
                      value={mahasiswa.fakultas}
                      onChange={updateMahasiswa('fakultas')}
                      onBlur={markTouched('fakultas')}
                      required
                      className={selectClass(!!errors.fakultas)}
                    >
                      <option value="" disabled>Pilih Fakultas</option>
                      <option value="FIK">Fakultas Ilmu Komputer</option>
                      <option value="FEB">Fakultas Ekonomi & Bisnis</option>
                    </select>
                    {renderError(touched.fakultas, errors.fakultas)}
                  </div>
                  <div>
                    <label htmlFor="prodi" className="block text-sm font-medium text-gray-700 mb-1">Program Studi</label>
                    <select
                      id="prodi"
                      name="prodi"
                      value={mahasiswa.prodi}
                      onChange={updateMahasiswa('prodi')}
                      onBlur={markTouched('prodi')}
                      required
                      className={selectClass(!!errors.prodi)}
                    >
                      <option value="" disabled>Pilih Prodi</option>
                      <option value="STI">Sistem dan Teknologi Informasi</option>
                      <option value="ILKOM">Ilmu Komputer</option>
                      <option value="DS">Sains Data</option>
                      <option value="BISDIG">Bisnis Digital</option>
                      <option value="FINANCE">Ekonomi & Keuangan</option>
                    </select>
                    {renderError(touched.prodi, errors.prodi)}
                  </div>
                </div>

                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    id="semester"
                    name="semester"
                    value={mahasiswa.semester}
                    onChange={updateMahasiswa('semester')}
                    onBlur={markTouched('semester')}
                    required
                    className={selectClass(!!errors.semester)}
                  >
                    <option value="" disabled>Pilih Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                  {renderError(touched.semester, errors.semester)}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-kampus-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Memproses...' : 'Daftar dan Masuk'}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-3">Bukan Mahasiswa?</p>
                <button
                  type="button"
                  onClick={() => switchRole('admin')}
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
                <p className="text-xs text-gray-400 mt-2">
                  Demo credentials: <span className="font-mono text-gray-600">admin</span> / <span className="font-mono text-gray-600">admin123</span>
                </p>
              </div>

              <form className="space-y-5" onSubmit={submitAdmin} noValidate>
                <div>
                  <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700 mb-1">Username / NIP Pegawai</label>
                  <input
                    id="admin-id"
                    name="admin-id"
                    type="text"
                    required
                    value={admin.username}
                    onChange={updateAdmin('username')}
                    onBlur={markTouched('username')}
                    className={inputClass(!!errors.username)}
                    placeholder="Contoh: ADM10293"
                  />
                  {renderError(touched.username, errors.username)}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={admin.password}
                      onChange={updateAdmin('password')}
                      onBlur={markTouched('password')}
                      className={`${inputClass(!!errors.password)} pr-12`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-gray-500 hover:text-kampus-blue"
                    >
                      {showPassword ? 'Sembunyi' : 'Lihat'}
                    </button>
                  </div>
                  {renderError(touched.password, errors.password)}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-kampus-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Memproses...' : 'Masuk Sistem Admin'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => switchRole('mahasiswa')}
                  className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-kampus-blue transition-colors cursor-pointer font-medium"
                >
                  &larr; Kembali ke Portal Mahasiswa
                </button>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <Link to="/beranda" className="text-xs text-gray-400 hover:text-kampus-blue">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
