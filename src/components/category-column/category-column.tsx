import React from 'react';
import { Category } from '../../types';

type CategoryColumnProps = {
    data: Category
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({data}) => {
    return <div className="category-column">
    <div className="category-title-wrapper">
      <h3>{data.title}</h3>
    </div>
    <div className="card-list-wrapper"></div>
  </div>
}