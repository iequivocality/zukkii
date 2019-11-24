import { useState, useEffect, MutableRefObject } from "react";


export default function useOnScreen(ref : MutableRefObject<any>, rootMargin = '0px') {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        let currentRef = ref.current;
        const observer = new IntersectionObserver(([entry] : IntersectionObserverEntry[]) => {
            setIntersecting(entry.isIntersecting);
        }, {
            rootMargin
        });
        if (ref.current) {
            observer.observe(currentRef)
        }

        return () => observer.unobserve(currentRef);
    }, []);

    return isIntersecting;
}