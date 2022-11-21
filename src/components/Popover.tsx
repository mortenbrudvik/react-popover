import {Children, cloneElement, ReactNode, useRef, useState} from "react";
import {arrow, offset, useFloating} from "@floating-ui/react-dom";
import {Target} from "./Target";
import {Content} from "./Content";
import './Popover.css';
import {useClickOutside} from "../hooks";

export interface PopoverProps {
    children: ReactNode;
} 

export const Popover = ({children}: PopoverProps) => {
    const [opened, setOpened] = useState(false);
    const onToggle = () => setOpened(o => !o);
    const arrowRef = useRef(null);

    const target = getChildrenFromDisplayName(children, 'Target');
    const content = getChildrenFromDisplayName(children, 'Content');

    const {
        x, y,
        reference, floating,
        strategy,
        placement: finalPlacement,
        middlewareData: {arrow: {x: arrowX, y: arrowY} = {}},
    } = useFloating({
        placement: 'right',
        strategy: 'absolute',
        middleware: [
            offset(10),
            arrow({element: arrowRef})
        ],
    });

    const currentSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[finalPlacement.split('-')[0]] ?? '';

    const arrowStyle = {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [currentSide]: '-5px'
    };

    const testRef = useClickOutside(() => setOpened(false));
    
    return (
        <div style={{position: "relative"}} ref={testRef}>
            <div >{cloneElement(target[0].props.children, {onClick: onToggle,ref: reference })}</div>
            { opened && (
                <div 
                    ref={floating} 
                    className="floating"
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0
                    }}
                >
                    {content}
                    <div className="arrow"
                         ref={arrowRef}
                         style={arrowStyle}
                    />
                </div>
            )}
        </div>
    );
};

export const getChildrenFromDisplayName = (children: any, displayName: string) =>
    Children.map(children, (child) =>
        child.type.displayName === displayName ? child : null
    );

Popover.Target = Target;
Popover.Content = Content;
