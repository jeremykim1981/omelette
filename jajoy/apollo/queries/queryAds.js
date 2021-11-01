import gql from "graphql-tag";

export const QUERY_ADS = gql`
  query {
    ad {
      id
      our_story_1 {
        id
        url
        provider
      }
      out_story_2 {
        id
        url
        provider
      }
      our_story_3 {
        id
        url
        provider
      }
    }
  }
`;

export const QUERY_YOUTUBE = gql`
  query {
    youtube {
      id
      youtube {
        url
        id
      }
    }
  }
`;

export const QUERY_BANNER = gql`
  query {
    banner {
      image {
        link
        image {
          id
          url
          provider
        }
      }
    }
  }
`;
