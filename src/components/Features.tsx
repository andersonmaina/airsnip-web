import React, { useEffect, useRef } from 'react'
import { Terminal, Layout, Tag, Shield, Clock, Globe } from 'lucide-react'

const Features = () => {
  const features = [
    {
      title: 'CLI-first',
      description: 'Built for the terminal. Runs where you work.',
      icon: <Terminal size={24} />
    },
    {
      title: 'Team workspaces',
      description: 'Invite teammates. Share code privately.',
      icon: <Layout size={24} />
    },
    {
      title: 'Tag-based',
      description: 'Name your push. Pull by tag, not by URL.',
      icon: <Tag size={24} />
    },
    {
      title: 'Access control',
      description: 'Owner, admin, member and viewer roles.',
      icon: <Shield size={24} />
    },
    {
      title: 'Version history',
      description: 'Every push is versioned. Roll back anytime.',
      icon: <Clock size={24} />
    },
    {
      title: 'Works anywhere',
      description: 'Any language, any file, any folder.',
      icon: <Globe size={24} />
    }
  ]

  return (
    <section className="features section-padding" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((f, i) => (
            <AnimatedFeature key={i} delay={i * 100} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}

const AnimatedFeature = ({ title, description, icon, delay }: { title: string, description: string, icon: React.ReactNode, delay: number }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, delay)
      }
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="feature-tile" style={{
      padding: '1.5rem',
      borderRadius: '12px',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.6s ease-out'
    }}>
      <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{icon}</div>
      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{description}</p>
    </div>
  )
}

export default Features
