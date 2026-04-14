import { useQuery, useMutation } from '@apollo/client/react'
import { communityClient } from '../../../apollo/clients'
import { GET_ALERTS } from '../graphql/communityQueries'
import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

function AlertsPage() {
  const { data, loading, error } = useQuery(GET_ALERTS, {
    client: communityClient
  })

  return (
    <Layout>
      <PageHeader
        title="Alerts"
        subtitle="Important alerts and updates from the community-service."
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Failed to load alerts.</p>}

      <div className="grid gap-4">
        {data?.alerts?.map((alert) => (
          <Card key={alert.id} title={alert.severity}>
            <p className="mb-2 text-slate-700">{alert.message}</p>
            <p className="text-sm text-slate-500">{alert.createdAt}</p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default AlertsPage