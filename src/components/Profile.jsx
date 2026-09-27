import React, { useState, useEffect } from 'react'
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
import { apiRequest } from '../api'

export default function Profile({ user, onClose, onOpenTopUp, onNavigateShop, onLogout }) {
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [copiedCode, setCopiedCode] = useState(null)
  const [copiedUid, setCopiedUid] = useState(null)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [accountError, setAccountError] = useState('')

  // New Saved ID Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGame, setNewGame] = useState('Free Fire')
  const [newUid, setNewUid] = useState('')
  const [newServer, setNewServer] = useState('')
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    if (import.meta.env.VITE_API_URL) {
      Promise.all([apiRequest('/api/orders/my-orders'), apiRequest('/api/player-ids')])
        .then(([remoteOrders, remoteIds]) => {
          setOrders((remoteOrders || []).map((item) => ({
            orderId: item.orderNumber,
            date: new Date(item.createdAt).toLocaleDateString(),
            game: item.items?.[0]?.productName || 'Order',
            item: item.items?.map((orderItem) => `${orderItem.productName} × ${orderItem.quantity}`).join(', '),
            amount: Number(item.totalAmount),
            paymentMethod: item.payments?.[0]?.method || 'Pending',
            status: item.status,
            uid: item.items?.[0]?.playerId,
            server: item.items?.[0]?.server,
            redeemCode: item.delivery?.code,
            image: getCoverImage({ name: item.items?.[0]?.productName }),
          })))
          setSavedIds((remoteIds || []).map((item) => ({ ...item, uid: item.playerId })))
        })
        .catch((error) => setAccountError(error.message || 'Could not load account data.'))
      return
    }
    setAccountError('Connect the frontend to the backend API to load account data.')
  }, [])

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
    if (!import.meta.env.VITE_API_URL) {
      setAccountError('Connect the frontend to the backend API to manage saved player IDs.')
      return
    }
    const updated = savedIds.filter(item => item.id !== id)
    setSavedIds(updated)
    if (import.meta.env.VITE_API_URL) {
      apiRequest(`/api/player-ids/${id}`, { method: 'DELETE' }).catch((error) => console.error(error))
      return
    }
  }

  const handleAddSavedId = async (e) => {
    e.preventDefault()
    if (!newUid.trim()) return

    if (!import.meta.env.VITE_API_URL) {
      setAccountError('Connect the frontend to the backend API to manage saved player IDs.')
      return
    }
    try {
      const created = await apiRequest('/api/player-ids', { method: 'POST', body: JSON.stringify({ game: newGame, playerId: newUid.trim(), server: newServer.trim() || undefined, nickname: newNickname.trim() || 'My Account' }) })
      setSavedIds((current) => [{ ...created, uid: created.playerId }, ...current])
    } catch (error) {
      setAccountError(error.message || 'Could not save player ID.')
    }

    setNewUid('')
    setNewServer('')
    setNewNickname('')
    setShowAddForm(false)
  }

  const handleLogout = () => {
    if (onLogout) onLogout()
    setIsLoggedOut(true)
    setTimeout(() => {
      if (onClose) onClose()
      else {
        window.location.hash = 'home'
      }
    }, 1200)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12192b] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Customer Portal  Sagarmatha Gaming
        </span>
      </div>
      {accountError && <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-center text-sm text-amber-300">{accountError}</div>}

      {/* User Overview Card */}
      <div className="relative rounded-2xl bg-[#0e1526] border border-slate-800 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border-2 border-cyan-400/60 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-xl bg-[#090d18] flex items-center justify-center text-cyan-300 font-black text-2xl sm:text-3xl">
                SG
              </div>
              <span className="absolute -bottom-2 -right-1 bg-cyan-400 text-slate-950 p-1 rounded-lg shadow-md" title="Verified Customer">
                <ShieldCheck size={14} className="stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{user?.name || 'Customer'}</h1>
                <span className="text-[11px] font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={11} className="text-cyan-400" /> VIP Gold Member
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">{user?.email || 'Account details unavailable'} {user?.phone || ''}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><ShoppingBag size={14} className="text-cyan-400" /> <b>{orders.length}</b> Orders &amp; Vouchers</span>
                <span className="flex items-center gap-1.5"><Gamepad2 size={14} className="text-cyan-400" /> <b>{savedIds.length}</b> Saved Player UIDs</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleLogout}
              className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700/80 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut size={16} />
              {isLoggedOut ? 'Logged Out' : 'Logout'}
            </button>
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
            <div className="p-12 text-center bg-[#0d1424] border border-slate-800 rounded-2xl">
              <ShoppingBag size={48} className="mx-auto text-slate-600 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Orders Yet</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-4">Your digital vouchers and mobile top-ups will appear here.</p>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = 'shop'
                  if (onNavigateShop) onNavigateShop()
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-colors"
              >
                Browse Shop
              </button>
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
                      alt={order.game}
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
                          className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-1"
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
        </div>
      )}
    </div>
  )
}
