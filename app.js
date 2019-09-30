const express = require('express');
const app = express();

const { ApolloServer, gql } = require('apollo-server-express');

const { users } = require('./data');
const me = users[0];

const typeDefs = gql`
    type Query {
        users: [User]
        user(id: Int!): User
        me: User
    }

    type User {
        id: ID!
        name: String!
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }) => {
            const user = users.filter(user => user.id === id);
            return user[0];
        },
        me: () => me,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

app.listen(3000, () => {
    console.info('Apollo GraphQL server is running on port 3000');
})