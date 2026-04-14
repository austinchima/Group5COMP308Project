import { useQuery, useMutation } from '@apollo/client/react'
import { communityClient } from '../../../apollo/clients'
import { GET_POSTS } from '../graphql/communityQueries'
import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

function PostsPage() {
  const { data, loading, error } = useQuery(GET_POSTS, {
    client: communityClient
  })

  return (
    <Layout>
      <PageHeader
        title="Posts"
        subtitle="Community posts retrieved from the community-service."
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Failed to load posts.</p>}

      <div className="grid gap-4">
        {data?.posts?.map((post) => (
          <Card key={post.id} title={post.title}>
            <p className="mb-2 text-slate-700">{post.content}</p>
            <p className="text-sm text-slate-500">
              By {post.author} • {post.createdAt}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default PostsPage