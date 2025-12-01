import {
  render,
  RenderResult,
  type queries,
  type Queries,
  type RenderOptions,
} from '@testing-library/react'
import {
  userEvent,
  type Options as UserEventOptions,
} from '@testing-library/user-event'
import type { ReactNode } from 'react'

type RendererableContainer = Element | DocumentFragment
type HydrateableContainer = Element | Document

export const setup = <
  Q extends Queries = typeof queries,
  Container extends RendererableContainer | HydrateableContainer = HTMLElement,
  BaseElement extends RendererableContainer | HydrateableContainer = Container,
>(
  ui: ReactNode,
  renderOptions: RenderOptions<Q, Container, BaseElement> = {},
  userEventOptions: UserEventOptions = {},
): RenderResult<Q, Container, BaseElement> & {
  user: ReturnType<typeof userEvent.setup>
} => {
  return {
    user: userEvent.setup(userEventOptions),
    ...render(ui, renderOptions),
  }
}
