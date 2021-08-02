import {gql} from '@apollo/client';

export const GQL_ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!, $age: Int!) {
        addUser(name: $name, email: $email, age: $age) {
            name
            email
            age
        }
    }    
`;

export const GQL_UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String, $email: String, $age: Int) {
        updateUser(id: $id, name: $name, email: $email, age: $age) {
            name
            email
            age
        }
    }    
`;

export const GQL_DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            name
            email
            age
        }
    }    
`;