import React, { useState } from 'react'
import { CardContext, CardContextType } from '../../context'
import { mockCategoriesData } from '../../mockData'
import { mockCardsData } from '../../mockData/cards'
import {  Card, Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { CategoryColumn } from '../category-column'
import { v4 as uuidv4 } from 'uuid';
import {usePersistedState} from '../../hooks';

export const App = () => {
  const [categories, setCategories] = usePersistedState<Category[]>(Entity.CATEGORY, []);
  const [cards, setCards] = usePersistedState<Card[]>(Entity.CARD, [])

  const addCategory = (title: string) => {
    const newCategory: Category = {
      title,
      cardIds: []
    }
    setCategories([...categories, newCategory])
  }

  const addCard: CardContextType['handlers']['addCard'] = (title, categoryIndex) => {
    const newCard: Card = {
      title,
      id: uuidv4()
    };

    const category = categories[categoryIndex]
    const newCategory: Category = {
      ...category,
      cardIds: [...category.cardIds, newCard.id]
    }

    setCards([...cards, newCard])
    setCategories([...categories.slice(0,categoryIndex), newCategory, ...categories.slice(categoryIndex + 1)])
  }

  const updateCard: CardContextType['handlers']['updateCard'] = (cardId, data) => {
    const currentCardIndex = cards.findIndex(card => card.id === cardId);
    if(currentCardIndex > -1) {
      const newCard: Card = {...cards[currentCardIndex], ...data};

      setCards([...cards.slice(0,currentCardIndex), newCard, ...cards.slice(currentCardIndex + 1)])
    }
  }

  const moveCard = (id: string, currentCategoryIndex: number, expectedCategoryIndex: number) => {
    let newCategoriesState = categories.slice()

    const currentCategory = categories[currentCategoryIndex];
    const newCurrentCategoryData: Category = {
      ...currentCategory,
      cardIds: currentCategory.cardIds.filter(cardId => cardId !== id)
    }

    newCategoriesState = [...newCategoriesState.slice(0, currentCategoryIndex), newCurrentCategoryData, ...newCategoriesState.slice(currentCategoryIndex + 1)]

    const expectedCategory = categories[expectedCategoryIndex];
    const newExpectedCategoryData: Category = {
      ...expectedCategory,
      cardIds: expectedCategory.cardIds.concat(id)
    }

    newCategoriesState = [...newCategoriesState.slice(0, expectedCategoryIndex), newExpectedCategoryData, ...newCategoriesState.slice(expectedCategoryIndex + 1)]

    setCategories(newCategoriesState)
  }

  const cardContextValue: CardContextType = {
    data: cards,
    handlers: {
      addCard,
      updateCard,
      moveCard
    },
    meta: {
      totalCategories: categories.length
    }
  }
  return (
    <CardContext.Provider value={cardContextValue}>
    <div className="trello-board">
      {categories.map((category, index) => (
        <CategoryColumn key={`${category.title}-${index}`} data={category} index={index} />
      ))}
      <div className='category-column'>
        <AddEntityDataForm entity={Entity.CATEGORY} onSave={addCategory}/>
      </div>
    </div>
    </CardContext.Provider>
  )
}
