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
  const lowercaseEntity = props.entity.toLowerCase()
  return (
      <div className="add-card-wrapper">
        <div className="add-data-type-wrapper">
          {isEditing ? (
            <div className="add-data-type-input-wrapper">
              <input placeholder={`add ${lowercaseEntity} title`} value={inputVal} onChange={handleInputChange} />
              <div className="button-group">
                <button onClick={resetState}>Cancel</button>
                <button onClick={saveData}>Save</button>
              </div>
            </div>
          ) : (
            <div className="add-data-type-btn-wrapper">
              <button onClick={() => setIsEditing(true)}>Add new {lowercaseEntity}</button>
            </div>
          )}
        </div>
      </div>
  )
}
