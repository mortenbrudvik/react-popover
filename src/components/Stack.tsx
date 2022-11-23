import {ReactNode} from "react";
import './Stack.css';

export type StackProps = {
    children: ReactNode;
};

export const Stack = (props: StackProps) => {

    return (
        <div className="stack" {...props} style={{alignItems: 'stretch', justifyContent: 'top', gap: '3px'}}/>
    );
};