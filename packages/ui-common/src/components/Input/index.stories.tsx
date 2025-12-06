import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { fn } from 'storybook/test'
import { Input } from '.'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'The icon to display in the input',
      table: {
        category: 'Custom props',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text to display in the input',
      table: {
        category: 'HTML input attributes',
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: 'radio',
      options: ['text', 'number', 'email', 'password', 'tel', 'url'],
      description: 'The type of the input',
      table: {
        category: 'HTML input attributes',
        defaultValue: { summary: 'text' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read only',
      table: {
        category: 'HTML input attributes',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        category: 'HTML input attributes',
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'The function to call when the input value changes',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    isError: false,
    icon: null,
    placeholder: 'Enter your name',
    type: 'text',
    readOnly: false,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <Search className="size-4 text-gray-400" />,
  },
}
