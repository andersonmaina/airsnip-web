import React, { useEffect, useRef } from 'react'
import { Upload, Users, Download } from 'lucide-react'

const HowItWorks = () => {
  const cards = [
    {
      title: 'Push',
      description: "Tag any file, function, or folder and push it to your team's shared workspace in one command.",
      icon: <Upload size={24} />
    },
    {
      title: 'Share',
      description: 'Your teammate gets instant access. No links, no uploads, no browser required.',
      icon: <Users size={24} />
    },
    {
      title: 'Pull',
      description: 'Pull tagged code directly into their project, right from the terminal.',
      icon: <Download size={24} />
    }
  ]

  return (
    <section className="how-it-works section-padding">
      <div className="container">
        <div className="cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {cards.map((card, i) => (
            <AnimatedCard key={i} delay={i * 100} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

const AnimatedCard = ({ title, description, icon, delay }: { title: string, description: string, icon: React.ReactNode, delay: number }) => {
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
    <div ref={ref} className="how-card" style={{
      background: 'var(--white)',
      border: '1px solid var(--border-blue)',
      borderLeft: '3px solid var(--primary)',
      padding: '2rem',
      borderRadius: '12px',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.6s ease-out'
    }}>
      <div className="icon-circle" style={{
        width: '48px',
        height: '48px',
        background: 'var(--bg-light)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: 'var(--primary)'
      }}>
        {icon}
      </div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{description}</p>
    </div>
  )
}

export default HowItWorks
