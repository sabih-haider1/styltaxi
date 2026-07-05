const ENDPOINT_EMAIL = import.meta.env.VITE_BOOKING_EMAIL

/**
 * Delivers a submission through FormSubmit's AJAX endpoint — no backend needed.
 * If no delivery email is configured (local preview), we simulate success so
 * the flow can be demonstrated end to end.
 */
export async function deliverForm(subject, data) {
  if (!ENDPOINT_EMAIL || ENDPOINT_EMAIL.endsWith('.example')) {
    console.warn('[StylTaxi] VITE_BOOKING_EMAIL not configured — simulating delivery.', data)
    await new Promise((r) => setTimeout(r, 900))
    return { simulated: true }
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ENDPOINT_EMAIL)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...data,
    }),
  })
  if (!res.ok) throw new Error(`Delivery failed: ${res.status}`)
  const body = await res.json()
  // FormSubmit answers 200 with success:"false" both for the one-time
  // activation notice (fine — the message was queued for activation) and for
  // genuine rejections (not fine). Only the activation case counts as sent.
  const failed = String(body.success) === 'false' && !/activat/i.test(body.message || '')
  if (failed) throw new Error(body.message || 'Delivery rejected')
  return body
}
