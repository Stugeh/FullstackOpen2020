const {ApolloServer, gql} = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

//* move to .env asap *//
const MONGO_URI = 'mongodb+srv://Stugeh:CwQxTeWrgycl1jwa@cluster0-cj4cb.mongodb.net/Library?retryWrites=true&w=majority';
const SECRET = 'secret';

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
  type User {
    username: String!
    favoriteGenre: String!
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
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
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
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
        return Book.find({genres: {$in: args.genres}}).populate('author');
      }
      return Book.find({}).populate('author');
    },

    authorCount: () => Author.collection.countDocuments(),

    allAuthors: () => Author.find({}),

    me: (root, args, context) => (context.currentUser),

  },

  Author: {
    bookCount: (root) => Book.collection.countDocuments({author: root.name}),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      try {
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

    createUser: (root, args) => {
      const user = new User({username: args.username});
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {invalidArgs: args});
      });
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {currentUser};
    }
  },
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
