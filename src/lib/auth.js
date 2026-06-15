const STORAGE_KEY = 'clf_user';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  name: 'Administrator',
  nip: 'ADM10293',
};

const DEFAULT_ADMIN_HASH = 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd4'; // sha256 of 'admin123'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return getUser() !== null;
}

export function hasRole(role) {
  const user = getUser();
  return user?.role === role;
}

export function loginMahasiswa(data, password) {
  let users = [];
  try {
    const raw = localStorage.getItem('clf_registered_users');
    users = raw ? JSON.parse(raw) : [];
  } catch (e) {
    users = [];
  }

  const existing = users.find(u => u.nim.trim() === data.nim.trim());
  if (existing) {
    if (existing.password !== password) {
      return { success: false, error: 'Password salah untuk NIM ini. Harap gunakan password yang sama dengan pendaftaran pertama Anda.' };
    }
    // Update student details if they changed
    existing.name = data.name;
    existing.phone = data.phone;
    existing.fakultas = data.fakultas;
    existing.prodi = data.prodi;
    existing.semester = data.semester;
  } else {
    // First time registration
    const newUser = {
      nim: data.nim.trim(),
      password: password,
      name: data.name,
      phone: data.phone,
      fakultas: data.fakultas,
      prodi: data.prodi,
      semester: data.semester,
    };
    users.push(newUser);
  }

  localStorage.setItem('clf_registered_users', JSON.stringify(users));

  const user = {
    role: 'mahasiswa',
    name: data.name,
    nim: data.nim,
    phone: data.phone,
    fakultas: data.fakultas,
    prodi: data.prodi,
    semester: data.semester,
    loggedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export async function loginAdmin({ username, password }) {
  const storedAdminHash = localStorage.getItem('clf_admin_hash') || DEFAULT_ADMIN_HASH;
  const inputHash = await sha256(password);

  if (
    username !== ADMIN_CREDENTIALS.username ||
    inputHash !== storedAdminHash
  ) {
    return null;
  }
  const user = {
    role: 'admin',
    name: ADMIN_CREDENTIALS.name,
    nip: ADMIN_CREDENTIALS.nip,
    loggedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function changeAdminPassword(newPassword) {
  const hash = await sha256(newPassword);
  localStorage.setItem('clf_admin_hash', hash);
  return true;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const adminCredentials = { 
  username: ADMIN_CREDENTIALS.username, 
  name: ADMIN_CREDENTIALS.name, 
  nip: ADMIN_CREDENTIALS.nip 
};
