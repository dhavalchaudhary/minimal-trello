import React from 'react'
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import { usePersistedState } from './use-persisted-state'

const mockKey = 'test-key'
const mockValue = { data: 'mock-value' }
const mockDefaultValue = { data: 'mock-default-value' }

describe('usePersistedState', () => {
  afterEach(() => {
    window.localStorage.removeItem(mockKey)
    cleanup()
  })

  it('returns default value if no value is persisted', () => {
    const { result } = renderHook(() =>
      usePersistedState(mockKey, mockDefaultValue)
    )
    expect(result.current[0]).toStrictEqual(mockDefaultValue)
  })

  it('returns the persisted value if valid', () => {
    window.localStorage.setItem(mockKey, JSON.stringify(mockValue))
    const { result } = renderHook(() =>
      usePersistedState(mockKey, mockDefaultValue)
    )
    expect(result.current[0]).toStrictEqual(mockValue)
  })

  it('persists the value in local storage when the value is updated', () => {
    const { result } = renderHook(() =>
      usePersistedState(mockKey, mockDefaultValue)
    )

    act(() => {
      result.current[1](mockValue)
    })

    expect(result.current[0]).toStrictEqual(mockValue)
    expect(
      JSON.parse(window.localStorage.getItem(mockKey) as string)
    ).toStrictEqual(mockValue)
  })
})
