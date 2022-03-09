import React from 'react';
import { Card } from '../types';

export type CardContextType = {
    data: Card[],
    handlers: {
        addCard: (title: string, categoryIndex: number) => void,
        updateCard: (cardId: string, data: Partial<Omit<Card, 'id'>>) => void
    }
}

const defaultCardContextValue: CardContextType = {
    data: [],
    handlers: {
        addCard: () => {},
        updateCard: () => {}
    }
}

export const CardContext = React.createContext<CardContextType>(defaultCardContextValue)