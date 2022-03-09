import React from 'react';
import { Card } from '../types';

export type CardContextType = {
    data: Card[],
    handlers: {
        addNewCard: (title: string, categoryIndex: number) => void
    }
}

const defaultCardContextValue: CardContextType = {
    data: [],
    handlers: {
        addNewCard: () => {}
    }
}

export const CardContext = React.createContext<CardContextType>(defaultCardContextValue)