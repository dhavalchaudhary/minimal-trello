import React, { ChangeEvent, useContext, useState } from 'react'
import { CardContext } from '../../context'
import { Card as CardType } from '../../types'

type CardProps = {
  id: CardType['id']
  categoryIndex: number
}

export const Card: React.FC<CardProps> = (props) => {
  const cardContext = useContext(CardContext)

  const cardData = cardContext.data.find((card) => card.id === props.id)
  const isFirstCategory = props.categoryIndex === 0
  const isLastCategory =
    props.categoryIndex === cardContext.meta.totalCategories - 1
  const [isEditing, setIsEditing] = useState(false)
  const [titleInputVal, setTitleInputVal] = useState(cardData?.title || '')

  if (!cardData) {
    return null
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInputVal(e.target.value)
  }

  const resetState = () => {
    setIsEditing(false)
  }

  const saveData = () => {
    cardContext.handlers.updateCard(cardData.id, { title: titleInputVal })
    resetState()
  }

  const moveLeft = () => {
    if (props.categoryIndex >= 0) {
      cardContext.handlers.moveCard(
        cardData.id,
        props.categoryIndex,
        props.categoryIndex - 1
      )
    }
  }

  const moveRight = () => {
    if (props.categoryIndex < cardContext.meta.totalCategories - 1) {
      cardContext.handlers.moveCard(
        cardData.id,
        props.categoryIndex,
        props.categoryIndex + 1
      )
    }
  }

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            className="card-edit-input"
            data-testid="card-edit-input"
            placeholder="add card title"
            value={titleInputVal}
            onChange={handleInputChange}
          />
          <div className="button-group card-button-wrapper">
            <button data-testid="card-edit-cancel" onClick={resetState}>
              Cancel
            </button>
            <button data-testid="card-edit-save" onClick={saveData}>
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <h5>{cardData.title}</h5>
          <div className="button-group card-button-wrapper">
            <button
              disabled={isFirstCategory}
              onClick={moveLeft}
              data-testid="card-move-left-btn">
              Move Left
            </button>
            <button
              onClick={() => setIsEditing(true)}
              data-testid="card-edit-btn">
              Edit
            </button>
            <button
              disabled={isLastCategory}
              onClick={moveRight}
              data-testid="card-move-right-btn">
              Move Right
            </button>
          </div>
        </>
      )}
    </div>
  )
}
