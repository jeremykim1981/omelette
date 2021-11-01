import gql from "graphql-tag";

const UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default UPDATE_USER;
