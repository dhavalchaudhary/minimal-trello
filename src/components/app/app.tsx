import React, { useState } from 'react'
import { mockCategoriesData } from '../../mockData'
import {  Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { CategoryColumn } from '../category-column'

export const App = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategoriesData);

  const addNewCategory = (title: string) => {
    const newCategoryObj: Category = {
      title,
      cardIds: []
    }
    setCategories([...categories, newCategoryObj])
  }
  return (
    <div className="trello-board">
      {categories.map((category, index) => (
        <CategoryColumn key={`${category.title}-${index}`} data={category} />
      ))}
      <div className='category-column'>
        <AddEntityDataForm entity={Entity.CATEGORY} onSave={addNewCategory}/>
      </div>
    </div>
  )
}
