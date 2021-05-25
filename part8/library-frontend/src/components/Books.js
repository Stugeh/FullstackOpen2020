/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Table, Button } from 'react-bootstrap';

import { GET_BOOKS_BY_GENRE, ALL_GENRES } from '../queries';

const Books = ({ show, books }) => {
  if (!show || !books) {
    return null;
  }
  const [filteredBooks, setFilteredBooks] = useState([]);

  const genreRes = useQuery(ALL_GENRES);
  const genres = genreRes.data ? genreRes.data.allGenres : [];

  const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE);

  const fetchBooks = (genre) => {
    getBooks({ variables: { genre } });
  };

  useEffect(() => {
    setFilteredBooks(result.data ? result.data.booksByGenre : books);
  }, [result]);

  return (
    <div style={{ height: '88vh', overflow: 'scroll' }}>
      <h2>books</h2>

      <Table striped>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ position: 'fixed', bottom: '10px' }}>
        <Button onClick={() => setFilteredBooks(books)}>All</Button>
        {genres.map((genre) => (
          <Button key={genre} onClick={() => fetchBooks(genre)}>{genre}</Button>
        ))}
      </div>
    </div>
  );
};

export default Books;
