import {Content, Popover, Target } from 'components';
import React, {useState} from 'react';

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
                    <ul>
                        <div className="question-heading">Pick a question</div>
                        {questions.map(question =>
                            <li key={question}>
                                <div className="question" onClick={() => setOpen(false)}>
                                    {question}
                                </div>
                            </li>
                        )}
                    </ul>
                </Content>

            </Popover>

        </div>
    );
};

export default App;
