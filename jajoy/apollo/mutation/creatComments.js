import gql from "graphql-tag";

export const CREAT_COMMENT = gql`
  mutation ($input: createCommentInput) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`;
export const CREAT_REPLY_COMMENT = gql`
  mutation ($input: createReplyInput) {
    createReply(input: $input) {
      reply {
        id
      }
    }
  }
`;

export const CREAT_BLOG = gql`
  mutation ($input: createBlogInput) {
    createBlog(input: $input) {
      blog {
        id
      }
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const LOGIN_SOCIAL = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $social_id: String
    $image_social: String
    $provider_id: String
    $name: String
  ) {
    createUser(
      input: {
        data: {
          username: $username
          email: $email
          password: $password
          social_id: $social_id
          image_social: $image_social
          provider_id: $provider_id
          name: $name
        }
      }
    ) {
      user {
        email
        social_id
      }
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation updateUserNotification($id: ID!) {
    updateUserNotification(id: $id) {
      id
    }
  }
`;

export const RESGISTER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $name: String
  ) {
    createUser(
      input: {
        data: {
          username: $username
          email: $email
          password: $password
          name: $name
        }
      }
    ) {
      user {
        email
      }
    }
  }
`;
