import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'

type TextProps<T extends ElementType> = {
  as?: T
  children: ReactNode
} & ComponentPropsWithoutRef<T>

const Text = <T extends ElementType = 'span'>({
  as,
  children,
  ...rest
}: TextProps<T>) => {
  const Component = as || 'div'
  return <Component {...rest}>{children}</Component>
}

export default Text
