import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useId,
} from 'react'

interface FormFieldProps {
  label: string
}

export const FormField = ({
  label,
  children,
}: PropsWithChildren<FormFieldProps>) => {
  const id = useId()

  if (!isValidElement(children)) {
    console.warn('FormField.Body expects a single ReactElement as its child.')
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenWithId = cloneElement(children as ReactElement<any>, { id })

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor={id} className="text-sm text-gray-800 font-medium">
          {label}
        </label>
      </div>
      {childrenWithId}
    </div>
  )
}
