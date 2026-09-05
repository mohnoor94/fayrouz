/**
 * Fayrouz (فيروز) — Kiosk & POS Helper Utilities
 */

export function calculateOrderTotals(orderTray = [], taxRate = 0.08) {
  const subtotal = orderTray.reduce((acc, item) => {
    const price = typeof item.effectivePrice === 'number' ? item.effectivePrice : (item.price || 0)
    const qty = item.quantity || 1
    return acc + (price * qty)
  }, 0)

  const tax = subtotal * taxRate
  const total = subtotal + tax
  const itemCount = orderTray.reduce((acc, item) => acc + (item.quantity || 1), 0)

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount
  }
}

export function generateOrderTicketNumber() {
  const randomNum = Math.floor(10 + Math.random() * 90)
  return `#FYZ-0${randomNum}`
}
