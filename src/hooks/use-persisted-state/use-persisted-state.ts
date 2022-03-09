// eslint-disable-next-line
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const usePersistedState = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
    const getCurrentValue = (key: string, defaultValue: T): T => {
        const stringifiedData = localStorage.getItem(key);
        return stringifiedData ? JSON.parse(stringifiedData) : defaultValue
    }
    const [val, setVal] = useState(getCurrentValue(key, defaultValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val))
    }, [key, val])

    return [val, setVal]
}