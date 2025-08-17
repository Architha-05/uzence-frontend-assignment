import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from './InputField'
import React, { useState } from 'react'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: { layout: 'centered' }
}
export default meta

type Story = StoryObj<typeof InputField>

export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return <div className="w-80">
      <InputField label="Name" placeholder="Enter your name" value={val} onChange={(e) => setVal(e.target.value)} helperText="This is helper text" />
    </div>
  }
}

export const Variants: Story = {
  render: () => {
    const [v1, s1] = useState('')
    const [v2, s2] = useState('')
    const [v3, s3] = useState('')
    return <div className="space-y-4 w-80">
      <InputField label="Filled" variant="filled" value={v1} onChange={(e)=>s1(e.target.value)} />
      <InputField label="Outlined" variant="outlined" value={v2} onChange={(e)=>s2(e.target.value)} />
      <InputField label="Ghost" variant="ghost" value={v3} onChange={(e)=>s3(e.target.value)} />
    </div>
  }
}

export const States: Story = {
  render: () => {
    const [v, s] = useState('secret')
    return <div className="space-y-4 w-80">
      <InputField label="Disabled" disabled placeholder="Disabled" />
      <InputField label="Invalid" invalid errorMessage="This field is required" />
      <InputField label="Loading" loading placeholder="Loading..." />
      <InputField label="Password" type="password" passwordToggle value={v} onChange={(e)=>s(e.target.value)} />
      <InputField label="Clearable" clearable value={v} onChange={(e)=>s(e.target.value)} />
    </div>
  }
}
