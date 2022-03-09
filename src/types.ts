export enum Entity {
  CARD = 'card',
  CATEGORY = 'category'
}

export type Card = {
  title: string
  id: string
}

export type Category = {
  title: string
  cardIds: Card['id'][]
}
