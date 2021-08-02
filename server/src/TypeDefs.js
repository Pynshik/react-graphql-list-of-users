import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        social_networks: [Social_network]
    }

    type Social_network {
        id: ID!
        name: String
        users: [User]
    }

    # Queries

    type Query {
        users: [User!]!
        user(id: ID!): User!
        social_networks: [Social_network]
        social_network(id: ID!): Social_network!
    }

    # Mutations

    type Mutation {
        addUser(name: String!, email: String!, age: Int!, social_network: String): User!
        updateUser(id: ID!, name: String, email: String, age: Int, social_network: String): User!
        deleteUser(id: ID!): User! 
        addNetwork(name: String!): Social_network!
        updateNetwork(id: ID!, name: String!): Social_network!
        deleteNetwork(id: ID!): Social_network!
    }
`;
