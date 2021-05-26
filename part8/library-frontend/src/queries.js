import { gql } from '@apollo/client';

/// *** QUERIES ***///
export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            author{name} 
            genres
            published
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author{name}
            genres
            published
        }
    }  
`;

export const ALL_GENRES = gql`
    query{
        allGenres
    }
`;

export const FAVORITE_GENRE = gql`
    query{
        me{
            favoriteGenre
            username
        }
    }
`;

export const GET_BOOKS_BY_GENRE = gql`
    query findBooksByGenre($genre: String!){
        booksByGenre(genre: $genre){
            title
            author{
                name
            } genres
            published
        }
    }
`;

export const GET_RECOMMENDATIONS = gql`
    query{
        recommendations{
            title
            author{
                name
            } genres
            published
        }
    }
`;

/// *** MUTATIONS ***///
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password){ value }
  }
`;

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ){
            title,
            author{name},
            published,
            genres
        }
    }
`;

export const CHANGE_BYEAR = gql`
    mutation changeBYear($name: String!, $year: Int!){
        editAuthor(
            name: $name
            setBornTo: $year
        ){
            name
            born
        }}
`;
