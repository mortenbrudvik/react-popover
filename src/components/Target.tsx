import {FC, ReactNode} from "react";

export type TargetProps = {
    children: ReactNode
};

export const Target: FC<TargetProps> = ({children}) => {
    return <>{children}</>;
};

Target.displayName = 'Target';

