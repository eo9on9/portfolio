import type { ComponentPropsWithRef, ElementType } from 'react'

export type PolymorphicComponentProps<
  T extends ElementType,
  Props = object,
> = Props & {
  as?: T
} & Omit<ComponentPropsWithRef<T>, keyof Props | 'as'>
