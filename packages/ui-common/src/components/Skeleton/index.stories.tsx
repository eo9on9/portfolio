import { cnMerge } from '@/utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '.'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'The class name to be applied to the skeleton',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  render: args => (
    <Skeleton className={cnMerge('w-60 h-40', args?.className)} />
  ),
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
