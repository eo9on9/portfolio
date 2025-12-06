import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Select } from '.'

const OPTIONS = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '포도', value: 'grape' },
  { label: '딸기', value: 'strawberry' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: false,
      description: 'The options to display in the select',
      table: {
        category: 'Custom props',
        type: { summary: '{ label: string; value: string }[]' },
      },
    },
    defaultValue: {
      control: false,
      description: 'The default value of the select',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      control: false,
      description: 'The value of the select',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'undefined' },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text to display in the select',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      control: false,
      description: 'The function to call when the select value changes',
      table: {
        category: 'Custom props',
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        category: 'HTML button attributes',
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    isError: false,
    placeholder: 'Select an option',
    options: OPTIONS,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
