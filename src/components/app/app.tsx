import React, { useState } from 'react'
import { mockCategoriesData } from '../../mockData'
import { CategoryType } from '../../types'


export const App = () => {
  const [categories, setCategories] = useState<CategoryType[]>(mockCategoriesData)
  return (
    <div className='trello-board'>
        {categories.map((category, index) => (<div className="category-column" key={`${category.title}-${index}`}>
          <div className="category-title-wrapper">
            <h3>{category.title}</h3>
          </div>
          <div className="card-list-wrapper"></div>
        </div>))}
    </div>
  )
}
