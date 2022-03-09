import React from 'react';
import { Card } from '../types';

export type CardContextType = {
    data: Card[],
    handlers: {
        addCard: (title: string, categoryIndex: number) => void,
        updateCard: (cardId: string, data: Partial<Omit<Card, 'id'>>) => void
        moveCard: (id: string, currentCategoryIndex: number, expectedCategoryIndex: number) => void
    }
}

const defaultCardContextValue: CardContextType = {
    data: [],
    handlers: {
        addCard: () => {},
        updateCard: () => {},
        moveCard: () => {}
    }
}

export const CardContext = React.createContext<CardContextType>(defaultCardContextValue)