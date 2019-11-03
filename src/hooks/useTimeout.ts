import { useEffect } from "react";

export default function useTimeout(callback : Function, delay : number, deps? : any[]) {
    useEffect(() => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }, [...deps, callback, delay]);
}