import { useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(key : string, initialValue : T = null) : [T, Dispatch<SetStateAction<T>>] {
    let [storedValue, setStoredValue] = useState<T>(() => {
        try {
            let item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (err) {
            console.log(err);
            return initialValue;
        }
    });

    let setValue = (value : T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (err) {
            console.log(err);
        }
    }

    return [storedValue, setValue]
}