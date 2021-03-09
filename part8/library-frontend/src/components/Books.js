/* eslint-disable react/prop-types */
import React from 'react';
import { Table } from 'react-bootstrap';

const Books = ({ show, books }) => {
  if (!show) {
    return null;
  }
  console.log('books :>> ', books);
  const genres = books.reduce((book) => book.genres);
  console.log('genres :>> ', genres);

  return (
    <div>
      <h2>books</h2>

      <Table striped>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>publishe</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;
