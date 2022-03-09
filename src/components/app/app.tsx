import React from 'react'
import { CardContext, CardContextType } from '../../context'
import {  Card, Category as CategoryType, Entity } from '../../types'
import { AddEntityDataForm } from '../add-entity-data-form'
import { Category } from '../category'
import { v4 as uuidv4 } from 'uuid';
import {usePersistedState} from '../../hooks';

export const App = () => {
  const [categories, setCategories] = usePersistedState<CategoryType[]>(Entity.CATEGORY, []);
  const [cards, setCards] = usePersistedState<Card[]>(Entity.CARD, [])

  const addCategory = (title: string) => {
    const newCategory: CategoryType = {
      title,
      cardIds: []
    }
    setCategories([...categories, newCategory])
  }

  const addCard: CardContextType['handlers']['addCard'] = (title, categoryIndex) => {
    const newCard: Card = {
      title,
      id: uuidv4()
    };

    const category = categories[categoryIndex]
    const newCategory: CategoryType = {
      ...category,
      cardIds: [...category.cardIds, newCard.id]
    }

    setCards([...cards, newCard])
    setCategories([...categories.slice(0,categoryIndex), newCategory, ...categories.slice(categoryIndex + 1)])
  }

  const updateCard: CardContextType['handlers']['updateCard'] = (cardId, data) => {
    const currentCardIndex = cards.findIndex(card => card.id === cardId);
    if(currentCardIndex > -1) {
      const newCard: Card = {...cards[currentCardIndex], ...data};

      setCards([...cards.slice(0,currentCardIndex), newCard, ...cards.slice(currentCardIndex + 1)])
    }
  }

  const moveCard = (id: string, currentCategoryIndex: number, expectedCategoryIndex: number) => {
    let newCategoriesState = categories.slice()

    const currentCategory = categories[currentCategoryIndex];
    const newCurrentCategoryData: CategoryType = {
      ...currentCategory,
      cardIds: currentCategory.cardIds.filter(cardId => cardId !== id)
    }

    newCategoriesState = [...newCategoriesState.slice(0, currentCategoryIndex), newCurrentCategoryData, ...newCategoriesState.slice(currentCategoryIndex + 1)]

    const expectedCategory = categories[expectedCategoryIndex];
    const newExpectedCategoryData: CategoryType = {
      ...expectedCategory,
      cardIds: expectedCategory.cardIds.concat(id)
    }

    newCategoriesState = [...newCategoriesState.slice(0, expectedCategoryIndex), newExpectedCategoryData, ...newCategoriesState.slice(expectedCategoryIndex + 1)]

    setCategories(newCategoriesState)
  }

  const cardContextValue: CardContextType = {
    data: cards,
    handlers: {
      addCard,
      updateCard,
      moveCard
    },
    meta: {
      totalCategories: categories.length
    }
  }
  return (
    <CardContext.Provider value={cardContextValue}>
    <div className="trello-board">
      {categories.map((category, index) => (
        <Category key={`${category.title}-${index}`} data={category} index={index} />
      ))}
      <div className='category-column' data-testid="add-category-column">
        <AddEntityDataForm entity={Entity.CATEGORY} onSave={addCategory}/>
      </div>
    </div>
    </CardContext.Provider>
  )
}
