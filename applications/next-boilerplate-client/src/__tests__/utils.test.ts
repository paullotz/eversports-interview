import { expect, test } from 'vitest'
import { transformUser } from '../components/multi-select/variant/utils'
import { User } from '@frontend-interview/types'

test('transformUser combines firstName and lastName into name', () => {
  const user: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    profilePictureUrl: 'https://example.com/john.jpg',
  }

  const result = transformUser(user)

  expect(result.name).toBe('John Doe')
})

test('transformUser preserves other user properties', () => {
  const user: User = {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    profilePictureUrl: 'https://example.com/jane.jpg',
    email: 'jane@example.com',
  }

  const result = transformUser(user)

  expect(result.name).toEqual('Jane Doe')
})
