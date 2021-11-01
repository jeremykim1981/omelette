import gql from "graphql-tag";

const QUERY_PROFILE = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      role {
        id
        name
      }
      username
      name
      social_id
      image_social
      provider_id
      email
      description
      facebook_link
      instragram_link
      tiktok_link
      youtube_link
      twitter_link
      cover_image {
        id
        url
        provider
      }
      name
      avatar_image {
        id
        url
        provider
      }
    }
  }
`;

export default QUERY_PROFILE;
