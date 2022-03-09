import React from 'react';
import { mockCardsData } from '../../mockData/cards';
import { Category } from '../../types';

type CategoryColumnProps = {
    data: Category
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({data}) => {
    return <div className="category-column">
    <div className="category-title-wrapper">
      <h3>{data.title}</h3>
    </div>
    <div className="card-list-wrapper">
        {mockCardsData.map(card => (
            <div className="card">
                <h5>{card.title}</h5>
                <div className="button-group card-button-wrapper">
                    <button>Move Left</button>
                    <button>Edit</button>
                    <button>Move Right</button>
                </div>
          </div>
        ))}
    </div>
  </div>
}