import React, { useState, useEffect, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const WaitlistCTA = () => {
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
    <section className="cta-section section-padding" style={{
      background: 'var(--primary)',
      color: 'var(--white)',
      textAlign: 'center',
      position: 'relative'
    }}>
      {errorStatus && (
        <div className="toast-container" style={{ color: 'var(--text-primary)' }}>
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
      <div className="container" style={{ width: '100%' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', marginBottom: '1rem' }}>Be first when we launch.</h2>
        <p className="subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
          Join the waitlist. We'll reach out when team access opens.
        </p>
        <div className="waitlist-container" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {!submitted ? (
            <form className={`waitlist-form ${isShaking ? 'shake' : ''}`} onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.25rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px'
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
                  borderRadius: '8px',
                  fontSize: '1rem',
                  width: '100%'
                }}
              />
              <button type="submit" disabled={loading} style={{
                background: 'var(--text-primary)',
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
              padding: '0.75rem'
            }}>
              <Check size={24} color="var(--white)" />
              You're on the list. We'll reach out when team access opens.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WaitlistCTA
