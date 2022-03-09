import React, { useContext } from 'react'
import { CardContext } from '../../context'
import { Category as CategoryType, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { Card } from '../card'

type CategoryProps = {
  data: CategoryType;
  index: number
}

export const Category: React.FC<CategoryProps> = ({ data, index }) => {
  const {handlers: cardHandlers} = useContext(CardContext) 
  return (
    <div className="category-column">
      <div className="category-title-wrapper">
        <h3>{data.title}</h3>
      </div>
      <div className="card-list-wrapper" data-testid="card-list-wrapper">
        {data.cardIds.map((cardId) => <Card id={cardId} key={cardId} categoryIndex={index} />)}
      </div>
      <AddEntityDataForm entity={Entity.CARD} onSave={title => cardHandlers.addCard(title, index)}/>
    </div>
  )
}
