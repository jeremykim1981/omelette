import gql from "graphql-tag";

const LOGIN = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;

export default LOGIN;
