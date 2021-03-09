/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form } from 'react-bootstrap';
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    // onError: (error) => {
    //   console.log('error :>> ', error);
    // },
    onCompleted: () => setPage('books'),
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title, author, published, genres,
      },
    });
    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <Form onSubmit={submit}>
        <div>
          <Form.Control
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Form.Control
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Form.Control
            placeholder="year"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value, 10))}
          />
        </div>
        <div>
          <Form.Control
            placeholder="genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres:
          {' '}
          {genres.join(', ')}
        </div>
        <button type="submit">create book</button>
      </Form>
    </div>
  );
};

export default NewBook;
