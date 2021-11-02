import gql from "graphql-tag";

export const UPDATE_LIVE_STATUS = gql`
  mutation updateStreaming($input: updateStreamingInput) {
    updateStreaming(input: $input) {
      streaming {
        id
      }
    }
  }
`;

export const UPDATE_LIVE_TOOLS = gql`
  mutation updateStreamingTool($input: updateStreamingToolInput) {
    updateStreamingTool(input: $input) {
      streamingTool {
        id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          id
          name
          type
        }
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($input: createQuestionInput) {
    createQuestion(input: $input) {
      question {
        id
      }
    }
  }
`;

export const CREATE_TIME = gql`
  mutation createLog($input: createLogInput) {
    createLog(input: $input) {
      log {
        id
      }
    }
  }
`;

export const CREATE_LOGIN_LOG = gql`
  mutation createLogin($input: createLoginInput) {
    createLogin(input: $input) {
      login {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: createUserInput) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const UPDATE_LOG = gql`
  mutation updateLog($input: updateLogInput) {
    updateLog(input: $input) {
      log {
        id
      }
    }
  }
`;
