import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'
import { FC } from 'react'

interface Props {
  onClearFilters: () => void
}

export const PurchasedProductListEmpty: FC<Props> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 h-64">
      <SearchX className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">No purchases found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2">
        Try adjusting your filters or clearing them to see more results.
      </p>
      <Button
        type="button"
        onClick={() => {
          onClearFilters()
        }}
        className="mt-4"
        variant="outline"
      >
        Clear filters
      </Button>
    </div>
  )
}
