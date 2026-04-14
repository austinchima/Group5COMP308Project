import Layout from '../../../shared/components/Layout'
import PageHeader from '../../../shared/components/PageHeader'
import Card from '../../../shared/components/Card'

function DashboardPage() {
  return (
    <Layout>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of the community platform and quick module access."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Community Posts">
          <p className="text-slate-600">View and manage posts shared by users.</p>
        </Card>

        <Card title="Help Requests">
          <p className="text-slate-600">Track support needs and community assistance.</p>
        </Card>

        <Card title="Business Directory">
          <p className="text-slate-600">Discover local businesses and service providers.</p>
        </Card>

        <Card title="Events">
          <p className="text-slate-600">Manage events, schedules, and participation.</p>
        </Card>
      </div>
    </Layout>
  )
}

export default DashboardPage