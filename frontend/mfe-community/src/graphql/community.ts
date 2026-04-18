import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      authorId
      authorName
      title
      content
      summary
      tags
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $tags: [String]) {
    createPost(title: $title, content: $content, tags: $tags) {
      id
      authorId
      authorName
      title
      content
      summary
      tags
      createdAt
    }
  }
`;