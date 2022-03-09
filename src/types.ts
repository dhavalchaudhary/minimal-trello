export enum Entity {
  CARD = 'CARD',
  CATEGORY = 'CATEGORY'
}

export type Card = {
  title: string
  id: string
}

export type Category = {
  title: string
  cardIds: Card['id'][]
}
