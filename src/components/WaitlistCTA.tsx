import React, { useState, useEffect, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const WaitlistCTA = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 400)
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error
      setSubmitted(true)
    } catch (error) {
      console.error('Error joining waitlist:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="cta-section section-padding" style={{
      background: 'var(--primary)',
      color: 'var(--white)',
      textAlign: 'center'
    }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Be first when we launch.</h2>
        <p className="subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.25rem' }}>
          Join the waitlist. We'll reach out when team access opens.
        </p>
        <div className="waitlist-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
          {!submitted ? (
            <form className={`waitlist-form ${isShaking ? 'shake' : ''}`} onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.25rem'
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
                  fontSize: '1rem'
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
