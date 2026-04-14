const TerminalShowcase = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="terminal-block" style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'var(--terminal-bg)',
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          overflowX: 'auto',
          width: '100%'
        }}>
          <div className="showcase-header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div className="terminal-header" style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="dot red" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
              <div className="dot amber" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
              <div className="dot green" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
            </div>
            <div className="terminal-title" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                airsnip — team session
            </div>
            <div className="mobile-hide" style={{ width: '48px' }}></div>
          </div>
          <div className="terminal-content" style={{ color: 'white', fontSize: 'clamp(0.75rem, 3.5vw, 0.875rem)', lineHeight: '1.6', whiteSpace: 'nowrap' }}>
            <div className="comment" style={{ color: 'var(--text-muted)' }}># Alice pushes an auth helper</div>
            <div><span className="prompt" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>$</span>airsnip push fn checkSession --from src/auth/index.tsx --tag auth</div>
            <br />
            <div className="comment" style={{ color: 'var(--text-muted)' }}># Bob on his machine, pulls it instantly</div>
            <div><span className="prompt" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>$</span>airsnip pull auth</div>
            <div className="success-text" style={{ color: 'var(--success)' }}>✓ pulled checkSession → src/auth/index.tsx (from alice · 2s ago)</div>
            <br />
            <div className="comment" style={{ color: 'var(--text-muted)' }}># List everything the team has shared</div>
            <div><span className="prompt" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>$</span>airsnip list</div>
            <table className="terminal-table terminal-font" style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', color: 'var(--text-muted)', fontWeight: 400, paddingBottom: '0.5rem', fontSize: '0.75rem' }}>TAG</th>
                  <th style={{ textAlign: 'left', color: 'var(--text-muted)', fontWeight: 400, paddingBottom: '0.5rem', fontSize: '0.75rem' }}>TYPE</th>
                  <th style={{ textAlign: 'left', color: 'var(--text-muted)', fontWeight: 400, paddingBottom: '0.5rem', fontSize: '0.75rem' }}>PUSHED BY</th>
                  <th style={{ textAlign: 'left', color: 'var(--text-muted)', fontWeight: 400, paddingBottom: '0.5rem', fontSize: '0.75rem' }}>AGE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tag-text" style={{ color: 'var(--warning)', padding: '0.25rem 0' }}>auth</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>function</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>alice</td>
                  <td style={{ padding: '0.25rem 0' }}>2s</td>
                </tr>
                <tr>
                  <td className="tag-text" style={{ color: 'var(--warning)', padding: '0.25rem 0' }}>design-system</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>folder</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>carol</td>
                  <td style={{ padding: '0.25rem 0' }}>1h</td>
                </tr>
                <tr>
                  <td className="tag-text" style={{ color: 'var(--warning)', padding: '0.25rem 0' }}>api-client</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>file</td>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0' }}>bob</td>
                  <td style={{ padding: '0.25rem 0' }}>3h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TerminalShowcase
