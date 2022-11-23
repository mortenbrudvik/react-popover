import {Popover, PopoverProps} from "./Popover";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

const TestContainer = (props: Partial<PopoverProps>) =>
    (
        <Popover {...props}>
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

        await clickButton();
        expect(screen.getByText('popover-content')).toBeInTheDocument();

        await clickButton();
        expect(screen.queryAllByText('popover-content')).toHaveLength(0);
    });
    
    it('external open/close component',async () => {
        const spy = jest.fn();
        render(<TestContainer opened={true} onChange={spy}/>);

        await clickButton();
        expect(spy).toHaveBeenCalledTimes(1);

        await userEvent.click(document.body);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(false);
    })
})

async function clickButton() {
    const button = await screen.findByRole('button');
    await act(async () => {
        await userEvent.click(button);
    });
}