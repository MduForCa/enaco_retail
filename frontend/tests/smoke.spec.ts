import { test, expect } from '@playwright/test'

const API_URL = process.env.API_URL ?? 'http://localhost:8000'

test.describe('ENACO Retail POS', () => {
  test('page loads with branding and product workspace', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // --- Branding ---
    await expect(
      page.getByRole('heading', { name: 'ENACO RETAIL' })
    ).toBeVisible()

    await expect(page.getByText('Point of Sale')).toBeVisible()

    // --- Header values (testids avoid the "Cashier" label/value clash) ---
    await expect(page.getByTestId('register-number')).toHaveText('01')
    await expect(page.getByTestId('cashier-name')).toHaveText('Cashier')

    // --- Workspace sections ---
    await expect(
      page.getByRole('heading', { name: 'Find Product' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Add Product' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Products', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Current Sale' })
    ).toBeVisible()
  })

  test('creating a product adds it to the list', async ({ page, request }) => {
    const sku = `TEST-${Date.now()}`
    const name = `Test Widget ${sku}`

    // --- Cleanup safety net at the start (best-effort) ---
    await request
      .delete(`${API_URL}/api/products/${encodeURIComponent(sku)}/`)
      .catch(() => {})

    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Wait until the product list has rendered
    await expect(page.getByText(/\d+ products?/)).toBeVisible()

    // --- Create the product ---
    await page.getByLabel('Name').fill(name)
    await page.getByLabel('SKU').fill(sku)
    await page.getByLabel('Selling Price').fill('12.50')
    await page.getByRole('button', { name: 'Create Product' }).click()

    // --- Assert the new row is present and correct ---
    const row = page.getByTestId(`product-row-${sku}`)
    await expect(row).toBeVisible()
    await expect(row).toContainText(name)
    await expect(row).toContainText(sku)
    await expect(row).toContainText('E12.50')

    // --- Cleanup: delete the product we just created (best-effort) ---
    await request
      .delete(`${API_URL}/api/products/${encodeURIComponent(sku)}/`)
      .catch(() => {})
  })
})