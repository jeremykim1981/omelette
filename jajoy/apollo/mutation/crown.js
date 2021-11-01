import gql from "graphql-tag";

export const UPDATE_CROWN_UP = gql`
  mutation updateCrownCount($id: ID!) {
    updateCrownCount(id: $id) {
      id
    }
  }
`;
export const UPDATE_CROWN_DOWN = gql`
  mutation updateCrownDown($id: ID!) {
    updateCrownDown(id: $id) {
      id
    }
  }
`;

export const UPDATE_CROWN = gql`
  mutation updateLikeCrown($userId: ID!, $blogId: ID!) {
    updateLikeCrown(userId: $userId, blogId: $blogId) {
      message
    }
  }
`;
