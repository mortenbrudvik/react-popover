import {Children, cloneElement, ReactNode, useCallback, useRef, useState} from "react";
import {arrow, offset, useFloating} from "@floating-ui/react-dom";
import {Target} from "./Target";
import {Content} from "./Content";
import './Popover.css';
import {useClickOutside, useRerender} from "hooks";

export interface PopoverProps {
    children: ReactNode;
    opened?: boolean;
    onChange?: (val: boolean) => void;
} 

export const Popover = (props: PopoverProps) => {
    const rerender = useRerender();
    const [opened, setOpened] = useOpenedState({
        openedValue: props.opened,
        onChange: props.onChange
    });

    const onToggle = () => setOpened(!opened);
    
    const arrowRef = useRef(null);

    const target = getChildrenFromDisplayName(props.children, 'Target');
    const content = getChildrenFromDisplayName(props.children, 'Content');

    const {
        x, y,
        reference, floating,
        strategy,
        placement: finalPlacement,
        middlewareData: {arrow: {x: arrowX, y: arrowY} = {}},
        refs,
    } = useFloating({
        placement: 'right',
        strategy: 'absolute',
        middleware: [
            offset(10),
            arrow({element: arrowRef})
        ],
    });

    const arrowPlacement = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[finalPlacement.split('-')[0]] ?? '';

    const arrowStyle = {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [arrowPlacement]: '-5px'
    };

    const onFloatingRefChange = useCallback((node: HTMLElement|null) => {
        floating(node);
        rerender();
    }, []);

    useClickOutside(() => {
        setOpened(false);
    }, [refs.floating.current, refs.reference.current as any]);

    return (
        <div style={{position: "relative"}} onKeyDownCapture={() => setOpened(false)}>
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
