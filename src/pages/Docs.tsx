const Docs = () => {
  return (
    <div className="container section-padding" style={{ minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Documentation</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', marginBottom: '4rem' }}>
        Learn how to integrate Airsnip into your team's workflow.
      </p>

      <div style={{ display: 'grid', gap: '3rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>Getting Started</h2>
          <p style={{ marginBottom: '1rem' }}>Install the CLI globally using npm:</p>
          <pre style={{
            background: 'var(--terminal-bg)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'DM Mono'
          }}>
            npm install -g airsnip
          </pre>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>Core Concepts</h2>
          <p>
            Airsnip works by tagging snippets of code. Whether it's a single file or a whole directory,
            you can push it to your team's workspace with a tag.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Docs
