import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Modal } from '.'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the modal',
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      control: false,
      description: 'The function to call when the modal is closed',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the modal',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    title: 'Modal Title',
    open: false,
    onClose: fn(),
    children: 'Modal Content',
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
