import React, { ChangeEvent, useState } from 'react';
import { Card as CardType } from '../../types';

type CardProps = {
    data: CardType
}

export const Card:React.FC<CardProps> = ({data}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titleInputVal, setTitleInputVal] = useState(data.title);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputVal(e.target.value)
    }

    const resetState = () => {
        setIsEditing(false)
    }

    const saveData = () => {
        // sync with state
        console.log(titleInputVal);
        resetState()
    }

    return <div className="card">
    {isEditing ? <>
        <input className="card-edit-input" placeholder="add card title" value={titleInputVal} onChange={handleInputChange} />
          <div className="button-group card-button-wrapper">
            <button onClick={resetState}>Cancel</button>
            <button onClick={saveData}>Save</button>
          </div>
    </> : <>
    <h5>{data.title}</h5>
    <div className="button-group card-button-wrapper">
      <button>Move Left</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button>Move Right</button>
    </div>
    </>}
    
    
  </div>
}