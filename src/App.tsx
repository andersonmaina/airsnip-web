import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import AuthPoint from './pages/AuthPoint'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Routes>
      {/* Standalone page — no Navbar/Footer */}
      <Route path="/authpoint" element={<AuthPoint />} />

      {/* Main site layout */}
      <Route path="/*" element={
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
          <Footer />
        </div>
      } />
    </Routes>
  )
}

export default App
