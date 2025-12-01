import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusIcon } from 'lucide-react'
import { fn } from 'storybook/test'
import { Button } from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'radio',
      options: ['button', 'a', 'div', 'span'],
      description: 'The component to render as',
      table: {
        defaultValue: { summary: "'button'" },
      },
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost'],
      description: 'The variant of the button',
      table: {
        defaultValue: { summary: "'primary'" },
      },
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: "'md'" },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is loading',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      control: false,
      description: 'The function to call when the button is clicked',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    as: 'button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
    children: 'Click me',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        <PlusIcon className="size-4" />
        Add
      </>
    ),
  },
}
