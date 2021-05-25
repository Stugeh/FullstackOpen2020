import { useQuery, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';

import { ALL_AUTHORS, ALL_BOOKS, FAVORITE_GENRE } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const books = useQuery(ALL_BOOKS);

  const authors = useQuery(ALL_AUTHORS);
  const favGenreQueryResult = useQuery(FAVORITE_GENRE);

  const client = useApolloClient();

  if (authors.loading || books.loading) {
    return <div>loading..</div>;
  }

  const handleRecommended = () => {
    if (favGenreQueryResult.data) {
      const favGenre = favGenreQueryResult.data.me.favoriteGenre;
      setGenreFilter(!favGenre ? '' : favGenre);
    }
    setPage('books');
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className="container">
      <div style={{ paddingBottom: '10px' }}>
        <Button onClick={() => setPage('authors')}>authors</Button>
        <Button onClick={() => setPage('books')}>books</Button>
        <Button onClick={handleRecommended}>recommended</Button>
        <span>
          {localStorage.loggedUser
            ? (
              <span>
                <Button onClick={() => setPage('add')}>add book</Button>
                <Button onClick={() => logout()} variant="warning">log out</Button>
              </span>
            )
            : <Button onClick={() => setPage('login')} variant="success">log in</Button>}
        </span>
      </div>

      <Authors
        token={token}
        authors={authors.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={books.data.allBooks}
        show={page === 'books'}
        filter={genreFilter}
        setFilter={setGenreFilter}
      />

      <NewBook
        setPage={setPage}
        token={token}
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  );
};

export default App;
