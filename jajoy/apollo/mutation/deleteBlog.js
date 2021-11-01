import gql from "graphql-tag";

export const DELETE_BLOG = gql`
  mutation DELETEBlog($input: deleteBlogInput) {
    deleteBlog(input: $input) {
      blog {
        id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($input: deleteCommentInput) {
    deleteComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export const DELETE_REPLY_COMMENT = gql`
  mutation ($input: deleteReplyInput) {
    deleteReply(input: $input) {
      reply {
        id
      }
    }
  }
`;
