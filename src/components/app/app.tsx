import React, { useState } from 'react'
import { CardContext, CardContextType } from '../../context'
import { mockCategoriesData } from '../../mockData'
import { mockCardsData } from '../../mockData/cards'
import {  Card, Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { CategoryColumn } from '../category-column'
import { v4 as uuidv4 } from 'uuid';

export const App = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategoriesData);
  const [cards, setCards] = useState<Card[]>(mockCardsData)

  const addCategory = (title: string) => {
    const newCategoryObj: Category = {
      title,
      cardIds: []
    }
    setCategories([...categories, newCategoryObj])
  }

  const addCard: CardContextType['handlers']['addCard'] = (title, categoryIndex) => {
    const newCardObj: Card = {
      title,
      id: uuidv4()
    };

    const categoryObj = categories[categoryIndex]
    const newCategoryObj: Category = {
      ...categoryObj,
      cardIds: [...categoryObj.cardIds, newCardObj.id]
    }

    setCards([...cards, newCardObj])
    setCategories([...categories.slice(0,categoryIndex), newCategoryObj, ...categories.slice(categoryIndex + 1)])
  }

  const updateCard: CardContextType['handlers']['updateCard'] = (cardId, data) => {
    const currentCardIndex = cards.findIndex(card => card.id === cardId);
    if(currentCardIndex > -1) {
      const newCardObj: Card = {...cards[currentCardIndex], ...data};

      setCards([...cards.slice(0,currentCardIndex), newCardObj, ...cards.slice(currentCardIndex + 1)])
    }
  }

  const cardContextValue: CardContextType = {
    data: cards,
    handlers: {
      addCard,
      updateCard
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
