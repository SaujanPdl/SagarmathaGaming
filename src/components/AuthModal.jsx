import { useState } from 'react'
import { LogIn, UserPlus, X } from 'lucide-react'
import { login, register } from '../api'

export default function AuthModal({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const user = mode === 'login' ? await login({ email, password }) : await register({ name, email, password, phone: phone || undefined })
      onAuthenticated(user)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-[#0c1220] border border-cyan-500/30 rounded-2xl p-6 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        {mode === 'register' && <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-700" />}
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-700" />
        {mode === 'register' && <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone (optional)" className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-700" />}
        <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-700" />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button disabled={busy} className="w-full h-11 rounded-xl bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2 disabled:opacity-50">{mode === 'login' ? <LogIn size={17} /> : <UserPlus size={17} />}{busy ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="w-full text-sm text-cyan-300">{mode === 'login' ? 'Create a customer account' : 'Already have an account? Sign in'}</button>
      </form>
    </div>
  )
}
