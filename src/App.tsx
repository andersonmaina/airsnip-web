import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
