import {ReactNode} from "react";
import './Stack.css';

export type StackProps = {
    children: ReactNode;
    className?: string;
};

export const Stack = ({children, className = ''}: StackProps) => {
    return (
        <div className={"stack " + className} style={{alignItems: 'stretch', justifyContent: 'top', gap: '3px'}}>
            {children}
        </div>
    );
};