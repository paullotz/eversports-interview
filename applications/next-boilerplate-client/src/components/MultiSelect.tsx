import { Product } from "@/lib/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}