/**
 * Turns a { Label: value } object into a plain-text message block,
 * skipping any empty fields.
 */
export function buildMessage(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value && String(value).trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

/** Strip everything except digits (wa.me and sms: both want a clean number). */
function cleanPhone(phone) {
  return String(phone || '').replace(/[^\d]/g, '')
}

export function buildWhatsappLink(phone, message) {
  return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`
}

export function buildEmailLink(to, subject, message) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

export function buildSmsLink(phone, message) {
  // Most mobile OSes accept `sms:<number>?body=<text>`
  return `sms:${cleanPhone(phone)}?body=${encodeURIComponent(message)}`
}

/** Opens a link in a new tab (WhatsApp/email/SMS deep links). */
export function openLink(href) {
  window.open(href, '_blank', 'noopener,noreferrer')
}
