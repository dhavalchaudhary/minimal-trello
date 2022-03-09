import React from 'react';
import { render, screen } from '@testing-library/react'
import { Category } from './category';
import { mockCategoriesData } from '../../mockData';
import { CardContext, defaultCardContextValue } from '../../context';
import { mockCardsData } from '../../mockData/cards';

const mockIndex = 0;
const mockCategoryData = mockCategoriesData[mockIndex]
const mockCardContextValue = {
    ...defaultCardContextValue,
    data: mockCardsData
}

describe('Category', () => {
    it('renders the category tile, list of cards and add new card button', () => {
        render(<CardContext.Provider value={mockCardContextValue}><Category data={mockCategoryData} index={mockIndex} /></CardContext.Provider>)
      
        expect(screen.getByText(mockCategoryData.title)).toBeVisible()
        expect(screen.getByTestId('card-list-wrapper').children).toHaveLength(mockCategoryData.cardIds.length)
        expect(screen.getByText(/add new card/i)).toBeVisible()

    })
})