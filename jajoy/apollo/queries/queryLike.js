import gql from "graphql-tag";

const QUERY_LIKE = gql`
  query likes($where: JSON) {
    likes(where: $where) {
      id
      userId
      blogId
    }
  }
`;
export default QUERY_LIKE;
