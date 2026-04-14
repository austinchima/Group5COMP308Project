import { useQuery, useMutation } from '@apollo/client/react'
import { communityClient } from '../../../apollo/clients'
import { GET_HELP_REQUESTS } from '../graphql/communityQueries'
import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

function HelpRequestsPage() {
  const { data, loading, error } = useQuery(GET_HELP_REQUESTS, {
    client: communityClient
  })

  return (
    <Layout>
      <PageHeader
        title="Help Requests"
        subtitle="Requests for support posted by users in the community."
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Failed to load help requests.</p>}

      <div className="grid gap-4">
        {data?.helpRequests?.map((request) => (
          <Card key={request.id} title={request.title}>
            <p className="mb-2 text-slate-700">{request.description}</p>
            <p className="text-sm text-slate-500">
              Requested by {request.requester} • Status: {request.status}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default HelpRequestsPage