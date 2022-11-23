import {ReactNode} from "react";
import './ScrollArea.css';

export type ScrollAreaProps = {
    children: ReactNode;
    className?: string;
}

export const ScrollArea = ({className = '', ...props}: ScrollAreaProps) => {
    
    return (
        <div className={"scroll-area " + className} {...props} />
    )
}