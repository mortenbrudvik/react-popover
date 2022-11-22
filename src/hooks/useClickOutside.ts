import {useEffect} from "react";

const events = ['mousedown', 'touchstart'];

export const useClickOutside = <T extends HTMLElement = any>(handler: () => void, nodes: HTMLElement[]) => {

    useEffect(() => {
        const eventHandler = (event: any) => {
            if (Array.isArray(nodes)) {
                const shouldTrigger = nodes.every((node) => !!node && !node.contains(event?.target));
                if (shouldTrigger) {
                    handler();
                }
            }
        };

        events.forEach(event => document.addEventListener(event, eventHandler));

        return () => events.forEach(event => document.removeEventListener(event, eventHandler));
    }, [handler, nodes]);
};
