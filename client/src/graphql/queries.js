import {gql} from '@apollo/client';

export const GQL_GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            email
            age
        }
    }
`;

export const GQL_GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            name
            email
            age
        }
    }
`;
