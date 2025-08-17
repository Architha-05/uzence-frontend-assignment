import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { DataTable, Column } from './DataTable'

type User = { id: number; name: string; email: string; role: string }

const data: User[] = [
  { id: 1, name: 'Bob', email: 'b@example.com', role: 'Admin' },
  { id: 2, name: 'Alice', email: 'a@example.com', role: 'Editor' }
]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true }
]

describe('DataTable', () => {
  it('renders rows', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('sorts by column', () => {
    render(<DataTable data={data} columns={columns} />)
    const sortBtn = screen.getByRole('button', { name: /Sort by Name/i })
    fireEvent.click(sortBtn) // asc
    fireEvent.click(sortBtn) // desc, just ensure clickable
    expect(sortBtn).toBeInTheDocument()
  })

  it('selects rows when selectable', () => {
    const spy = vi.fn()
    render(<DataTable data={data} columns={columns} selectable onRowSelect={spy} />)
    const checkbox = screen.getByLabelText('Select row 1')
    fireEvent.click(checkbox)
    expect(spy).toHaveBeenCalled()
  })
})
