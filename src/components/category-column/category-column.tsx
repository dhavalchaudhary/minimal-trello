import React, { useContext } from 'react'
import { CardContext } from '../../context'
import { Category, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { Card } from '../card'

type CategoryColumnProps = {
  data: Category;
  index: number
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({ data, index }) => {
  const {handlers: cardHandlers} = useContext(CardContext) 
  return (
    <div className="category-column">
      <div className="category-title-wrapper">
        <h3>{data.title}</h3>
      </div>
      <div className="card-list-wrapper">
        {data.cardIds.map((cardId) => <Card id={cardId} key={cardId} />)}
      </div>
      <AddEntityDataForm entity={Entity.CARD} onSave={title => cardHandlers.addNewCard(title, index)}/>
    </div>
  )
}
