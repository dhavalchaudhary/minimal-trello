import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './app'
import { Card, Category, Entity } from '../../types'
import { mockCategoriesData, mockCardsData } from '../../mockData'

const loadlocalStorage = (data: {categories: Category[], cards: Card[]}) => {
  window.localStorage.setItem(Entity.CATEGORY, JSON.stringify(data.categories))
  window.localStorage.setItem(Entity.CARD, JSON.stringify(data.cards))
}

describe('App', () => {
  afterEach(() => {
    window.localStorage.removeItem(Entity.CARD)
    window.localStorage.removeItem(Entity.CATEGORY)
  })
  it('renders all the categories', () => {
    loadlocalStorage({categories: mockCategoriesData, cards: mockCardsData});
    
    render(<App />)

    const firstCategoryTitle = mockCategoriesData[0].title

    expect(screen.getByText(firstCategoryTitle)).toBeVisible();
    expect(screen.getAllByTestId("category-column")).toHaveLength(mockCategoriesData.length);
  })
  it('should create a new category', () => {
    loadlocalStorage({categories: mockCategoriesData, cards: mockCardsData});
    
    const mockCategoryTitle = "Test Category"

    render(<App />)

    fireEvent.click(screen.getByText(/add new category/i));
    fireEvent.change(screen.getByPlaceholderText(/add category title/i), {target: {value: mockCategoryTitle}});
    fireEvent.click(screen.getByTestId('entity-add-save'))

    expect(screen.getByText(mockCategoryTitle)).toBeVisible();
    expect(screen.getAllByTestId("category-column")).toHaveLength(mockCategoriesData.length + 1);

  })
  it('should create a new card within a category', () => {
    loadlocalStorage({categories: mockCategoriesData.slice(0,1), cards: mockCardsData});
    
    const mockCardTitle = "Test Card";

    render(<App />)

    const existingCardsLength = screen.getByTestId('card-list-wrapper').children.length

    fireEvent.click(screen.getByText(/add new card/i));
    fireEvent.change(screen.getByPlaceholderText(/add card title/i), {target: {value: mockCardTitle}});
    fireEvent.click(screen.getByTestId('entity-add-save'))

    expect(screen.getByText(mockCardTitle)).toBeVisible();
    expect(screen.getByTestId('card-list-wrapper').children).toHaveLength(existingCardsLength + 1)

  })
  it('should persist the newly created data', () => {
    const mockCategoryTitle = "Test Category"
    const mockCardTitle = "Test Card";

    render(<App />)

    fireEvent.click(screen.getByText(/add new category/i));
    fireEvent.change(screen.getByPlaceholderText(/add category title/i), {target: {value: mockCategoryTitle}});
    fireEvent.click(screen.getByTestId('entity-add-save'));

    fireEvent.click(screen.getByText(/add new card/i));
    fireEvent.change(screen.getByPlaceholderText(/add card title/i), {target: {value: mockCardTitle}});
    fireEvent.click(screen.getByTestId('entity-add-save'))

    const persistedCardsData = JSON.parse(window.localStorage.getItem(Entity.CARD) || '');
    const persistedCategoriesData = JSON.parse(window.localStorage.getItem(Entity.CATEGORY) || '');

    expect(persistedCardsData).toHaveLength(1);
    expect(persistedCardsData[0].title).toStrictEqual(mockCardTitle)
    expect(persistedCategoriesData).toHaveLength(1);
    expect(persistedCategoriesData[0].title).toStrictEqual(mockCategoryTitle)

  })
  it('should update a card within a category', () => {
    loadlocalStorage({categories: mockCategoriesData.slice(0,1), cards: mockCardsData});
    
    const mockNewCardTitle = "Test Card";

    render(<App />)

    fireEvent.click(screen.getByTestId('card-edit-btn'));
    fireEvent.change(screen.getByTestId('card-edit-input'), {target: {value: mockNewCardTitle}});
    fireEvent.click(screen.getByTestId('card-edit-save'))

    expect(screen.getByText(mockNewCardTitle)).toBeVisible()
  })
  it('should move a card to different columns', () => {
    loadlocalStorage({categories: mockCategoriesData.slice(0,2), cards: mockCardsData});

    const getCategoryCardsLength = (index: number) => screen.getAllByTestId('category-column')[index].querySelector('[data-testid="card-list-wrapper"]')?.children.length as number

    render(<App />)

    const firstCategoryCardsLength = getCategoryCardsLength(0)
    const secondCategoryCardsLength = getCategoryCardsLength(1)

    fireEvent.click(screen.getAllByTestId('card-move-right-btn')[0]);
    expect(getCategoryCardsLength(0)).toEqual(firstCategoryCardsLength - 1)
    expect(getCategoryCardsLength(1)).toEqual(secondCategoryCardsLength + 1)

    fireEvent.click(screen.getAllByTestId('card-move-left-btn')[1]);
    expect(getCategoryCardsLength(0)).toEqual(firstCategoryCardsLength)
    expect(getCategoryCardsLength(1)).toEqual(secondCategoryCardsLength)

  })
})
