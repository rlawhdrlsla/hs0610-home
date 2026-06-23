import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import TextStyler from './pages/TextStyler'
import BoxShadow from './pages/BoxShadow'
import BorderRadius from './pages/BorderRadius'
import FlexboxBuilder from './pages/FlexboxBuilder'
import ButtonGenerator from './pages/ButtonGenerator'
import BoxModel from './pages/BoxModel'
import LayoutBuilder from './pages/LayoutBuilder'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'

export default function App() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return
    if (sessionStorage.getItem('visited')) return
    sessionStorage.setItem('visited', '1')
    fetch('/api/visit', { method: 'POST' }).catch(() => {})
  }, [])

  return (
    <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LayoutBuilder />} />
          <Route path="tools" element={<Home />} />
          <Route path="text-styler" element={<TextStyler />} />
          <Route path="box-shadow" element={<BoxShadow />} />
          <Route path="border-radius" element={<BorderRadius />} />
          <Route path="flexbox" element={<FlexboxBuilder />} />
          <Route path="button" element={<ButtonGenerator />} />
          <Route path="box-model" element={<BoxModel />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  )
}
