import React from 'react';
import { Card } from '../types';

export type CardContextType = {
    data: Card[],
    handlers: {
        addNewCard: (title: string, categoryIndex: number) => void,
        updateCard: (cardId: string, data: Partial<Omit<Card, 'id'>>) => void
    }
}

const defaultCardContextValue: CardContextType = {
    data: [],
    handlers: {
        addNewCard: () => {},
        updateCard: () => {}
    }
}

export const CardContext = React.createContext<CardContextType>(defaultCardContextValue)