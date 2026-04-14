import { Scissors } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-blue)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="footer-top mobile-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', gap: '2rem' }}>
          <div className="footer-logo-block">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              <Scissors size={20} color="var(--primary)" />
              airsnip
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>AirDrop for developer teams.</p>
          </div>
          <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <a href="https://github.com/Airsnip" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>GitHub</a>
            <a href="https://x.com/aairsnip" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>X (Twitter)</a>
            <a href="https://npmjs.com/package/airsnip" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>npm</a>
            <a href="https://producthunt.com" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Product Hunt</a>
          </div>
          <div className="footer-right mobile-hide" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Made for developers.
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div className="micro-line">© 2025 Airsnip. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
