/**
 * Vercel serverless function — POST /api/book
 *
 * Receives the booking payload from the browser and forwards it to
 * FormSubmit on the server side. Server-to-server calls are never
 * subject to CORS, so this completely bypasses the CORS block that
 * happens when the browser tries to call FormSubmit directly.
 *
 * Environment variable required (set in Vercel project settings):
 *   BOOKING_EMAIL  — the delivery address (e.g. arslan_ali_javed@yahoo.com)
 *
 * Note: Vercel serverless functions use CommonJS by default (no "type":"module"
 * in the api/ directory), so we use require() here.
 */

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = process.env.BOOKING_EMAIL
  if (!email) {
    console.error('[api/book] BOOKING_EMAIL env var is not set')
    return res.status(500).json({ error: 'Server misconfiguration' })
  }

  let payload
  try {
    // Vercel automatically parses JSON bodies when Content-Type is application/json
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  try {
    const upstream = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _template: 'table',
          _captcha: 'false',
          ...payload,
        }),
      }
    )

    const body = await upstream.json()

    // FormSubmit returns success:"false" for both the one-time activation
    // notice and genuine errors. Only treat it as an error if the message
    // doesn't mention activation.
    const failed =
      String(body.success) === 'false' && !/activat/i.test(body.message || '')

    if (!upstream.ok || failed) {
      console.error('[api/book] FormSubmit rejected:', body)
      return res.status(502).json({ error: body.message || 'Delivery rejected' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/book] Upstream fetch failed:', err)
    return res.status(502).json({ error: 'Could not reach delivery service' })
  }
}
