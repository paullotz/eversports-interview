'use client'

import { Product } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '@/components/ui/select'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface Props {
  items: Product[]
}

export const MultiSelect = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [appliedSelection, setAppliedSelection] = useState<boolean>(false)

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  // FIXME: performance issues
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  )

  const selectAllItems = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }

    setSelectAll(!selectAll)
  }

  const toggleSelect = () => {
    setOpen(!open)
  }

  const resetSearch = () => {
    searchTerm && setSearchTerm('')
  }

  const applySelection = () => {
    setOpen(false)
    setAppliedSelection(true)
  }

  const cancelSelection = () => {
    setOpen(false)
    setSelectedItems([])
    setAppliedSelection(false)
  }

  return (
    <Select open={open} onOpenChange={toggleSelect}>
      <SelectTrigger
        className={cn(
          'border-input focus:ring-0 focus:ring-offset-0',
          open && 'border-eversports bg-eversports/10',
        )}
      >
        <span className={cn(open && 'text-eversports-foreground')}>
          {!appliedSelection
            ? 'Select Product'
            : selectedItems.length > 0
              ? `${selectedItems.length} products selected`
              : 'Select Product'}
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
              checked={selectAll}
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
                  checked={selectedItems.includes(item.id)}
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
