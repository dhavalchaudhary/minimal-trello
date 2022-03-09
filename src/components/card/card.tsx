import React, { ChangeEvent, useContext, useState } from 'react';
import { CardContext } from '../../context';
import { Card as CardType } from '../../types';

type CardProps = {
    id: CardType['id'],
    categoryIndex: number
}

export const Card:React.FC<CardProps> = (props) => {
    const {data: allCards, handlers: cardHandlers } = useContext(CardContext);

    const cardData = allCards.find(card => card.id === props.id);

    const [isEditing, setIsEditing] = useState(false);
    const [titleInputVal, setTitleInputVal] = useState(cardData?.title || '');
    
    if(!cardData) {
      return null;
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputVal(e.target.value)
    }

    const resetState = () => {
        setIsEditing(false)
    }

    const saveData = () => {
        cardHandlers.updateCard(cardData.id, {title: titleInputVal});
        resetState()
    }

    const moveLeft = () => {
      cardHandlers.moveCard(cardData.id, props.categoryIndex, props.categoryIndex - 1)
    }

    const moveRight = () => {
      cardHandlers.moveCard(cardData.id, props.categoryIndex, props.categoryIndex + 1)
    }

    return <div className="card">
    {isEditing ? <>
        <input className="card-edit-input" placeholder="add card title" value={titleInputVal} onChange={handleInputChange} />
          <div className="button-group card-button-wrapper">
            <button onClick={resetState}>Cancel</button>
            <button onClick={saveData}>Save</button>
          </div>
    </> : <>
    <h5>{cardData.title}</h5>
    <div className="button-group card-button-wrapper">
      <button onClick={moveLeft}>Move Left</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={moveRight}>Move Right</button>
    </div>
    </>}
    
    
  </div>
}