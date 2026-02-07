'use client'

import { Select, SelectContent, SelectGroup, SelectTrigger } from '../ui/select'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '../../lib/utils'
import { Search, Loader2 } from 'lucide-react'
import { MultiSelectItem } from './types'
import { ItemRow } from './item-row'

interface Props<T extends MultiSelectItem> {
  items: T[]
  itemFamily: string
  selected?: T[]
  onChange?: (selected: T[]) => void
  onCancel?: () => void
  loading?: boolean
}

export const MultiSelect = <T extends MultiSelectItem>({
  items,
  itemFamily,
  selected = [],
  onChange,
  onCancel,
  loading = false,
}: Props<T>) => {
  const [draftSelected, setDraftSelected] = useState<T[]>(selected)
  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (open) {
      setDraftSelected(selected)
    }
  }, [selected, open])

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [items, searchTerm])

  const toggleItem = useCallback(
    (id: string) => {
      setDraftSelected((prev) => {
        const isSelected = prev.some((item) => item.id === id)

        if (isSelected) {
          return prev.filter((item) => item.id !== id)
        }

        const item = items.find((item) => item.id === id)

        if (!item) {
          return prev
        }

        return [...prev, item]
      })
    },
    [items],
  )

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
    if (loading) {
      return
    }

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
    onChange?.(draftSelected)
  }

  const cancelSelection = () => {
    setOpen(false)
    onCancel?.()
  }

  const hasSelection = selected.length > 0
  const triggerLabel = hasSelection
    ? `${selected.length} ${itemFamily} selected`
    : `Select ${itemFamily}`

  return (
    <Select open={open} onOpenChange={toggleSelect}>
      <SelectTrigger
        disabled={loading}
        aria-expanded={open}
        aria-busy={loading}
        className={cn(
          'border-input focus:ring-0 focus:ring-offset-0',
          open && 'border-eversports bg-eversports/10',
        )}
      >
        <span className={cn(open && 'text-eversports-foreground')}>
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Loading {itemFamily.toLowerCase()}...</span>
            </span>
          ) : (
            triggerLabel
          )}
        </span>
      </SelectTrigger>

      <SelectContent role="listbox" aria-label={`${itemFamily} selection`}>
        <div className="flex flex-row items-center px-3">
          <Search className="h-4 w-4" aria-hidden="true" />
          <Input
            className="w-full border-none shadow-none focus-visible:ring-0 text-sm"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label={`Search ${itemFamily.toLowerCase()}`}
          />
        </div>

        <Separator className="mb-3" />

        <SelectGroup>
          <div className="flex flex-row items-center gap-2 px-3">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={selectAllItems}
              aria-label="Select all items"
            />
            <Label htmlFor="select-all">Select All</Label>
          </div>

          <Separator className="my-3" />

          <div
            className="flex flex-col gap-y-5 px-3 overflow-y-auto max-h-60"
            role="group"
            aria-label="Available items"
          >
            {(searchTerm ? filteredItems : items).map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                draftSelected={draftSelected}
                toggleItem={toggleItem}
              />
            ))}
          </div>

          {searchTerm && filteredItems.length === 0 && (
            <div className="flex flex-col gap-2 items-center justify-start">
              <div className="px-3 text-sm text-muted-foreground">
                No {itemFamily.toLowerCase()} found.
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
          <Button onClick={applySelection}>
            Apply ({draftSelected.length})
          </Button>
        </div>
      </SelectContent>
    </Select>
  )
}
