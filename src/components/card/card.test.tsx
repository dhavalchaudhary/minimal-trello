import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Card } from './card';
import { mockCategoriesData } from '../../mockData';
import { CardContext, CardContextType, defaultCardContextValue } from '../../context';
import { mockCardsData } from '../../mockData/cards';
import { Card as CardType } from '../../types';

let mockIndex = 0;
const mockCardId = mockCategoriesData[mockIndex].cardIds[0]
const mockCardData = mockCardsData.find(({id}) => id === mockCardId) as CardType

let mockCardContextValue: CardContextType = {
    ...defaultCardContextValue,
    data: mockCardsData
}

describe('Card', () => {
    afterEach(() => {
        cleanup()
    })
    it('renders the card title and action buttons', () => {
        render(<CardContext.Provider value={mockCardContextValue}><Card id={mockCardId} categoryIndex={mockIndex} /></CardContext.Provider>);
        expect(screen.getByText(mockCardData.title)).toBeVisible();
        expect(screen.getByTestId('card-move-left-btn')).toBeVisible()
        expect(screen.getByTestId('card-move-right-btn')).toBeVisible()
    })
    it('disables the invalid move left button', () => {
        mockCardContextValue = {
            ...mockCardContextValue,
            meta: {
                totalCategories: 2
            }
        }
        render(<CardContext.Provider value={mockCardContextValue}><Card id={mockCardId} categoryIndex={mockIndex} /></CardContext.Provider>);

        expect(screen.getByTestId('card-move-left-btn')).toBeDisabled()
        expect(screen.getByTestId('card-move-right-btn')).not.toBeDisabled()

    })
    it('disables the invalid move right button', () => {
        mockIndex = 1
        mockCardContextValue = {
            ...mockCardContextValue,
            meta: {
                totalCategories: 2
            }
        }
        render(<CardContext.Provider value={mockCardContextValue}><Card id={mockCardId} categoryIndex={mockIndex} /></CardContext.Provider>);

        expect(screen.getByTestId('card-move-right-btn')).toBeDisabled()
        expect(screen.getByTestId('card-move-left-btn')).not.toBeDisabled()

    })
    it('displays the input elements when clicked on edit', () => {
        render(<CardContext.Provider value={mockCardContextValue}><Card id={mockCardId} categoryIndex={mockIndex} /></CardContext.Provider>);
        
        fireEvent.click(screen.getByTestId('card-edit-btn'))
        
        expect(screen.getByTestId('card-edit-input')).toBeVisible();
        expect(screen.getByTestId('card-edit-cancel')).toBeVisible();
        expect(screen.getByTestId('card-edit-save')).toBeVisible();

        fireEvent.click(screen.getByTestId('card-edit-cancel'));

        expect(screen.getByText(mockCardData.title)).toBeVisible();
        expect(screen.queryByTestId('card-edit-input')).toBeFalsy()
        expect(screen.queryByTestId('card-edit-cancel')).toBeFalsy()
        expect(screen.queryByTestId('card-edit-save')).toBeFalsy()

    })
})