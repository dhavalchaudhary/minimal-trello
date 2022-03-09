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
        {data.cardIds.map((cardId) => <Card id={cardId} key={cardId} />)}
      </div>
      <AddEntityDataForm entity={Entity.CARD} onSave={title => console.log(title)}/>
    </div>
  )
}
