import { useEffect, useState } from 'react'

type State = 'loading' | 'success' | 'error'

export default function AuthPoint() {
  const [state, setState] = useState<State>('loading')
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Supabase puts the token in the URL hash: #access_token=eyJ...&...
    const hash = window.location.hash.slice(1) // remove leading #
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')

    if (accessToken) {
      setToken(accessToken)
      setState('success')
    } else {
      setState('error')
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: select the textarea
      const el = document.getElementById('token-box') as HTMLTextAreaElement
      el?.select()
    }
  }

  return (
    <div style={styles.page}>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoText}>airsnip</span>
        <span style={styles.logoBadge}>CLI</span>
      </div>

      <div style={styles.card}>
        {state === 'loading' && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.muted}>Reading your session…</p>
          </div>
        )}

        {state === 'error' && (
          <>
            <div style={{ ...styles.iconCircle, background: '#FEE2E2' }}>
              <span style={{ fontSize: '1.5rem' }}>✗</span>
            </div>
            <h1 style={styles.heading}>No token found</h1>
            <p style={styles.body}>
              This page is only reachable via an Airsnip magic link email.
              Head back to your terminal and run:
            </p>
            <div style={styles.codeBlock}>
              <code>airsnip login</code>
            </div>
          </>
        )}

        {state === 'success' && (
          <>
            <div style={{ ...styles.iconCircle, background: '#DCFCE7' }}>
              <span style={{ fontSize: '1.5rem' }}>✓</span>
            </div>

            <h1 style={styles.heading}>You're authenticated</h1>
            <p style={styles.body}>
              Copy the token below and paste it back into your terminal.
            </p>

            {/* Token box */}
            <div style={styles.tokenWrapper}>
              <textarea
                id="token-box"
                readOnly
                value={token}
                style={styles.tokenBox}
                rows={4}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <button
                onClick={handleCopy}
                style={{
                  ...styles.copyBtn,
                  background: copied ? '#22C55E' : '#0EA5E9',
                }}
              >
                {copied ? '✓  Copied!' : 'Copy token'}
              </button>
            </div>

            {/* Step reminder */}
            <div style={styles.steps}>
              <p style={styles.stepLabel}>Back in your terminal:</p>
              <div style={styles.codeBlock}>
                <code>? Paste access token: <span style={{ color: '#0EA5E9' }}>█</span></code>
              </div>
              <p style={styles.muted}>
                Paste the token above at that prompt and press <kbd style={styles.kbd}>Enter</kbd>.
              </p>
            </div>

            <p style={styles.safeToClose}>
              ✓ &nbsp;Safe to close this tab after copying.
            </p>
          </>
        )}
      </div>

      <p style={styles.footer}>
        <a href="https://airsnip-vercel.vercel.app" style={{ color: '#0EA5E9' }}>
          airsnip-vercel.vercel.app
        </a>
      </p>
    </div>
  )
}

// ── Inline styles (no Tailwind, stays self-contained) ────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0F172A',
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
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#F8FAFC',
    fontFamily: "'DM Mono', monospace",
  },
  logoBadge: {
    fontSize: '0.7rem',
    fontWeight: 600,
    background: '#0EA5E9',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '100px',
    letterSpacing: '0.05em',
  },
  card: {
    background: '#1E293B',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25rem',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem 0',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid #334155',
    borderTop: '3px solid #0EA5E9',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#F8FAFC',
    textAlign: 'center',
  },
  body: {
    fontSize: '0.95rem',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  tokenWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },
  tokenBox: {
    width: '100%',
    background: '#0F172A',
    border: '1px solid #334155',
    borderRadius: '10px',
    padding: '0.875rem 1rem',
    color: '#38BDF8',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.78rem',
    lineHeight: 1.6,
    resize: 'none',
    cursor: 'text',
    wordBreak: 'break-all',
  },
  copyBtn: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    letterSpacing: '0.01em',
  },
  steps: {
    width: '100%',
    background: '#0F172A',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '1.125rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },
  stepLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  codeBlock: {
    background: '#020617',
    border: '1px solid #1E293B',
    borderRadius: '8px',
    padding: '0.625rem 0.875rem',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.82rem',
    color: '#94A3B8',
  },
  muted: {
    fontSize: '0.85rem',
    color: '#64748B',
    textAlign: 'center',
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid #334155',
    borderRadius: '4px',
    padding: '1px 6px',
    fontSize: '0.8rem',
    color: '#94A3B8',
  },
  safeToClose: {
    fontSize: '0.82rem',
    color: '#22C55E',
    textAlign: 'center',
  },
  footer: {
    marginTop: '1.5rem',
    fontSize: '0.8rem',
    color: '#475569',
  },
}
