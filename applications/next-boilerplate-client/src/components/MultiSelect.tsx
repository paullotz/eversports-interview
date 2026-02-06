import { Product } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

interface Props {
  items: Product[]
}

export const MultiSelect = ({ items }: Props) => {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
          <Input
            className="w-full border-none shadow-none select-none"
            placeholder="Search..."
          />
          <Separator className="my-2" />

          <SelectItem value="select-all">Select All</SelectItem>

          <Separator className="my-2" />
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>

          <Separator className="my-2" />

          <div className="flex justify-between">
            <Button variant="ghost">Cancel</Button>
            <Button className="bg-eversports">Apply</Button>
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}
