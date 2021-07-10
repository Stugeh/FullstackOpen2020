import React from 'react';
import { render } from '@testing-library/react-native';

import {RepositoryListContainer} from '../../components/RepositoryList';
import {formatNumber} from '../../components/Counter';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
                  'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
      ],
    };

    
    it('Renders correct number of cards', () => {
      const {getAllByTestId, getAllByText} = render(<RepositoryListContainer repositories={repositories}/>);
      const cards = getAllByTestId('repoCard');
      expect(cards).toHaveLength(repositories.edges.length);
      expect(getAllByText('Forks')).toHaveLength(repositories.edges.length);    
    });
    
    it('Cards have correct content', () => {
      const {getAllByText, getAllByTestId} = render(<RepositoryListContainer repositories={repositories}/>);
      const cards = getAllByTestId('repoCard');
      const keywords = ['Forks', 'Stars', 'Reviews', 'Rating'];
      const {edges} = repositories;
      
      cards.forEach((card, index) => {
        keywords.forEach(word => 
          expect(card).toHaveTextContent(word)
        );
        expect(card).toHaveTextContent(edges[index].node.language);
        expect(card).toHaveTextContent(edges[index].node.description);
        // check counters
        expect(getAllByText(formatNumber(edges[index].node.forksCount))).not.toHaveLength(0);
        expect(getAllByText(formatNumber(edges[index].node.stargazersCount))).not.toHaveLength(0);
        expect(getAllByText(formatNumber(edges[index].node.reviewCount))).not.toHaveLength(0);
        expect(getAllByText(formatNumber(edges[index].node.ratingAverage))).not.toHaveLength(0);
      });
    });
  });
});
