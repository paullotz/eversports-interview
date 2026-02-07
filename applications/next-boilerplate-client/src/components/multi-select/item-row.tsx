import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { MultiSelectItem } from './types'

interface Props<T extends MultiSelectItem> {
  item: T
  draftSelected: T[]
  toggleItem: (id: string) => void
}

export const ItemRow = <T extends MultiSelectItem>({
  item,
  draftSelected,
  toggleItem,
}: Props<T>) => {
  const isSelected = draftSelected.some((s) => s.id === item.id)

  const handleToggle = () => {
    toggleItem(item.id)
  }

  return (
    <div
      className="flex flex-row items-center gap-2"
      role="option"
      aria-selected={isSelected}
    >
      <Checkbox
        id={item.id}
        checked={isSelected}
        onCheckedChange={handleToggle}
        aria-label={item.name}
      />
      <Label htmlFor={item.id} className="cursor-pointer w-full">
        {item.name}
      </Label>
    </div>
  )
}
