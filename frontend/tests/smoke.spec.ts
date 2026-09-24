import { test, expect } from '@playwright/test'

test.describe('ENACO Retail POS - page loads', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {waitUntil: 'domcontentloaded'})
  })

  test('branding is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ENACO RETAIL' })).toBeVisible()
    await expect(page.getByText('Point of Sale')).toBeVisible()
  })

  test('register and cashier are shown in the header', async ({ page }) => {
    await expect(page.getByText('Register')).toBeVisible()
    await expect(page.getByText('01')).toBeVisible()
    await expect(page.getByText('Cashier', { exact: true })).toBeVisible()
  })

  test('find product section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Find Product' })).toBeVisible()
    await expect(page.getByPlaceholder('Scan barcode or search...')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible()
  })

  test('quick products are shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Quick Products' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Coca-Cola/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Bread/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Milk/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Sugar/ })).toBeVisible()
  })

  test('products list shows the expected items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible()
    await expect(page.getByText('3 products')).toBeVisible()
    await expect(page.getByText('Coca-Cola 500ml')).toBeVisible()
    await expect(page.getByText('Bread 700g')).toBeVisible()
    await expect(page.getByText('Milk 1L')).toBeVisible()
  })

  test('current sale panel shows summary', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Current Sale' })).toBeVisible()
    await expect(page.getByText('E38.00')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Process Sale' })).toBeVisible()
  })
})