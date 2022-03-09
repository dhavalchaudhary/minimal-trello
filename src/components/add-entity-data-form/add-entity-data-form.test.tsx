import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { AddEntityDataForm } from './add-entity-data-form'
import { Entity } from '../../types'

const mockProps = {
  entity: Entity.CATEGORY,
  onSave: jest.fn()
}

describe('AddEntityDataForm', () => {
  it('renders the add button', () => {
    render(<AddEntityDataForm {...mockProps} />)
    expect(screen.getByTestId('add-btn')).toBeVisible()
  })
  it('displays the input elements when clicked on edit', () => {
    render(<AddEntityDataForm {...mockProps} />)

    fireEvent.click(screen.getByTestId('add-btn'))

    expect(screen.getByTestId('entity-add-input')).toBeVisible()
    expect(screen.getByTestId('entity-add-cancel')).toBeVisible()
    expect(screen.getByTestId('entity-add-save')).toBeVisible()

    fireEvent.click(screen.getByTestId('entity-add-cancel'))

    expect(screen.getByTestId('add-btn')).toBeVisible()
    expect(screen.queryByTestId('entity-data-input-wrapper')).toBeFalsy()
  })
})
