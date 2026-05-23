import React, { useEffect, useRef } from 'react'
import { Terminal, Layout, Shield, Clock, Globe, Code, UserCheck, Cpu } from 'lucide-react'

const Features = () => {
  const features = [
    {
      title: 'CLI-First',
      description: 'Built for the terminal. Share and consume natively without leaving your shell.',
      icon: <Terminal size={24} />
    },
    {
      title: 'Team Workspaces',
      description: 'Create private context scopes and invite developers to collaborate securely.',
      icon: <Layout size={24} />
    },
    {
      title: 'AST Function Extraction',
      description: 'Instantly parse and push individual JS/TS helper functions directly by name.',
      icon: <Code size={24} />
    },
    {
      title: 'Custom Team Roles',
      description: 'Define specific organizational roles (e.g. "Cybersec") managed exclusively by the team owner.',
      icon: <Shield size={24} />
    },
    {
      title: 'Teammate Aliases',
      description: 'Locally assign custom nicknames to teammate user IDs or emails for friendly display.',
      icon: <UserCheck size={24} />
    },
    {
      title: 'Pushed Age Tracking',
      description: 'Logs precise absolute push timestamps alongside clear, readable relative ages.',
      icon: <Clock size={24} />
    },
    {
      title: 'LLM & AI Agent Ready',
      description: 'Dedicated guides (llms.txt, GEMINI.md) for programmatic agent context passing.',
      icon: <Cpu size={24} />
    },
    {
      title: 'Resilient Ignores',
      description: 'Secure .airsnipignore filters out massive folders, build paths, and git metadata.',
      icon: <Globe size={24} />
    }
  ]

  return (
    <section className="features section-padding" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}>Supercharged Sharing.</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Airsnip simplifies codebase synchronization, giving humans and autonomous AI helpers equal superpowers.
          </p>
        </div>
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

