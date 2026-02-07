import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '../../ui/button'
import { FC } from 'react'

interface Props {
  refetch: () => void
}

export const PurchasedProductListError: FC<Props> = ({ refetch }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-destructive/5 h-64">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive">
        Error loading purchases
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-4">
        There was a problem fetching the data. Please try again.
      </p>
      <Button
        type="button"
        onClick={() => refetch()}
        variant="outline"
        size="sm"
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
}
