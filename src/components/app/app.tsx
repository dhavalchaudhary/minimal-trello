import React, { useState } from 'react'
import { CardContext, CardContextType } from '../../context'
import { mockCategoriesData } from '../../mockData'
import { mockCardsData } from '../../mockData/cards'
import {  Card, Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { CategoryColumn } from '../category-column'

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

  const cardContextValue: CardContextType = {
    data: cards
  }
  return (
    <CardContext.Provider value={cardContextValue}>
    <div className="trello-board">
      {categories.map((category, index) => (
        <CategoryColumn key={`${category.title}-${index}`} data={category} />
      ))}
      <div className='category-column'>
        <AddEntityDataForm entity={Entity.CATEGORY} onSave={addNewCategory}/>
      </div>
    </div>
    </CardContext.Provider>
  )
}
