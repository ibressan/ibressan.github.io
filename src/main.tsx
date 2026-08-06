import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GitProfile from './components/gitprofile.tsx';
import NewsPost from './components/news-post/index.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<GitProfile config={CONFIG} />} />
          <Route path="/news/:date" element={<NewsPost />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
);
