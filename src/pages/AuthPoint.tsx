import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type State = 'loading' | 'success' | 'done' | 'error'
type LoginMode = 'callback' | 'manual'  // callback = CLI browser flow, manual = copy-paste fallback

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function AuthPoint() {
  const [state, setState] = useState<State>('loading')
  const [mode, setMode] = useState<LoginMode>('callback')
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState(false)
  const [callbackStatus, setCallbackStatus] = useState<'sending' | 'sent' | 'failed'>('sending')

  useEffect(() => {
    // 1. Parse the hash from Supabase magic link
    // Format: #access_token=eyJ...&refresh_token=abc...&token_type=bearer
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token') ?? ''

    // 2. Check if we have a CLI callback URL in the query string
    const searchParams = new URLSearchParams(window.location.search)
    const callbackUrl = searchParams.get('callback')

    if (!accessToken) {
      setState('error')
      return
    }

    // Build the base64 token blob (for manual copy-paste fallback)
    const combined = btoa(JSON.stringify({ a: accessToken, r: refreshToken }))
    setToken(combined)

    if (callbackUrl) {
      // CLI browser flow: POST tokens directly to the local CLI server
      setMode('callback')
      setState('success')

      fetch(callbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
      })
        .then((res) => {
          if (res.ok) {
            setCallbackStatus('sent')
            setState('done')
          } else {
            setCallbackStatus('failed')
            setMode('manual') // fall back to manual copy
          }
        })
        .catch(() => {
          setCallbackStatus('failed')
          setMode('manual') // fall back to manual copy
        })
    } else {
      // Manual flow: show copy-paste instructions
      setMode('manual')
      setState('success')
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const el = document.getElementById('token-box') as HTMLTextAreaElement
      el?.select()
    }
  }

  return (
    <div style={styles.page}>
      {/* Branding */}
      <div style={styles.logo}>
        <span style={styles.logoText}>airsnip</span>
        <span style={styles.logoBadge}>CLI</span>
      </div>

      <div style={styles.card}>
        {/* ── Loading ──────────────────────────────────────────────────── */}
        {state === 'loading' && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.muted}>Authenticating session…</p>
          </div>
        )}

        {/* ── Error (no token in URL) ───────────────────────────────────── */}
        {state === 'error' && (
          <>
            <div style={{ ...styles.iconCircle, background: 'var(--bg-light)' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--error)' }}>✗</span>
            </div>
            <h1 style={styles.heading}>Session Expired</h1>
            <p style={styles.body}>
              Please return to your terminal and run <code>airsnip login</code> again.
            </p>
          </>
        )}

        {/* ── Sending to CLI callback ───────────────────────────────────── */}
        {state === 'success' && mode === 'callback' && callbackStatus === 'sending' && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.muted}>Syncing with your local terminal…</p>
          </div>
        )}

        {/* ── Done — CLI received the token (Shallow Success) ───────────── */}
        {state === 'done' && (
          <div style={styles.center}>
            <div style={{ ...styles.iconCircle, background: 'var(--bg-light)' }}>
              <CheckIcon size={32} />
            </div>
            <h1 style={styles.heading}>Success</h1>
            <p style={styles.body}>You can now close this tab and resume in CLI.</p>
          </div>
        )}

        {/* ── Manual fallback (no callback URL or callback failed) ─────── */}
        {(state === 'success' && mode === 'manual') && (
          <>
            <div style={{ ...styles.iconCircle, background: 'var(--bg-light)' }}>
              <CheckIcon size={24} />
            </div>

            <h1 style={styles.heading}>Authenticated</h1>
            <p style={styles.body}>
              {callbackStatus === 'failed'
                ? 'Manual sync required. Paste this token into your terminal.'
                : 'Copy the token below and paste it into your terminal prompt.'
              }
            </p>

            {/* Token box */}
            <div style={styles.tokenWrapper}>
              <textarea
                id="token-box"
                readOnly
                value={token}
                style={styles.tokenBox}
                rows={3}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <button
                onClick={handleCopy}
                style={{
                  ...styles.copyBtn,
                  background: copied ? 'var(--success)' : 'var(--primary)',
                }}
              >
                {copied ? '✓  Copied!' : 'Copy auth token'}
              </button>
            </div>
          </>
        )}
      </div>

      <p style={styles.footer}>
        <a href="/" style={{ color: 'var(--text-muted)' }}>
          ← Back to home
        </a>
      </p>
    </div>
  )
}

function CheckIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg-light)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    fontFamily: "'DM Sans', sans-serif",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: "'DM Mono', monospace",
  },
  logoBadge: {
    fontSize: '0.6rem',
    fontWeight: 700,
    background: 'var(--text-primary)',
    color: '#fff',
    padding: '1px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  card: {
    background: 'var(--white)',
    border: '1px solid var(--border-blue)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    width: '100%',
    maxWidth: '440px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    textAlign: 'center',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid var(--bg-light)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  body: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  tokenWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  tokenBox: {
    width: '100%',
    background: 'var(--bg-light)',
    border: '1px solid var(--border-blue)',
    borderRadius: '12px',
    padding: '1rem',
    color: 'var(--primary-dark)',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.8rem',
    lineHeight: 1.5,
    resize: 'none',
    wordBreak: 'break-all',
  },
  copyBtn: {
    width: '100%',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.9rem',
  },
  muted: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  }
}
