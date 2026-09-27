import React, { Component, useEffect, useMemo, useState } from 'react'
import { parse } from 'csv-parse/browser/esm/sync'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Blocks,
  ChevronLeft,
  ChevronRight,
  CloudDownload,
  Check,
  CircleUserRound,
  CreditCard,
  Disc3,
  Gift,
  Gamepad2,
  Headphones,
  Heart,
  HelpCircle,
  Home,
  KeyRound,
  Menu,
  MessageCircle,
  MonitorPlay,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
  Zap,
} from 'lucide-react'
import productsCleanData from './data/products_clean.json'
import productCsv from '../sagarmatha_games_hgs_product_database.csv?raw'
import getCoverImage, { getCoverImage as namedGetCoverImage, DEFAULT_FALLBACK_COVER, FALLBACK_POSTER, getGameCover, getDynamicPlaceholder } from './utils/gameImages'
import GiftCardModal from './components/GiftCardModal'
import TopUpModal from './components/TopUpModal'
import Profile from './components/Profile'
import AuthModal, { DiscordIcon } from './components/AuthModal'
import { handleDiscordCallback, getSavedUser, logoutUser } from './utils/discordAuth'
import './App.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-center text-slate-400 border border-slate-800 rounded-xl my-2">
            <p className="text-rose-400 text-xs font-semibold mb-1">Item could not be displayed.</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

// Resilient product data initialization: prefer validated JSON, fallback to CSV parsing
let rawProductList = []

if (Array.isArray(productsCleanData) && productsCleanData.length > 0) {
  rawProductList = productsCleanData.map((row) => ({
    sku: row?.sku || '',
    name: row?.name || '',
    price: typeof row?.price === 'number' ? row.price : Number(row?.price) || 0,
    category: row?.category || 'Game Keys',
    deliveryType: row?.deliveryType || 'Digital',
    status: row?.status || 'Available',
    image: row?.image || '',
  }))
} else {
  try {
    rawProductList = parse(productCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }).map((row) => ({
      sku: row?.SKU || '',
      name: row?.['Product Name'] || '',
      price: Number(row?.['Sagarmatha Selling Price (NPR)']) || 0,
      category: row?.Category || 'Game Keys',
      deliveryType: row?.['Delivery Type'] || 'Digital',
      status: row?.['HGS Status'] || 'Available',
      image: '',
    }))
  } catch (err) {
    console.error("Failed to parse fallback CSV:", err)
    rawProductList = []
  }
}

const categoryOrder = [
  'Steam Private Account',
  'Steam Offline Games',
  'Game Top-Up',
  'Gift Cards',
  'Xbox',
  'PlayStation Digital',
  'Minecraft',
  'AI & Subscription',
  'Microsoft Online Games',
  'PlayStation Physical Disc',
  'Game Keys',
]

const categories = ['All products', ...categoryOrder]

function getProductPlatform(product) {
  const cat = product?.category || ''
  if (cat.startsWith('Steam')) return 'Steam'
  if (cat.startsWith('PlayStation')) return 'PlayStation'
  if (cat === 'Game Top-Up') return 'Mobile'
  if (cat === 'Gift Cards') return 'Gift Cards'
  if (cat === 'Microsoft Online Games') return 'Microsoft'
  if (cat === 'Xbox') return 'Xbox'
  if (cat === 'AI & Subscription') return 'Digital Services'
  return 'PC Games'
}

const categoryImages = {
  'Steam Private Account': 'photo-1511512578047-dfb367046420',
  'Steam Offline Games': 'photo-1542751371-adc38448a05e',
  'Game Top-Up': 'photo-1560253023-3ec5d502959f',
  'Gift Cards': 'photo-1493711662062-fa541adb3fc8',
  'PlayStation Physical Disc': 'photo-1605901309584-818e25960a8f',
  'PlayStation Digital': 'photo-1593305841991-05c297ba4575',
  Xbox: 'photo-1593305841991-05c297ba4575',
  'Microsoft Online Games': 'photo-1574629810360-7efbbe195018',
  'Game Keys': 'photo-1511512578047-dfb367046420',
  Minecraft: 'photo-1500375592092-40eb2168fd21',
  'AI & Subscription': 'photo-1677442136019-21780ecad995',
}

function getDeliveryBadge(product) {
  const cat = product?.category || ''
  const del = product?.deliveryType || ''
  if (cat === 'Steam Offline Games') return 'OFFLINE'
  if (cat === 'Steam Private Account') return 'PRIVATE ACCOUNT'
  if (cat === 'Game Top-Up') return 'TOP-UP'
  if (cat === 'PlayStation Physical Disc') return 'PHYSICAL'
  if (del.includes('code')) return 'DIGITAL CODE'
  if (cat === 'Game Keys') return 'GAME KEY'
  return 'DIGITAL'
}

const products = (Array.isArray(rawProductList) ? rawProductList : [])
  .filter((product) => Boolean(product && typeof product === 'object'))
  .map((product) => ({
    ...product,
    id: product?.sku || `prod-${Math.random()}`,
    sku: product?.sku || '',
    name: product?.name || 'Untitled Game',
    price: typeof product?.price === 'number' && !isNaN(product?.price) ? product.price : 0,
    category: product?.category || 'Game Keys',
    deliveryType: product?.deliveryType || 'Digital',
    status: product?.status || 'Available',
    oldPrice: null,
    badge: getDeliveryBadge(product),
    platform: getProductPlatform(product),
    image: getCoverImage(product),
    imageAlt: `${product?.name || 'Game'} artwork`,
    description: product?.deliveryType || 'Digital',
    delivery: product?.deliveryType || 'Digital',
    instructions: `Delivery method: ${product?.deliveryType || 'Digital'}. Follow the instructions provided with your order.`,
    credentials: 'Product details are provided after payment confirmation.',
  }))

const platformOptions = ['All platforms', ...new Set(products.map((product) => product?.platform).filter(Boolean))]

const formatPrice = (amount) => `Rs. ${(amount ?? 0).toLocaleString('en-IN')}`

const categoryIcons = {
  'Steam Private Account': CircleUserRound,
  'Steam Offline Games': CloudDownload,
  'Game Top-Up': CreditCard,
  'Gift Cards': Gift,
  'PlayStation Physical Disc': Disc3,
  Xbox: Gamepad2,
  'Microsoft Online Games': MonitorPlay,
  'PlayStation Digital': MonitorPlay,
  'Game Keys': KeyRound,
  Minecraft: Blocks,
  'AI & Subscription': Sparkles,
}

const categoryDisplayNames = {
  'Game Top-Up': 'Topup',
  'PlayStation Physical Disc': 'Playstation Disc',
}

function getCategoryCover(category) {
  if (category === 'Steam Private Account') {
    return products.find((product) => product?.name?.toLowerCase().includes('red dead redemption 2'))?.image
  }
  if (category === 'Steam Offline Games') {
    return 'https://cdn.zalient.shop/media/1788443952480_7d49bc4763bf71d1.webp'
  }
  return `https://images.unsplash.com/${categoryImages[category] || categoryImages['Steam Private Account']}?auto=format&fit=crop&w=600&q=80`
}

function ProductCard({ product, index, isWishlisted, onToggleWishlist, onAddToCart, onOpenTopUp, onOpenGiftCard }) {
  if (!product || typeof product !== 'object') return null
  const isSoldOut = product?.status === 'Sold Out'
  const isTopUp = product?.category === 'Game Top-Up' || product?.category === 'Topup' || product?.deliveryType === 'UID/Player ID digital top-up'
  const isGiftCard = product?.category === 'Gift Cards' || product?.name?.toLowerCase().includes('gift card')

  return (
    <article className={`product-card group flex flex-col justify-between h-full bg-[#111726]/70 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl p-2 sm:p-2.5 transition-all ${isSoldOut ? 'sold-out opacity-75' : ''}`} style={{ '--card-index': index }}>
      <div>
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#0e1422] shadow-inner">
          <img
            src={getCoverImage(product)}
            alt={product?.name || 'Game Cover'}
            className={`aspect-[2/3] object-cover w-full rounded-lg transition-transform duration-300 group-hover:scale-105 ${isSoldOut ? 'grayscale-[40%] opacity-90' : ''}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_FALLBACK_COVER;
            }}
          />
          {isSoldOut && (
            <span className="absolute top-1.5 right-1.5 bg-rose-600/90 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
              Sold Out
            </span>
          )}
          <button
            className={`absolute top-1.5 left-1.5 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer border-0 z-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] ${isWishlisted ? '!text-rose-500 !bg-rose-950/80' : ''}`}
            type="button"
            aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product?.name || 'item'} to wishlist`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleWishlist?.(product?.id)
            }}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="pt-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block truncate">{product?.category || ''}</span>
          <h3 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1 truncate leading-snug mt-0.5" title={product?.name || ''}>
            {product?.name || 'Untitled Product'}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/40 gap-1.5">
        <span className="text-xs sm:text-sm font-extrabold text-white truncate">{formatPrice(product?.price)}</span>
        <button
          type="button"
          className="px-2.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-all shrink-0 cursor-pointer min-h-[36px] sm:min-h-[38px] disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={product?.status !== 'Available'}
          onClick={() => {
            if (isGiftCard && onOpenGiftCard) {
              onOpenGiftCard(product)
            } else if (isTopUp && onOpenTopUp) {
              onOpenTopUp(product)
            } else {
              onAddToCart?.(product)
            }
          }}
        >
          {product?.status === 'Available' ? (
            isGiftCard ? (
              <><Sparkles size={12} className="fill-cyan-950" /> <span className="hidden xs:inline">Select</span></>
            ) : isTopUp ? (
              <><Zap size={12} className="fill-slate-950" /> Top Up</>
            ) : (
              <><Plus size={12} /> Add</>
            )
          ) : 'Sold'}
        </button>
      </div>
    </article>
  )
}

function ProductRail({ title, category, items, onAdd, onSeeAll, onOpenTopUp, onOpenGiftCard }) {
  if (!items || !items.length) return null

  return (
    <section className="home-product-row">
      <div className="row-heading">
        <div><span className="section-eyebrow">CURATED FOR YOU</span><h2>{title}</h2></div>
        <button type="button" onClick={() => onSeeAll?.(category)}>See all <ArrowRight size={15} /></button>
      </div>
      <div className="product-rail flex overflow-x-auto space-x-3.5 pb-2 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-6 md:space-x-0 md:gap-4 md:overflow-visible">
        {Array.isArray(items) && items.map((product, index) => {
          if (!product) return null
          const isTopUp = product?.category === 'Game Top-Up' || product?.category === 'Topup' || product?.deliveryType === 'UID/Player ID digital top-up'
          const isGiftCard = product?.category === 'Gift Cards' || product?.name?.toLowerCase().includes('gift card')
          return (
            <article className={`rail-product min-w-[155px] max-w-[165px] md:min-w-0 md:max-w-none flex-shrink-0 snap-start flex flex-col justify-between ${product?.status === 'Sold Out' ? 'sold-out' : ''}`} key={product?.sku || product?.id || index}>
              <div className="rail-cover" style={{ backgroundImage: `linear-gradient(180deg, rgba(7,9,14,.04), rgba(7,9,14,.72)), url("${getCoverImage(product)}")` }}>
                <span className="product-badge">{product?.badge || 'DIGITAL'}</span>
                <span className="rail-number">{product?.sku || ''}</span>
              </div>
              <div className="rail-product-info flex flex-col justify-between flex-1">
                <div>
                  <span>{product?.category || ''}</span>
                  <h3 className="line-clamp-2">{product?.name || 'Untitled'}</h3>
                </div>
                <div>
                  <strong>{formatPrice(product?.price)}</strong>
                  <button
                    type="button"
                    disabled={product?.status !== 'Available'}
                    aria-label={`Add ${product?.name || 'item'} to cart`}
                    onClick={() => {
                      if (isGiftCard && onOpenGiftCard) {
                        onOpenGiftCard(product)
                      } else if (isTopUp && onOpenTopUp) {
                        onOpenTopUp(product)
                      } else {
                        onAdd?.(product)
                      }
                    }}
                  >
                    {product?.status === 'Available' ? (
                      isGiftCard ? (
                        <Sparkles size={16} />
                      ) : isTopUp ? (
                        <Zap size={16} className="fill-current" />
                      ) : (
                        <Plus size={16} />
                      )
                    ) : 'Sold out'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'Shop', page: 'shop' },
  { label: 'Categories', page: 'categories' },
  { label: 'About', page: 'about' },
  { label: 'Blogs', page: 'blogs' },
]

const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase()
  return hash || 'home'
}

const slides = [
  {
    id: 1,
    badge: "FIFA WORLD CUP 2026",
    title: "EA SPORTS FC 26",
    subtitle: "BUY AT SAGARMATHA GAMING STORE AT BEST PRICE",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Order Now",
    link: "#shop"
  },
  {
    id: 2,
    badge: "EXCLUSIVE BENEFITS",
    title: "EA FC 26 SPECIAL EDITION",
    subtitle: "World Cup Mode • Online & Multiplayer • Instant Delivery • Private Account",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Shop",
    link: "#shop"
  },
  {
    id: 3,
    badge: "TOP-UPS & GIFT CARDS",
    title: "ROBLOX, STEAM & PSN",
    subtitle: "Instant Digital Delivery • Verified Nepali Payments (eSewa / Khalti)",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Browse Gift Cards",
    link: "#shop"
  }
]

function HeroCarousel({ onNavigateShop, setCurrentPage }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [activeSlideIndex])

  const handlePrevSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const handleNavigate = () => {
    window.location.hash = 'shop'
    if (setCurrentPage) setCurrentPage('shop')
    if (onNavigateShop) onNavigateShop()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentSlide = slides[activeSlideIndex]

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Side Featured Poster */}
        <div className="hidden lg:block lg:col-span-3">
          <div 
            onClick={handleNavigate}
            className="relative h-full min-h-[340px] rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl group cursor-pointer"
          >
            <img 
              src="/covers/god-of-war-ragnarok-ps5-disc-sealed.jpg" 
              alt="God of War Ragnarök" 
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/covers/default_poster.jpg"; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">SPECIAL RELEASE</span>
              <h3 className="text-white font-bold text-base leading-tight">God of War Ragnarök</h3>
            </div>
          </div>
        </div>

        {/* Center Auto & Manual Carousel Banner */}
        <div className="w-full lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl min-h-[220px] sm:min-h-[320px] md:min-h-[340px] flex flex-col justify-between bg-[#121829]">
          {/* Current Slide Display */}
          <div className="relative w-full h-full min-h-[220px] sm:min-h-[320px] md:min-h-[340px] flex items-center">
            <img 
              key={currentSlide.id}
              src={currentSlide.image} 
              alt={currentSlide.title} 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent/40 p-4 sm:p-7 md:p-8 flex flex-col justify-center max-w-[85%] sm:max-w-md z-10">
              <span className="text-cyan-400 text-[10px] sm:text-xs font-black tracking-widest uppercase mb-1">{currentSlide.badge}</span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-1 sm:mb-2 line-clamp-2">{currentSlide.title}</h2>
              <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-medium mb-3 sm:mb-4 leading-snug line-clamp-2 sm:line-clamp-none">{currentSlide.subtitle}</p>
              <a 
                href="#shop" 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate()
                }}
                className="inline-flex items-center justify-center w-fit px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer no-underline min-h-[38px] sm:min-h-[44px]"
              >
                {currentSlide.buttonText || "Buy at Best Price"}
              </a>
            </div>

            {/* Prev / Next Manual Arrows */}
            <button 
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 min-w-[34px] min-h-[34px] rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl flex items-center justify-center font-bold text-base sm:text-lg z-20 transition-transform active:scale-95 cursor-pointer"
            >
              ‹
            </button>
            <button 
              type="button"
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 min-w-[34px] min-h-[34px] rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl flex items-center justify-center font-bold text-base sm:text-lg z-20 transition-transform active:scale-95 cursor-pointer"
            >
              ›
            </button>

            {/* Slide Indicator Pills */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveSlideIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-0 p-0 ${activeSlideIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Featured Poster */}
        <div className="hidden lg:block lg:col-span-3">
          <div 
            onClick={handleNavigate}
            className="relative h-full min-h-[340px] rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl group cursor-pointer"
          >
            <img 
              src="/covers/gta-v-premium-edition-ps4-disc-sealed.jpg" 
              alt="Grand Theft Auto V" 
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/covers/default_poster.jpg"; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">BESTSELLER</span>
              <h3 className="text-white font-bold text-base leading-tight">Grand Theft Auto V</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(getSavedUser)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authNotice, setAuthNotice] = useState(null)

  useEffect(() => {
    const initDiscordAuth = async () => {
      const callbackUser = await handleDiscordCallback()
      const user = callbackUser || getSavedUser()
      if (user) {
        setCurrentUser(user)
        const pending = localStorage.getItem('pending_purchase')
        if (pending) {
          try {
            const data = JSON.parse(pending)
            localStorage.removeItem('pending_purchase')
            if (data.type === 'cart_checkout') {
              setCheckoutOpen(true)
              return
            } else if (data.type === 'topup' && data.product) {
              setTopUpModalProduct(data.product)
              return
            }
          } catch (e) {
            console.error('Error resuming purchase:', e)
          }
        }
        if (callbackUser) {
          window.location.hash = 'profile'
          setCurrentPage('profile')
        }
      }
    }
    initDiscordAuth()
  }, [])

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.global_name || currentUser.username || '')
      if (!email && currentUser.email) setEmail(currentUser.email)
    }
  }, [currentUser])

  
  const requireLoginForAction = (noticeMessage, pendingData) => {
    if (pendingData) {
      localStorage.setItem('pending_purchase', JSON.stringify(pendingData))
    }
    setAuthNotice(noticeMessage || "Please log in with Discord to complete your order and track your vouchers.")
    setAuthModalOpen(true)
  }

  const handleUserLogout = () => {
    logoutUser()
    setCurrentUser(null)
  }
  const [activeCategory, setActiveCategory] = useState('All products')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [draftCategory, setDraftCategory] = useState('All products')
  const [appliedCategory, setAppliedCategory] = useState('All products')
  const [draftPlatform, setDraftPlatform] = useState('All platforms')
  const [appliedPlatform, setAppliedPlatform] = useState('All platforms')
  const [draftMinPrice, setDraftMinPrice] = useState(0)
  const [appliedMinPrice, setAppliedMinPrice] = useState(0)
  const [draftMaxPrice, setDraftMaxPrice] = useState(15000)
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(15000)
  const [catalogPage, setCatalogPage] = useState(1)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [topUpModalProduct, setTopUpModalProduct] = useState(null)
  const [giftCardModalProduct, setGiftCardModalProduct] = useState(null)

  const handleOpenTopUp = (prod) => {
    setTopUpModalProduct(prod)
  }

  const handleOpenGiftCard = (prod) => {
    setGiftCardModalProduct(prod)
  }
  const [paymentMethod, setPaymentMethod] = useState('eSewa')
  const [playerUid, setPlayerUid] = useState('')
  const [serverId, setServerId] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryZone, setDeliveryZone] = useState('Inside Valley')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const syncHash = () => setCurrentPage(getPageFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const allFilteredProducts = useMemo(() => {
    const query = (searchTerm || '').trim().toLowerCase()
    const results = (Array.isArray(products) ? products : []).filter((product) => {
      if (!product) return false
      const pCategory = product?.category || ''
      const pName = product?.name || ''
      const pSku = product?.sku || ''
      const pDelivery = product?.deliveryType || ''
      const pPlatform = product?.platform || ''
      const pPrice = typeof product?.price === 'number' ? product.price : 0

      const matchesCategory = (activeCategory === 'All products' || pCategory === activeCategory)
        && (appliedCategory === 'All products' || pCategory === appliedCategory)
      const matchesQuery = !query || `${pName} ${pSku} ${pCategory} ${pDelivery}`.toLowerCase().includes(query)
      const matchesWishlist = !wishlistOnly || (Array.isArray(wishlist) && wishlist.includes(product?.id))
      const matchesPlatform = appliedPlatform === 'All platforms' || pPlatform === appliedPlatform
      const matchesPrice = pPrice >= appliedMinPrice && pPrice <= appliedMaxPrice
      return matchesCategory && matchesQuery && matchesWishlist && matchesPlatform && matchesPrice
    })
    const direction = sortOrder === 'asc' ? 1 : -1
    if (sortBy === 'price') {
      results.sort((first, second) => ((first?.price ?? 0) - (second?.price ?? 0)) * direction)
    } else {
      results.sort((first, second) => {
        const sku1 = Number(String(first?.sku || '').replace(/\D/g, '')) || 0
        const sku2 = Number(String(second?.sku || '').replace(/\D/g, '')) || 0
        return (sku1 - sku2) * direction
      })
    }
    return results
  }, [activeCategory, appliedCategory, appliedMaxPrice, appliedMinPrice, appliedPlatform, searchTerm, sortBy, sortOrder, wishlist, wishlistOnly])

  const pageSize = 12
  const filteredProducts = allFilteredProducts.slice((catalogPage - 1) * pageSize, catalogPage * pageSize)
  const pageCount = Math.max(1, Math.ceil(allFilteredProducts.length / pageSize))
  const paginationPages = Array.from(
    { length: Math.min(3, pageCount) },
    (_, index) => Math.min(Math.max(catalogPage - 1, 1), Math.max(pageCount - 2, 1)) + index,
  )

  const cartCount = cart.reduce((total, item) => total + (item?.quantity ?? 0), 0)
  const subtotal = cart.reduce((total, item) => total + (item?.price ?? 0) * (item?.quantity ?? 0), 0)
  const isPhysicalItem = (item) =>
    item?.category === 'PlayStation Physical Disc' ||
    item?.category?.toLowerCase().includes('physical') ||
    item?.deliveryType?.toLowerCase().includes('physical')

  const hasPhysicalDisc = cart.some(isPhysicalItem)
  const hasTopUp = cart.some((item) => item?.category === 'Game Top-Up' || item?.category === 'Topup' || item?.deliveryType === 'UID/Player ID digital top-up')
  const isOnlyDigital = cart.length > 0 && !hasPhysicalDisc
  const homeRows = [
    { title: 'Best Selling', category: 'Steam Private Account', items: products.filter((product) => product?.category === 'Steam Private Account').slice(0, 6) },
    { title: 'Steam Offline Games', category: 'Steam Offline Games', items: products.filter((product) => product?.category === 'Steam Offline Games').slice(0, 4) },
    { title: 'Giftcards', category: 'Gift Cards', items: products.filter((product) => product?.category === 'Gift Cards').slice(0, 4) },
    { title: 'Topup', category: 'Game Top-Up', items: products.filter((product) => product?.category === 'Game Top-Up').slice(0, 4) },
    { title: 'Newly Added', category: 'All products', items: [...products].reverse().slice(0, 4) },
  ]

  function toggleWishlist(productId) {
    setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  function openShop(category = 'All products') {
    window.location.hash = 'shop'
    setCurrentPage('shop')
    setActiveCategory(category)
    setWishlistOnly(false)
    setSearchTerm('')
    setCatalogPage(1)
    setAppliedCategory('All products')
    setDraftCategory(category)
    setAppliedPlatform('All platforms')
    setDraftPlatform('All platforms')
    setDraftMinPrice(0)
    setAppliedMinPrice(0)
    setAppliedMaxPrice(15000)
    setDraftMaxPrice(15000)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function applyShopFilters() {
    setActiveCategory('All products')
    setWishlistOnly(false)
    setAppliedCategory(draftCategory)
    setAppliedPlatform(draftPlatform)
    setAppliedMinPrice(draftMinPrice)
    setAppliedMaxPrice(draftMaxPrice)
    setCatalogPage(1)
  }

  function resetShopFilters() {
    setActiveCategory('All products')
    setSearchTerm('')
    setWishlistOnly(false)
    setDraftCategory('All products')
    setAppliedCategory('All products')
    setDraftPlatform('All platforms')
    setAppliedPlatform('All platforms')
    setDraftMinPrice(0)
    setAppliedMinPrice(0)
    setDraftMaxPrice(15000)
    setAppliedMaxPrice(15000)
    setCatalogPage(1)
  }

  function updateQuantity(productId, change) {
    setCart((currentCart) => currentCart
      .map((item) => item?.id === productId ? { ...item, quantity: (item?.quantity || 1) + change } : item)
      .filter((item) => (item?.quantity || 0) > 0))
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item?.id !== productId))
  }

  function addToCart(product) {
    if (product?.status !== 'Available') return
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item?.id === product?.id)
      if (existing) return currentCart.map((item) => item?.id === product?.id ? { ...item, quantity: (item?.quantity || 1) + 1 } : item)
      return [...currentCart, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function submitOrder(event) {
    event.preventDefault()
    const orderNumber = `SGS-${Math.floor(10000 + Math.random() * 90000)}`
    const orderData = {
      orderNumber,
      items: [...cart],
      paymentMethod,
      playerUid: hasTopUp ? playerUid : '',
      serverId: hasTopUp ? serverId : '',
      shippingAddress: hasPhysicalDisc ? shippingAddress : '',
      deliveryZone: hasPhysicalDisc ? deliveryZone : '',
      customerName,
      phoneNumber,
      email,
    }
    setOrder(orderData)

    // Save to gamer_orders in localStorage so Profile updates dynamically
    try {
      const existingOrders = JSON.parse(localStorage.getItem('gamer_orders') || '[]')
      const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      const orderTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      const newGamerOrders = cart.map((item, idx) => {
        const isDigital = item?.category === 'Gift Cards' || item?.category === 'Game Keys' || item?.deliveryType?.toLowerCase().includes('digital')
        const randomCode = isDigital ? `SG-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}` : null

        return {
          orderId: `${orderNumber}${cart.length > 1 ? `-${idx + 1}` : ''}`,
          date: orderDate,
          time: orderTime,
          game: item?.name || 'Game Order',
          item: item?.name || 'Game Order',
          packageName: item?.category || 'Standard',
          amount: (item?.price || 0) * (item?.quantity || 1),
          redeemCode: randomCode,
          uid: hasTopUp ? playerUid : '',
          server: hasTopUp ? serverId : '',
          paymentMethod,
          status: 'Completed',
          deliveryType: item?.deliveryType || 'Digital',
          image: item?.image || getCoverImage(item)
        }
      })

      const userKey = currentUser?.id ? `gamer_orders_${currentUser.id}` : 'gamer_orders_guest'
      const existingUserOrders = JSON.parse(localStorage.getItem(userKey) || '[]')
      localStorage.setItem(userKey, JSON.stringify([...newGamerOrders, ...existingUserOrders]))
      localStorage.setItem('gamer_orders', JSON.stringify([...newGamerOrders, ...existingOrders]))

      if (hasTopUp && playerUid.trim()) {
        const existingUids = JSON.parse(localStorage.getItem('saved_player_ids') || '[]')
        if (!existingUids.some(u => u.uid === playerUid.trim())) {
          const gameItem = cart.find(i => i.category === 'Game Top-Up' || i.category === 'Topup')
          const updatedUids = [
            {
              id: Date.now(),
              game: gameItem?.name || 'Game Top-Up',
              uid: playerUid.trim(),
              server: serverId.trim(),
              nickname: customerName || 'My Account'
            },
            ...existingUids
          ]
          localStorage.setItem('saved_player_ids', JSON.stringify(updatedUids))
        }
      }
    } catch (e) {
      console.error('Failed to save order to localStorage:', e)
    }

    setCart([])
    setPlayerUid('')
    setServerId('')
    setShippingAddress('')
    setEmail('')
    setDeliveryZone('Inside Valley')
    setCheckoutOpen(false)
    setCartOpen(false)
    setConfirmationOpen(true)
  }

  return (
    <main className={`store-shell view-${currentPage} overflow-x-hidden w-full max-w-full pb-20 md:pb-0`}>
      <div className="mini-banner hidden sm:flex">
        <span className="currency-mark">Rs <b>NPR</b></span>
        <span className="delivery-notice">Instant digital delivery <i /> pay your way <i /> 100% authentic codes</span>
        <div>
          <a
            href="#faq"
            onClick={() => {
              window.location.hash = 'faq'
              setCurrentPage('faq')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Help &amp; FAQ
          </a>
          <button type="button" onClick={() => { openShop(); setWishlistOnly(true) }}>Wishlist</button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside 
            className="w-[82%] max-w-xs bg-[#0b0f19] border-r border-cyan-500/20 h-full flex flex-col justify-between p-5 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img src="/sagarmatha-games-logo.svg" alt="Sagarmatha" className="h-8 w-auto" />
                  <span className="font-extrabold text-base text-white tracking-wider uppercase">Sagarmatha</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#13192b] border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Drawer Auth Bar */}
              <div className="py-3 border-b border-slate-800/80">
                {currentUser ? (
                  <div className="flex items-center justify-between gap-3 bg-[#12192b] p-2.5 rounded-xl border border-cyan-500/30">
                    <div 
                      className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                      onClick={() => {
                        window.location.hash = 'profile'
                        setCurrentPage('profile')
                        setMobileMenuOpen(false)
                      }}
                    >
                      <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400 shrink-0">
                        <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute top-0 right-0 border border-black" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">{currentUser.global_name || currentUser.username}</span>
                        <span className="text-[10px] text-cyan-400 flex items-center gap-1"><DiscordIcon size={10} /> Discord Verified</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleUserLogout}
                      className="text-[11px] text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setAuthModalOpen(true)
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border-0 shadow-md shadow-[#5865F2]/20"
                  >
                    <DiscordIcon size={16} />
                    <span>Sign In with Discord</span>
                  </button>
                )}
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400/80 px-3">Navigation</span>
                {navItems.map(({ label, page }) => (
                  <a
                    key={page}
                    href={`#${page}`}
                    onClick={() => {
                      window.location.hash = page
                      setCurrentPage(page)
                      setMobileMenuOpen(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors no-underline ${
                      currentPage === page ? 'bg-cyan-500/15 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{label}</span>
                    <ArrowRight size={14} className="text-slate-500" />
                  </a>
                ))}
              </div>

              <div className="py-3 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400/80 px-3">Quick Platforms</span>
                {['Game Top-Up', 'Gift Cards', 'Steam Private Account', 'PlayStation Digital'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      openShop(cat)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer text-left"
                  >
                    <span>{categoryDisplayNames[cat] || cat}</span>
                    <span className="text-[10px] text-cyan-400">Shop →</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('WhatsApp support will be available soon!')
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs no-underline min-h-[44px] cursor-pointer"
              >
                <MessageCircle size={15} /> WhatsApp Support
              </a>
              <p className="text-[10px] text-slate-500 text-center">© 2026 Sagarmatha Gaming Store</p>
            </div>
          </aside>
        </div>
      )}

      <header className="w-full flex items-center justify-between px-3 py-2.5 max-w-full overflow-hidden bg-[#0b0f19]/90 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
        {/* Left side: Hamburger + Logo + SAGARMATHA (hidden on mobile) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-white shrink-0 cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu size={18} />
          </button>

          <a 
            href="#home" 
            onClick={() => { window.location.hash = 'home'; setCurrentPage('home'); }}
            className="flex items-center gap-2 group shrink-0 no-underline"
          >
            <img 
              src="/sagarmatha-games-logo.svg" 
              alt="Sagarmatha Gaming Store" 
              className="w-8 h-8 object-contain shrink-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]" 
            />
            <span className="hidden sm:inline font-bold tracking-wider text-white text-base leading-none">
              SAGARMATHA
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex bg-[#13192b]/80 border border-slate-800 rounded-full px-5 py-2 items-center gap-6 shrink-0"
          aria-label="Main navigation"
        >
          {navItems.map(({ label, page }) => {
            const isActive = currentPage === page
            return (
              <a
                key={page}
                href={`#${page}`}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 cursor-pointer no-underline ${
                  isActive
                    ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : 'text-slate-300'
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-3 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={15} />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setActiveCategory('All products')
              setWishlistOnly(false)
              setCatalogPage(1)
              if (window.location.hash !== '#shop') {
                window.location.hash = 'shop'
              }
            }}
            placeholder="Search games, top-ups..."
            className="w-full bg-[#13192b]/70 border border-slate-800/90 rounded-full py-2 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
            aria-label="Search games, gift cards, subscriptions..."
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer p-1"
              aria-label="Clear search"
              onClick={() => {
                setSearchTerm('')
                setCatalogPage(1)
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Right side: Search, Wishlist, Discord/Profile, and Cart (desktop only) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          {/* Mobile search button */}
          <button
            type="button"
            className="md:hidden w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-white shrink-0 cursor-pointer transition-colors"
            aria-label="Search products"
            onClick={() => {
              setMobileSearchOpen((prev) => !prev)
              if (currentPage !== 'shop') {
                window.location.hash = 'shop'
                setCurrentPage('shop')
              }
            }}
          >
            <Search size={16} />
          </button>

          {/* Wishlist button */}
          <button
            type="button"
            className="w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-white hover:border-slate-700 shrink-0 cursor-pointer transition-colors"
            aria-label="Toggle wishlist"
            aria-pressed={wishlistOnly}
            onClick={() => {
              const nextValue = !wishlistOnly
              openShop()
              setWishlistOnly(nextValue)
            }}
          >
            <Heart size={16} fill={wishlistOnly ? 'currentColor' : 'none'} className={wishlistOnly ? 'text-rose-500' : ''} />
          </button>

          {/* Profile / Discord button */}
          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                window.location.hash = 'profile'
                setCurrentPage('profile')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`relative w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 shrink-0 overflow-hidden transition-all cursor-pointer ${
                currentPage === 'profile'
                  ? '!border-cyan-400 ring-2 ring-cyan-400/40'
                  : 'hover:border-cyan-400'
              }`}
              aria-label={`Logged in as ${currentUser.global_name || currentUser.username}`}
              title={`${currentUser.global_name || currentUser.username} (View Profile)`}
            >
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.global_name || currentUser.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = "https://cdn.discordapp.com/embed/avatars/0.png"
                }}
              />
              <span className="w-2 h-2 bg-emerald-500 border border-[#0b0f19] rounded-full absolute top-0.5 right-0.5" title="Online" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setAuthNotice("Please log in with Discord to access your profile and order history.")
                setAuthModalOpen(true)
              }}
              className="w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-white shrink-0 overflow-hidden transition-all cursor-pointer"
              aria-label="Sign in with Discord"
              title="Sign in with Discord"
            >
              <DiscordIcon size={16} />
            </button>
          )}

          {/* Top Cart Button: hidden on mobile, only flex on desktop */}
          <button
            type="button"
            className="hidden md:flex px-3.5 py-2 rounded-xl items-center gap-2 shrink-0 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer border-0 h-9"
            aria-label={`Open cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={16} />
            <span className="font-bold">Cart</span>
            <span className="bg-slate-950 text-cyan-300 text-xs px-2 py-0.5 rounded-full font-black min-w-[18px] text-center leading-tight">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Expandable Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-[#0c1220] border-b border-slate-800 px-3 py-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-150 sticky top-[57px] z-40">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={14} />
            <input
              type="search"
              autoFocus
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setActiveCategory('All products')
                setWishlistOnly(false)
                setCatalogPage(1)
                if (window.location.hash !== '#shop') {
                  window.location.hash = 'shop'
                }
              }}
              placeholder="Search games, gift cards, top-ups..."
              className="w-full bg-[#13192b] border border-slate-700/80 rounded-lg py-1.5 pl-8 pr-7 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer p-0.5"
                onClick={() => {
                  setSearchTerm('')
                  setCatalogPage(1)
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1.5 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Featured Hero Banner Carousel */}
      {currentPage === 'home' && <HeroCarousel onNavigateShop={openShop} setCurrentPage={setCurrentPage} />}

      {/* Category Section */}
      {currentPage !== 'profile' && (
      <section className="category-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">PICK YOUR PLATFORM</span>
            <h2>{currentPage === 'categories' ? 'All Categories' : 'Top this week'}<span>.</span></h2>
            {currentPage === 'categories' && <p className="category-intro">Find the perfect digital gift cards, top-up or games for you.</p>}
          </div>
          <button
            type="button"
            className="view-all"
            onClick={() => {
              if (currentPage === 'categories') {
                openShop()
              } else {
                window.location.hash = 'categories'
                setCurrentPage('categories')
                setActiveCategory('All products')
                setWishlistOnly(false)
                setSearchTerm('')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            {currentPage === 'categories' ? 'See all products' : 'See all'} <ArrowRight size={15} />
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-3 snap-x pb-3 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-3 md:overflow-visible">
          {categoryOrder.map((category) => {
            const Icon = categoryIcons[category] || Gamepad2
            const count = products.filter((product) => product?.category === category).length
            return (
              <button
                className="quick-category shrink-0 snap-start min-w-[210px] md:min-w-0 min-h-[64px] flex items-center justify-between p-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-[#0f1627] text-left transition-all cursor-pointer relative overflow-hidden group"
                style={{ backgroundImage: `linear-gradient(90deg, rgba(11,15,25,.96), rgba(11,15,25,.7)), url("${getCategoryCover(category)}")` }}
                type="button"
                key={category}
                onClick={() => openShop(category)}
              >
                <span className="quick-category-icon"><Icon size={19} /></span>
                <span className="quick-category-copy">
                  <strong>{categoryDisplayNames[category] || category}</strong>
                  <small>{count} products</small>
                </span>
                <ArrowRight size={15} />
              </button>
            )
          })}
        </div>
      </section>
      )}

      {/* Profile View */}
      {currentPage === 'profile' && (
        !currentUser ? (
          <div className="max-w-md mx-auto my-12 p-8 bg-[#0e1629] border border-cyan-500/30 rounded-2xl text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/50 text-[#5865F2] flex items-center justify-center shadow-lg shadow-[#5865F2]/20">
              <DiscordIcon size={34} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Sign In Required</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
                Please log in with Discord to view your account, order vouchers, and saved game UIDs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAuthNotice("Please log in with Discord to access your profile and order history.")
                setAuthModalOpen(true)
              }}
              className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#5865F2]/30 cursor-pointer border-0"
            >
              <DiscordIcon size={20} />
              <span>Login with Discord</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.hash = 'home'
                setCurrentPage('home')
              }}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
            >
              ← Back to Store
            </button>
          </div>
        ) : (
          <Profile
            currentUser={currentUser}
            onLogout={handleUserLogout}
            onOpenLogin={() => setAuthModalOpen(true)}
            onClose={() => {
              window.location.hash = 'home'
              setCurrentPage('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onOpenTopUp={handleOpenTopUp}
            onNavigateShop={openShop}
          />
        )
      )}

      {/* Home View */}
      {currentPage === 'home' && (
        <>
          {homeRows.slice(0, 4).map((row) => (
            <ProductRail key={row.title} {...row} onAdd={addToCart} onSeeAll={openShop} onOpenTopUp={handleOpenTopUp} onOpenGiftCard={handleOpenGiftCard} />
          ))}
          <section className="bundle-promo w-full rounded-xl p-4 sm:p-6 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="bundle-copy">
              <span className="section-eyebrow">THE ULTIMATE LIBRARY</span>
              <h2 className="text-lg sm:text-2xl font-bold">Steam Bundle<br />220+ Games</h2>
              <p>One massive collection. Hundreds of ways to play.</p>
              <button type="button" onClick={() => openShop('Steam Offline Games')}>
                Explore Steam Offline <ArrowRight size={15} />
              </button>
            </div>
            <div className="bundle-art">
              <div className="bundle-cover-stack" aria-label="Featured games in the collection">
                {products.filter((product) => product?.category === 'Steam Offline Games').slice(0, 4).map((product, index) => (
                  <div key={product?.sku || product?.id || index} title={product?.name || ''} style={{ backgroundImage: `url("${getCoverImage(product)}")` }} />
                ))}
              </div>
              <div className="bundle-art-type"><span>220+</span><b>GAMES</b><i>STEAM COLLECTION</i></div>
            </div>
          </section>
          <section className="fc27-promo w-full rounded-xl p-4 sm:p-6 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="section-eyebrow">NEXT SEASON. NEXT LEVEL.</span>
              <h2 className="text-lg sm:text-2xl font-bold">EA SPORTS FC 27 Standard Edition</h2>
              <p>New Steam account · Online &amp; Multiplayer · Instant delivery</p>
              <button type="button" onClick={() => { openShop(); setSearchTerm('EA SPORTS FC 27') }}>
                Explore FC 27 <ArrowRight size={15} />
              </button>
            </div>
            <span className="fc27-mark">FC<span>27</span></span>
          </section>
          <ProductRail {...homeRows[4]} onAdd={addToCart} onSeeAll={openShop} onOpenTopUp={handleOpenTopUp} onOpenGiftCard={handleOpenGiftCard} />
          <section className="feature-perks">
            <div><CloudDownload size={20} /><span><strong>Instant Delivery</strong><small>Digital products, delivered fast</small></span></div>
            <div><Check size={20} /><span><strong>100% Authentic</strong><small>Genuine codes and accounts</small></span></div>
            <div><CreditCard size={20} /><span><strong>eSewa &amp; Khalti</strong><small>Pay with trusted local methods</small></span></div>
            <div><MessageCircle size={20} /><span><strong>24/7 Support</strong><small>WhatsApp help when you need it</small></span></div>
          </section>
        </>
      )}

      {/* About View */}
      {currentPage === 'about' && (
        <section className="about-page">
          <header className="about-hero">
            <span className="section-eyebrow">PLAY LOCAL. PLAY MORE.</span>
            <h1>About Us <span>— Sagarmatha Gaming Store</span></h1>
            <p>Nepal’s verified gaming hub for PC, PlayStation, Xbox, and mobile top-ups with instant delivery.</p>
          </header>
          <div className="about-columns">
            <article className="about-mission">
              <span className="section-eyebrow">OUR MISSION</span>
              <h2>Make gaming easier to access across Nepal.</h2>
              <p>Sagarmatha Gaming Store brings players authentic games, gift cards, digital codes, and mobile top-ups in one place. We focus on clear product details, trusted local payment choices, and dependable delivery, so players can get into their next game with confidence.</p>
              <p>From your first Steam Wallet code to a new PlayStation release, our team is here to help you choose, purchase, and get started.</p>
            </article>
            <aside className="reach-card">
              <span className="section-eyebrow">REACH US</span>
              <h2>We’re here to help.</h2>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  alert('WhatsApp support will be available soon!')
                }}
              >
                <MessageCircle size={17} />
                <span><small>WHATSAPP / PHONE</small>+977 ----------</span>
              </a>
              <a href="mailto:support@sagarmathagamingstore.com"><span className="reach-icon">@</span><span><small>SUPPORT EMAIL</small>support@sagarmathagamingstore.com</span></a>
              <div className="operating-hours"><small>OPERATING HOURS (NPT)</small><strong>10:00 AM – 11:00 PM</strong><span>Every day</span></div>
            </aside>
          </div>
          <div className="about-stats">
            <div><strong>5+</strong><span>Years in Business</span></div>
            <div><Headphones size={21} /><strong>24/7</strong><span>Customer Support</span></div>
            <div><CloudDownload size={21} /><strong>⚡</strong><span>Fast Digital Delivery</span></div>
          </div>
        </section>
      )}

      {/* FAQ View */}
      {currentPage === 'faq' && (
        <section className="faq-page">
          <header className="faq-hero">
            <span className="section-eyebrow">HELP &amp; QUESTIONS</span>
            <h1>Frequently Asked <span>Questions</span></h1>
            <p>Everything you need to know about purchasing games, gift cards, and top-ups at Sagarmatha Gaming Store.</p>
          </header>
          <div className="faq-grid">
            <article className="faq-card">
              <h3><Sparkles size={18} /> How do I receive my digital keys &amp; accounts?</h3>
              <p>After your payment is confirmed, credentials and activation keys are delivered directly to your WhatsApp number and email within minutes.</p>
            </article>
            <article className="faq-card">
              <h3><CreditCard size={18} /> What payment methods do you accept?</h3>
              <p>We accept eSewa, Khalti, ConnectIPS, and direct Bank Transfer for all orders throughout Nepal.</p>
            </article>
            <article className="faq-card">
              <h3><CloudDownload size={18} /> How do Steam Offline games work?</h3>
              <p>You receive an authentic Steam account with the game already purchased. You download the game from official Steam servers and switch to offline mode to play without restrictions.</p>
            </article>
            <article className="faq-card">
              <h3><Disc3 size={18} /> Do you deliver PlayStation physical discs outside the Valley?</h3>
              <p>Yes! We deliver original PS4 and PS5 sealed and pre-owned game discs across all 77 districts in Nepal via courier.</p>
            </article>
            <article className="faq-card">
              <h3><ShieldCheck size={18} /> Are the digital codes 100% genuine?</h3>
              <p>Yes, all codes, Steam Wallet cards, and subscriptions are 100% genuine and authentic with guaranteed activation or replacement.</p>
            </article>
            <article className="faq-card">
              <h3><HelpCircle size={18} /> What if I need assistance after purchasing?</h3>
              <p>Our dedicated support team is available 24/7 on WhatsApp (+977 ----------) and email to help with setup, activation, and troubleshooting.</p>
            </article>
          </div>
        </section>
      )}

      {/* Contact View */}
      {currentPage === 'contact' && (
        <section className="about-page">
          <header className="about-hero">
            <span className="section-eyebrow">GET IN TOUCH</span>
            <h1>Contact Us <span>— Sagarmatha Gaming Store</span></h1>
            <p>Have questions about your order or need instant gaming support? We’re always here to help.</p>
          </header>
          <div className="about-columns">
            <article className="about-mission">
              <span className="section-eyebrow">24/7 SUPPORT</span>
              <h2>Fast assistance via WhatsApp and Email.</h2>
              <p>Our support team is available around the clock to assist you with game activations, top-up delivery, account credentials, and general questions.</p>
              <p>Reach out directly with your Order ID or Player UID for priority handling.</p>
            </article>
            <aside className="reach-card">
              <span className="section-eyebrow">REACH US</span>
              <h2>Direct Support Channels</h2>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  alert('WhatsApp support will be available soon!')
                }}
              >
                <MessageCircle size={17} />
                <span><small>WHATSAPP / PHONE</small>+977 ----------</span>
              </a>
              <a href="mailto:support@sagarmathagamingstore.com">
                <span className="reach-icon">@</span>
                <span><small>SUPPORT EMAIL</small>support@sagarmathagamingstore.com</span>
              </a>
              <div className="operating-hours">
                <small>OPERATING HOURS (NPT)</small>
                <strong>10:00 AM – 11:00 PM</strong>
                <span>Every day</span>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Blogs View */}
      {currentPage === 'blogs' && (
        <section className="blogs-page">
          <header className="blogs-heading">
            <span className="section-eyebrow">GUIDES &amp; NEWS</span>
            <h1>Gaming <span>News &amp; Tips</span></h1>
            <p>Expert guides on game activations, account setup, top-ups, and the latest releases in Nepal.</p>
          </header>

          <article className="featured-article">
            <div className="article-art">
              <span>SAGARMATHA</span>
              <strong>PC</strong>
              <i>STEAM GUIDE</i>
            </div>
            <div className="featured-article-copy">
              <span className="article-label">FEATURED TUTORIAL</span>
              <h2>How to Play Steam Offline Games Without Interruption</h2>
              <p>
                Step-by-step setup guide for Steam Offline accounts in Nepal. Learn how to switch offline mode safely, preserve save data, and update games without losing account access.
              </p>
              <button type="button" onClick={() => openShop('Steam Offline Games')}>
                Explore Steam Offline Games <ArrowRight size={15} />
              </button>
            </div>
          </article>

          <div className="blog-card-grid">
            <article className="blog-card">
              <div
                className="blog-card-art"
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(11,15,25,.3), rgba(11,15,25,.9)), url("https://cdn.zalient.shop/media/1780094018222_25f1307ad1884db0.webp")',
                }}
              >
                <span>FOOTBALL &amp; ESPORTS</span>
              </div>
              <div>
                <h2>EA Sports FC 26: What to Expect &amp; Pre-Order Perks</h2>
                <p>Everything you need to know about the upcoming football season, Ultimate Team changes, and getting your pre-order early in Nepal.</p>
                <button type="button" onClick={() => openShop('Steam Private Account')}>Read more <ArrowRight size={14} /></button>
              </div>
            </article>

            <article className="blog-card">
              <div
                className="blog-card-art"
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(11,15,25,.3), rgba(11,15,25,.9)), url("https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80")',
                }}
              >
                <span>PAYMENT METHODS</span>
              </div>
              <div>
                <h2>Fast Game Top-Ups with eSewa &amp; Khalti</h2>
                <p>Learn how to safely top up Free Fire diamonds, PUBG UC, Mobile Legends, and Valorant Points instantly using local Nepali wallets.</p>
                <button type="button" onClick={() => openShop('Game Top-Up')}>Read more <ArrowRight size={14} /></button>
              </div>
            </article>

            <article className="blog-card">
              <div
                className="blog-card-art"
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(11,15,25,.3), rgba(11,15,25,.9)), url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80")',
                }}
              >
                <span>CRICKET</span>
              </div>
              <div>
                <h2>Cricket: The Ultimate Guide</h2>
                <p>Learn everything you need to know about cricket, from basic rules to advanced strategies.</p>
                <button type="button" onClick={() => openShop('Cricket')}>Read more <ArrowRight size={14} /></button>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Catalog / Shop Section */}
      {currentPage !== 'profile' && (
      <section className="catalog-section" id="shop">
        {/* Mobile Sticky Filter & Sort Bar */}
        <div className="md:hidden sticky top-[57px] z-30 bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">
              {allFilteredProducts.length} <span className="text-slate-500 font-normal">products</span>
            </span>
            {(draftCategory !== 'All products' || appliedCategory !== 'All products' || searchTerm) && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141d2f] hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all cursor-pointer min-h-[36px]"
          >
            <SlidersHorizontal size={14} />
            <span>Filters &amp; Sort</span>
          </button>
        </div>

        {/* Mobile Slide-over Filter Drawer */}
        {mobileFilterDrawerOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setMobileFilterDrawerOpen(false)}
          >
            <div 
              className="w-[85%] max-w-sm bg-[#0d121f] border-l border-slate-800 h-full flex flex-col justify-between p-5 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-cyan-400" />
                    <h2 className="text-base font-bold text-white uppercase tracking-wide">Filters &amp; Sort</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileFilterDrawerOpen(false)}
                    className="w-9 h-9 rounded-lg bg-[#13192b] border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="py-4 space-y-4">
                  {/* Search */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Search</label>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCatalogPage(1)
                        }}
                        placeholder="Search products..."
                        className="w-full pl-8 pr-3 py-2 bg-[#12192a] border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Category</label>
                    <select
                      value={draftCategory}
                      onChange={(e) => setDraftCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#12192a] border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand / Platform */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Brand / Platform</label>
                    <select
                      value={draftPlatform}
                      onChange={(e) => setDraftPlatform(e.target.value)}
                      className="w-full px-3 py-2 bg-[#12192a] border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      {platformOptions.map((plat) => (
                        <option key={plat} value={plat}>{plat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By & Order */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#12192a] border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Order</label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#12192a] border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">Price Range</label>
                      <span className="text-[11px] font-bold text-cyan-400">
                        {formatPrice(draftMinPrice)} - {formatPrice(draftMaxPrice)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={draftMaxPrice}
                        step="250"
                        value={draftMinPrice}
                        onChange={(e) => setDraftMinPrice(Math.min(Number(e.target.value), draftMaxPrice))}
                        className="w-full accent-cyan-400"
                      />
                      <input
                        type="range"
                        min={draftMinPrice}
                        max="15000"
                        step="250"
                        value={draftMaxPrice}
                        onChange={(e) => setDraftMaxPrice(Math.max(Number(e.target.value), draftMinPrice))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Min (Rs.)</span>
                        <input
                          type="number"
                          min="0"
                          max={draftMaxPrice}
                          step="250"
                          value={draftMinPrice}
                          onChange={(e) => setDraftMinPrice(Math.min(Number(e.target.value), draftMaxPrice))}
                          className="w-full px-2.5 py-1.5 bg-[#12192a] border border-slate-700/80 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Max (Rs.)</span>
                        <input
                          type="number"
                          min={draftMinPrice}
                          max="15000"
                          step="250"
                          value={draftMaxPrice}
                          onChange={(e) => setDraftMaxPrice(Math.max(Number(e.target.value), draftMinPrice))}
                          className="w-full px-2.5 py-1.5 bg-[#12192a] border border-slate-700/80 rounded text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    applyShopFilters()
                    setMobileFilterDrawerOpen(false)
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-400/20 transition-all cursor-pointer border-0"
                >
                  Apply Filters ({allFilteredProducts.length} Results)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetShopFilters()
                    setMobileFilterDrawerOpen(false)
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors cursor-pointer border border-slate-700/60"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="shop-layout">
          <aside className="hidden md:block shop-sidebar" aria-label="Product filters">
            <div className="shop-sidebar-heading"><h2>Filters</h2><button type="button" onClick={resetShopFilters}>Reset</button></div>
            <label className="shop-sidebar-search">
              <span>Search</span>
              <div>
                <Search size={14} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setCatalogPage(1)
                  }}
                  placeholder="Search products"
                  aria-label="Search products in Shop"
                />
              </div>
            </label>
            <label className="shop-select"><span>Category</span><select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="shop-select"><span>Brand / Platform</span><select value={draftPlatform} onChange={(event) => setDraftPlatform(event.target.value)}>{platformOptions.map((platform) => <option key={platform}>{platform}</option>)}</select></label>
            <div className="shop-sort-fields">
              <label className="shop-select"><span>Sort By</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="date">Date</option><option value="price">Price</option></select></label>
              <label className="shop-select"><span>Order</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="desc">Descending</option><option value="asc">Ascending</option></select></label>
            </div>
            <div className="price-filter">
              <div className="price-filter-heading"><span>Price Range</span><strong>{formatPrice(draftMinPrice)} – {formatPrice(draftMaxPrice)}</strong></div>
              <input aria-label="Minimum price slider" type="range" min="0" max={draftMaxPrice} step="250" value={draftMinPrice} onChange={(event) => setDraftMinPrice(Math.min(Number(event.target.value), draftMaxPrice))} />
              <input aria-label="Maximum price slider" type="range" min={draftMinPrice} max="15000" step="250" value={draftMaxPrice} onChange={(event) => setDraftMaxPrice(Math.max(Number(event.target.value), draftMinPrice))} />
              <div className="price-range-inputs">
                <label><span>Min</span><input type="number" min="0" max={draftMaxPrice} step="250" value={draftMinPrice} onChange={(event) => setDraftMinPrice(Math.min(Number(event.target.value), draftMaxPrice))} /></label>
                <label><span>Max</span><input type="number" min={draftMinPrice} max="15000" step="250" value={draftMaxPrice} onChange={(event) => setDraftMaxPrice(Math.max(Number(event.target.value), draftMinPrice))} /></label>
              </div>
            </div>
            <div className="filter-actions">
              <button className="reset-filters" type="button" onClick={resetShopFilters}>Clear all</button>
              <button className="apply-filters" type="button" onClick={applyShopFilters}>Apply Filters</button>
            </div>
          </aside>

          <div className="shop-results">
            <div className="catalog-heading">
              <div>
                <p className="section-eyebrow">THE FULL LINEUP</p>
                <h2>{searchTerm ? `Results for '${searchTerm}'` : wishlistOnly ? 'Your wishlist' : activeCategory === 'All products' ? 'All products' : activeCategory}<span>.</span></h2>
                <p>{allFilteredProducts.length} products · prices in NPR</p>
              </div>
              <label className="search-box">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setCatalogPage(1)
                  }}
                  placeholder="Search name, SKU or category"
                  aria-label="Search products"
                />
                <kbd>/</kbd>
              </label>
            </div>

            <div className="catalog-controls shop-sort-summary">
              Sorted by {sortBy} · {sortOrder === 'desc' ? 'descending' : 'ascending'}
            </div>
            <div className="results-line">
              <span>{allFilteredProducts.length} RESULTS</span>
              <span>SKU · SELLING PRICE · DELIVERY TYPE</span>
            </div>

            {/* Strict CSS Grid Catalog without Masonry Columns */}
            <ErrorBoundary>
              {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 items-stretch">
                  {filteredProducts.map((product, index) => {
                    if (!product || typeof product !== 'object') return null
                    return (
                      <ErrorBoundary key={product?.sku || product?.id || index}>
                        <ProductCard
                          product={product}
                          index={index}
                          isWishlisted={Array.isArray(wishlist) && wishlist.includes(product?.id)}
                          onToggleWishlist={toggleWishlist}
                          onAddToCart={addToCart}
                          onOpenTopUp={handleOpenTopUp}
                          onOpenGiftCard={handleOpenGiftCard}
                        />
                      </ErrorBoundary>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-results">
                  <Search size={27} />
                  <h3>No products found.</h3>
                  <p>Try another title or clear your filters.</p>
                  <button type="button" onClick={() => { setSearchTerm(''); setActiveCategory('All products'); setWishlistOnly(false) }}>
                    Show all products <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </ErrorBoundary>

            <nav className="pagination" aria-label="Product pagination">
              <button type="button" aria-label="Previous page" disabled={catalogPage === 1} onClick={() => setCatalogPage((page) => Math.max(1, page - 1))}>
                <ArrowLeft size={15} />
              </button>
              {paginationPages.map((page) => (
                <button
                  className={page === catalogPage ? 'page-current' : ''}
                  type="button"
                  key={page}
                  aria-current={page === catalogPage ? 'page' : undefined}
                  onClick={() => setCatalogPage(page)}
                >
                  {page}
                </button>
              ))}
              <button type="button" aria-label="Next page" disabled={catalogPage === pageCount} onClick={() => setCatalogPage((page) => Math.min(pageCount, page + 1))}>
                <ArrowRight size={15} />
              </button>
              <span>Page {catalogPage} of {pageCount}</span>
            </nav>
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <footer className="site-footer" id="contact">
        <div className="footer-about">
          <a
            className="flex items-center gap-3 no-underline group mb-4 transition-transform hover:scale-105"
            href="#home"
            onClick={() => {
              window.location.hash = 'home'
              setCurrentPage('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img 
              src="/sagarmatha-games-logo.svg" 
              alt="Sagarmatha Gaming Store" 
              className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase leading-none">
                Sagarmatha
              </span>
              <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-semibold uppercase leading-tight">
                Gaming Store
              </span>
            </div>
          </a>
          <p>Nepal’s trusted gaming store for genuine games, top-ups, and digital codes.</p>
          <strong className="footer-label">PAYMENT METHODS</strong>
          <div className="payment-tags"><span>eSewa</span><span>Khalti</span><span>ConnectIPS</span></div>
        </div>
        <div className="footer-column">
          <strong>SHOP</strong>
          <a href="#shop" onClick={() => { window.location.hash = 'shop'; openShop(); }}>All products</a>
          <a href="#categories" onClick={() => { window.location.hash = 'categories'; setCurrentPage('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Categories</a>
        </div>
        <div className="footer-column">
          <strong>COMPANY</strong>
          <a href="#about" onClick={() => { window.location.hash = 'about'; setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>About Us</a>
          <a href="#faq" onClick={() => { window.location.hash = 'faq'; setCurrentPage('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>FAQ</a>
          <a href="#contact" onClick={() => { window.location.hash = 'contact'; setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Contact</a>
        </div>
        <div className="footer-column">
          <strong>HELP &amp; POLICIES</strong>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              alert('Phone support will be available soon!')
            }}
          >
            +977 ----------
          </a>
          <a href="mailto:support@sagarmathagamingstore.com">support@sagarmathagamingstore.com</a>
          <a href="https://sagarmathagamingstore.com/return-policy">Return &amp; refund policy</a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              alert('WhatsApp support will be available soon!')
            }}
          >
            WhatsApp Support
          </a>
        </div>
        <small className="footer-copyright">© 2026 Sagarmatha Gaming Store</small>
      </footer>

      {/* Floating WhatsApp Contact */}
      <a 
        className="whatsapp-float cursor-pointer" 
        href="#" 
        onClick={(e) => {
          e.preventDefault()
          alert('WhatsApp support will be available soon!')
        }}
        aria-label="Chat with Sagarmatha Gaming Store on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.6l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2a10.3 10.3 0 0 1-5.2-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a10.2 10.2 0 1 1 8.7 4.7Zm5.6-7.6c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.1.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.1.2 2.2 3.4 5.4 4.8 2 .9 2.8 1 3.8.8.6-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" /></svg>
      </a>

      {/* Sticky Bottom Navigation Bar for Mobile Phones */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d18]/95 backdrop-blur-xl border-t border-cyan-500/20 md:hidden flex items-center justify-around px-2 py-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))]"
        aria-label="Mobile Navigation"
      >
        <button
          type="button"
          onClick={() => {
            window.location.hash = 'home'
            setCurrentPage('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-1 py-1 rounded-lg transition-colors cursor-pointer border-0 bg-transparent ${
            currentPage === 'home' ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home size={19} className={currentPage === 'home' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.hash = 'shop'
            openShop()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-1 py-1 rounded-lg transition-colors cursor-pointer border-0 bg-transparent ${
            currentPage === 'shop' && !wishlistOnly ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gamepad2 size={19} className={currentPage === 'shop' && !wishlistOnly ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5 tracking-tight">Shop</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.hash = 'categories'
            setCurrentPage('categories')
            setActiveCategory('All products')
            setWishlistOnly(false)
            setSearchTerm('')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-1 py-1 rounded-lg transition-colors cursor-pointer border-0 bg-transparent ${
            currentPage === 'categories' ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Blocks size={19} className={currentPage === 'categories' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5 tracking-tight">Categories</span>
        </button>

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-1 py-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer border-0 bg-transparent"
        >
          <div className="relative">
            <ShoppingCart size={19} className="stroke-2" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-cyan-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[16px] text-center leading-tight">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Cart</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.hash = 'profile'
            setCurrentPage('profile')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-1 py-1 rounded-lg transition-colors cursor-pointer border-0 bg-transparent ${
            currentPage === 'profile' ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {currentUser ? (
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-cyan-400">
              <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-0 right-0 border border-black" />
            </div>
          ) : (
            <CircleUserRound size={19} className={currentPage === 'profile' ? 'stroke-[2.5]' : 'stroke-2'} />
          )}
          <span className="text-[10px] mt-0.5 tracking-tight">{currentUser ? 'Profile' : 'Sign In'}</span>
        </button>
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div 
          className="overlay z-50 fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-end" 
          role="presentation" 
          onClick={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}
        >
          <aside 
            className="cart-drawer z-50 max-h-[90vh] overflow-y-auto w-full md:max-w-md bg-[#0b0f19] border-l border-slate-800 flex flex-col justify-between shadow-2xl" 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="cart-title"
          >
            {/* Sticky Header with Title and Distinct Close Button */}
            <div className="sticky top-0 z-10 bg-[#0d1322] border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-cyan-400" />
                <h2 id="cart-title" className="text-base font-bold text-white tracking-wide">
                  Your Cart <span className="text-cyan-400 text-sm font-semibold">({cartCount})</span>
                </h2>
              </div>
              <button 
                type="button"
                onClick={() => setCartOpen(false)} 
                className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center min-w-[36px] min-h-[36px]"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {cart.length ? (
              <>
                <div className="cart-items flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={item?.id || index}>
                      <div className="cart-thumb" style={{ backgroundImage: `url("${getCoverImage(item)}")` }} />
                      <div className="cart-item-copy">
                        <span>{item?.category || ''}</span>
                        <h3>{item?.name || 'Untitled'}</h3>
                        <strong>{formatPrice(item?.price)}</strong>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Decrease ${item?.name || 'item'} quantity`} onClick={() => updateQuantity(item?.id, -1)}><Minus size={13} /></button>
                          <span>{item?.quantity || 1}</span>
                          <button type="button" aria-label={`Increase ${item?.name || 'item'} quantity`} onClick={() => updateQuantity(item?.id, 1)}><Plus size={13} /></button>
                        </div>
                      </div>
                      <strong className="line-total">{formatPrice((item?.price ?? 0) * (item?.quantity ?? 1))}</strong>
                      <button className="remove-cart-item" type="button" aria-label={`Remove ${item?.name || 'item'}`} onClick={() => removeFromCart(item?.id)}><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
                <div className="drawer-bottom p-4 border-t border-slate-800/80 bg-[#090d16]">
                  <div className="subtotal-line flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Grand total</span>
                    <strong className="text-base font-extrabold text-white">{formatPrice(subtotal)}</strong>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">Fast digital delivery to your WhatsApp / Email upon checkout.</p>
                  <button 
                    type="button" 
                    className="primary-button w-full" 
                    onClick={() => {
                      if (!currentUser) {
                        requireLoginForAction("Please log in with Discord to complete your order and track your vouchers.", { type: 'cart_checkout' })
                        setCartOpen(false)
                        return
                      }
                      setCartOpen(false)
                      setCheckoutOpen(true)
                    }}
                  >
                    Continue to checkout <ArrowRight size={17} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setCartOpen(false)} 
                    className="w-full py-2.5 mt-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <ShoppingCart size={40} className="text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-white">Your bag’s taking a breather.</h3>
                  <p className="text-xs text-slate-400 mt-1">Find something good for your next session.</p>
                </div>
                <button type="button" className="primary-button w-full" onClick={() => setCartOpen(false)}>
                  Explore games <ArrowRight size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => setCartOpen(false)} 
                  className="w-full py-2.5 mt-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  ← Continue Shopping
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Gift Card Denomination Modal */}
      {giftCardModalProduct && (
        <GiftCardModal
          product={giftCardModalProduct}
          onClose={() => setGiftCardModalProduct(null)}
          onAddToCart={(customItem) => {
            addToCart(customItem)
          }}
          onDirectCheckout={(customItem) => {
            addToCart(customItem)
            setGiftCardModalProduct(null)
            if (!currentUser) {
              requireLoginForAction("Please log in with Discord to complete your order and track your vouchers.", { type: 'cart_checkout' })
              return
            }
            setCheckoutOpen(true)
          }}
        />
      )}

      {/* Specialized Codashop-Style Top-Up Modal */}
      {topUpModalProduct && (
        <TopUpModal
          product={topUpModalProduct}
          currentUser={currentUser}
          onClose={() => setTopUpModalProduct(null)}
          onRequireLogin={(msg, pending) => {
            requireLoginForAction(msg, pending)
          }}
          onConfirmRecharge={(orderData) => {
            // Recharge saved in localStorage
          }}
          onOpenProfile={() => {
            setTopUpModalProduct(null)
            if (!currentUser) {
              requireLoginForAction("Please log in with Discord to view your orders and profile.")
              return
            }
            window.location.hash = 'profile'
            setCurrentPage('profile')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {/* Discord Authentication Modal */}
      {authModalOpen && (
        <AuthModal
          notice={authNotice}
          onClose={() => {
            setAuthModalOpen(false)
            setAuthNotice(null)
          }}
          onLoginSuccess={(user) => {
            setCurrentUser(user)
            setAuthModalOpen(false)
            setAuthNotice(null)
            const pending = localStorage.getItem('pending_purchase')
            if (pending) {
              try {
                const data = JSON.parse(pending)
                localStorage.removeItem('pending_purchase')
                if (data.type === 'cart_checkout') {
                  setCheckoutOpen(true)
                  return
                } else if (data.type === 'topup' && data.product) {
                  setTopUpModalProduct(data.product)
                  return
                }
              } catch (e) {
                console.error('Error resuming purchase:', e)
              }
            }
            window.location.hash = 'profile'
            setCurrentPage('profile')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="overlay modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false) }}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="modal-header">
              <div>
                <span className="eyebrow"><span className="eyebrow-line" /> INSTANT DIGITAL CHECKOUT</span>
                <h2 id="checkout-title">Checkout</h2>
              </div>
              <button type="button" className="icon-button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={submitOrder}>
              <div className="checkout-layout">
                <div className="checkout-fields">
                  <div className="form-section">
                    <h3><span>01</span> Contact Details (For Digital Delivery)</h3>
                    <div className="form-grid">
                      <label className="form-field">
                        <span>Full name</span>
                        <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Your full name" required />
                      </label>
                      <label className="form-field">
                        <span>WhatsApp / Mobile Number</span>
                        <input type="tel" inputMode="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="98XXXXXXXX" required />
                      </label>
                      <label className="form-field">
                        <span>Email address (Credentials sent here)</span>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
                      </label>
                    </div>
                  </div>

                  {hasTopUp && (
                    <div className="form-section conditional-section">
                      <h3><span>02</span> Player details <span className="required-tag">REQUIRED FOR TOP-UP</span></h3>
                      <p>Double-check these in-game. We’ll deliver your top-up directly to your account.</p>
                      <div className="form-grid">
                        <label className="form-field">
                          <span>Player UID</span>
                          <input value={playerUid} onChange={(event) => setPlayerUid(event.target.value)} placeholder="Enter your Player UID" required />
                        </label>
                        <label className="form-field">
                          <span>Server ID</span>
                          <input value={serverId} onChange={(event) => setServerId(event.target.value)} placeholder="Enter your Server ID" required />
                        </label>
                      </div>
                    </div>
                  )}

                  {hasPhysicalDisc ? (
                    <div className="form-section conditional-section">
                      <h3><span>{hasTopUp ? '03' : '02'}</span> Delivery Address <span className="required-tag">PHYSICAL DELIVERY</span></h3>
                      <p>We’ll courier your physical PlayStation disc anywhere in Nepal.</p>
                      <div className="form-grid">
                        <label className="form-field">
                          <span>Delivery zone</span>
                          <select value={deliveryZone} onChange={(event) => setDeliveryZone(event.target.value)}>
                            <option>Inside Valley</option>
                            <option>Outside Valley</option>
                          </select>
                        </label>
                        <label className="form-field address-field">
                          <span>Full delivery address</span>
                          <textarea value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} placeholder="Street, area, city, district" rows="3" required />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="form-section conditional-section bg-cyan-950/30 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 my-2">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                          <Zap size={20} className="fill-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-cyan-300 font-bold text-sm sm:text-base">
                              ⚡ Instant Digital Delivery (Delivered to your Email / WhatsApp / UID within 5-15 mins)
                            </h4>
                          </div>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            No shipping address, city, or postal code required. Digital voucher codes and in-game recharges will be dispatched directly to your WhatsApp or Email.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-section payment-section">
                    <h3><span>{hasTopUp && hasPhysicalDisc ? '04' : hasTopUp || hasPhysicalDisc ? '03' : '02'}</span> Payment Option</h3>
                    <div className="payment-options">
                      {['eSewa', 'Khalti', 'Bank Transfer'].map((method) => (
                        <label className={paymentMethod === method ? 'payment-option selected' : 'payment-option'} key={method}>
                          <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                          <span className={`payment-logo ${method.toLowerCase().replace(/\s+/g, '')}`}>{method === 'Bank Transfer' ? 'B' : method === 'eSewa' ? 'e' : 'K'}</span>
                          <span>{method}</span>
                          {paymentMethod === method && <Check size={15} className="payment-check" />}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="order-summary">
                  <h3>Order summary <span>{cartCount} items</span></h3>
                  <div className="summary-items">
                    {cart.map((item, index) => (
                      <div key={item?.id || index}>
                        <span>{item?.name || 'Item'} <small>× {item?.quantity || 1}</small></span>
                        <strong>{formatPrice((item?.price ?? 0) * (item?.quantity ?? 1))}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
                  <p><ShieldCheck size={14} /> Instant digital credentials &amp; 100% authentic guarantee.</p>
                  <button className="primary-button" type="submit">Place order <ArrowRight size={17} /></button>
                  <span className="secure-lock"><ShieldCheck size={13} /> ENCRYPTED CHECKOUT</span>
                </aside>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationOpen && order && (
        <div className="overlay modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmationOpen(false) }}>
          <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
            <button type="button" className="icon-button confirmation-close" aria-label="Close order confirmation" onClick={() => setConfirmationOpen(false)}>
              <X size={20} />
            </button>
            <div className="confirmation-mark"><Check size={30} /></div>
            <span className="eyebrow"><span className="eyebrow-line" /> ORDER RECEIVED</span>
            <h2 id="confirmation-title">You’re all <span>set.</span></h2>
            <p className="confirmation-intro">Thanks, {order.customerName}. Your order <strong>{order.orderNumber}</strong> has been received.</p>
            <div className="confirmation-details">
              <div className="confirmation-row"><span>Payment Option</span><strong>{order.paymentMethod}</strong></div>
              <div className="confirmation-row"><span>WhatsApp Number</span><strong>{order.phoneNumber}</strong></div>
              <div className="confirmation-row"><span>Email</span><strong>{order.email}</strong></div>
              {order.playerUid && <div className="confirmation-row"><span>Player UID / Server</span><strong>{order.playerUid} / {order.serverId}</strong></div>}
              {order.shippingAddress && <div className="confirmation-row"><span>Delivery zone</span><strong>{order.deliveryZone}</strong></div>}
              {order.shippingAddress && <div className="confirmation-row address-row"><span>Delivery Address</span><strong>{order.shippingAddress}</strong></div>}
            </div>
            <div className="instruction-list">
              <h3>YOUR NEXT STEPS</h3>
              {order.items?.map((item, index) => (
                <div className="instruction-item" key={item?.id || index}>
                  <div><strong>{item?.name || 'Item'}</strong><span>{item?.delivery || 'DIGITAL'}</span></div>
                  <p>{item?.credentials || ''} {item?.instructions || ''}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="primary-button confirmation-done"
              onClick={() => {
                setConfirmationOpen(false)
                window.location.hash = 'home'
                setCurrentPage('home')
              }}
            >
              Back to the store <ArrowRight size={17} />
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
