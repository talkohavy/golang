import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from './PageHeader';
import Repo from './Repo';

// Styles
import '../styles/RepoList.css';

function RepoList() {
  const [repoList, setRepoList] = useState([]);

  // TODO: - how do we fetch repositories from the API?
  const fetchRepos = async () => axios.get('http://localhost:8000/repositories');

  useEffect(() => {
    fetchRepos()
      .then(({ data }) => setRepoList(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <PageHeader />
      <div className='tbody-container'></div>
    </>
  );
}

export default RepoList;
