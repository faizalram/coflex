import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: [
          // Light mode styles
          "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400 dark:hover:shadow-blue-500/40",
          "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900"
        ],
        destructive: [
          // Light mode styles
          "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25",
          "focus-visible:ring-red-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:bg-red-500 dark:text-white dark:hover:bg-red-400 dark:hover:shadow-red-500/40",
          "dark:focus-visible:ring-red-400 dark:focus-visible:ring-offset-gray-900"
        ],
        outline: [
          // Light mode styles
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:border-gray-500",
          "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900"
        ],
        secondary: [
          // Light mode styles
          "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
          "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900"
        ],
        ghost: [
          // Light mode styles
          "text-gray-900 hover:bg-gray-100 hover:text-gray-900",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100",
          "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900"
        ],
        link: [
          // Light mode styles
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-white",
          // Dark mode styles
          "dark:text-blue-400 dark:hover:text-blue-300",
          "dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900"
        ],
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
