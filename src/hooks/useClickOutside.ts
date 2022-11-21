import {useEffect} from "react";

const events = ['mousedown', 'touchstart'];

export const useClickOutside = <T extends HTMLElement = any>(handler: () => void, nodes: HTMLElement[]) => {

    useEffect(() => {
        const listener = (event: any) => {
            if (Array.isArray(nodes)) {
                const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
                if (shouldTrigger) {
                    handler();
                }
            }
        };

        events.forEach((fn) => document.addEventListener(fn, listener));

        return () => events.forEach((fn) => document.removeEventListener(fn, listener));
    }, [handler, nodes]);
};
