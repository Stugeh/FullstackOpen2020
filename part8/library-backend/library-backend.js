const {ApolloServer, UserInputError, gql} = require('apollo-server');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const {PubSub} = require('apollo-server');
const pubsub = new PubSub();

//* move to .env asap *//
;
const SECRET = 'secret';

mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }


  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
    books: [Book]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
    booksByGenre(genre: String): [Book!]!
    recommendations: [Book!]!
    me: User
    allGenres: [String!]!
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

    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allAuthors: () => Author.find({}).populate('books'),

    me: (root, args, context) => (context.currentUser),

    recommendations: (root, args, context) => {
      if ( context.currentUser.favoriteGenre) {
        return (
          Book.find({
            genres: {$in: context.currentUser.favoriteGenre}},
          ).populate('author')
        );
      }
      return Book.find({}).populate('author');
    },

    allBooks: (root, args) => {
      const params = {};
      if (args.author) {
        params.author = {$eq: args.author};
      }
      if (args.genres) {
        return Book.find({genres: {$in: args.genres}}).populate('author');
      }
      return Book.find({}).populate('author');
    },

    allGenres: async () => {
      let genres = [];
      const books = await Book.find({});
      books.map((book) => genres = genres.concat(book.genres));
      return [...new Set(genres)];
    },

    booksByGenre: (root, args) => {
      return Book.find({genres: {$in: args.genre}}).populate('author');
    },
  },

  Author: {
    bookCount: (root) => root.books.length,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      // if (args.author.length < 4) {
      //   throw new UserInputError('author must be at least 4 characters long')
      // }
      try {
        const author = await Author.findOne( {name: args.author} );
        if ( !author ) {
          const newAuthor = new Author({name: args.author, bookCount: 1});
          await newAuthor.save();
          const book = new Book({...args, author: newAuthor});
          pubsub.publish('BOOK_ADDED', {bookAdded: book});
          await book.save();
          return book;
        }
        const book = new Book({...args, author: author});
        pubsub.publish('BOOK_ADDED', {bookAdded: book});
        book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
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

    createUser: async (root, args) => {
      const user = new User(args);
      console.log('args :>> ', user);
      await user.save().catch((error) => {
        throw new UserInputError(error.message, {invalidArgs: args});
      });
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username});
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {value: jwt.sign(userForToken, SECRET)};
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const fetchUser = (auth) => {
  const decodedToken = jwt.verify(auth.substring(7), SECRET);
  return User.findById(decodedToken.id);
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const currentUser = await fetchUser(auth);
      return {currentUser};
    }
  },
});

server.listen().then(({url, subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
