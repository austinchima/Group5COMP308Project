import json
import sys
import time
from typing import Any

import requests

ENDPOINT = 'http://localhost:4000/graphql'


def gql(query: str, variables: dict[str, Any] | None = None, token: str | None = None) -> dict[str, Any]:
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'

    response = requests.post(
        ENDPOINT,
        headers=headers,
        json={'query': query, 'variables': variables or {}},
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    if payload.get('errors'):
        raise RuntimeError(json.dumps(payload['errors'], ensure_ascii=False))
    return payload['data']


def main() -> int:
    unique_email = f"james.integration.{int(time.time())}@example.com"

    register = gql(
        '''
        mutation Register($name:String!,$email:String!,$password:String!,$role:Role!) {
          register(name:$name,email:$email,password:$password,role:$role) {
            token
            user { id name email role }
          }
        }
        ''',
        {
            'name': 'James Hu',
            'email': unique_email,
            'password': 'secret12',
            'role': 'RESIDENT',
        },
    )
    token = register['register']['token']

    created = gql(
        '''
        mutation CreatePost($title:String!,$content:String!,$tags:[String]) {
          createPost(title:$title,content:$content,tags:$tags) {
            id
            title
            content
            summary
            tags
            authorName
            comments { id userName text }
          }
        }
        ''',
        {
            'title': 'Neighborhood Cleanup',
            'content': 'We are organizing a cleanup this Saturday at the park.',
            'tags': ['News'],
        },
        token,
    )
    post_id = created['createPost']['id']

    summary = gql(
        '''
        mutation Summarize($text:String!) {
          summarizeDiscussion(text:$text)
        }
        ''',
        {'text': 'We are organizing a cleanup this Saturday at the park.'},
    )['summarizeDiscussion']

    updated = gql(
        '''
        mutation UpdateSummary($postId:ID!,$summary:String!) {
          updatePostSummary(postId:$postId,summary:$summary) {
            id
            summary
          }
        }
        ''',
        {'postId': post_id, 'summary': summary},
        token,
    )

    commented = gql(
        '''
        mutation AddComment($postId:ID!,$text:String!) {
          addComment(postId:$postId,text:$text) {
            id
            comments { id userName text }
          }
        }
        ''',
        {'postId': post_id, 'text': 'Count me in for Saturday.'},
        token,
    )

    posts = gql(
        '''
        query Posts {
          posts {
            id
            title
            summary
            tags
            authorName
            comments { userName text }
          }
        }
        '''
    )

    result = {
        'registered_user': register['register']['user'],
        'created_post': created['createPost'],
        'updated_summary': updated['updatePostSummary'],
        'comment_count': len(commented['addComment']['comments']),
        'posts_snapshot': posts['posts'],
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(f'GRAPHQL_SMOKE_TEST_FAILED: {exc}', file=sys.stderr)
        raise
