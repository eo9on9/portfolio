import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '.'
import { Input } from '../Input'

const meta = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the form field',
      table: {
        type: { summary: 'string' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'The error message of the form field',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'The content of the form field',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    label: 'Name',
    errorMessage: '',
  },
  render: args => (
    <FormField {...args}>
      <Input placeholder="Enter your name" isError={!!args.errorMessage} />
    </FormField>
  ),
} satisfies Meta<typeof FormField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
