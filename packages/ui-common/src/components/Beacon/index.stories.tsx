import type { Meta, StoryObj } from '@storybook/react-vite'
import { Beacon } from '.'
import { Button } from '../Button'

const meta = {
  title: 'Components/Beacon',
  component: Beacon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'The component to be wrapped by the beacon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'The class name to be applied to the beacon',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: <Button>Button</Button>,
  },
} satisfies Meta<typeof Beacon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
