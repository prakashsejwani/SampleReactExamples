import { useEffect } from 'react'
/**
 * @param {() => void} callback
 * @param {number | null} delay
 */
export default function useTimeout(callback: () => void, delay: number | null) {
    useEffect(() => {
        if (delay === null) return;
        const id = setTimeout(callback, delay);
        return () => clearTimeout(id);
    }, [callback, delay]);
}