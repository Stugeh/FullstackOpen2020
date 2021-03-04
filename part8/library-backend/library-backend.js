const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

//* move to .env asap *//
const MONGO_URI = 'Link goes here'
const SECRET = 'PLACEHOLDER'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: { 
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      const params = {author: args.author ,genres: args.genre}
      Book.find(params)
    },               
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({})
  }, 
  Author: {
    bookCount: root => Book.collection.countDocuments({author: root.name})
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(author => args.author === author.name)){
        authors = authors.concat({name: args.author, bookCount: 1, id: uuid()})
      }
      books = books.concat({...args, id: uuid()})
      return {...args, id: uuid()}
    }, 
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author){
        return null
      }
      const editedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(author => author.name === args.name ? editedAuthor : author)
      return editedAuthor
    }
  }
} 

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
