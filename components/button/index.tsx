import * as React from 'react'
import clsx from "clsx"

export interface IButtonProps {
  children: React.ReactNode
  className?: string
}

const Button = ({ children, className }: IButtonProps) => {
  return (
    <button className={clsx(`rounded-full bg-blue-500 p-2 px-3 text-sm font-semibold text-white hover:bg-blue-400`, className)}>
      {children}
    </button>
  )
}

export default Button