import { Link } from 'react-router-dom'
import { Scissors } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      background: 'var(--white)',
      borderBottom: '1px solid var(--border-blue)',
      zIndex: 1000,
      padding: '0.75rem 0',
      animation: 'fadeIn 300ms ease-out forwards'
    }}>
      <div className="container nav-content" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)'
        }}>
          <Scissors size={20} color="var(--primary)" />
          airsnip
        </Link>
        <div className="nav-links" style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <Link to="/docs" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Docs</Link>
          <a href="https://github.com/Airsnip" className="mobile-hide" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>GitHub</a>
          <a href="https://x.com/aairsnip" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>X</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
