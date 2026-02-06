'use client'

import { FC } from 'react'
import { MultiSelect } from '../multi-select'
import type { User } from '@shared/types'
import { MultiSelectItem } from '../types'

interface Props {
  users: User[]
  selectedUsers: User[]
  onSelectedUsers: (users: User[]) => void
}

export const UserMultiSelect: FC<Props> = ({
  users,
  selectedUsers,
  onSelectedUsers,
}) => {
  const transformUser = (user: User) => ({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
  })

  return (
    <MultiSelect<User & MultiSelectItem>
      items={users.map(transformUser)}
      itemFamily="Users"
      selected={selectedUsers.map(transformUser)}
      onCancelSelection={() => onSelectedUsers([])}
      onItemsApplied={(selected) => onSelectedUsers(selected)}
    />
  )
}
