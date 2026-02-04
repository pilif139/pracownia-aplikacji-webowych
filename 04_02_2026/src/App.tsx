import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './routes/Home'
import Categories from './routes/Categories'
import Post from './routes/Post'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/kategorie" element={<Layout><Categories /></Layout>} />
        <Route path="/post/:id" element={<Layout><Post /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
