import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { SORT } from '../enums/sort';
import useDebounce from '../hooks/useDebounce';
import { getRepositories } from '../services/github-service';

const Main = () => {
  const sizes = [10, 25, 50];
  const columns = [
    {
      label: 'Nombre',
      id: 'name',
    },
    {
      label: 'Stars',
      id: 'stars',
    },
    {
      label: 'Descripción',
      id: 'description',
      maxWidth: '40rem',
    },
    {
      label: 'Forks',
      id: 'forks',
    },
    {
      label: 'Watchers',
      id: 'watchers',
    },
  ];

  const initialParams = {
    q: 'react',
    sort: 'name',
    order: SORT.DESC,
    page: 1,
    per_page: sizes[0],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [params, setParams] = useState(initialParams);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);

  // API interaction
  const getRepos = () => {
    setIsLoading(true);
    const res = getRepositories(params);
    res
      .then((res) => {
        setRepositories([...repositories, ...res.data.items]);
        setIsLoading(false);
        setTotal(res.data.total_count);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Error!', err);
      });
  };

  useEffect(() => {
    getRepos();
  }, [params]);

  useEffect(() => {
    resetRepos();
    setParams({ ...params, q: debouncedSearchTerm, page: 1 });
  }, [debouncedSearchTerm]);

  const handleSearchValue = (e) => {
    setSearch(e);
  };

  const handleSize = (e) => {
    resetRepos();
    setParams({ ...params, per_page: e, page: 1 });
  };

  const handlePage = (e) => {
    resetRepos();
    setParams({ ...params, page: e });
  };

  const resetRepos = () => {
    setRepositories([]);
    setSelected([]);
  };
  // End API interaction

  const changeSelected = (item) => {
    if (selected.find((a) => a.id === item.id)) {
      setSelected(selected.filter((a) => a.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  const changeSelectedAll = () => {
    if (selected.length === repositories.length) {
      setSelected([]);
    } else {
      setSelected([...repositories]);
    }
  };

  const renderData = (repositories) =>
    repositories.map((repo) => {
      return {
        ...repo,
        name: (
          <a href={repo.html_url} target='_blank' rel='noreferrer'>
            {repo.name}
          </a>
        ),
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks_count,
      };
    });

  return (
    <div className='main'>
      <h1 className='main__title'>Github Searcher List</h1>
      {isLoading && <img className='main__loader' src='https://i.gifer.com/ZZ5H.gif' alt='loading' />}
      <div className='main__content'>
        <Table
          columns={columns}
          data={renderData(repositories)}
          selected={selected}
          check={true}
          size={params.per_page}
          sizes={sizes}
          page={params.page}
          total={total}
          isLoading={isLoading}
          onChangeSearchValue={handleSearchValue}
          changeSelected={changeSelected}
          changeSelectedAll={changeSelectedAll}
          changeSize={handleSize}
          changePage={handlePage}
        ></Table>
      </div>
    </div>
  );
};

export default Main;
