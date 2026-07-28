export const AUTH_COOKIE = "token"

/** Duración alineada al JWT del backend (30 días) */
const MAX_AGE = 60 * 60 * 24 * 30

export const setAuthCookie = (token) => {
  if (typeof document === "undefined" || !token) return
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`
}

export const clearAuthCookie = () => {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
}

export const syncAuthCookieFromStorage = () => {
  if (typeof window === "undefined") return
  const token = localStorage.getItem("token")
  if (token) setAuthCookie(token)
  else clearAuthCookie()
}
