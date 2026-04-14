import { useQuery, useMutation } from '@apollo/client/react'
import { businessEventsClient } from '../../../apollo/clients'
import { GET_EVENTS } from '../graphql/eventQueries'
import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

function EventsPage() {
  const { data, loading, error } = useQuery(GET_EVENTS, {
    client: businessEventsClient
  })

  return (
    <Layout>
      <PageHeader
        title="Events"
        subtitle="Events management page powered by the business-events-service."
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Failed to load events.</p>}

      <div className="grid gap-4">
        {data?.events?.map((event) => (
          <Card key={event.id} title={event.title}>
            <p className="mb-2 text-slate-700">{event.description}</p>
            <p className="text-sm text-slate-500">
              {event.date} • {event.location}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default EventsPage