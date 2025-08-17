import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { DataTable, Column } from './DataTable'

type User = { id: number; name: string; email: string; role: 'Admin'|'Editor'|'Viewer' }

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  parameters: { layout: 'padded' }
}
export default meta

type Story = StoryObj<typeof DataTable<User>>

const rows: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Cara Lee', email: 'cara@example.com', role: 'Viewer' }
]

const cols: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true }
]

export const Basic: Story = {
  args: { data: rows, columns: cols }
}

export const Loading: Story = {
  args: { data: [], columns: cols, loading: true }
}

export const Empty: Story = {
  args: { data: [], columns: cols }
}

export const Selectable: Story = {
  args: {
    data: rows,
    columns: cols,
    selectable: true,
    onRowSelect: (rows) => console.log('Selected', rows)
  }
}
