const STORAGE_KEY = 'clf_user';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  name: 'Administrator',
  nip: 'ADM10293',
};

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

export function loginMahasiswa(data) {
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
  return user;
}

export function loginAdmin({ username, password }) {
  if (
    username !== ADMIN_CREDENTIALS.username ||
    password !== ADMIN_CREDENTIALS.password
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

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const adminCredentials = { ...ADMIN_CREDENTIALS };
