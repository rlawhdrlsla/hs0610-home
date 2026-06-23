import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import WordCounter from './pages/WordCounter.jsx';
import CaseConverter from './pages/CaseConverter.jsx';
import LoremIpsum from './pages/LoremIpsum.jsx';
import TextCleaner from './pages/TextCleaner.jsx';
import LineTools from './pages/LineTools.jsx';
import SlugGenerator from './pages/SlugGenerator.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="word-count" element={<WordCounter />} />
        <Route path="case" element={<CaseConverter />} />
        <Route path="lorem" element={<LoremIpsum />} />
        <Route path="clean" element={<TextCleaner />} />
        <Route path="lines" element={<LineTools />} />
        <Route path="slug" element={<SlugGenerator />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
