import React, { useState, useEffect } from 'react'
import { X, Check, ShoppingCart, Zap, ShieldCheck, Sparkles, Mail, MessageCircle, AlertCircle } from 'lucide-react'
import getCoverImage, { DEFAULT_FALLBACK_COVER } from '../utils/gameImages'

const GIFT_CARD_DENOMINATIONS = {
  roblox: [
    { id: 'rbx_400', name: '400 Robux', usd: '$5', price: 700, badge: 'Starter' },
    { id: 'rbx_800', name: '800 Robux', usd: '$10', price: 1350, badge: 'Popular' },
    { id: 'rbx_2000', name: '2000 Robux', usd: '$25', price: 3200, badge: 'Best Value' },
    { id: 'rbx_4500', name: '4500 Robux', usd: '$50', price: 7200, badge: 'Pro Bundle' }
  ],
  valorant: [
    { id: 'val_10', name: '$10 Gift Card (1,000 VP)', usd: '$10', price: 1450, badge: 'Popular' },
    { id: 'val_25', name: '$25 Gift Card (2,050 VP)', usd: '$25', price: 3600, badge: 'Battlepass' },
    { id: 'val_50', name: '$50 Gift Card (5,350 VP)', usd: '$50', price: 7100, badge: 'Skin Bundle' }
  ],
  discord: [
    { id: 'dc_basic', name: 'Nitro Basic (1 Month)', usd: '$3', price: 450 },
    { id: 'dc_boost', name: 'Nitro Boost (1 Month)', usd: '$10', price: 1450, badge: 'Popular' },
    { id: 'dc_boost_yr', name: 'Nitro Boost (1 Year)', usd: '$100', price: 14000, badge: 'Save 15%' }
  ],
  netflix: [
    { id: 'nf_std', name: 'Standard HD (1 Month)', usd: '$9', price: 1150 },
    { id: 'nf_prem', name: 'Premium 4K UHD (1 Month)', usd: '$11', price: 1450, badge: 'Best Quality' },
    { id: 'nf_prem_3m', name: 'Premium 4K UHD (3 Months)', usd: '$33', price: 4200, badge: 'Family Pack' }
  ],
  exitlag: [
    { id: 'el_1m', name: '1 Month Subscription', usd: '$9', price: 1200 },
    { id: 'el_3m', name: '3 Months Subscription', usd: '$24', price: 3200, badge: 'Popular' },
    { id: 'el_6m', name: '6 Months Subscription', usd: '$45', price: 5900, badge: 'Best Ping' }
  ],
  standard: [
    { id: 'gc_5', name: '$5 USD Card', usd: '$5', price: 750, badge: 'Starter' },
    { id: 'gc_10', name: '$10 USD Card', usd: '$10', price: 1450, badge: 'Most Popular' },
    { id: 'gc_20', name: '$20 USD Card', usd: '$20', price: 2850, badge: 'Best Value' },
    { id: 'gc_50', name: '$50 USD Card', usd: '$50', price: 7100, badge: 'High Roller' },
    { id: 'gc_100', name: '$100 USD Card', usd: '$100', price: 14000, badge: 'Ultimate' }
  ]
}

export default function GiftCardModal({ product, onClose, onAddToCart, onDirectCheckout }) {
  const [selectedDenom, setSelectedDenom] = useState(null)
  const [deliveryContact, setDeliveryContact] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addedAnimation, setAddedAnimation] = useState(false)

  const productName = product?.name || 'Digital Gift Card'
  const nameLower = productName.toLowerCase()

  const cardKey = nameLower.includes('roblox') ? 'roblox'
    : nameLower.includes('valorant') ? 'valorant'
    : nameLower.includes('discord') ? 'discord'
    : nameLower.includes('netflix') ? 'netflix'
    : nameLower.includes('exitlag') ? 'exitlag'
    : 'standard'

  const denominations = GIFT_CARD_DENOMINATIONS[cardKey] || GIFT_CARD_DENOMINATIONS.standard

  useEffect(() => {
    if (denominations.length > 0 && !selectedDenom) {
      setSelectedDenom(denominations[1] || denominations[0])
    }
  }, [cardKey])

  const unitPrice = selectedDenom ? selectedDenom.price : (product?.price || 1450)
  const totalPrice = unitPrice * quantity

  const createCustomizedItem = () => {
    return {
      ...product,
      id: `${product?.id || product?.sku || 'GC'}-${selectedDenom?.id || 'std'}-${Date.now()}`,
      name: `${productName} (${selectedDenom?.name || 'Voucher'})`,
      price: unitPrice,
      originalPrice: unitPrice,
      quantity: quantity,
      category: 'Gift Cards',
      deliveryType: 'Digital code delivery',
      deliveryContact: deliveryContact.trim(),
      selectedDenom: selectedDenom?.name,
      image: product?.image || getCoverImage(product)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const item = createCustomizedItem()
    if (onAddToCart) onAddToCart(item)
    setAddedAnimation(true)
    setTimeout(() => {
      setAddedAnimation(false)
      if (onClose) onClose()
    }, 600)
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    const item = createCustomizedItem()
    if (onDirectCheckout) {
      onDirectCheckout(item)
    } else if (onAddToCart) {
      onAddToCart(item)
      if (onClose) onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div 
        className="relative w-full sm:max-w-xl bg-[#0c1220] border-t sm:border border-cyan-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 bg-[#0f172a]/90 flex items-center justify-between shrink-0">
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
                  <Sparkles size={10} className="fill-cyan-400" /> Digital Voucher
                </span>
                <span className="text-[10px] text-slate-400">Instant Delivery</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight line-clamp-1 mt-0.5">{productName}</h2>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0"
            aria-label="Close Gift Card modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form */}
        <form className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Step 1: Select Denomination Cards/Pills */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-black">1</span>
                Select Card Denomination
              </label>
              <span className="text-xs text-cyan-400 font-mono">
                {selectedDenom ? `Rs. ${selectedDenom.price.toLocaleString()} NPR` : ''}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {denominations.map((pkg) => {
                const isSelected = selectedDenom?.id === pkg.id
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedDenom(pkg)}
                    className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[78px] ${
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
                    <div>
                      <span className="font-extrabold text-white text-xs sm:text-sm block line-clamp-1">{pkg.name}</span>
                      {pkg.usd && <span className="text-[11px] text-slate-400">{pkg.usd} Value</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60">
                      <span className="text-cyan-300 font-black text-xs sm:text-sm">Rs. {pkg.price.toLocaleString()}</span>
                      {isSelected && <Check size={14} className="text-cyan-400" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Delivery Email / WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-black">2</span>
              Delivery Email / WhatsApp (For Digital Code)
            </label>
            <div className="relative">
              <input
                type="text"
                value={deliveryContact}
                onChange={(e) => setDeliveryContact(e.target.value)}
                placeholder="Enter Email or WhatsApp (e.g. 98XXXXXXXX)"
                className="w-full h-11 px-4 rounded-xl bg-[#141b2d] border border-slate-700/80 focus:border-cyan-400 text-white placeholder-slate-500 text-base outline-none transition-colors"
              />
            </div>
            <p className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <AlertCircle size={13} className="text-cyan-400 shrink-0" />
              Digital voucher code &amp; activation guide will be sent immediately after payment.
            </p>
          </div>

          {/* Step 3: Quantity */}
          <div className="flex items-center justify-between bg-[#121a2d] border border-slate-800 rounded-xl px-4 py-3">
            <span className="text-xs sm:text-sm font-bold text-slate-300">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                -
              </button>
              <span className="font-mono font-bold text-base w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                +
              </button>
            </div>
          </div>

          {/* Pricing Summary & Buttons */}
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between bg-[#101728] border border-cyan-500/20 rounded-xl p-3 sm:p-4">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Amount</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Selected Pack</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {selectedDenom?.name || 'Voucher'} {quantity > 1 ? `x ${quantity}` : ''}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border-0 min-h-[46px]"
              >
                {addedAnimation ? <Check size={16} className="text-emerald-400" /> : <ShoppingCart size={16} />}
                {addedAnimation ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer border-0 min-h-[46px]"
              >
                <Zap size={16} className="fill-slate-950" />
                Instant Checkout
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              100% Genuine Digital Code Guarantee  Delivered via WhatsApp / Email
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
