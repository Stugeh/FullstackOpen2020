/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import { CHANGE_BYEAR, ALL_AUTHORS } from '../queries';

const Authors = ({ show, authors }) => {
  const [year, setYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const options = authors.map((author) => ({ ...author, label: author.name }));

  const [changeBYear] = useMutation(CHANGE_BYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error :>> ', error);
    },
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
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
        />
        <input
          placeholder="year"
          value={year}
          onChange={({ target }) => setYear(parseInt(target.value, 10))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Authors;
