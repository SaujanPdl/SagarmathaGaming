import { useEffect, useState } from 'react'
import { apiRequest } from '../api'

const statuses = ['PENDING', 'PAYMENT_REVIEW', 'PROCESSING', 'COMPLETED', 'CANCELLED']
const emptyProduct = { name: '', slug: '', category: 'GAME', price: '', deliveryType: 'MANUAL' }

export default function AdminDashboard() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [products, setProducts] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [product, setProduct] = useState(emptyProduct)
  const [message, setMessage] = useState('')

  async function load() {
    const [orderData, paymentData, productData] = await Promise.all([
      apiRequest('/api/admin/orders'),
      apiRequest('/api/admin/payments'),
      apiRequest('/api/admin/products'),
    ])
    setOrders(orderData)
    setPayments(paymentData)
    setProducts(productData)
  }

  useEffect(() => { load().catch((error) => setMessage(error.message)) }, [])

  async function updateOrderStatus(orderNumber, status) {
    await apiRequest(`/api/admin/orders/${orderNumber}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
    await load()
  }

  async function reviewPayment(id, action) {
    await apiRequest(`/api/admin/payments/${id}/${action}`, { method: 'PATCH' })
    await load()
  }

  async function saveProduct(event) {
    event.preventDefault()
    await apiRequest('/api/admin/products', { method: 'POST', body: JSON.stringify({ ...product, price: Number(product.price) }) })
    setProduct(emptyProduct)
    setMessage('Product created')
    await load()
  }

  async function deliver(orderNumber) {
    const code = window.prompt('Digital code or delivery details')
    if (!code) return
    await apiRequest(`/api/admin/orders/${orderNumber}/delivery`, { method: 'POST', body: JSON.stringify({ deliveryType: 'DIGITAL_CODE', code }) })
    await load()
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><span className="text-xs uppercase tracking-[0.2em] text-cyan-400">Operations</span><h1 className="text-3xl font-black">Admin dashboard</h1></div>
        <a href="#home" className="text-sm text-slate-400 hover:text-white">Back to store</a>
      </div>
      {message && <p className="mb-4 text-sm text-amber-300">{message}</p>}
      <div className="flex gap-2 border-b border-slate-800 mb-6">
        {['orders', 'payments', 'products'].map((item) => <button key={item} onClick={() => setTab(item)} className={`px-4 py-3 text-sm font-bold capitalize border-b-2 ${tab === item ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400'}`}>{item}</button>)}
      </div>
      {tab === 'orders' && <div className="space-y-3">{orders.map((order) => <article key={order.orderNumber} className="bg-[#0e1629] border border-slate-800 rounded-xl p-4"><div className="flex flex-wrap justify-between gap-3"><div><strong className="text-cyan-300">{order.orderNumber}</strong><p className="text-sm text-white">{order.customerName} · {order.customerEmail}</p><p className="text-xs text-slate-400">Rs. {Number(order.totalAmount).toLocaleString()} · {order.paymentStatus}</p></div><div className="flex gap-2 items-start"><select value={order.status} onChange={(event) => updateOrderStatus(order.orderNumber, event.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs">{statuses.map((status) => <option key={status}>{status}</option>)}</select><button onClick={() => setSelectedOrder(order)} className="px-3 py-2 rounded-lg bg-slate-800 text-xs">Details</button><button onClick={() => deliver(order.orderNumber)} className="px-3 py-2 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold">Deliver</button></div></div>{selectedOrder?.orderNumber === order.orderNumber && <pre className="mt-4 overflow-auto text-xs text-slate-300 bg-slate-950 p-3 rounded-lg">{JSON.stringify(order, null, 2)}</pre>}</article>)}</div>}
      {tab === 'payments' && <div className="space-y-3">{payments.map((payment) => <article key={payment.id} className="bg-[#0e1629] border border-slate-800 rounded-xl p-4 flex flex-wrap justify-between gap-3"><div><strong className="text-cyan-300">{payment.order?.orderNumber}</strong><p className="text-sm">{payment.method} · Rs. {Number(payment.amount).toLocaleString()} · {payment.status}</p>{payment.proofUrl && <a className="text-xs text-cyan-400 underline" href={payment.proofUrl} target="_blank" rel="noreferrer">View payment proof</a>}</div>{payment.status === 'PENDING' && <div className="flex gap-2"><button onClick={() => reviewPayment(payment.id, 'verify')} className="px-3 py-2 rounded-lg bg-emerald-400 text-slate-950 text-xs font-bold">Verify</button><button onClick={() => reviewPayment(payment.id, 'reject')} className="px-3 py-2 rounded-lg bg-rose-500 text-white text-xs font-bold">Reject</button></div>}</article>)}</div>}
      {tab === 'products' && <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6"><form onSubmit={saveProduct} className="bg-[#0e1629] border border-slate-800 rounded-xl p-5 space-y-3"><h2 className="font-bold">Add product</h2>{[['name', 'Name'], ['slug', 'Slug'], ['price', 'Price']].map(([key, label]) => <input key={key} required value={product[key]} onChange={(event) => setProduct({ ...product, [key]: event.target.value })} placeholder={label} className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-700 text-sm" />)}<select value={product.category} onChange={(event) => setProduct({ ...product, category: event.target.value })} className="w-full h-10 bg-slate-950 border border-slate-700 rounded-lg text-sm">{['GAME', 'GIFT_CARD', 'TOP_UP', 'SUBSCRIPTION'].map((value) => <option key={value}>{value}</option>)}</select><select value={product.deliveryType} onChange={(event) => setProduct({ ...product, deliveryType: event.target.value })} className="w-full h-10 bg-slate-950 border border-slate-700 rounded-lg text-sm">{['MANUAL', 'DIGITAL_CODE', 'TOP_UP'].map((value) => <option key={value}>{value}</option>)}</select><button className="w-full h-10 rounded-lg bg-cyan-400 text-slate-950 font-bold text-sm">Create product</button></form><div className="space-y-2">{products.map((item) => <div key={item.id} className="bg-[#0e1629] border border-slate-800 rounded-xl p-4 flex justify-between"><span>{item.name}<small className="block text-slate-400">Rs. {Number(item.price).toLocaleString()} · {item.isActive ? 'Active' : 'Disabled'}</small></span><button onClick={() => apiRequest(`/api/admin/products/${item.id}`, { method: 'DELETE' }).then(load)} className="text-xs text-rose-400">Disable</button></div>)}</div></div>}
    </main>
  )
}
