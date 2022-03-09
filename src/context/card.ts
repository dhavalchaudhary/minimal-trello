import React from 'react';
import { Card } from '../types';

export type CardContextType = {
    data: Card[]
}

const defaultCardContextValue: CardContextType = {
    data: []
}

export const CardContext = React.createContext<CardContextType>(defaultCardContextValue)