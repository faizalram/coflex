import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-[#60a5fa] hover:shadow-lg hover:shadow-primary-600/30 dark:bg-primary dark:hover:bg-primary-hover dark:hover:shadow-primary-600/40",
        destructive: "bg-danger-500 text-white hover:bg-danger-600 hover:shadow-lg hover:shadow-danger-500/40 dark:bg-danger dark:hover:shadow-danger/40",
        outline: "border border-neutral-300 dark:border-border bg-white dark:bg-background-surface hover:bg-neutral-100 dark:hover:bg-background-elevated hover:text-neutral-900 dark:hover:text-text-primary hover:shadow-md hover:border-neutral-400 dark:hover:border-border-hover",
        secondary: "bg-neutral-100 dark:bg-background-surface text-neutral-900 dark:text-text-primary hover:bg-neutral-200 dark:hover:bg-background-elevated hover:shadow-md",
        ghost: "hover:bg-neutral-100 dark:hover:bg-background-elevated hover:text-neutral-900 dark:hover:text-text-primary",
        link: "text-primary-500 dark:text-primary underline-offset-4 hover:underline hover:text-primary-600 dark:hover:text-primary-hover",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
