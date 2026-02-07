'use client'

import { Select, SelectContent, SelectGroup, SelectTrigger } from '../ui/select'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '../../lib/utils'
import { Search, Loader2 } from 'lucide-react'
import { MultiSelectItem } from './types'

interface Props<T extends MultiSelectItem> {
  items: T[]
  itemFamily: string
  selected?: T[]
  onItemsApplied?: (selected: T[]) => void
  onCancelSelection?: () => void
  loading?: boolean
}

export const MultiSelect = <T extends MultiSelectItem>({
  items,
  itemFamily,
  selected = [],
  onItemsApplied,
  onCancelSelection,
  loading = false,
}: Props<T>) => {
  const [draftSelected, setDraftSelected] = useState<T[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  )

  const toggleItem = (id: string) => {
    setDraftSelected((prev) =>
      prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, items.find((item) => item.id === id)!],
    )
  }

  const selectAllItems = () => {
    const allSelected =
      items.length > 0 && draftSelected.length === items.length
    if (allSelected) {
      setDraftSelected([])
    } else {
      setDraftSelected(items)
    }
  }

  const isAllSelected =
    items.length > 0 && draftSelected.length === items.length

  const toggleSelect = (isOpen: boolean) => {
    if (loading) return
    setOpen(isOpen)
    if (isOpen) {
      setDraftSelected(selected)
      setSearchTerm('')
    }
  }

  const resetSearch = () => {
    setSearchTerm('')
  }

  const applySelection = () => {
    setOpen(false)
    onItemsApplied?.(draftSelected)
  }

  const cancelSelection = () => {
    setOpen(false)
    onCancelSelection?.()
  }

  return (
    <Select open={open} onOpenChange={toggleSelect}>
      <SelectTrigger
        disabled={loading}
        className={cn(
          'border-input focus:ring-0 focus:ring-offset-0',
          open && 'border-eversports bg-eversports/10',
        )}
      >
        <span className={cn(open && 'text-eversports-foreground')}>
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading {itemFamily.toLowerCase()}...
            </span>
          ) : selected.length > 0 ? (
            `${selected.length} ${itemFamily} selected`
          ) : (
            `Select ${itemFamily}`
          )}
        </span>
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-row items-center px-3">
          <Search className="h-4 w-4" />
          <Input
            className="w-full border-none shadow-none focus-visible:ring-0 text-sm"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            value={searchTerm}
          />
        </div>

        <Separator className="mb-3" />

        <SelectGroup>
          <div className="flex flex-row items-center gap-2 px-3">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={selectAllItems}
            />
            <Label htmlFor="select-all">Select All</Label>
          </div>

          <Separator className="my-3" />

          <div className="flex flex-col gap-y-5 px-3 overflow-y-auto max-h-60">
            {(searchTerm ? filteredItems : items).map((item) => (
              <div key={item.id} className="flex flex-row items-center gap-2">
                <Checkbox
                  id={item.id}
                  checked={draftSelected.some((s) => s.id === item.id)}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <Label htmlFor={item.id} className="cursor-pointer w-full">
                  {item.name}
                </Label>
              </div>
            ))}
          </div>

          {searchTerm && filteredItems.length === 0 && (
            <div className="flex flex-col gap-2 items-center justify-start">
              <div className="px-3 text-sm text-muted-foreground">
                No products found.
              </div>
              <Button size="sm" variant="ghost" onClick={resetSearch}>
                Reset search
              </Button>
            </div>
          )}
        </SelectGroup>

        <Separator className="my-2" />

        <div className="flex justify-between px-3 mb-1">
          <Button variant="ghost" onClick={cancelSelection}>
            Cancel
          </Button>
          <Button onClick={applySelection}>Apply</Button>
        </div>
      </SelectContent>
    </Select>
  )
}
