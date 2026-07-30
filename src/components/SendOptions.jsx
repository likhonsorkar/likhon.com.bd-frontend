import { buildWhatsappLink, buildEmailLink, buildSmsLink, openLink } from '../utils/contactLinks.js'

/**
 * Renders "Send via WhatsApp / Email / SMS" buttons. Since there's no
 * backend yet, submitting a form just opens the right app pre-filled with
 * the message — WhatsApp Web/app, the user's email client, or their SMS app.
 */
export default function SendOptions({ contact, subject, message, disabled = false }) {
  function handle(kind) {
    if (disabled || !contact) return
    if (kind === 'whatsapp') openLink(buildWhatsappLink(contact.whatsapp, message))
    if (kind === 'email') openLink(buildEmailLink(contact.email, subject, message))
    if (kind === 'sms') openLink(buildSmsLink(contact.whatsapp, message))
  }

  return (
    <div className="send-options">
      <button
        type="button"
        className="send-option send-option--whatsapp"
        onClick={() => handle('whatsapp')}
        disabled={disabled}
      >
        <span className="send-option__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.19-.31a8.2 8.2 0 0 1-1.26-4.32c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.2-8.24 8.2Zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>
        </span>
        Send via WhatsApp
      </button>
      <button
        type="button"
        className="send-option send-option--email"
        onClick={() => handle('email')}
        disabled={disabled}
      >
        <span className="send-option__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6.5 12 13l9-6.5"/><rect x="3" y="4.5" width="18" height="15" rx="2"/></svg>
        </span>
        Send via Email
      </button>
      <button
        type="button"
        className="send-option send-option--sms"
        onClick={() => handle('sms')}
        disabled={disabled}
      >
        <span className="send-option__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H7l-3 3V4Z"/></svg>
        </span>
        Send via SMS
      </button>
    </div>
  )
}
