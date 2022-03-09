import { Card } from '../types'
import { v4 as uuidv4 } from 'uuid'

export const mockCardsData: Card[] = [
  {
    title: 'Task 1',
    id: uuidv4()
  },
  {
    title: 'Task 2',
    id: uuidv4()
  }
]
