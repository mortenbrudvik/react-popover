import {FC, ReactNode} from "react";

export type ContentProps = {
    children: ReactNode;
}
export const Content: FC<ContentProps> = ({children}) => {
    return <div>{children}</div>;
};
Content.displayName = 'Content';
