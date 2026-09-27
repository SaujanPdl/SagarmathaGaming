import React, { useState, useEffect } from 'react'
import { X, Check, Zap, ShieldCheck, Sparkles, AlertCircle, Copy, CheckCircle2, User, Globe } from 'lucide-react'
import getCoverImage, { DEFAULT_FALLBACK_COVER } from '../utils/gameImages'

const GAME_DENOMINATIONS = {
  freefire: [
    { id: 'ff_115', name: '115 Diamonds', price: 120, badge: 'Popular' },
    { id: 'ff_240', name: '240 Diamonds', price: 240, badge: 'Best Value' },
    { id: 'ff_355', name: '355 Diamonds', price: 350 },
    { id: 'ff_610', name: '610 Diamonds', price: 600, badge: '+Bonus' },
    { id: 'ff_weekly', name: 'Weekly Pass', price: 260, badge: 'Hot Deal' },
    { id: 'ff_monthly', name: 'Monthly Pass', price: 1050, badge: 'VIP' }
  ],
  pubg: [
    { id: 'pubg_60', name: '60 UC', price: 140 },
    { id: 'pubg_325', name: '325 UC', price: 650, badge: 'Most Popular' },
    { id: 'pubg_660', name: '660 UC', price: 1300, badge: 'Royale Pass' },
    { id: 'pubg_1800', name: '1800 UC', price: 3500, badge: '+Bonus' },
    { id: 'pubg_rp_upgrade', name: 'Royale Pass Upgrade', price: 950, badge: 'Season Pass' },
    { id: 'pubg_elite_plus', name: 'Elite Pass Plus', price: 2350 }
  ],
  mlbb: [
    { id: 'mlbb_86', name: '86 Diamonds', price: 210 },
    { id: 'mlbb_172', name: '172 Diamonds', price: 420 },
    { id: 'mlbb_257', name: '257 Diamonds', price: 620, badge: 'Popular' },
    { id: 'mlbb_weekly', name: 'Weekly Diamond Pass', price: 270, badge: 'Best Value' },
    { id: 'mlbb_706', name: '706 Diamonds', price: 1650, badge: '+Bonus' },
    { id: 'mlbb_twilight', name: 'Twilight Pass', price: 1350 }
  ],
  genshin: [
    { id: 'gi_60', name: '60 Genesis Crystals', price: 150 },
    { id: 'gi_welkin', name: 'Blessing of Welkin Moon', price: 650, badge: 'Best Deal' },
    { id: 'gi_330', name: '300 + 30 Crystals', price: 650 },
    { id: 'gi_1090', name: '980 + 110 Crystals', price: 1950, badge: '+Bonus' },
    { id: 'gi_2240', name: '1980 + 260 Crystals', price: 3850 }
  ],
  clash: [
    { id: 'coc_80', name: '80 Gems', price: 130 },
    { id: 'coc_500', name: '500 Gems', price: 650, badge: 'Popular' },
    { id: 'coc_1200', name: '1200 Gems', price: 1350, badge: 'Value Pack' },
    { id: 'coc_goldpass', name: 'Gold Pass', price: 850, badge: 'Season Pass' }
  ],
  default: [
    { id: 'def_starter', name: 'Starter Pack', price: 180, badge: 'Quick Start' },
    { id: 'def_standard', name: 'Standard Pack', price: 450, badge: 'Popular' },
    { id: 'def_combat', name: 'Combat Pass', price: 850, badge: 'Season' },
    { id: 'def_elite', name: 'Elite Bundle', price: 1450, badge: 'Best Value' },
    { id: 'def_ultimate', name: 'Ultimate Cache', price: 2850, badge: 'Maximum' }
  ]
}

export default function TopUpModal({ product, onClose, onConfirmRecharge, onOpenProfile }) {
  const [playerUid, setPlayerUid] = useState('')
  const [serverRegion, setServerRegion] = useState('')
  const [selectedPack, setSelectedPack] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('eSewa')
  const [savedUids, setSavedUids] = useState([])
  const [submittedOrder, setSubmittedOrder] = useState(null)
  const [copiedOrder, setCopiedOrder] = useState(false)
  const [saveThisUid, setSaveThisUid] = useState(true)

  const productName = product?.name || 'Game Top-Up'
  const nameLower = productName.toLowerCase()

  const isPubg = nameLower.includes('pubg')
  const isFreeFire = nameLower.includes('free fire')
  const isMlbb = nameLower.includes('mobile legends') || nameLower.includes('mlbb')
  const isGenshin = nameLower.includes('genshin')

  const gameKey = isFreeFire ? 'freefire'
    : isPubg ? 'pubg'
    : isMlbb ? 'mlbb'
    : isGenshin ? 'genshin'
    : nameLower.includes('clash') ? 'clash'
    : 'default'

  const denominations = GAME_DENOMINATIONS[gameKey] || GAME_DENOMINATIONS.default

  useEffect(() => {
    if (denominations.length > 0 && !selectedPack) {
      setSelectedPack(denominations[1] || denominations[0])
    }

    if (isPubg && !serverRegion) setServerRegion('Global / Nepal')
    if (isFreeFire && !serverRegion) setServerRegion('Nepal / India')
    if (isGenshin && !serverRegion) setServerRegion('Asia')
  }, [gameKey])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sagarmatha_saved_uids')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSavedUids(parsed)
          const match = parsed.find(u => u.game?.toLowerCase() === gameKey || nameLower.includes(u.game?.toLowerCase() || ''))
          if (match && !playerUid) {
            setPlayerUid(match.uid)
            if (match.server) setServerRegion(match.server)
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [gameKey])

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!playerUid.trim()) return

    const orderId = `SG-TOPUP-${Math.floor(100000 + Math.random() * 900000)}`
    const orderData = {
      orderId,
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      game: productName,
      item: `${productName} - ${selectedPack?.name || 'Recharge'}`,
      packageName: selectedPack?.name || 'Top-Up Pack',
      amount: selectedPack?.price || product?.price || 0,
      uid: playerUid.trim(),
      server: serverRegion.trim(),
      paymentMethod,
      status: 'Completed',
      deliveryType: 'UID/Player ID digital top-up',
      image: product?.image || getCoverImage(product)
    }

    try {
      const existing = JSON.parse(localStorage.getItem('sagarmatha_orders') || '[]')
      localStorage.setItem('sagarmatha_orders', JSON.stringify([orderData, ...existing]))

      if (saveThisUid && playerUid.trim()) {
        const uids = JSON.parse(localStorage.getItem('sagarmatha_saved_uids') || '[]')
        const alreadyExists = uids.some(u => u.uid === playerUid.trim())
        if (!alreadyExists) {
          const newSaved = [
            {
              id: Date.now(),
              game: productName,
              uid: playerUid.trim(),
              server: serverRegion.trim(),
              nickname: 'My Account'
            },
            ...uids
          ]
          localStorage.setItem('sagarmatha_saved_uids', JSON.stringify(newSaved))
        }
      }
    } catch (err) {
      console.error(err)
    }

    setSubmittedOrder(orderData)
    if (onConfirmRecharge) {
      onConfirmRecharge(orderData)
    }
  }

  const copyOrder = () => {
    if (!submittedOrder) return
    const text = `Sagarmatha Gaming Recharge Order: ${submittedOrder.orderId}\nGame: ${submittedOrder.game}\nPackage: ${submittedOrder.packageName}\nPlayer UID: ${submittedOrder.uid}\nRegion: ${submittedOrder.server || 'Global'}\nAmount: Rs. ${submittedOrder.amount}\nPayment: ${submittedOrder.paymentMethod}`
    navigator.clipboard?.writeText(text)
    setCopiedOrder(true)
    setTimeout(() => setCopiedOrder(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0c1220] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-white my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-slate-800 bg-[#0f172a]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 rounded-lg overflow-hidden border border-cyan-500/30 shrink-0 bg-slate-900 shadow-md">
              <img 
                src={product?.image || getCoverImage(product)} 
                alt={productName} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_FALLBACK_COVER; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                  <Zap size={10} className="fill-cyan-400" /> Instant Recharge
                </span>
                <span className="text-[10px] text-slate-400">Codashop Style</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight line-clamp-1 mt-0.5">{productName}</h2>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0"
            aria-label="Close Top-Up modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {submittedOrder ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 flex flex-col items-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
              Recharge Confirmed
            </span>
            <h3 className="text-2xl font-black text-white mb-1">Instant Top-Up Placed!</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6">
              Instant Digital Delivery: Voucher/UC will be delivered via Email &amp; In-Game UID within 5-15 mins.
            </p>

            <div className="w-full bg-[#121a2f] border border-slate-800 rounded-xl p-4 text-left mb-6 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <span className="text-slate-400">Order ID</span>
                <span className="font-mono font-bold text-cyan-300">{submittedOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Game</span>
                <span className="font-semibold text-white">{submittedOrder.game}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Package</span>
                <span className="font-bold text-cyan-400">{submittedOrder.packageName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Player UID</span>
                <span className="font-mono font-bold text-white bg-slate-800/80 px-2 py-0.5 rounded">{submittedOrder.uid}</span>
              </div>
              {submittedOrder.server && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Server / Region</span>
                  <span className="text-slate-300 font-medium">{submittedOrder.server}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/60 text-base">
                <span className="font-semibold text-slate-300">Total Paid</span>
                <span className="font-black text-cyan-300">Rs. {submittedOrder.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                type="button"
                onClick={copyOrder}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border-0"
              >
                {copiedOrder ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copiedOrder ? 'Copied to Clipboard' : 'Copy Order Details'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer border-0"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Normal Multi-Step Form */
          <form onSubmit={handleConfirm} className="overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Step 1: Player ID & Server Region */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-black">1</span>
                  Enter Player ID / In-Game UID
                </label>
                {savedUids.length > 0 && (
                  <span className="text-[11px] text-cyan-400/80 flex items-center gap-1">
                    <User size={12} /> Saved IDs Available
                  </span>
                )}
              </div>

              {/* Quick Fill Chips */}
              {savedUids.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {savedUids.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPlayerUid(item.uid)
                        if (item.server) setServerRegion(item.server)
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="text-cyan-400 font-semibold">{item.game}:</span>
                      <span className="font-mono">{item.uid}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                    placeholder={
                      isFreeFire ? 'Enter Free Fire UID (e.g. 192837465)' :
                      isPubg ? 'Enter PUBG Character ID (e.g. 5123456789)' :
                      isMlbb ? 'Enter MLBB User ID (e.g. 12345678)' :
                      isGenshin ? 'Enter Genshin UID (e.g. 812345678)' :
                      'Enter your Player ID / Character UID'
                    }
                    className="w-full h-11 px-4 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white placeholder-slate-500 text-sm font-mono outline-none transition-colors"
                  />
                </div>

                <div>
                  {isPubg ? (
                    <select
                      value={serverRegion}
                      onChange={(e) => setServerRegion(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white text-xs outline-none"
                    >
                      <option>Global / Nepal</option>
                      <option>Middle East</option>
                      <option>Europe</option>
                      <option>North America</option>
                      <option>Asia</option>
                    </select>
                  ) : isFreeFire ? (
                    <select
                      value={serverRegion}
                      onChange={(e) => setServerRegion(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white text-xs outline-none"
                    >
                      <option>Nepal / India</option>
                      <option>Singapore</option>
                      <option>Global Region</option>
                    </select>
                  ) : isMlbb ? (
                    <input
                      type="text"
                      value={serverRegion}
                      onChange={(e) => setServerRegion(e.target.value)}
                      placeholder="Zone ID (4 digits)"
                      className="w-full h-11 px-4 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white placeholder-slate-500 text-sm font-mono outline-none"
                    />
                  ) : isGenshin ? (
                    <select
                      value={serverRegion}
                      onChange={(e) => setServerRegion(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white text-xs outline-none"
                    >
                      <option>Asia</option>
                      <option>America</option>
                      <option>Europe</option>
                      <option>TW/HK/MO</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={serverRegion}
                      onChange={(e) => setServerRegion(e.target.value)}
                      placeholder="Server / Region"
                      className="w-full h-11 px-4 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white placeholder-slate-500 text-sm font-mono outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <p className="flex items-center gap-1.5 text-slate-400 text-[11px] sm:text-xs">
                  <AlertCircle size={13} className="text-cyan-400 shrink-0" />
                  Find your UID in your in-game profile.
                </p>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveThisUid}
                    onChange={(e) => setSaveThisUid(e.target.checked)}
                    className="rounded border-slate-700 text-cyan-400 focus:ring-0"
                  />
                  Save ID for next time
                </label>
              </div>
            </div>

            {/* Step 2: Denomination Selector Cards */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-black">2</span>
                Select Recharge Pack
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {denominations.map((pkg) => {
                  const isSelected = selectedPack?.id === pkg.id
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPack(pkg)}
                      className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                          : 'border-slate-800 bg-[#12192b]/70 hover:border-slate-700 hover:bg-[#151d33]'
                      }`}
                    >
                      {pkg.badge && (
                        <span className={`absolute top-1.5 right-1.5 text-[9px] font-black uppercase px-1.5 py-0.2 rounded tracking-wider ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-300'
                        }`}>
                          {pkg.badge}
                        </span>
                      )}
                      <div className="pr-4">
                        <span className="font-bold text-white text-xs sm:text-sm block line-clamp-1">{pkg.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60">
                        <span className="text-cyan-300 font-extrabold text-xs sm:text-sm">Rs. {pkg.price.toLocaleString()}</span>
                        {isSelected && <Check size={14} className="text-cyan-400" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Payment Method Options */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-black">3</span>
                Select Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'eSewa', name: 'eSewa', sub: 'Instant Wallet' },
                  { id: 'Khalti', name: 'Khalti', sub: 'Instant Wallet' },
                  { id: 'Mobile Banking', name: 'Bank Transfer', sub: 'All Nepal Banks' }
                ].map((method) => {
                  const isSelected = paymentMethod === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 bg-[#12192b]/70 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-black text-xs sm:text-sm text-white">{method.name}</span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">{method.sub}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 4: Summary & Confirm Button */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="bg-[#121a2d] border border-cyan-500/20 rounded-xl p-3 sm:p-4 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Amount</span>
                  <span className="text-xl sm:text-2xl font-black text-cyan-400">
                    Rs. {(selectedPack?.price || product?.price || 0).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Package Selected</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {selectedPack?.name || 'Recharge'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!playerUid.trim()}
                className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer border-0"
              >
                <Zap size={18} className="fill-slate-950" />
                Confirm &amp; Recharge
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" />
                100% Authentic In-Game Delivery  0% Convenience Fee
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
