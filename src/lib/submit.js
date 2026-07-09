/**
 * Delivers a booking submission to /api/book (a Vercel serverless function).
 * The server proxies the data to FormSubmit, so the browser is never
 * subject to CORS restrictions.
 *
 * If no delivery email is configured in the environment (local preview
 * without the API route running), we simulate success so the flow can
 * still be demonstrated end to end.
 */
export async function deliverForm(subject, data) {
  // Local preview fallback — only triggered when VITE_BOOKING_EMAIL is unset.
  // In production the server-side BOOKING_EMAIL env var is used instead.
  if (
    !import.meta.env.VITE_BOOKING_EMAIL ||
    import.meta.env.VITE_BOOKING_EMAIL.endsWith('.example')
  ) {
    console.warn('[StylTaxi] No booking email configured — simulating delivery.', data)
    await new Promise((r) => setTimeout(r, 900))
    return { simulated: true }
  }

  const res = await fetch('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _subject: subject, ...data }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Delivery failed: ${res.status}`)
  }

  return res.json()
}
