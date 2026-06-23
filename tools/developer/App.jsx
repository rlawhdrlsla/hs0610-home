import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import JsonFormatter from './pages/JsonFormatter.jsx';
import UuidGenerator from './pages/UuidGenerator.jsx';
import HashGenerator from './pages/HashGenerator.jsx';
import Base64Tool from './pages/Base64Tool.jsx';
import PasswordGenerator from './pages/PasswordGenerator.jsx';
import RegexTester from './pages/RegexTester.jsx';
import CronExplainer from './pages/CronExplainer.jsx';
import UrlEncodeDecode from './pages/UrlEncodeDecode.jsx';
import JwtDecoder from './pages/JwtDecoder.jsx';
import DiffChecker from './pages/DiffChecker.jsx';
import MarkdownPreview from './pages/MarkdownPreview.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="json" element={<JsonFormatter />} />
        <Route path="uuid" element={<UuidGenerator />} />
        <Route path="hash" element={<HashGenerator />} />
        <Route path="base64" element={<Base64Tool />} />
        <Route path="password" element={<PasswordGenerator />} />
        <Route path="regex" element={<RegexTester />} />
        <Route path="cron" element={<CronExplainer />} />
        <Route path="url-encode" element={<UrlEncodeDecode />} />
        <Route path="jwt" element={<JwtDecoder />} />
        <Route path="diff" element={<DiffChecker />} />
        <Route path="markdown" element={<MarkdownPreview />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
