import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { apiGet, apiPost, apiDelete } from './api/client'
import './App.css'

type Product = {
  id: number
  name: string
  sku: string
  barcode: string | null
  selling_price: string
  created_at: string
  updated_at: string
}

type NewProduct = {
  name: string
  sku: string
  barcode: string
  selling_price: string
}

const emptyForm: NewProduct = {
  name: '',
  sku: '',
  barcode: '',
  selling_price: '',
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<NewProduct>(emptyForm)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const [deletingSku, setDeletingSku] = useState<string | null>(null)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  async function loadProducts() {
    setLoading(true)

    try {
      const data = await apiGet<Product[]>('/products/')
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleSearch() {
    const term = searchTerm.trim()

    if (!term) {
      await loadProducts()
      return
    }

    setLoading(true)
    setError(null)

    try {
      const product = await apiGet<Product>(
        `/products/${encodeURIComponent(term)}/`
      )

      setProducts([product])
    } catch (err) {
      setProducts([])
      setError('Product not found')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    setCreating(true)
    setCreateError(null)

    const payload: Record<string, string> = {
      name: form.name,
      sku: form.sku,
      selling_price: form.selling_price,
    }

    if (form.barcode.trim() !== '') {
      payload.barcode = form.barcode
    }

    try {
      await apiPost<Product>('/products/', payload)
      setForm(emptyForm)
      await loadProducts()
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : 'Failed to create product'
      )
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(sku: string) {
    if (!window.confirm(`Delete product ${sku}?`)) return

    setDeletingSku(sku)

    try {
      await apiDelete(`/products/${encodeURIComponent(sku)}/`)
      await loadProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
    } finally {
      setDeletingSku(null)
    }
  }

  async function handleDeleteAllTest() {
    const testProducts = products.filter((p) => p.sku.startsWith('TEST-'))

    if (testProducts.length === 0) {
      window.alert('No TEST-* products to delete.')
      return
    }

    if (
      !window.confirm(
        `Delete ${testProducts.length} TEST-* product(s)? This cannot be undone.`
      )
    ) {
      return
    }

    setBulkDeleting(true)
    setError(null)

    try {
      for (const p of testProducts) {
        try {
         await apiDelete(`/products/sku/${encodeURIComponent(sku)}/`)
        } catch (err) {
          console.error(`Failed to delete ${p.sku}:`, err)
        }
      }

      await loadProducts()
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="h-16 border-b-2 border-slate-700 bg-white">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              E
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-wide">
                ENACO RETAIL
              </h1>

              <p className="text-xs text-slate-400">
                Point of Sale
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Register
              </p>

              <p
                className="text-sm font-bold"
                data-testid="register-number"
              >
                01
              </p>
            </div>

            <div className="h-8 w-px bg-slate-500" />

            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Cashier
              </p>

              <p
                className="text-sm font-bold"
                data-testid="cashier-name"
              >
                Cashier
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-4rem)] grid-cols-[minmax(0,1fr)_400px]">
        {/* =======================================================
            LEFT — PRODUCT WORKSPACE
        ======================================================= */}
        <section className="min-w-0 border-r-2 border-slate-700 bg-white">
          <div className="mx-auto max-w-6xl px-10 py-10">

            {/* FIND PRODUCT */}
            <section className="rounded-xl border-2 border-slate-500 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-bold">
                  Find Product
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Scan a barcode or search by product name or SKU.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Scan barcode or search..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="h-12 flex-1 rounded-lg border-2 border-slate-400 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="h-12 rounded-lg border-2 border-blue-700 bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </section>

            {/* ADD PRODUCT */}
            <section className="mt-8 rounded-xl border-2 border-slate-500 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold">
                  Add Product
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Create a new product in the catalogue
                </p>
              </div>

              <form
                onSubmit={handleCreate}
                className="grid grid-cols-2 gap-4"
              >
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Name
                  </span>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg border-2 border-slate-400 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">
                    SKU
                  </span>

                  <input
                    type="text"
                    required
                    value={form.sku}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sku: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg border-2 border-slate-400 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Barcode (optional)
                  </span>

                  <input
                    type="text"
                    value={form.barcode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        barcode: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg border-2 border-slate-400 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Selling Price
                  </span>

                  <input
                    type="text"
                    required
                    inputMode="decimal"
                    placeholder="e.g. 10.00"
                    value={form.selling_price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        selling_price: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg border-2 border-slate-400 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </label>

                <div className="col-span-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={creating}
                    className="h-11 rounded-lg border-2 border-blue-700 bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {creating ? 'Creating…' : 'Create Product'}
                  </button>

                  {createError && (
                    <p className="text-sm text-red-600">
                      Failed to create product
                    </p>
                  )}
                </div>
              </form>
            </section>

            {/* PRODUCTS */}
            <section className="mt-8 rounded-xl border-2 border-slate-500 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-slate-500 px-6 py-5">
                <div>
                  <h2 className="text-base font-bold">
                    Products
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Search results
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-testid="delete-all-test-products"
                    onClick={handleDeleteAllTest}
                    disabled={bulkDeleting || loading}
                    className="rounded-lg border-2 border-red-400 bg-white px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {bulkDeleting ? 'Deleting…' : 'Delete TEST-*'}
                  </button>

                  <span className="rounded-full border-2 border-slate-400 px-3 py-1 text-xs font-semibold text-slate-600">
                    {loading
                      ? 'Loading…'
                      : `${products.length} products`}
                  </span>
                </div>
              </div>

              {error && (
                <p className="px-6 py-5 text-sm text-red-600">
                  {error}
                </p>
              )}

              {!loading &&
                !error &&
                products.length === 0 && (
                  <p className="px-6 py-5 text-sm text-slate-400">
                    No products yet. Add one above.
                  </p>
                )}

              {!loading &&
                !error &&
                products.length > 0 && (
                  <div className="divide-y divide-slate-200">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        data-testid={`product-row-${product.sku}`}
                        className="flex w-full items-center justify-between px-6 py-5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-100 text-sm font-bold text-slate-700">
                            {product.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {product.sku}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-sm font-bold">
                            E{Number(product.selling_price).toFixed(2)}
                          </p>

                          <button
                            type="button"
                            data-testid={`delete-product-${product.sku}`}
                            onClick={() => handleDelete(product.sku)}
                            disabled={deletingSku === product.sku}
                            title={`Delete ${product.sku}`}
                            className="h-9 rounded-lg border-2 border-red-400 bg-white px-4 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingSku === product.sku
                              ? 'Deleting…'
                              : 'Delete'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </section>

          </div>
        </section>

        {/* =======================================================
            RIGHT — CURRENT SALE
        ======================================================= */}
        <aside className="flex min-h-0 flex-col bg-slate-100">
          <div className="border-b-2 border-slate-700 bg-white px-6 py-5">
            <h2 className="text-base font-bold">
              Current Sale
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Items in this transaction
            </p>
          </div>

          <div className="flex-1 overflow-auto px-5 py-5">
            <p className="text-sm text-slate-400">
              No items yet.
            </p>
          </div>

          <div className="border-t-2 border-slate-700 bg-white">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Items
                </p>

                <p className="mt-1 text-lg font-bold">
                  0
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total
                </p>

                <p className="mt-1 text-3xl font-bold">
                  E0.00
                </p>
              </div>
            </div>

            <div className="border-t-2 border-slate-500 p-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 rounded-lg border-2 border-slate-500 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="h-11 rounded-lg border-2 border-red-400 bg-white text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>

              <button
                type="button"
                className="mt-3 h-12 w-full rounded-lg border-2 border-blue-700 bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Process Sale
              </button>
            </div>
          </div>
        </aside>

      </main>
    </div>
  )
}

export default App