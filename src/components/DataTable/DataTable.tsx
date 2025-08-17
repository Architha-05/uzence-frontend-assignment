import React from 'react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyMessage?: string
}

type SortState<T> = {
  key: keyof T | null
  direction: 'asc' | 'desc'
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>({ key: null, direction: 'asc' })
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sorted = React.useMemo(() => {
    if (!sort.key) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const av = a[sort.key!]
      const bv = b[sort.key!]
      if (av === bv) return 0
      const res = av > bv ? 1 : -1
      return sort.direction === 'asc' ? res : -res
    })
    return copy
  }, [data, sort])

  const toggleSort = (key: keyof T) => {
    setSort((s) => (s.key === key ? { key, direction: s.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }))
  }

  const toggleRow = (index: number) => {
    if (!selectable) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      onRowSelect?.(Array.from(next).map(i => sorted[i]))
      return next
    })
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
        <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white sticky top-0 z-10">
          <tr>
            {selectable && <th className="w-10"></th>}
            {columns.map(col => (
              <th key={col.key} scope="col" className="px-4 py-3 text-left text-sm font-semibold select-none">
                <button
                  className={clsx('flex items-center gap-1', col.sortable ? 'cursor-pointer' : 'cursor-default')}
                  onClick={() => col.sortable && toggleSort(col.dataIndex)}
                  aria-label={col.sortable ? `Sort by ${col.title}` : undefined}
                >
                  {col.title}
                  {col.sortable && sort.key === col.dataIndex && (
                    <span aria-hidden>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
          {loading ? (
            [...Array(3)].map((_, idx) => (
              <tr key={idx}>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-6">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center space-y-3 text-gray-500">
                  <span className="text-5xl">📭</span>
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr key={idx} className={clsx(
                idx % 2 === 0 ? 'bg-gray-50 dark:bg-neutral-900' : 'bg-white dark:bg-neutral-950',
                selectable && selected.has(idx) && 'bg-purple-50 dark:bg-purple-900/20'
              )}>
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${idx + 1}`}
                      checked={selected.has(idx)}
                      onChange={() => toggleRow(idx)}
                      className="accent-purple-500 h-4 w-4 rounded"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
