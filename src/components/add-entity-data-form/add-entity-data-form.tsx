import React, { ChangeEvent, useState } from 'react'
import { Entity } from '../../types'

type AddEntityDataFormProps = {
  entity: Entity,
  onSave: (title: string) => void
}

export const AddEntityDataForm: React.FC<AddEntityDataFormProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value)
  }

  const resetState = () => {
      setIsEditing(false)
      setInputVal('')
  }

  const saveData = () => {
      props.onSave(inputVal);
      resetState()
  }
  return (
      <div className="add-card-wrapper">
        <div className="add-data-type-wrapper">
          {isEditing ? (
            <div className="add-data-type-input-wrapper" data-testid="entity-data-input-wrapper">
              <input data-testid="entity-add-input" placeholder={`add ${props.entity} title`} value={inputVal} onChange={handleInputChange} />
              <div className="button-group">
                <button data-testid="entity-add-cancel" onClick={resetState}>Cancel</button>
                <button data-testid="entity-add-save" onClick={saveData}>Save</button>
              </div>
            </div>
          ) : (
            <div className="add-data-type-btn-wrapper">
              <button data-testid="add-btn" onClick={() => setIsEditing(true)}>Add new {props.entity}</button>
            </div>
          )}
        </div>
      </div>
  )
}
