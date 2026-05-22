import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ResponsiveDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  contentClassName?: string
}

export const ResponsiveDialog = ({
  trigger,
  title,
  description,
  children,
  contentClassName,
}: ResponsiveDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[calc(100%-2rem)] sm:max-w-lg",
          contentClassName
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
