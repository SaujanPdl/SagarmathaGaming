import { useEffect, useMemo, useState } from 'react'
import { parse } from 'csv-parse/browser/esm/sync'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Blocks,
  CloudDownload,
  Check,
  CircleUserRound,
  CreditCard,
  Disc3,
  Gift,
  Gamepad2,
  Headphones,
  Heart,
  KeyRound,
  Mail,
  Menu,
  MessageCircle,
  MonitorPlay,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import productCsv from '../sagarmatha_games_hgs_product_database.csv?raw'
import { getGameCover } from './utils/gameImages'
import './App.css'

const productData = parse(productCsv, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
}).map((row) => ({
  sku: row.SKU,
  name: row['Product Name'],
  price: Number(row['Sagarmatha Selling Price (NPR)']),
  category: row.Category,
  deliveryType: row['Delivery Type'],
  status: row['HGS Status'],
}))

function getDeliveryBadge(product) {
  if (product.category === 'Game Top-Up') return 'UID TOP-UP'
  if (product.category === 'Gift Cards') return 'DIGITAL CODE'
  if (product.category === 'Steam Offline Games') return 'OFFLINE ACCOUNT'
  if (product.category === 'Steam Private Account') return 'FULL ACCESS'
  if (product.category.startsWith('PlayStation')) return 'PLAYSTATION'
  return 'DIGITAL DELIVERY'
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
  if (product.category.startsWith('Steam')) return 'Steam'
  if (product.category.startsWith('PlayStation')) return 'PlayStation'
  if (product.category === 'Game Top-Up') return 'Mobile'
  if (product.category === 'Gift Cards') return 'Gift Cards'
  if (product.category === 'Microsoft Online Games') return 'Microsoft'
  if (product.category === 'Xbox') return 'Xbox'
  if (product.category === 'AI & Subscription') return 'Digital Services'
  return 'PC Games'
}

const categoryImages = {
  'Steam Private Account': 'photo-1511512578047-dfb367046420',
  'Steam Offline Games': 'photo-1542751371-adc38448a05e',
  'Game Top-Up': 'photo-1560253023-3ec5d502959f',
  'Gift Cards': 'photo-1493711662062-fa541adb3fc8',
  'PlayStation Physical Disc': 'photo-1605901309584-818e25960a8f',
  'PlayStation Digital': 'photo-1593305841991-05c297ba4575',
  Xbox: 'photo-1607604276583-eef5d076aa5f',
  'Microsoft Online Games': 'photo-1550745165-9bc0b252726f',
  Minecraft: 'photo-1627856013091-fed6e4e30025',
  'AI & Subscription': 'photo-1618005182384-a83a8bd57fbe',
  'Game Keys': 'photo-1538481199705-c710c4e965fc',
}

const products = productData.map((product) => ({
  ...product,
  id: product.sku,
  oldPrice: null,
  badge: getDeliveryBadge(product),
  platform: getProductPlatform(product),
  image: getGameCover(product.name),
  imageAlt: `${product.name} artwork`,
  description: product.deliveryType,
  delivery: product.deliveryType,
  instructions: `Instant delivery to your WhatsApp & Email. Follow activation instructions provided with order.`,
  credentials: 'Codes and account login details are sent immediately after payment confirmation.',
}))

const platformOptions = ['All platforms', ...new Set(products.map((product) => product.platform))]

const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`

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
    return products.find((product) => product.name.toLowerCase().includes('red dead redemption 2'))?.image
  }
  if (category === 'Steam Offline Games') {
    return 'https://cdn.zalient.shop/media/1788443952480_7d49bc4763bf71d1.webp'
  }
  return `https://images.unsplash.com/${categoryImages[category] || categoryImages['Steam Private Account']}?auto=format&fit=crop&w=600&q=80`
}

function ProductRail({ title, category, items, onAdd, onSeeAll }) {
  if (!items.length) return null

  return (
    <section className="home-product-row">
      <div className="row-heading">
        <div><span className="section-eyebrow">CURATED FOR YOU</span><h2>{title}</h2></div>
        <button type="button" onClick={() => onSeeAll(category)}>See all <ArrowRight size={15} /></button>
      </div>
      <div className="product-rail">
        {items.map((product) => (
          <article className={`rail-product ${product.status === 'Sold Out' ? 'sold-out' : ''}`} key={product.sku}>
            <div className="rail-cover" style={{ backgroundImage: `linear-gradient(180deg, rgba(7,9,14,.04), rgba(7,9,14,.72)), url("${product.image}")` }}>
              <span className="product-badge">{product.badge}</span>
              <span className="rail-number">{product.sku}</span>
            </div>
            <div className="rail-product-info"><span>{product.category}</span><h3>{product.name}</h3><div><strong>{formatPrice(product.price)}</strong><button type="button" disabled={product.status !== 'Available'} aria-label={`Add ${product.name} to cart`} onClick={() => onAdd(product)}>{product.status === 'Available' ? <Plus size={16} /> : 'Sold out'}</button></div></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ProductCard({
  product,
  index = 0,
  wishlist = [],
  toggleWishlist,
  addToCart,
}) {
  const isSaved = Array.isArray(wishlist) && wishlist.includes(product.id)

  return (
    <article
      className={`product-card group flex flex-col justify-between h-full ${product.status === 'Sold Out' ? 'sold-out' : ''}`}
      key={product.sku}
      style={{ '--card-index': index }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#111726]">
        <img
          src={getGameCover(product.name)}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
          }}
        />
        {toggleWishlist && (
          <button
            className={isSaved ? 'quick-add saved' : 'quick-add'}
            type="button"
            aria-label={`${isSaved ? 'Remove' : 'Add'} ${product.name} to wishlist`}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="product-info-tight flex flex-col flex-grow justify-between">
        <div>
          <span className="product-category-micro">{product.category}</span>
          <div className="min-h-[2.5rem] line-clamp-2">
            <h3 className="product-title-micro" title={product.name}>
              {product.name}
            </h3>
          </div>
        </div>
        <div className="product-actions-micro mt-auto">
          <span className="product-price-micro">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="add-to-cart-cyan"
            disabled={product.status !== 'Available'}
            onClick={() => addToCart(product)}
          >
            {product.status === 'Available' ? '+ Add' : 'Sold out'}
          </button>
        </div>
      </div>
    </article>
  )
}

function getViewFromHash(hash) {
  const clean = (hash || '').replace(/^#\/?/, '').toLowerCase().trim()
  if (clean === 'about') return 'about'
  if (clean === 'contact' || clean === 'reach') return 'contact'
  if (clean === 'shop' || clean === 'products' || clean === 'catalog') return 'shop'
  if (clean === 'categories' || clean === 'category') return 'categories'
  if (clean === 'blogs' || clean === 'blog' || clean === 'news') return 'blogs'
  return 'home'
}

function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return getViewFromHash(window.location.hash)
    }
    return 'home'
  })
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
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('eSewa')
  const [playerUid, setPlayerUid] = useState('')
  const [serverId, setServerId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState(null)

  function navigateTo(targetPage) {
    if (typeof window !== 'undefined') {
      window.location.hash = targetPage
    }
    setCurrentView(targetPage)
    if (targetPage === 'categories') {
      setActiveCategory('All products')
      setWishlistOnly(false)
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleHashChange = () => {
      const page = getViewFromHash(window.location.hash)
      setCurrentView(page)
      if (page === 'categories') {
        setActiveCategory('All products')
        setWishlistOnly(false)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    if (window.location.hash) {
      handleHashChange()
    } else {
      window.location.hash = '#home'
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const allFilteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const results = products.filter((product) => {
      const matchesCategory = (activeCategory === 'All products' || product.category === activeCategory)
        && (appliedCategory === 'All products' || product.category === appliedCategory)
      const matchesQuery = !query || `${product.name} ${product.sku} ${product.category} ${product.deliveryType}`.toLowerCase().includes(query)
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id)
      const matchesPlatform = appliedPlatform === 'All platforms' || product.platform === appliedPlatform
      const matchesPrice = product.price >= appliedMinPrice && product.price <= appliedMaxPrice
      return matchesCategory && matchesQuery && matchesWishlist && matchesPlatform && matchesPrice
    })
    const direction = sortOrder === 'asc' ? 1 : -1
    if (sortBy === 'price') results.sort((first, second) => (first.price - second.price) * direction)
    else results.sort((first, second) => (Number(first.sku.slice(3)) - Number(second.sku.slice(3))) * direction)
    return results
  }, [activeCategory, appliedCategory, appliedMaxPrice, appliedMinPrice, appliedPlatform, searchTerm, sortBy, sortOrder, wishlist, wishlistOnly])

  const pageSize = 12
  const filteredProducts = allFilteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const pageCount = Math.max(1, Math.ceil(allFilteredProducts.length / pageSize))
  const paginationPages = Array.from(
    { length: Math.min(3, pageCount) },
    (_, index) => Math.min(Math.max(currentPage - 1, 1), Math.max(pageCount - 2, 1)) + index,
  )

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const hasTopUp = cart.some((item) => item.category === 'Game Top-Up')

  const homeRows = [
    { title: 'Best Selling', category: 'Steam Private Account', items: products.filter((product) => product.category === 'Steam Private Account').slice(0, 6) },
    { title: 'Steam Offline Games', category: 'Steam Offline Games', items: products.filter((product) => product.category === 'Steam Offline Games').slice(0, 4) },
    { title: 'Giftcards', category: 'Gift Cards', items: products.filter((product) => product.category === 'Gift Cards').slice(0, 4) },
    { title: 'Topup', category: 'Game Top-Up', items: products.filter((product) => product.category === 'Game Top-Up').slice(0, 4) },
    { title: 'Newly Added', category: 'All products', items: [...products].reverse().slice(0, 4) },
  ]

  function toggleWishlist(productId) {
    setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  function openShop(category = 'All products') {
    setActiveCategory(category)
    setWishlistOnly(false)
    setSearchTerm('')
    setCurrentPage(1)
    setAppliedCategory('All products')
    setDraftCategory(category)
    setAppliedPlatform('All platforms')
    setDraftPlatform('All platforms')
    setDraftMinPrice(0)
    setAppliedMinPrice(0)
    setAppliedMaxPrice(15000)
    setDraftMaxPrice(15000)
    if (typeof window !== 'undefined') {
      window.location.hash = 'shop'
    }
    setCurrentView('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function applyShopFilters() {
    setActiveCategory('All products')
    setWishlistOnly(false)
    setAppliedCategory(draftCategory)
    setAppliedPlatform(draftPlatform)
    setAppliedMinPrice(draftMinPrice)
    setAppliedMaxPrice(draftMaxPrice)
    setCurrentPage(1)
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
    setCurrentPage(1)
  }

  function updateQuantity(productId, change) {
    setCart((currentCart) => currentCart
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  function addToCart(product) {
    if (product.status !== 'Available') return
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) return currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...currentCart, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function submitOrder(event) {
    event.preventDefault()
    setOrder({
      orderNumber: `HGS-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      paymentMethod,
      playerUid: hasTopUp ? playerUid : '',
      serverId: hasTopUp ? serverId : '',
      customerName,
      phoneNumber,
      email,
    })
    setCart([])
    setPlayerUid('')
    setServerId('')
    setCustomerName('')
    setPhoneNumber('')
    setEmail('')
    setCheckoutOpen(false)
    setCartOpen(false)
    setConfirmationOpen(true)
  }

  return (
    <main className={`store-shell view-${currentView}`}>
      <div className="mini-banner">
        <span className="currency-mark">Rs <b>NPR</b></span>
        <span className="delivery-notice">Instant digital delivery <i /> pay your way <i /> 100% authentic codes</span>
        <div>
          <a href="#about" onClick={(event) => { event.preventDefault(); navigateTo('about'); }}>About</a>
          <button type="button" onClick={() => { openShop(); setWishlistOnly(true); }}>Wishlist</button>
        </div>
      </div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Hamro Gaming Store home" onClick={(event) => { event.preventDefault(); navigateTo('home'); }}>
          <span className="brand-symbol"><b>H</b><b>G</b><b>S</b></span>
          <span className="brand-name">HAMRO<span>GAMING STORE</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { label: 'Home', hash: 'home' },
            { label: 'Shop', hash: 'shop' },
            { label: 'About', hash: 'about' },
            { label: 'Contact', hash: 'contact' },
          ].map(({ label, hash }) => (
            <a
              key={hash}
              className={currentView === hash ? 'nav-current' : ''}
              href={`#${hash}`}
              onClick={(event) => {
                event.preventDefault()
                window.location.hash = hash
                setCurrentView(hash)
                if (hash === 'shop') openShop()
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <label className="nav-search">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setActiveCategory('All products')
              setWishlistOnly(false)
              setCurrentPage(1)
              window.location.hash = 'shop'
              setCurrentView('shop')
            }}
            placeholder="Search gift cards, top-ups, games..."
            aria-label="Search 119 products"
          />
          {searchTerm && (
            <button type="button" aria-label="Clear search" onClick={() => { setSearchTerm(''); setCurrentPage(1); }}>
              <X size={15} />
            </button>
          )}
        </label>
        <div className="nav-actions">
          <button
            className={wishlistOnly ? 'nav-icon active' : 'nav-icon'}
            type="button"
            aria-label="Toggle wishlist"
            aria-pressed={wishlistOnly}
            onClick={() => {
              const nextValue = !wishlistOnly
              openShop()
              setWishlistOnly(nextValue)
            }}
          >
            <Heart size={19} />
          </button>
          <button
            className="cart-trigger"
            type="button"
            aria-label={`Open cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={17} />
            <span>Cart</span>
            <b>{cartCount}</b>
          </button>
          <a className="nav-icon profile-icon" href="#about" aria-label="Account" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>
            <CircleUserRound size={20} />
          </a>
        </div>
        <a className="mobile-menu" href="#shop" aria-label="Browse shop" onClick={(event) => { event.preventDefault(); openShop(); }}>
          <Menu size={22} />
        </a>
      </header>

      <section className="hero-section" aria-label="Featured games and offers">
        <div className="hero-kicker"><span>THE HOME OF GAMING IN NEPAL</span><span>LEVEL UP YOUR LIBRARY <ArrowDownRight size={14} /></span></div>
        <div className="hero-trio">
          <article className="feature-card feature-left" style={{ backgroundImage: 'linear-gradient(180deg, rgba(6,8,15,.02) 15%, rgba(6,8,15,.96) 100%), url(https://cdn.zalient.shop/media/1788443952480_7d49bc4763bf71d1.webp)' }}>
            <span className="feature-tag">STEAM OFFLINE</span>
            <div className="feature-card-copy">
              <span>FEATURED ACTION</span>
              <h2>{products.find((product) => product.name.toLowerCase().includes('onimusha'))?.name || 'Onimusha'}</h2>
              <button type="button" onClick={() => openShop('Steam Offline Games')}>Explore title <ArrowRight size={14} /></button>
            </div>
          </article>
          <article className="feature-card feature-center" style={{ backgroundImage: 'linear-gradient(90deg, rgba(7,9,17,.96) 0%, rgba(7,9,17,.84) 47%, rgba(7,9,17,.08) 100%), url(https://cdn.zalient.shop/media/1780094018222_25f1307ad1884db0.webp)' }}>
            <div className="center-copy">
              <span className="feature-tag cyan-tag">HAMRO EXCLUSIVE</span>
              <p className="promo-overline">THE NEW SEASON STARTS NOW</p>
              <h1>EA FC 26</h1>
              <p className="promo-subtitle">BUY AT HAMRO GAMING STORE</p>
              <div className="promo-benefits">
                <span><Check size={14} /> World Cup Mode</span>
                <span><Check size={14} /> Online &amp; Multiplayer</span>
                <span><Check size={14} /> Instant Delivery</span>
                <span><Check size={14} /> Private Account</span>
              </div>
              <button className="promo-button" type="button" onClick={() => { const game = products.find((product) => product.name === 'EA FC 26'); if (game) addToCart(game); }}>
                Buy Now <ArrowRight size={16} />
              </button>
            </div>
            <span className="banner-index">01 <i /> 03</span>
          </article>
          <article className="feature-card feature-right" style={{ backgroundImage: 'linear-gradient(180deg, rgba(4,8,16,.02) 12%, rgba(4,8,16,.9) 100%), url(https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85)' }}>
            <span className="feature-tag">MOST ANTICIPATED</span>
            <div className="gta-wordmark"><span>GRAND THEFT AUTO</span><strong>VI</strong></div>
            <div className="feature-card-copy">
              <span>COMING SOON</span>
              <h2>{products.find((product) => product.name.toLowerCase().includes('gta 6'))?.name || 'GTA VI'}</h2>
              <button type="button" onClick={() => openShop('PlayStation Digital')}>See pre-orders <ArrowRight size={14} /></button>
            </div>
          </article>
        </div>
        <div className="hero-pagination"><span className="active" /><span /><span /><span /><b>01 / 04</b></div>
      </section>

      <section className="category-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">PICK YOUR PLATFORM</span>
            <h2>{currentView === 'categories' ? 'All Categories' : 'Top this week'}<span>.</span></h2>
            {currentView === 'categories' && <p className="category-intro">Find the perfect digital gift cards, top-up or games for you.</p>}
          </div>
          <button type="button" className="view-all" onClick={() => { if (currentView === 'categories') openShop(); else navigateTo('categories'); }}>
            {currentView === 'categories' ? 'See all products' : 'See all'} <ArrowRight size={15} />
          </button>
        </div>
        <div className="quick-categories">
          {categoryOrder.map((category) => {
            const Icon = categoryIcons[category] || Gamepad2
            const count = products.filter((product) => product.category === category).length
            return (
              <button
                className="quick-category"
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

      {currentView === 'home' && (
        <>
          {homeRows.slice(0, 4).map((row) => (
            <ProductRail key={row.title} {...row} onAdd={addToCart} onSeeAll={openShop} />
          ))}
          <section className="bundle-promo">
            <div className="bundle-copy">
              <span className="section-eyebrow">THE ULTIMATE LIBRARY</span>
              <h2>Steam Bundle<br />220+ Games</h2>
              <p>One massive collection. Hundreds of ways to play.</p>
              <button type="button" onClick={() => openShop('Steam Offline Games')}>
                Explore Steam Offline <ArrowRight size={15} />
              </button>
            </div>
            <div className="bundle-art">
              <div className="bundle-cover-stack" aria-label="Featured games in the collection">
                {products.filter((product) => product.category === 'Steam Offline Games').slice(0, 4).map((product) => (
                  <div key={product.sku} title={product.name} style={{ backgroundImage: `url("${product.image}")` }} />
                ))}
              </div>
              <div className="bundle-art-type"><span>220+</span><b>GAMES</b><i>STEAM COLLECTION</i></div>
            </div>
          </section>
          <section className="fc27-promo">
            <div>
              <span className="section-eyebrow">NEXT SEASON. NEXT LEVEL.</span>
              <h2>EA SPORTS FC 27 Standard Edition</h2>
              <p>New Steam account · Online &amp; Multiplayer · Instant delivery</p>
              <button type="button" onClick={() => { openShop(); setSearchTerm('EA SPORTS FC 27'); }}>
                Explore FC 27 <ArrowRight size={15} />
              </button>
            </div>
            <span className="fc27-mark">FC<span>27</span></span>
          </section>
          <ProductRail {...homeRows[4]} onAdd={addToCart} onSeeAll={openShop} />
          <section className="feature-perks">
            <div><CloudDownload size={20} /><span><strong>Instant Delivery</strong><small>Digital products, delivered fast</small></span></div>
            <div><Check size={20} /><span><strong>100% Authentic</strong><small>Genuine codes and accounts</small></span></div>
            <div><CreditCard size={20} /><span><strong>eSewa &amp; Khalti</strong><small>Pay with trusted local methods</small></span></div>
            <div><MessageCircle size={20} /><span><strong>24/7 Support</strong><small>WhatsApp help when you need it</small></span></div>
          </section>
        </>
      )}

      {currentView === 'about' && (
        <section className="about-page">
          <header className="about-hero">
            <span className="section-eyebrow">PLAY LOCAL. PLAY MORE.</span>
            <h1>About Us <span>— Hamro Gaming Store</span></h1>
            <p>Nepal’s verified gaming hub for PC, PlayStation, Xbox, and mobile top-ups with instant delivery.</p>
          </header>
          <div className="about-columns">
            <article className="about-mission">
              <span className="section-eyebrow">OUR MISSION</span>
              <h2>Make gaming easier to access across Nepal.</h2>
              <p>Hamro Gaming Store brings players authentic games, gift cards, digital codes, and mobile top-ups in one place. We focus on clear product details, trusted local payment choices, and dependable delivery, so players can get into their next game with confidence.</p>
              <p>From your first Steam Wallet code to a new PlayStation release, our team is here to help you choose, purchase, and get started.</p>
            </article>
            <aside className="reach-card">
              <span className="section-eyebrow">REACH US</span>
              <h2>We’re here to help.</h2>
              <a href="https://wa.me/9779700979030" target="_blank" rel="noreferrer">
                <MessageCircle size={17} />
                <span><small>WHATSAPP / PHONE</small>+977 9700979030</span>
              </a>
              <a href="mailto:support@hamrogamingstore.com">
                <Mail size={17} />
                <span><small>SUPPORT EMAIL</small>support@hamrogamingstore.com</span>
              </a>
              <div className="operating-hours">
                <small>OPERATING HOURS (NPT)</small>
                <strong>10:00 AM – 11:00 PM</strong>
                <span>Every day</span>
              </div>
            </aside>
          </div>
          <div className="about-stats">
            <div><strong>5+</strong><span>Years in Business</span></div>
            <div><Headphones size={21} /><strong>24/7</strong><span>Customer Support</span></div>
            <div><CloudDownload size={21} /><strong>⚡</strong><span>Fast Digital Delivery</span></div>
          </div>
        </section>
      )}

      {currentView === 'contact' && (
        <section className="contact-page">
          <header className="about-hero">
            <span className="section-eyebrow">WE ARE HERE 24/7</span>
            <h1>Contact Us <span>— Hamro Gaming Store</span></h1>
            <p>Direct WhatsApp, phone, and email support for instant code delivery &amp; customer assistance across Nepal.</p>
          </header>
          <div className="about-columns" style={{ marginTop: '24px' }}>
            <article className="about-mission">
              <span className="section-eyebrow">INSTANT SUPPORT</span>
              <h2>Fastest response on WhatsApp.</h2>
              <p>
                Have a question about game account credentials, redeeming a Steam Wallet code, or verifying your payment? Our Kathmandu-based support team is active 7 days a week to ensure your gaming setup never gets paused.
              </p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  className="primary-button"
                  href="https://wa.me/9779700979030"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <a
                  className="text-button"
                  href="tel:+9779700979030"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00e5ff' }}
                >
                  <Phone size={16} /> Call +977 9700979030
                </a>
              </div>
            </article>
            <aside className="reach-card">
              <span className="section-eyebrow">CONTACT DETAILS</span>
              <h2>Direct Channels</h2>
              <a href="https://wa.me/9779700979030" target="_blank" rel="noreferrer">
                <MessageCircle size={17} />
                <span><small>WHATSAPP / MOBILE</small>+977 9700979030</span>
              </a>
              <a href="mailto:support@hamrogamingstore.com">
                <Mail size={17} />
                <span><small>SUPPORT EMAIL</small>support@hamrogamingstore.com</span>
              </a>
              <div className="operating-hours">
                <small>OPERATING HOURS (NPT)</small>
                <strong>10:00 AM – 11:00 PM</strong>
                <span>Instant digital dispatch everyday</span>
              </div>
            </aside>
          </div>
        </section>
      )}

      {currentView === 'blogs' && (
        <section className="blogs-page">
          <header className="blogs-heading">
            <span className="section-eyebrow">FROM THE HGS TEAM</span>
            <h1>Our Latest News &amp; Posts</h1>
            <p>Guides, answers, and updates for gamers in Nepal.</p>
          </header>
          <article className="featured-article">
            <div className="article-art discord-art"><span>DISCORD</span><strong>NITRO</strong><i>NEPAL GUIDE</i></div>
            <div className="featured-article-copy">
              <span className="article-label">FEATURED GUIDE · 6 MIN READ</span>
              <h2>How to Buy Discord Nitro in Nepal | Discord Giftcard</h2>
              <p>Learn how to choose a Discord gift card, redeem your balance, and activate Nitro from Nepal.</p>
              <button type="button" onClick={() => { openShop(); setSearchTerm('Discord'); }}>
                Explore gift cards <ArrowRight size={15} />
              </button>
            </div>
          </article>
          <div className="blog-card-grid">
            {[
              { title: 'How to Buy Nintendo Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages['Gift Cards'], copy: 'Choose a region-compatible Nintendo gift card and redeem it on your account.' },
              { title: 'How to Buy Epic Games Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages['Game Keys'], copy: 'Add funds to your Epic balance and prepare for your next PC game.' },
              { title: 'How to Buy EA Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages['Gift Cards'], copy: 'A quick guide to selecting and redeeming an EA wallet code.' },
              { title: 'How to Buy Netflix Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages['Gift Cards'], copy: 'Understand regions and redemption before adding a Netflix balance.' },
              { title: 'How to Buy Xbox Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages.Xbox, copy: 'Choose the right Xbox region and redeem your store balance.' },
              { title: 'How to Buy Apple Gift Card in Nepal', category: 'GIFT CARD GUIDE', image: categoryImages['Gift Cards'], copy: 'Use an Apple gift card for eligible apps, services, and subscriptions.' },
              { title: 'How to Buy Valorant Gift Card / Points', category: 'GIFT CARD GUIDE', image: categoryImages['Game Top-Up'], copy: 'Learn how Valorant Points work and how to redeem a compatible code.' },
              { title: 'How to Buy Roblox Gift Card', category: 'GIFT CARD GUIDE', image: categoryImages['Gift Cards'], copy: 'Redeem a Roblox gift card and add credit to your account.' },
              { title: 'How to Buy Steam Gift Card in Nepal (Complete 2026 Guide)', category: 'STEAM GUIDE', image: categoryImages['Steam Private Account'], copy: 'Pick a compatible Steam Wallet region, redeem your code, and shop the store.' },
            ].map((article) => (
              <article className="blog-card" key={article.title}>
                <div className="blog-card-art" style={{ backgroundImage: `linear-gradient(0deg, rgba(7,9,14,.55), transparent), url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=700&q=80)` }}>
                  <span>{article.category}</span>
                </div>
                <div>
                  <h2>{article.title}</h2>
                  <p>{article.copy}</p>
                  <button type="button" onClick={() => openShop('Gift Cards')}>Read guide <ArrowRight size={14} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="catalog-section" id="shop">
        <div className="shop-layout">
          <aside className="shop-sidebar" aria-label="Product filters">
            <div className="shop-sidebar-heading"><h2>Filters</h2><button type="button" onClick={resetShopFilters}>Reset</button></div>
            <label className="shop-sidebar-search"><span>Search</span><div><Search size={14} /><input type="search" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} placeholder="Search products" aria-label="Search products in Shop" /></div></label>
            <label className="shop-select"><span>Category</span><select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="shop-select"><span>Brand / Platform</span><select value={draftPlatform} onChange={(event) => setDraftPlatform(event.target.value)}>{platformOptions.map((platform) => <option key={platform}>{platform}</option>)}</select></label>
            <div className="shop-sort-fields"><label className="shop-select"><span>Sort By</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="date">Date</option><option value="price">Price</option></select></label><label className="shop-select"><span>Order</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="desc">Descending</option><option value="asc">Ascending</option></select></label></div>
            <div className="price-filter"><div className="price-filter-heading"><span>Price Range</span><strong>{formatPrice(draftMinPrice)} – {formatPrice(draftMaxPrice)}</strong></div><input aria-label="Minimum price slider" type="range" min="0" max={draftMaxPrice} step="250" value={draftMinPrice} onChange={(event) => setDraftMinPrice(Math.min(Number(event.target.value), draftMaxPrice))} /><input aria-label="Maximum price slider" type="range" min={draftMinPrice} max="15000" step="250" value={draftMaxPrice} onChange={(event) => setDraftMaxPrice(Math.max(Number(event.target.value), draftMinPrice))} /><div className="price-range-inputs"><label><span>Min</span><input type="number" min="0" max={draftMaxPrice} step="250" value={draftMinPrice} onChange={(event) => setDraftMinPrice(Math.min(Number(event.target.value), draftMaxPrice))} /></label><label><span>Max</span><input type="number" min={draftMinPrice} max="15000" step="250" value={draftMaxPrice} onChange={(event) => setDraftMaxPrice(Math.max(Number(event.target.value), draftMinPrice))} /></label></div></div>
            <div className="filter-actions"><button className="reset-filters" type="button" onClick={resetShopFilters}>Clear all</button><button className="apply-filters" type="button" onClick={applyShopFilters}>Apply Filters</button></div>
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
                <input type="search" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} placeholder="Search name, SKU or category" aria-label="Search products" />
                <kbd>/</kbd>
              </label>
            </div>
            <div className="catalog-controls shop-sort-summary">Sorted by {sortBy} · {sortOrder === 'desc' ? 'descending' : 'ascending'}</div>
            <div className="results-line"><span>{allFilteredProducts.length} RESULTS</span><span>SKU · SELLING PRICE · DIGITAL DELIVERY</span></div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 items-start">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    index={index}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <Search size={27} />
                <h3>No products found.</h3>
                <p>Try another title or clear your filters.</p>
                <button type="button" onClick={() => { setSearchTerm(''); setActiveCategory('All products'); setWishlistOnly(false); }}>
                  Show all products <ArrowRight size={15} />
                </button>
              </div>
            )}
            <nav className="pagination" aria-label="Product pagination">
              <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                <ArrowLeft size={15} />
              </button>
              {paginationPages.map((page) => (
                <button
                  className={page === currentPage ? 'page-current' : ''}
                  type="button"
                  key={page}
                  aria-current={page === currentPage ? 'page' : undefined}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button type="button" aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}>
                <ArrowRight size={15} />
              </button>
              <span>Page {currentPage} of {pageCount}</span>
            </nav>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="about">
        <div className="footer-about">
          <a className="footer-logo" href="#home" onClick={(event) => { event.preventDefault(); window.location.hash = 'home'; setCurrentView('home'); }}>
            HAMRO <span>GAMING STORE</span>
          </a>
          <p>Nepal’s trusted gaming store for authentic digital games, gift cards, and instant top-ups.</p>
          <strong className="footer-label">PAYMENT METHODS</strong>
          <div className="payment-tags"><span>eSewa</span><span>Khalti</span><span>Bank Transfer</span></div>
        </div>
        <div className="footer-column">
          <strong>SHOP</strong>
          <a href="#shop" onClick={(event) => { event.preventDefault(); openShop(); }}>All products</a>
          <a href="#categories" onClick={(event) => { event.preventDefault(); navigateTo('categories'); }}>Categories</a>
        </div>
        <div className="footer-column">
          <strong>COMPANY</strong>
          <a href="#about" onClick={(event) => { event.preventDefault(); window.location.hash = 'about'; setCurrentView('about'); }}>About Us</a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); window.location.hash = 'contact'; setCurrentView('contact'); }}>Contact Us</a>
          <a href="#blogs" onClick={(event) => { event.preventDefault(); navigateTo('blogs'); }}>Blogs</a>
        </div>
        <div className="footer-column">
          <strong>HELP &amp; POLICIES</strong>
          <a href="tel:+9779700979030">+977 9700979030</a>
          <a href="mailto:support@hamrogamingstore.com">support@hamrogamingstore.com</a>
          <a href="https://wa.me/9779700979030" target="_blank" rel="noreferrer">WhatsApp 24/7 Support</a>
        </div>
        <small className="footer-copyright">© 2026 Hamro Gaming Store · Instant Digital Delivery</small>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/9779700979030" target="_blank" rel="noreferrer" aria-label="Chat with Hamro Gaming Store on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.6l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2a10.3 10.3 0 0 1-5.2-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a10.2 10.2 0 1 1 8.7 4.7Zm5.6-7.6c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.1.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.1.2 2.2 3.4 5.4 4.8 2 .9 2.8 1 3.8.8.6-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" /></svg>
      </a>

      {cartOpen && (
        <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-header">
              <div>
                <span className="eyebrow"><span className="eyebrow-line" /> YOUR BAG</span>
                <h2 id="cart-title">Cart <span>({cartCount})</span></h2>
              </div>
              <button type="button" className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {cart.length ? (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-thumb" style={{ backgroundImage: `url("${item.image}")` }} />
                      <div className="cart-item-copy">
                        <span>{item.category}</span>
                        <h3>{item.name}</h3>
                        <strong>{formatPrice(item.price)}</strong>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, -1)}>
                            <Minus size={13} />
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, 1)}>
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <strong className="line-total">{formatPrice(item.price * item.quantity)}</strong>
                      <button className="remove-cart-item" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="drawer-bottom">
                  <div className="subtotal-line">
                    <span>Grand total</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <p>Instant digital credentials and codes are delivered immediately after checkout.</p>
                  <button type="button" className="primary-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>
                    Continue to checkout <ArrowRight size={17} />
                  </button>
                  <button type="button" className="text-button" onClick={() => setCartOpen(false)}>
                    <ArrowLeft size={15} /> Keep browsing
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingCart size={32} />
                <h3>Your bag is empty.</h3>
                <p>Find authentic digital games and gift cards for your next session.</p>
                <button type="button" className="primary-button" onClick={() => { setCartOpen(false); openShop(); }}>
                  Explore games <ArrowRight size={16} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="modal-header">
              <div>
                <span className="eyebrow"><span className="eyebrow-line" /> INSTANT DIGITAL DELIVERY</span>
                <h2 id="checkout-title">Checkout</h2>
              </div>
              <button type="button" className="icon-button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitOrder}>
              <div className="checkout-layout">
                <div className="checkout-fields">
                  <div className="form-section">
                    <h3><span>01</span> Customer Details</h3>
                    <p style={{ margin: '0 0 12px', fontSize: '11px', color: '#94a3b8' }}>
                      Credentials and activation codes will be delivered instantly to your Email &amp; WhatsApp.
                    </p>
                    <div className="form-grid">
                      <label className="form-field address-field">
                        <span>Full Name</span>
                        <input
                          value={customerName}
                          onChange={(event) => setCustomerName(event.target.value)}
                          placeholder="e.g. Aayush Sharma"
                          required
                        />
                      </label>
                      <label className="form-field">
                        <span>Email Address</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </label>
                      <label className="form-field">
                        <span>WhatsApp Number</span>
                        <input
                          type="tel"
                          inputMode="tel"
                          value={phoneNumber}
                          onChange={(event) => setPhoneNumber(event.target.value)}
                          placeholder="98XXXXXXXX"
                          required
                        />
                      </label>
                    </div>
                  </div>

                  {hasTopUp && (
                    <div className="form-section conditional-section">
                      <h3><span>02</span> Player Details <span className="required-tag">REQUIRED FOR TOP-UP</span></h3>
                      <p>Double-check these in-game. We’ll transfer credits straight to your profile.</p>
                      <div className="form-grid">
                        <label className="form-field">
                          <span>Player UID</span>
                          <input
                            value={playerUid}
                            onChange={(event) => setPlayerUid(event.target.value)}
                            placeholder="Enter your Player UID"
                            required
                          />
                        </label>
                        <label className="form-field">
                          <span>Server ID</span>
                          <input
                            value={serverId}
                            onChange={(event) => setServerId(event.target.value)}
                            placeholder="Enter your Server ID"
                            required
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="form-section payment-section">
                    <h3><span>{hasTopUp ? '03' : '02'}</span> Payment Option</h3>
                    <div className="payment-options">
                      {['eSewa', 'Khalti', 'Bank Transfer'].map((method) => (
                        <label
                          className={paymentMethod === method ? 'payment-option selected' : 'payment-option'}
                          key={method}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                          />
                          <span className={`payment-logo ${method.toLowerCase().replace(/\s+/g, '')}`}>
                            {method === 'Bank Transfer' ? 'B' : method === 'eSewa' ? 'e' : 'K'}
                          </span>
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
                    {cart.map((item) => (
                      <div key={item.id}>
                        <span>{item.name} <small>× {item.quantity}</small></span>
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <p><ShieldCheck size={14} /> Instant digital delivery · 100% authentic codes</p>
                  <button className="primary-button" type="submit">Place order <ArrowRight size={17} /></button>
                  <span className="secure-lock"><ShieldCheck size={13} /> ENCRYPTED CHECKOUT</span>
                </aside>
              </div>
            </form>
          </section>
        </div>
      )}

      {confirmationOpen && order && (
        <div className="overlay modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmationOpen(false); }}>
          <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
            <button type="button" className="icon-button confirmation-close" aria-label="Close order confirmation" onClick={() => setConfirmationOpen(false)}>
              <X size={20} />
            </button>
            <div className="confirmation-mark"><Check size={30} /></div>
            <span className="eyebrow"><span className="eyebrow-line" /> ORDER CONFIRMED</span>
            <h2 id="confirmation-title">You’re all <span>set.</span></h2>
            <p className="confirmation-intro">Thanks, {order.customerName}. Your order <strong>{order.orderNumber}</strong> has been received.</p>
            <div className="confirmation-details">
              <div className="confirmation-row"><span>Payment Option</span><strong>{order.paymentMethod}</strong></div>
              <div className="confirmation-row"><span>WhatsApp Number</span><strong>{order.phoneNumber}</strong></div>
              <div className="confirmation-row"><span>Email Address</span><strong>{order.email}</strong></div>
              {order.playerUid && (
                <div className="confirmation-row"><span>Player UID / Server</span><strong>{order.playerUid} / {order.serverId}</strong></div>
              )}
            </div>
            <div className="instruction-list">
              <h3>INSTANT DIGITAL DELIVERY</h3>
              {order.items.map((item) => (
                <div className="instruction-item" key={item.id}>
                  <div><strong>{item.name}</strong><span>DIGITAL DELIVERY</span></div>
                  <p>Credentials and license keys are being dispatched to your WhatsApp ({order.phoneNumber}) and Email ({order.email}).</p>
                </div>
              ))}
            </div>
            <button type="button" className="primary-button confirmation-done" onClick={() => { setConfirmationOpen(false); window.location.hash = 'home'; setCurrentView('home'); }}>
              Back to the store <ArrowRight size={17} />
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
