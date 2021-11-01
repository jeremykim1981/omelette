import gql from "graphql-tag";

export const QUERY_BLOGGER = gql`
  query ($id: ID!) {
    blog(id: $id) {
      id
      count_view
      crown_count
      description
      content
      approve
      type
      createdAt
      image {
        id
        url
        provider
      }
      tag {
        id
        name
      }
      title
      users_permissions_user {
        id
        name
        image_social
        avatar_image {
          id
          url
          provider
        }
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query ($id: ID!) {
    blog(id: $id) {
      comments(sort: "createdAt:desc") {
        id
        createdAt
        comment
        replies {
          id
          createdAt
          text
          users_permissions_user {
            id
            image_social
            social_id
            name
            avatar_image {
              id
              url
              provider
            }
            username
          }
        }
        users_permissions_user {
          id
          image_social
          social_id
          avatar_image {
            id
            url
            provider
          }
          name
        }
      }
    }
  }
`;
// export const QUERY_COMMENT_BY_USER = gql`
//   query ($id: ID!) {
//     user(id: $id) {
//       comments(sort: "createdAt:desc") {
//         id
//         createdAt
//         comment
//         id
//         title
//       }
//       users_permissions_user {
//         id
//         avatar_image {
//           id
//           url
//           provider
//         }
//         username
//       }
//     }
//   }
// `;
// export const QUERY_COMMENT_BY_USER = gql`
//   query ($id: ID!) {
//     user(id: $id) {
//       blogs(where: { comments: { users_permissions_user: { id_ne: $id } } }) {
//         comments {
//           id
//           createdAt
//           comment
//           users_permissions_user {
//             id
//             username
//           }
//         }
//       }
//     }
//   }
// `;
// export const QUERY_COMMENT_BY_USER = gql`
//   query ($id: ID!) {
//     user(id: $id) {
//       comments(sort: "createdAt:desc") {
//         id
//         createdAt
//         comment
//         blog {
//           id
//           title
//         }
//         users_permissions_user {
//           id
//           avatar_image {
//             id
//             url
//             provider
//           }
//           username
//         }
//       }
//     }
//   }
// `;

// export const QUERY_COMMENT_BY_USER = gql`
//   query ($id: ID!) {
//     user(id: $id) {
//       comments(
//         sort: "createdAt:desc"
//         where: { blog: { users_permissions_user: { id_ne: $id } } }
//       ) {
//         id
//         createdAt
//         comment
//         blog {
//           id
//           users_permissions_user {
//             id
//           }
//           id
//           title
//         }
//         users_permissions_user {
//           id
//           avatar_image {
//             id
//             url
//             provider
//           }
//           username
//         }
//       }
//     }
//   }
// `;
export const QUERY_COMMENT_BY_USER = gql`
  query ($id: ID!) {
    comments(
      sort: "createdAt:desc"
      where: { blog: { users_permissions_user: { id: $id } } }
    ) {
      createdAt
      comment
      blog {
        id
        title
        users_permissions_user {
          id
        }
      }
      users_permissions_user {
        id
        image_social
        social_id
        avatar_image {
          id
          url
          provider
        }
        username
      }
    }
  }
`;

export const UPDATE_BLOGGER = gql`
  mutation updateBlog($input: updateBlogInput) {
    updateBlog(input: $input) {
      blog {
        id
      }
    }
  }
`;

export const QUERY_COUNT_VIEW = gql`
  query {
    users {
      id
      role {
        id
        name
      }
      image_social
      avatar_image {
        id
        url
        provider
      }
      username
      name
      blogs {
        id
        count_view
      }
    }
  }
`;

export const QUERY_ID = gql`
  query ($where: JSON) {
    users(where: $where) {
      id
      email
      social_id
      provider_id
    }
  }
`;

export const QUERY_IMAGE = gql`
  query ($id: ID!) {
    user(id: $id) {
      avatar_image {
        provider
        url
      }
    }
  }
`;
