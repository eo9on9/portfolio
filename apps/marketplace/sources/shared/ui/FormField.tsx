import { cn } from '@shared/util/cn'
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useId,
} from 'react'

interface FormFieldProps {
  label: string
  errorMessage?: string
}

export const FormField = ({
  label,
  errorMessage,
  children,
}: PropsWithChildren<FormFieldProps>) => {
  const id = useId()

  if (!isValidElement(children)) {
    console.warn(
      'FormField children expects a single ReactElement as its child.',
    )
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenWithProps = cloneElement(children as ReactElement<any>, {
    id,
  })

  return (
    <div className={containerTw}>
      <div>
        <label htmlFor={id} className={labelTw}>
          {label}
        </label>
      </div>
      {childrenWithProps}
      {errorMessage && <p className={errorMessageTw}>{errorMessage}</p>}
    </div>
  )
}

const containerTw = cn`flex flex-col gap-2`

const labelTw = cn`text-sm font-medium text-gray-800`

const errorMessageTw = cn`text-xs text-error`
