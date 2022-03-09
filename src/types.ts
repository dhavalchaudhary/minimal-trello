export enum EntityType {
    CARD = "CARD",
    CATEGORY = "CATEGORY"
}

export type CardType = {
    title: string,
    id: string,
}

export type CategoryType = {
    title: string,
    cardIds: CardType['id'][]
}