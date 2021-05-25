/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const Books = ({ show, books }) => {
  if (!show || !books) {
    return null;
  }

  const [filter, setFilter] = useState('');

  const genres = books.flatMap((book) => book.genres);
  const uniqueGenres = [...new Set(genres)];

  const filteredBooks = filter !== ''
    ? books.filter((book) => book.genres.includes(filter)) : books;

  return (
    <div>
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
      <Button onClick={() => setFilter('')}>All</Button>
      {uniqueGenres.map((genre) => (
        <Button key={genre} onClick={() => setFilter(genre)}>{genre}</Button>
      ))}
    </div>
  );
};

export default Books;
