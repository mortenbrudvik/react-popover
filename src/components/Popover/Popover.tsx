import {Children, cloneElement, ReactNode, useCallback, useRef, useState} from "react";
import {arrow, offset, Placement, useFloating} from "@floating-ui/react-dom";
import {Target} from "./Target";
import {Content} from "./Content";
import './Popover.css';
import {useClickOutside, useRerender} from "hooks";

export interface PopoverProps {
    children: ReactNode;
    opened?: boolean;
    onChange?: (val: boolean) => void;
    placement?: Placement; 
} 

export const Popover = ({children, placement = 'right', ...props}: PopoverProps) => {
    const rerender = useRerender();
    const [opened, setOpened] = useOpenedState({
        openedValue: props.opened,
        onChange: props.onChange
    });

    const onToggle = () => setOpened(!opened);
    
    const arrowRef = useRef(null);

    const target = getChildrenFromDisplayName(children, 'Target');
    const content = getChildrenFromDisplayName(children, 'Content');

    const {
        x, y,
        reference, floating,
        strategy,
        placement: finalPlacement,
        middlewareData: {arrow: {x: arrowX, y: arrowY} = {}},
        refs,
    } = useFloating({
        placement,
        strategy: 'absolute',
        middleware: [
            offset(10),
            arrow({element: arrowRef})
        ],
    });

    const arrowPlacement = {
        right: {position: 'left', rotate: 45},
        bottom: {position: 'top', rotate: 135},
        left: {position: 'right', rotate: 225},
        top: {position: 'bottom', rotate: 315},
    }[finalPlacement.split('-')[0]] ?? {};
    
    const arrowStyle = {
        left: !!arrowX ? `${arrowX}px` : '',
        top: !!arrowY ? `${arrowY}px` : '',
        [arrowPlacement.position!]: '-5px',
        transform: 'rotate('+ arrowPlacement?.rotate +'deg)'
    };

    const onFloatingRefChange = useCallback((node: HTMLElement|null) => {
        floating(node);
        rerender();
    }, []);

    useClickOutside(() => {
        setOpened(false);
    }, [refs.floating.current, refs.reference.current as any]);

    return (
        <div style={{position: "relative"}} onKeyDownCapture={(e) => {
            if (e.key === 'Escape') {
                setOpened(false);
            }
        }}>
            <div>{cloneElement(target[0].props.children, {
                onClick: onToggle,
                ref: reference,
            })}</div>
            {opened && (
                <div
                    ref={onFloatingRefChange}
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

type useOpenedStateProps = {
    openedValue?: boolean,
    onChange?: (opened: boolean) => void,
};

const useOpenedState = ({openedValue, onChange}: useOpenedStateProps): [boolean, (opened: boolean) => void] => {
    const [opened, setOpened] = useState(false);

    const handleOpenedChange = (open: boolean) => {
        setOpened(open);
        onChange?.(open);
    }

    return (openedValue !== undefined)
        ? [openedValue, onChange ?? (() => {})]
        : [opened, handleOpenedChange]
};

export const getChildrenFromDisplayName = (children: any, displayName: string) =>
    Children.map(children, (child) =>
        child.type.displayName === displayName ? child : null
    );

Popover.Target = Target;
Popover.Content = Content;
