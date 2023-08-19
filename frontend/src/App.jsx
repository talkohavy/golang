import React from 'react';
import './styles/App.css';
import RepoList from './components/RepoList';

function App() {
  return (
    <div>
      <div className='border-t-2 border-t-[#8eb8d8]'></div>
      <RepoList />
    </div>
  );
}

export default App;
