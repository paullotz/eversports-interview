'use client'

import { FC, useMemo } from 'react'
import { MultiSelect } from '../multi-select'
import type { User } from '@shared/types'
import { MultiSelectItem } from '../types'
import { transformUser } from './utils'

interface Props {
  users: User[]
  selectedUsers: User[]
  onChange: (users: User[]) => void
  loading?: boolean
}

export const UserMultiSelect: FC<Props> = ({
  users,
  selectedUsers,
  onChange,
  loading = false,
}) => {
  const transformedUsers = useMemo(() => users.map(transformUser), [users])
  const transformedSelected = useMemo(
    () => selectedUsers.map(transformUser),
    [selectedUsers],
  )

  return (
    <MultiSelect<User & MultiSelectItem>
      items={transformedUsers}
      itemFamily="Users"
      selected={transformedSelected}
      onCancel={() => onChange([])}
      onChange={(selected) => onChange(selected)}
      loading={loading}
    />
  )
}
