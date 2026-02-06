'use client'

import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'

interface User extends MultiSelectItem {
  id: string
  name: string
}

interface Props {
  users: User[]
}

export const UserMultiSelect: FC<Props> = ({ users }) => {
  return (
    <MultiSelect<User>
      items={users}
      itemFamily="Users"
      onItemsApplied={(selected) => console.log(selected)}
    />
  )
}
