import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home'
import About from './About'
import Layout from './Layout'
import Contact from './Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
