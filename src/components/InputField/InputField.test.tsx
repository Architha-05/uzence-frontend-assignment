import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { InputField } from './InputField'

describe('InputField', () => {
  it('renders label and helper text', () => {
    render(<InputField label="Email" helperText="We will not spam you" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('We will not spam you')).toBeInTheDocument()
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(<InputField label="Name" value="" onChange={onChange} />)
    const input = screen.getByLabelText('Name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Alice' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('shows error when invalid', () => {
    render(<InputField label="Name" invalid errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('clears when clear button clicked', () => {
    const onChange = vi.fn()
    render(<InputField label="Name" value="abc" onChange={onChange} clearable />)
    const clear = screen.getByLabelText('Clear input')
    fireEvent.click(clear)
    expect(onChange).toHaveBeenCalled()
  })
})
