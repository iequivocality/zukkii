import { MutableRefObject, useEffect } from "react";

export default function useClickOutside<T extends HTMLElement>(element : MutableRefObject<T>, callback : (elem : HTMLElement) => void) {
    let onOutsideCallback = (event : MouseEvent) => {
        event.stopPropagation();
        if (!element.current.contains(event.target as HTMLElement))
        {
            callback(element.current)
        }
    }
    
    useEffect(() => {
        let listener = onOutsideCallback;
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener)
    }, [callback]);
}