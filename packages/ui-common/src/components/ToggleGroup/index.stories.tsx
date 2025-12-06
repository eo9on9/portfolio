import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ToggleGroup } from '.'

const OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
]

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: false,
      description: 'The options to display in the toggle group',
      table: {
        type: { summary: '{ label: string; value: string }[]' },
      },
    },
    defaultValue: {
      control: false,
      description: 'The default value of the select',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      control: false,
      description: 'The value of the select',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    fill: {
      control: 'boolean',
      description:
        'Whether the toggle group should fill the width of its container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'The function to call when the select value changes',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    options: OPTIONS,
    defaultValue: 'option1',
    fill: false,
    onChange: fn(),
  },
  decorators: [
    Story => (
      <div className="flex w-full justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
