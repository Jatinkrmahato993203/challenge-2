import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-[10px] uppercase tracking-widest font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-editorial-text)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] hover:opacity-80",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border-b border-[var(--color-editorial-text)] text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-bg-alt)]",
        secondary:
          "bg-[var(--color-editorial-bg-alt)] text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-border)]",
        ghost: "hover:bg-[var(--color-editorial-bg-alt)] text-[var(--color-editorial-text)]",
        link: "text-[var(--color-editorial-text)] underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-[10px]",
        lg: "h-12 px-8 text-xs",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // using 'button' as default if not asChild
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
