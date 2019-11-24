import { useState, useEffect, MutableRefObject } from "react";


export default function useOnScreen(ref : MutableRefObject<any>, rootMargin = '0px') {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry] : IntersectionObserverEntry[]) => {
            setIntersecting(entry.isIntersecting);
        }, {
            rootMargin
        });
        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.unobserve(ref.current);
    }, []);

    return isIntersecting;
}