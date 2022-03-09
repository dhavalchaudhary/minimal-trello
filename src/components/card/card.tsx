import React from 'react';
import { Card as CardType } from '../../types';

type CardProps = {
    data: CardType
}

export const Card:React.FC<CardProps> = ({data}) => {
    return <div className="card">
    <h5>{data.title}</h5>
    <div className="button-group card-button-wrapper">
      <button>Move Left</button>
      <button>Edit</button>
      <button>Move Right</button>
    </div>
  </div>
}