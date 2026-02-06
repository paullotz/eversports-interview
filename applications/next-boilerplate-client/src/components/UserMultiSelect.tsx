'use client'

import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'
import type { User } from '@shared/types'

interface Props {
  onSelectedUsers: (users: User[]) => void
}

export const UserMultiSelect: FC<
  Props & { users: User[]; selectedUsers: User[] }
> = ({ onSelectedUsers, users }) => {
  return (
    <MultiSelect<User & MultiSelectItem>
      items={users.map((user: User) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
      }))}
      itemFamily="Users"
      onCancelSelection={() => onSelectedUsers([])}
      onItemsApplied={(selected) => onSelectedUsers(selected)}
    />
  )
}
