import gql from "graphql-tag";

export const QUERY_LIVE_STATUS = gql`
  query {
    streaming {
      live
    }
  }
`;

export const QUERY_QUESTION = gql`
  query {
    questions {
      quest
      name
      email
      department
    }
  }
`;

export const QUERY_SPREAKERS = gql`
  query {
    speakers(sort: "index:asc") {
      id
      subposition
      bank
      image {
        provider
        url
      }
      name
      position
      paper {
        provider
        url
      }
    }
  }
`;

export const QUERY_LINK = gql`
  query {
    questionnaire {
      link
    }
  }
`;

export const QUERY_ID_VIMEO = gql`
  query {
    vimeo {
      number
    }
  }
`;

export const QUERY_ID = gql`
  query ($where: JSON) {
    users(where: $where) {
      id
      email
      department
    }
  }
`;

export const QUERY_IMAGE_HIDDEN = gql`
  query {
    hiddenImage {
      image {
        provider
        url
      }
    }
  }
`;

export const QUERY_VIMEO_ENG = gql`
  query {
    vimeoEng {
      number
    }
  }
`;

export const QUERY_YOUTUBE_TH = gql`
  query {
    youtube {
      link
    }
  }
`;

export const QUERY_YOUTUBE_ENG = gql`
  query {
    youtubeEng {
      link
    }
  }
`;

export const QUERY_TOOLS = gql`
  query {
    streamingTool {
      id
      tools
    }
  }
`;

export const QUERY_LOG = gql`
  query ($id: String!) {
    logs(sort: "createdAt:desc", limit: 1, where: { user_id: $id }) {
      id
      time_out
      time_in
      user_id
    }
  }
`;
