import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: 'number',
      description: 'The total number of pages',
      table: {
        type: { summary: 'number' },
      },
    },
    currentPage: {
      control: 'number',
      description: 'The current page',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      control: false,
      description: 'The function to call when the page changes',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: '(page: number) => void' },
      },
    },
  },
  args: {
    totalPages: 12,
    currentPage: 1,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const WithStateRenderer = (args: Story['args']) => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      totalPages={args?.totalPages ?? 12}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}

export const WithState: Story = {
  argTypes: {
    totalPages: {
      control: false,
    },
    currentPage: {
      control: false,
    },
    onPageChange: {
      control: false,
    },
  },
  render: WithStateRenderer,
}
