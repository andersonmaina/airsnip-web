import React, { useState, useEffect, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Hero = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const [errorStatus, setErrorStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 400)
      return
    }

    setLoading(true)
    setErrorStatus(null)
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error
      setSubmitted(true)
    } catch (error) {
      console.error('Error joining waitlist:', error)
      setErrorStatus('Something went wrong. Please check your connection.')
      setTimeout(() => setErrorStatus(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="hero container" style={{
      textAlign: 'center',
      paddingTop: 'min(8rem, 15vh)',
      paddingBottom: '4rem'
    }}>
      {errorStatus && (
        <div className="toast-container">
          <div className="toast">
            <div style={{ color: 'var(--error)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <span>{errorStatus}</span>
          </div>
        </div>
      )}
      <div className="badge-pill" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-light)',
        color: 'var(--primary-dark)',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
        marginBottom: '2rem'
      }}>
        <div className="pulse-dot"></div>
        Now available on npm
      </div>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        animation: 'slideUp 500ms ease-out forwards'
      }}>AirDrop for developer teams & LLMs.</h1>
      <p className="subtitle" style={{
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
        color: 'var(--text-muted)',
        maxWidth: '600px',
        margin: '0 auto 3rem',
        padding: '0 1rem'
      }}>
        Push files, folders, or AST-parsed functions from your terminal. 
        Teammates and AI agents can pull snippets instantly — zero context switching, 
        zero manual copy-paste.
      </p>

      <div className="waitlist-container" style={{ maxWidth: '500px', margin: '0 auto 1.5rem', width: '100%' }}>
        {!submitted ? (
          <form className={`waitlist-form ${isShaking ? 'shake' : ''}`} onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'var(--white)',
            padding: '0.25rem',
            borderRadius: '10px',
            border: '1px solid var(--border-blue)'
          }}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '100%'
              }}
            />
            <button type="submit" disabled={loading} style={{
              background: 'var(--primary)',
              color: 'var(--white)',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : null}
              {loading ? 'Joining...' : 'Join the waitlist'}
            </button>
          </form>
        ) : (
          <div className="success-message" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            padding: '0.75rem'
          }}>
            <Check size={24} color="var(--primary)" />
            You're on the list. We'll reach out when team access opens.
          </div>
        )}
      </div>

      <HeroTerminal />
    </header>
  )
}

const HeroTerminal = () => {
    const lines = [
        "npm install -g airsnip",
        "airsnip push file src/auth/index.tsx --tag authflow",
        "airsnip pull authflow"
    ]
    
    return (
        <div className="terminal-block" style={{
            background: 'var(--terminal-bg)',
            borderRadius: '12px',
            padding: '1.25rem',
            textAlign: 'left',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            margin: '4rem auto 0',
            maxWidth: '600px',
            width: '100%',
            overflowX: 'auto'
        }}>
            <div className="terminal-header" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div className="dot red" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></div>
                <div className="dot amber" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                <div className="dot green" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></div>
            </div>
            <div className="terminal-content" style={{ color: 'white', fontSize: 'clamp(0.75rem, 3.5vw, 0.875rem)', lineHeight: '1.6', whiteSpace: 'nowrap' }}>
                {lines.map((text, i) => (
                    <div key={i} style={{ marginBottom: '0.25rem' }}>
                        <span className="prompt" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>$</span>
                        <Typewriter text={text} delay={1000 + (i * 1500)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const Typewriter = ({ text, delay }: { text: string, delay: number }) => {
    const [displayedText, setDisplayedText] = useState('')
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
        if (!started) return
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1))
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [started, displayedText, text])

    return (
        <span>
            {displayedText}
            {started && displayedText.length < text.length && <span className="cursor"></span>}
        </span>
    )
}

export default Hero
