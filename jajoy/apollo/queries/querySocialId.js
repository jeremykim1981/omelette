import gql from "graphql-tag";
const QUERY_USER_SOCIAL_ID = gql`
  query ($where: JSON) {
    users(where: $where) {
      id
    }
  }
`;
export default QUERY_USER_SOCIAL_ID;
