import {Content, Popover, Target } from 'components';
import React, {useState} from 'react';
import {Stack} from "./components";
import {ScrollArea} from "./components";

const questions = ['How you doing?', 'How is the weather today?', 'Where are you from?', 'What do you do?']

const App = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="App">
            <Popover opened={open} onChange={o => setOpen(o)}>
                <Target>
                    <button>Click me!</button>
                </Target>
                <Content>
                    <div className="question-heading">Pick a question</div>

                    <ScrollArea className="question-list" >
                        <Stack>
                        {questions.map(question =>
                            <div className="question" onClick={() => setOpen(false)}>
                                {question}
                            </div>
                        )}
                        </Stack>
                    </ScrollArea>
                </Content>

            </Popover>

        </div>
    );
};

export default App;
