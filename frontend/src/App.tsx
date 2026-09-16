import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="h-16 border-b-2 border-slate-700 bg-white">
        <div className="flex h-full items-center justify-between px-6">
          {/* Brand */}
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

          {/* Register / Cashier */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Register
              </p>

              <p className="text-sm font-bold">
                01
              </p>
            </div>

            <div className="h-8 w-px bg-slate-500" />

            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Cashier
              </p>

              <p className="text-sm font-bold">
                Cashier
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN POS WORKSPACE
      ========================================================= */}
      <main className="grid min-h-[calc(100vh-4rem)] grid-cols-[minmax(0,1fr)_400px]">

        {/* =======================================================
            LEFT — PRODUCT WORKSPACE
        ======================================================= */}
        <section className="min-w-0 border-r-2 border-slate-700 bg-white">
          <div className="mx-auto max-w-6xl px-10 py-10">

            {/* =================================================
                FIND PRODUCT
            ================================================= */}
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
                  className="h-12 rounded-lg border-2 border-blue-700 bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </section>

            {/* =================================================
                QUICK PRODUCTS
            ================================================= */}
            <section className="mt-8 rounded-xl border-2 border-slate-500 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold">
                  Quick Products
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Frequently sold items
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">

                <button
                  type="button"
                  className="rounded-lg border-2 border-slate-400 bg-slate-50 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-sm font-bold">
                    Coca-Cola
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    E10.00
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-lg border-2 border-slate-400 bg-slate-50 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-sm font-bold">
                    Bread
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    E18.00
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-lg border-2 border-slate-400 bg-slate-50 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-sm font-bold">
                    Milk
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    E15.00
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-lg border-2 border-slate-400 bg-slate-50 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <p className="text-sm font-bold">
                    Sugar
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    E22.00
                  </p>
                </button>

              </div>
            </section>

            {/* =================================================
                PRODUCTS
            ================================================= */}
            <section className="mt-8 rounded-xl border-2 border-slate-500 bg-white shadow-sm">

              {/* Products Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-500 px-6 py-5">
                <div>
                  <h2 className="text-base font-bold">
                    Products
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Search results
                  </p>
                </div>

                <span className="rounded-full border-2 border-slate-400 px-3 py-1 text-xs font-semibold text-slate-600">
                  3 products
                </span>
              </div>

              {/* Product List */}
              <div className="divide-y divide-slate-200">

                {/* Product 1 */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-100 text-sm font-bold text-slate-700">
                      C
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Coca-Cola 500ml
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        COKE-500
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold">
                    E10.00
                  </p>
                </button>

                {/* Product 2 */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-100 text-sm font-bold text-slate-700">
                      B
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Bread 700g
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        BREAD-700
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold">
                    E18.00
                  </p>
                </button>

                {/* Product 3 */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-100 text-sm font-bold text-slate-700">
                      M
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Milk 1L
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        MILK-1L
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold">
                    E15.00
                  </p>
                </button>

              </div>
            </section>

          </div>
        </section>

        {/* =======================================================
            RIGHT — CURRENT SALE
        ======================================================= */}
        <aside className="flex min-h-0 flex-col bg-slate-100">

          {/* =====================================================
              CURRENT SALE HEADER
          ===================================================== */}
          <div className="border-b-2 border-slate-700 bg-white px-6 py-5">
            <h2 className="text-base font-bold">
              Current Sale
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Items in this transaction
            </p>
          </div>

          {/* =====================================================
              SALE ITEMS
          ===================================================== */}
          <div className="flex-1 overflow-auto px-5 py-5">

            {/* Item 1 */}
            <div className="rounded-lg border-2 border-slate-400 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">
                    Coca-Cola 500ml
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    2 × E10.00
                  </p>
                </div>

                <p className="text-sm font-bold">
                  E20.00
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="mt-3 rounded-lg border-2 border-slate-400 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">
                    Bread 700g
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    1 × E18.00
                  </p>
                </div>

                <p className="text-sm font-bold">
                  E18.00
                </p>
              </div>
            </div>

          </div>

          {/* =====================================================
              SALE SUMMARY
          ===================================================== */}
          <div className="border-t-2 border-slate-700 bg-white">

            <div className="flex items-center justify-between px-6 py-5">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Items
                </p>

                <p className="mt-1 text-lg font-bold">
                  3
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total
                </p>

                <p className="mt-1 text-3xl font-bold">
                  E38.00
                </p>
              </div>

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}
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