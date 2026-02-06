'use client'

import { FC } from 'react'
import { MultiSelect, MultiSelectItem } from './MultiSelect'
import { useQuery } from '@apollo/client'
import { USERS_QUERY } from '@/lib/queries'
import type { User } from '@shared/types'

interface Props {
  onSelectedUsers: (users: User[]) => void
}

export const UserMultiSelect: FC<Props> = ({ onSelectedUsers }) => {
  const {
    error,
    data: { users: { nodes: users } = { nodes: [] } } = {},
    loading,
  } = useQuery(USERS_QUERY)

  if (error) return <p>Error: {error.message}</p>

  if (loading) return <p>Loading...</p>

  if (!users) return <p>No products found.</p>

  console.log(users)

  return (
    <MultiSelect<User & MultiSelectItem>
      items={users.map((user: User) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
      }))}
      itemFamily="Users"
      onItemsApplied={(selected) => onSelectedUsers(selected)}
    />
  )
}
