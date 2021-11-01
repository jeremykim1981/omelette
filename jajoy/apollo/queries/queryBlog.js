import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query ($where: JSON) {
    blogs(where: $where, sort: "createdAt:desc") {
      id
      approve
      crown_count
      comments {
        comment
      }
      count_view
      type
      createdAt
      image {
        id
        url
        provider
        height
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

export const QUERY_PORTFOLIO = gql`
  query {
    portfolios(sort: "createdAt:desc") {
      id
      name
      image {
        id
        url
        provider
      }
    }
  }
`;
export const QUERY_CAREERS = gql`
  query ($where: JSON) {
    careers(where: $where, sort: "createdAt:desc") {
      id
      position
      count
      count_click
      salary
      detail
      createdAt
    }
  }
`;

export const QUERY_RULE = gql`
  query {
    rule {
      rule
    }
  }
`;
