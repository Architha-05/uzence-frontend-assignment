import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  }
}

export default preview
