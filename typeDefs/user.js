const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        users: [User]
        user(id: Int!): User
        me: User
    }

    extend type Mutation {
        makeUser(name: String!): User!
        removeUser(id: Int!): Boolean
        register(name: String!, username: String!, password: String!): Boolean
        login(username: String!, password: String!): Token!
    }

    type User {
        id: ID!
        name: String!
        username: String!
        car: [Car]
    }

    type Token {
        token: String!
    }
`;