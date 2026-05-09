import { createClient } from '@/utils/supabase/server'

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)

    return (
  <div style={{ padding: 20 }}>
    <h1>Services Table</h1>

    {(!services || services.length === 0) ? (
      <p>No services found in database</p>
    ) : (
      <table style={{ borderCollapse: "collapse", minWidth: 600 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description&nbsp;</th>
            <th>Icon &nbsp;</th>
            <th>is Active? </th>
          </tr>
        </thead>

        <tbody>
          {services.map((services) => (
            <tr key={services.id}>
              <td>{services.id}</td>
              <td>{services.name}</td>
              <td>{services.description}</td>
              <td>{services.icon}</td>
              <td>{services.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)
}
