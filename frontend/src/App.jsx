import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const GitHubReposPage = lazy(() => import('./pages/GitHubReposPage'));
const TvShowsPage = lazy(() => import('./pages/TvShowsPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/index.html' element={<GitHubReposPage />} />
        <Route path='/' element={<GitHubReposPage />} />
        <Route path='/tv-shows' element={<TvShowsPage />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
