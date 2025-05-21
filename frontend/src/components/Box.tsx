import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'

type BoxProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentPropsWithoutRef<T>

const Box = <T extends ElementType = 'div'>({
  as,
  children,
  ...rest
}: BoxProps<T>) => {
  const Component = as || 'div'
  return <Component {...rest}>{children}</Component>
}

export default Box
