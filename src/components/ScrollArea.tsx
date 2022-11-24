import {ReactNode} from "react";
import './ScrollArea.css';
import * as Scrollbar from '@radix-ui/react-scroll-area';

export type ScrollAreaProps = {
    children: ReactNode;
    className?: string;
}

export const ScrollArea = ({children, className = ""}: ScrollAreaProps) => (
    <Scrollbar.Root className={"scrollArea " + className} scrollHideDelay={1800}>
        <Scrollbar.Viewport className="scrollAreaViewport">
            {children}
        </Scrollbar.Viewport>
        <Scrollbar.Scrollbar className="scrollAreaScrollbar" orientation="vertical">
            <Scrollbar.Thumb className="scrollAreaThumb" />
        </Scrollbar.Scrollbar>
        <Scrollbar.Scrollbar className="scrollAreaScrollbar" orientation="horizontal">
            <Scrollbar.Thumb className="scrollAreaThumb" />
        </Scrollbar.Scrollbar>
        <Scrollbar.Corner className="scrollAreaCorner" />
    </Scrollbar.Root>
);

