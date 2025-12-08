import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Toast, ToastProvider, useToast } from '.'
import { Button } from '../Button'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['success', 'error', 'default'],
      description: 'The variant of the toast',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    message: {
      control: 'text',
      description: 'The message of the toast',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the toast is open',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    setIsOpen: {
      control: false,
      description: 'The function to set the open state of the toast',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    variant: 'default',
    message: 'Toast message..',
    isOpen: false,
    setIsOpen: fn(),
  },
  decorators: [
    Story => (
      <div className="w-full h-20">
        <ToastProvider>
          <Story />
        </ToastProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const WithHookRenderer = (args: Story['args']) => {
  const toast = useToast()

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <Button onClick={() => toast.success(args?.message ?? '')}>
        success
      </Button>
      <Button onClick={() => toast.error(args?.message ?? '')}>error</Button>
      <Button onClick={() => toast.default(args?.message ?? '')}>
        default
      </Button>
    </div>
  )
}

export const WithHook: Story = {
  argTypes: {
    isOpen: {
      control: false,
    },
    setIsOpen: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  render: WithHookRenderer,
}
