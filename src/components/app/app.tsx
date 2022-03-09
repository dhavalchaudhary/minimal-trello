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

  const addNewCategory = (title: string) => {
    const newCategoryObj: Category = {
      title,
      cardIds: []
    }
    setCategories([...categories, newCategoryObj])
  }

  const addNewCard: CardContextType['handlers']['addNewCard'] = (title, categoryIndex) => {
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

  const cardContextValue: CardContextType = {
    data: cards,
    handlers: {
      addNewCard
    }
  }
  return (
    <CardContext.Provider value={cardContextValue}>
    <div className="trello-board">
      {categories.map((category, index) => (
        <CategoryColumn key={`${category.title}-${index}`} data={category} index={index} />
      ))}
      <div className='category-column'>
        <AddEntityDataForm entity={Entity.CATEGORY} onSave={addNewCategory}/>
      </div>
    </div>
    </CardContext.Provider>
  )
}
