import React from 'react';
import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';

import { GET_RECOMMENDATIONS } from '../queries';

const Recommendations = () => {
  const recommended = useQuery(GET_RECOMMENDATIONS);

  if (!recommended.data) { return <div>loading...</div>; }

  return (
    <div>
      <h1>Recommendations</h1>
      <h4>books in your favorite genre</h4>
      <Table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.data.recommendations.map((a) => (
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

export default Recommendations;
