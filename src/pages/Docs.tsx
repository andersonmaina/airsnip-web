const Docs = () => {
  return (
    <div className="container section-padding" style={{ minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Documentation</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', marginBottom: '4rem' }}>
        Learn how to integrate Airsnip into your team's workflow and supercharge your autonomous AI agents.
      </p>

      <div style={{ display: 'grid', gap: '3rem', maxWidth: '800px' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>Getting Started</h2>
          <p style={{ marginBottom: '1rem' }}>Install the CLI globally using npm:</p>
          <pre style={{
            background: 'var(--terminal-bg)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'DM Mono',
            marginBottom: '1.5rem'
          }}>
            npm install -g airsnip
          </pre>
          <p style={{ marginBottom: '1rem' }}>Initialize your workspace context to automatically setup ignore files:</p>
          <pre style={{
            background: 'var(--terminal-bg)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'DM Mono'
          }}>
            airsnip init
          </pre>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>Core Concepts</h2>
          <p style={{ marginBottom: '1rem' }}>
            Airsnip works by tagging snippets of code. Whether it's a single file, a whole directory, or a specific AST-parsed function, you can push it to your team's workspace with a tag.
          </p>
          <p style={{ marginBottom: '1rem' }}>Share a specific function from a file:</p>
          <pre style={{
            background: 'var(--terminal-bg)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'DM Mono'
          }}>
            airsnip push fn calculateTotal --from src/cart.ts --tag calc-fn
          </pre>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>Collaboration & Custom Roles</h2>
          <p style={{ marginBottom: '1rem' }}>
            Collaborate smoothly by locally renaming teammates using nicknames, and creating custom organizational roles managed exclusively by the team owner:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Teammate Aliases:</strong> Link a teammate's user ID or email to a custom nickname: <code>airsnip alias set bob@example.com "Bob (Lead Dev)"</code></li>
            <li><strong>Define Roles:</strong> Create specialized access/organizational designations: <code>airsnip role create Cybersec</code></li>
            <li><strong>Assign Roles:</strong> Allocate roles manually: <code>airsnip role assign bob@example.com Cybersec</code></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-blue)', paddingBottom: '0.5rem' }}>LLM & AI Agent Tooling</h2>
          <p style={{ marginBottom: '1rem' }}>
            Airsnip is pre-architected as a native tool for Large Language Models (LLMs) and autonomous AI coding agents (such as Claude Code or Gemini assistants):
          </p>
          <div style={{ background: 'var(--bg-light)', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🤖 Agentic Context Passing</p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Whenever you delegate tasks to subagents or pair-program with AI, they can utilize preconfigured workspace guide files in the repository root to understand exact Airsnip command specs:
            </p>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9375rem', display: 'grid', gap: '0.25rem' }}>
              <li><strong>llms.txt</strong>: Standard semantic context configuration detailing CLI command definitions and programmatic use-cases.</li>
              <li><strong>CLAUDE.md</strong>: Concise recipes, build, test, and single-function pushing tips for Claude.</li>
              <li><strong>GEMINI.md</strong>: Execution standards and mock setups for Gemini agent tools.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Docs
