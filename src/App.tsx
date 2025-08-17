import React, { useState } from 'react'
import { InputField } from './components/InputField/InputField'
import { DataTable, Column } from './components/DataTable/DataTable'

type User = {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
}

const initialData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Cara Lee', email: 'cara@example.com', role: 'Viewer' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<User[]>(initialData)

  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ]

  const filtered = data.filter(
    u =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Uzence Front-End Assignment Demo</h1>
        <p className="text-gray-600">InputField & DataTable components with TypeScript, Tailwind, and Storybook.</p>
      </header>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">InputField</h2>
        <InputField
          label="Search"
          placeholder="Type a name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          helperText="Try searching for 'alice'"
          variant="outlined"
          size="md"
          ariaLabel="Search input"
          clearable
        />
      </div>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">DataTable</h2>
        <DataTable<User>
          data={filtered}
          columns={columns}
          selectable
          onRowSelect={(rows) => console.log('Selected rows', rows)}
        />
      </div>
    </div>
  )
}
