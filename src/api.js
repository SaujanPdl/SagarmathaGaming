const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { ...(isFormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error?.message || 'Request failed')
  }
  return payload.data
}

export function createOrder(input) {
  return apiRequest('/api/orders', { method: 'POST', body: JSON.stringify(input) })
}

export function getProducts() {
  return apiRequest('/api/products')
}

export function getMe() {
  return apiRequest('/api/auth/me')
}

export function login(input) {
  return apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(input) })
}

export function register(input) {
  return apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(input) })
}

export function logout() {
  return apiRequest('/api/auth/logout', { method: 'POST' })
}

export function submitPayment(orderNumber, input) {
  const form = new FormData()
  form.append('method', input.method)
  form.append('amount', String(input.amount))
  if (input.transactionId) form.append('transactionId', input.transactionId)
  form.append('proof', input.proof)
  return apiRequest(`/api/orders/${encodeURIComponent(orderNumber)}/payment`, { method: 'POST', body: form, headers: input.accessToken ? { 'x-order-access-token': input.accessToken } : {} })
}