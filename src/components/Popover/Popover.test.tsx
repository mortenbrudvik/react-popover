import {Popover, PopoverProps} from "./Popover";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

const defaultProps: PopoverProps = {
    opened: true,
    children: null
};

const TestContainer = (props: Partial<PopoverProps>) =>
    (
        <Popover>
            <Popover.Target>
                <button type="button">popover-target</button>
            </Popover.Target>
            <Popover.Content>
                <div>popover-content</div>
            </Popover.Content>
        </Popover>
    );

describe('Test Popover component', () => {
    it('internal open/close content', async () => {
        render(<TestContainer/>);
        expect(screen.queryAllByText('popover-content')).toHaveLength(0);

        const button = await screen.findByRole('button');
        await act( async () => {
            await userEvent.click(button);
        });
        expect(screen.getByText('popover-content')).toBeInTheDocument();
    });
})