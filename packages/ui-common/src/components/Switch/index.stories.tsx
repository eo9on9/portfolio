import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Switch } from '.'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'boolean',
      description: 'The default value of the switch',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'boolean',
      description: 'The value of the switch',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      control: false,
      description: 'The function to call when the switch value changes',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    defaultValue: false,
    value: false,
    onChange: fn(),
    disabled: false,
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
