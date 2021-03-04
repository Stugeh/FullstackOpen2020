const {ApolloServer, gql} = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

//* move to .env asap *//

mongoose.connect(
    MONGO_URI,
    {useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true})
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });

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
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      const params = {author: args.author, genres: args.genre};
      Book.find(params);
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({author: root.name}),
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        if ( !Author.find( {name: args.author} ) ) {
          const author = new Author({name: args.author, bookCount: 1});
          await author.save();
        }
        const book = new Book({...args});
        return book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.find({name: args.name});
      if (!author) {
        return null;
      }
      author.birth = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
})
;
