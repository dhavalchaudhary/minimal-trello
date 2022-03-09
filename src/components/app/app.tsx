import React, { useState } from 'react'
import { mockCategoriesData } from '../../mockData'
import { Category } from '../../types'
import {CategoryColumn} from '../category-column'

export const App = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategoriesData)
  return (
    <div className='trello-board'>
        {categories.map((category, index) => <CategoryColumn key={`${category.title}-${index}`} data={category} />)}
    </div>
  )
}
