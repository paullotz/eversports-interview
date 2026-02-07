import { User } from '@frontend-interview/types'
import { MultiSelectItem } from '../types'

export const transformUser = (user: User): User & MultiSelectItem => ({
  ...user,
  name: `${user.firstName} ${user.lastName}`,
})
