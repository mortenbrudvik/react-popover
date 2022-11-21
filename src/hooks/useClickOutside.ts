import {useEffect, useRef} from "react";

const events = ['mousedown', 'touchstart'];

export const useClickOutside = <T extends HTMLElement = any>(handler: () => void) => {
    const ref = useRef<T>();

    useEffect(() => {
        const listener = (event: any) => {
            const {target} = event ?? {};
            if (ref.current && !ref.current.contains(target)) {
                handler();
            }
        };

        events.forEach((fn) => document.addEventListener(fn, listener));

        return () => events.forEach((fn) => document.removeEventListener(fn, listener));
    }, [ref, handler]);

    return ref;
};
