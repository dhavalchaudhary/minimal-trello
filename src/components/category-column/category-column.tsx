import React from 'react'
import { mockCardsData } from '../../mockData/cards'
import { Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { Card } from '../card'

type CategoryColumnProps = {
  data: Category
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({ data }) => {
  return (
    <div className="category-column">
      <div className="category-title-wrapper">
        <h3>{data.title}</h3>
      </div>
      <div className="card-list-wrapper">
        {mockCardsData.map((card) => <Card data={card} key={card.id} />)}
      </div>
      <AddEntityDataForm entity={Entity.CARD} />
    </div>
  )
}
