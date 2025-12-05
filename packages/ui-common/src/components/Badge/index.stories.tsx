import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '.'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the badge',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    children: 'badge content',
  },
  decorators: [
    Story => (
      <div className="p-4 bg-gray-400">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithColors: Story = {
  render: args => (
    <>
      <Badge className="bg-green-500" {...args} />
      <Badge className="bg-yellow-500" {...args} />
      <Badge className="bg-blue-500 text-white" {...args} />
      <Badge className="bg-red-500 text-white" {...args} />
    </>
  ),
}
