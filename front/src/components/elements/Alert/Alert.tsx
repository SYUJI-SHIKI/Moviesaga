import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="w-70 h-11 m-2 border-4 flex items-center justify-center">
      <div>
        <AlertCircle className="h-4 w-4" />
      </div>
      <AlertDescription className="ml-1">
        {message}
      </AlertDescription>
    </Alert>
  )
}
