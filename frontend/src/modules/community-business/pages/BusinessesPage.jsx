import { useQuery, useMutation } from '@apollo/client/react'
import { businessEventsClient } from '../../../apollo/clients'
import { GET_BUSINESSES } from '../graphql/businessQueries'
import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

function BusinessesPage() {
  const { data, loading, error } = useQuery(GET_BUSINESSES, {
    client: businessEventsClient
  })

  return (
    <Layout>
      <PageHeader
        title="Businesses"
        subtitle="Local businesses and directory data from the business-events-service."
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-600">Failed to load businesses.</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {data?.businesses?.map((business) => (
          <Card key={business.id} title={business.name}>
            <p className="text-slate-700">Category: {business.category}</p>
            <p className="text-slate-700">Address: {business.address}</p>
            <p className="text-slate-700">Phone: {business.phone}</p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default BusinessesPage