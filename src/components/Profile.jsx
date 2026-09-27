import React, { useState, useEffect, useMemo } from 'react'
import {
  User,
  ShoppingBag,
  Zap,
  ShieldCheck,
  LogOut,
  Copy,
  Check,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Gamepad2,
  KeyRound,
  ExternalLink
} from 'lucide-react'
import getCoverImage, { DEFAULT_FALLBACK_COVER } from '../utils/gameImages'
import { DiscordIcon } from './AuthModal'

export default function Profile({ onClose, onOpenTopUp, onNavigateShop, currentUser, onLogout, onOpenLogin }) {
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('gamer_orders')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Filter out legacy mock data if present
          return parsed.filter(o => !o.orderId?.startsWith('SG-TOPUP-872311') && !o.orderId?.startsWith('SG-TOPUP-290670') && !o.orderId?.startsWith('SG-VOUCH-78912') && !o.orderId?.startsWith('SG-VOUCH-65201') && !o.orderId?.startsWith('SG-TOPUP-941824') && !o.orderId?.startsWith('SG-VOUCH-41908'))
        }
      }
      return []
    } catch {
      return []
    }
  })

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('saved_player_ids')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Filter out legacy default mock IDs
          return parsed.filter(item => item.uid !== '789123456' && item.uid !== '5123456789' && item.uid !== '98124712')
        }
      }
      return []
    } catch {
      return []
    }
  })

  const [copiedCode, setCopiedCode] = useState(null)
  const [copiedUid, setCopiedUid] = useState(null)
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  // New Saved ID Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGame, setNewGame] = useState('Free Fire')
  const [newUid, setNewUid] = useState('')
  const [newServer, setNewServer] = useState('')
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    const loadProfileData = () => {
      try {
        const rawOrders = localStorage.getItem('gamer_orders')
        if (rawOrders) {
          const parsed = JSON.parse(rawOrders)
          const filtered = Array.isArray(parsed)
            ? parsed.filter(o => !o.orderId?.startsWith('SG-TOPUP-872311') && !o.orderId?.startsWith('SG-TOPUP-290670') && !o.orderId?.startsWith('SG-VOUCH-78912') && !o.orderId?.startsWith('SG-VOUCH-65201') && !o.orderId?.startsWith('SG-TOPUP-941824') && !o.orderId?.startsWith('SG-VOUCH-41908'))
            : []
          setOrders(filtered)
        } else {
          setOrders([])
        }

        const rawUids = localStorage.getItem('saved_player_ids')
        if (rawUids) {
          const parsed = JSON.parse(rawUids)
          const filtered = Array.isArray(parsed)
            ? parsed.filter(item => item.uid !== '789123456' && item.uid !== '5123456789' && item.uid !== '98124712')
            : []
          setSavedIds(filtered)
        } else {
          setSavedIds([])
        }
      } catch (e) {
        console.error('Error loading profile data:', e)
        setOrders([])
        setSavedIds([])
      }
    }

    loadProfileData()
    window.addEventListener('storage', loadProfileData)
    return () => window.removeEventListener('storage', loadProfileData)
  }, [])

  // Dynamic VIP calculation: 5+ orders or spent over Rs. 5,000
  const totalSpent = useMemo(() => {
    return orders.reduce((sum, order) => {
      const val = typeof order?.amount === 'number' ? order.amount : Number(order?.amount) || 0
      return sum + val
    }, 0)
  }, [orders])

  const isVip = useMemo(() => {
    return orders.length >= 5 || totalSpent >= 5000
  }, [orders.length, totalSpent])

  const handleCopyCode = (code, id) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 1800)
  }

  const handleCopyUid = (uid, id) => {
    navigator.clipboard?.writeText(uid)
    setCopiedUid(id)
    setTimeout(() => setCopiedUid(null), 1800)
  }

  const handleDeleteSavedId = (id) => {
    const updated = savedIds.filter(item => item.id !== id)
    setSavedIds(updated)
    try {
      localStorage.setItem('saved_player_ids', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddSavedId = (e) => {
    e.preventDefault()
    if (!newUid.trim()) return

    const newEntry = {
      id: Date.now(),
      game: newGame,
      uid: newUid.trim(),
      server: newServer.trim(),
      nickname: newNickname.trim() || 'My Account'
    }

    const updated = [newEntry, ...savedIds]
    setSavedIds(updated)
    try {
      localStorage.setItem('saved_player_ids', JSON.stringify(updated))
    } catch (err) {
      console.error(err)
    }

    setNewUid('')
    setNewServer('')
    setNewNickname('')
    setShowAddForm(false)
  }

  const handleLogout = () => {
    setIsLoggedOut(true)
    if (onLogout) {
      onLogout()
    }
    setTimeout(() => {
      setIsLoggedOut(false)
    }, 800)
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 text-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose()
            else {
              window.location.hash = 'home'
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12192b] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Customer Portal • Sagarmatha Gaming
        </span>
      </div>

      {/* User Overview Card */}
      <div className="relative rounded-2xl bg-[#0e1526] border border-slate-800 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#5865F2]/40 via-cyan-500/30 to-purple-600/30 border-2 border-cyan-400/60 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
              {currentUser?.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.global_name || currentUser.username} 
                  className="w-full h-full rounded-xl object-cover bg-slate-900" 
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "https://cdn.discordapp.com/embed/avatars/0.png"
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-[#090d18] flex items-center justify-center text-cyan-300 font-black text-2xl sm:text-3xl">
                  SG
                </div>
              )}
              {currentUser && (
                <span className="w-4 h-4 bg-emerald-500 border-2 border-[#0e1526] rounded-full absolute -top-1 -right-1" title="Online" />
              )}
              <span className="absolute -bottom-2 -right-1 bg-[#5865F2] text-white p-1 rounded-lg shadow-md" title={currentUser ? "Verified Discord Account" : "Verified Customer"}>
                {currentUser ? <DiscordIcon size={14} /> : <ShieldCheck size={14} className="stroke-[3]" />}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentUser?.global_name || currentUser?.username || 'Sagarmatha Gamer'}
                </h1>
                {currentUser ? (
                  <span className="text-[11px] font-bold bg-[#5865F2]/20 border border-[#5865F2]/50 text-indigo-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <DiscordIcon size={12} /> Discord Verified
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={11} className="text-cyan-400" /> Guest Gamer
                  </span>
                )}
                {/* Dynamic VIP Badge */}
                {isVip ? (
                  <span className="text-[11px] font-bold bg-amber-500/20 border border-amber-500/50 text-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm shadow-amber-500/10">
                    <Sparkles size={11} className="text-amber-400" /> VIP Gold Member
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-slate-800/80 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Member
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {currentUser?.email ? currentUser.email : 'gamer@sagarmatha.com'}
                {currentUser?.username && <span className="text-cyan-400 ml-2 font-mono">@{currentUser.username}</span>}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><ShoppingBag size={14} className="text-cyan-400" /> <b>{orders.length}</b> Orders &amp; Vouchers</span>
                <span className="flex items-center gap-1.5"><Gamepad2 size={14} className="text-cyan-400" /> <b>{savedIds.length}</b> Saved Player UIDs</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700/80 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
              >
                <LogOut size={16} />
                {isLoggedOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="py-2.5 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/25 transition-all cursor-pointer border-0 min-h-[44px]"
              >
                <DiscordIcon size={16} />
                Connect Discord
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-6 gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 font-bold text-sm sm:text-base border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag size={17} />
          My Orders &amp; Vouchers
          <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-mono text-slate-300">{orders.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved_ids')}
          className={`py-3 px-4 font-bold text-sm sm:text-base border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'saved_ids'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gamepad2 size={17} />
          Saved Player IDs
          <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-mono text-slate-300">{savedIds.length}</span>
        </button>
      </div>

      {/* Tab 1: Orders & Vouchers */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-10 sm:p-14 text-center bg-[#0d1424] border border-slate-800/80 rounded-2xl space-y-3">
              <ShoppingBag size={48} className="mx-auto text-slate-600 mb-2" />
              <h3 className="text-lg font-bold text-white">No orders yet</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                Your game top-ups, gift cards, and voucher codes will appear here after checkout.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = 'shop'
                    if (onNavigateShop) onNavigateShop()
                    if (onClose) onClose()
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-colors cursor-pointer border-0 shadow-lg shadow-cyan-500/20"
                >
                  Browse Games &amp; Top-ups
                </button>
              </div>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div
                key={order.orderId || idx}
                className="bg-[#0e1629] border border-slate-800/80 hover:border-slate-700/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-md"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-18 sm:w-16 sm:h-22 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shrink-0 shadow-md">
                    <img
                      src={order.image || DEFAULT_FALLBACK_COVER}
                      alt={order.game || order.item || 'Game'}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_FALLBACK_COVER; }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-cyan-400">{order.orderId}</span>
                      <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                        <CheckCircle2 size={10} /> Completed
                      </span>
                      <span className="text-xs text-slate-500">• {order.date}</span>
                    </div>

                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">{order.item || order.game}</h3>

                    {/* Voucher Code Box */}
                    {order.redeemCode && (
                      <div className="mt-2 flex items-center gap-2 bg-[#090d18] border border-cyan-500/40 rounded-xl px-3 py-1.5 w-fit">
                        <KeyRound size={14} className="text-cyan-400" />
                        <span className="text-xs text-slate-400">Code:</span>
                        <span className="font-mono font-black text-sm text-cyan-300 tracking-wider select-all">{order.redeemCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(order.redeemCode, order.orderId)}
                          className="ml-2 min-w-[40px] min-h-[40px] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0 bg-transparent p-1"
                          title="Copy Voucher Code"
                        >
                          {copiedCode === order.orderId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}

                    {/* UID Top-Up Box */}
                    {order.uid && (
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span>Target UID:</span>
                        <span className="text-white font-bold bg-slate-800/80 px-2 py-0.5 rounded">{order.uid}</span>
                        {order.server && <span className="text-slate-500">({order.server})</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-slate-400 block">{order.paymentMethod || 'eSewa'}</span>
                    <strong className="text-lg sm:text-xl font-black text-cyan-300">
                      Rs. {typeof order.amount === 'number' ? order.amount.toLocaleString() : order.amount}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Saved Player IDs */}
      {activeTab === 'saved_ids' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-xs sm:text-sm">
              Save your PUBG, Free Fire, and MLBB Character IDs for fast, 1-click in-game recharges.
            </p>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="py-2 px-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0"
            >
              <Plus size={15} />
              Add New ID
            </button>
          </div>

          {/* Add New Form */}
          {showAddForm && (
            <form onSubmit={handleAddSavedId} className="bg-[#10172b] border border-cyan-500/30 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                Add Player Account ID
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Game</label>
                  <select
                    value={newGame}
                    onChange={(e) => setNewGame(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#090d18] border border-slate-700 text-white text-xs outline-none"
                  >
                    <option>Free Fire</option>
                    <option>PUBG Mobile UID Topup</option>
                    <option>Mobile Legends: Bang Bang Nepal</option>
                    <option>Genshin Impact</option>
                    <option>Clash of Clans</option>
                    <option>Blood Strike</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Player UID / Character ID</label>
                  <input
                    type="text"
                    required
                    value={newUid}
                    onChange={(e) => setNewUid(e.target.value)}
                    placeholder="e.g. 5123456789"
                    className="w-full h-10 px-3 rounded-xl bg-[#090d18] border border-slate-700 text-white text-xs font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nickname (Optional)</label>
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="e.g. Main ID"
                    className="w-full h-10 px-3 rounded-xl bg-[#090d18] border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs"
                >
                  Save ID
                </button>
              </div>
            </form>
          )}

          {/* Saved IDs Grid */}
          {savedIds.length === 0 ? (
            <div className="p-10 sm:p-14 text-center bg-[#0d1424] border border-slate-800/80 rounded-2xl space-y-3">
              <Gamepad2 size={48} className="mx-auto text-slate-600 mb-2" />
              <h3 className="text-lg font-bold text-white">No saved player IDs yet</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                No saved player IDs yet. Your game UIDs will be saved here for 1-click recharges.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-colors cursor-pointer border-0 shadow-lg shadow-cyan-500/20"
                >
                  Add Player ID
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedIds.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0e1629] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        {item.game}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedId(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer border-0 bg-transparent p-1"
                        title="Remove Saved ID"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h4 className="font-bold text-white text-base">{item.nickname || 'My ID'}</h4>

                    <div className="mt-3 flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800/80">
                      <span className="font-mono text-sm text-cyan-300">{item.uid}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyUid(item.uid, item.id)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
                        title="Copy UID"
                      >
                        {copiedUid === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    {item.server && (
                      <span className="text-[11px] text-slate-400 block mt-1 font-mono">Region: {item.server}</span>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenTopUp) {
                          onOpenTopUp({ name: item.game, category: 'Game Top-Up' })
                        } else {
                          window.location.hash = 'shop'
                          if (onNavigateShop) onNavigateShop('Game Top-Up')
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Zap size={14} className="fill-cyan-400" />
                      Fast Recharge Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
