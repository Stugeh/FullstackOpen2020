const {ApolloServer, gql} = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

//* move to .env asap *//
const MONGO_URI = 'mongodb+srv://Stugeh:CwQxTeWrgycl1jwa@cluster0-cj4cb.mongodb.net/Library?retryWrites=true&w=majority';

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
    allBooks(author: String, genres: [String]): [Book!]!
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
      const params = {};
      if (args.author) {
        params.author = {$eq: args.author};
      }
      if (args.genres) {
        return Book.find({genres: {$in: args.genres}});
      }
      return Book.find({});
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
  },

  Author: {
    bookCount: (root) => Book.collection.countDocuments({author: root.name}),
  },

  Mutation: {
    addBook: async (root, args) => {
      // try {
      const author = await Author.findOne( {name: args.author} );
      if ( !author ) {
        const newAuthor = new Author({name: args.author, bookCount: 1});
        console.log('newAuthor :>> ', newAuthor);
        await newAuthor.save();
        const book = new Book({...args, author: newAuthor._id});
        return book.save();
      }

      const book = new Book({...args, author: author._id});
      return book.save();
      // } catch (error) {
      //   throw new UserInputError(error.message, {
      //     invalidArgs: args,
      //   });
      // }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name});
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
        return author;
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
});
