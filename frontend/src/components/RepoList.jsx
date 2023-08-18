import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import Repo from './Repo';

// Styles
import '../styles/RepoList.css';

function RepoList() {
  const [repoList, setRepoList] = useState([]);

  const fetchRepos = async () => {
    // TODO: - how do we fetch repositories from the API?
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <PageHeader />
      <div className='tbody-container'></div>
    </>
  );
}

export default RepoList;
