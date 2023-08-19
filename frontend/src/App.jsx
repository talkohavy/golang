import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GitHubReposPage from './pages/GitHubReposPage';
import PageNotFound from './pages/PageNotFound';
import TvShowsPage from './pages/TvShowsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/index.html' element={<GitHubReposPage />} />
        <Route path='/' element={<GitHubReposPage />} />
        <Route path='/tv-shows' element={<TvShowsPage />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
