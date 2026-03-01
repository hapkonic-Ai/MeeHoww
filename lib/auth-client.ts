export interface User {
  id: string
  name: string
  email: string
  role: string
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('user') !== null
}

export async function logout(): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } catch {}
  localStorage.removeItem('user')
  window.location.href = '/auth/login'
}
