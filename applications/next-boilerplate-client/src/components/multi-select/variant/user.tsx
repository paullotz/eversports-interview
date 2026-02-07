'use client'

import type { User } from '@frontend-interview/types'
import { type FC, useMemo } from 'react'
import { MultiSelect } from '../multi-select'
import type { MultiSelectItem } from '../types'
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
