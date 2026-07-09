/**
 * Vercel serverless function — POST /api/book
 *
 * Receives the booking payload from the browser and sends it via Resend.
 *
 * Environment variables required (set in Vercel project settings):
 *   RESEND_API_KEY — The API key generated in the Resend dashboard
 *   RESEND_FROM    — The verified domain address (e.g. bookings@styltaxi.com)
 *   BOOKING_EMAIL  — The destination address (e.g. arslan_ali_javed@yahoo.com)
 */

import { Resend } from 'resend'

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM
  const toEmail = process.env.BOOKING_EMAIL

  const missing = []
  if (!apiKey) missing.push('RESEND_API_KEY')
  if (!fromEmail) missing.push('RESEND_FROM')
  if (!toEmail) missing.push('BOOKING_EMAIL')

  if (missing.length > 0) {
    console.error('[api/book] Missing environment variables:', missing.join(', '))
    return res.status(500).json({ error: `Server misconfiguration: Missing ${missing.join(', ')}` })
  }

  const resend = new Resend(apiKey)

  let payload
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  // Extract the subject, then remove it and other internal keys from the payload
  const subject = payload._subject || 'New Passenger Booking'
  delete payload._subject
  delete payload._template
  delete payload._captcha

  // Generate a clean HTML table for the email body (replicating FormSubmit's table template)
  const rows = Object.entries(payload)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      // Capitalize the key (e.g. "fullName" -> "Full Name")
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-family: sans-serif; font-weight: bold; color: #374151; width: 30%;">${label}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-family: sans-serif; color: #111827;">${value}</td>
        </tr>
      `
    })
    .join('')

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      <h2 style="color: #056438; margin-bottom: 24px;">${subject}</h2>
      <table style="width: 100%; border-collapse: collapse; text-align: left; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">Sent via StylTaxi Website</p>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: `StylTaxi Bookings <${fromEmail}>`,
      to: [toEmail],
      replyTo: payload.email, // So they can hit "Reply" and email the customer back directly!
      subject: subject,
      html: html,
    })

    if (error) {
      console.error('[api/book] Resend API error:', error)
      return res.status(502).json({ error: error.message || 'Email delivery failed' })
    }

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('[api/book] Resend crash:', err)
    return res.status(500).json({ error: 'Internal server error while sending email' })
  }
}
