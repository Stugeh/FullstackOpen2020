/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import { Table, Form } from 'react-bootstrap';
import { CHANGE_BYEAR, ALL_AUTHORS } from '../queries';

const Authors = ({ show, authors }) => {
  const [year, setYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const options = authors.map((author) => ({ ...author, label: author.name }));

  const [changeBYear] = useMutation(CHANGE_BYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    // onError: (error) => {
    //   console.log('error :>> ', error);
    // },
  });

  const submit = async (event) => {
    event.preventDefault();
    changeBYear({
      variables: {
        name: selectedAuthor.name, year,
      },
    });
    setYear('');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Change birth year</h3>
      <Form onSubmit={submit} style={{ width: '30%' }}>
        <Select
          placeholder="author"
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
        />
        <Form.Control
          placeholder="year"
          value={year}
          onChange={({ target }) => setYear(parseInt(target.value, 10))}
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Authors;
