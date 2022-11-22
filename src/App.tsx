import {Content, Popover, Target } from 'components';
import React from 'react';

const App = () => {
    return (
        <div 
            className="App" 
            style={{
                margin: 30,
                backgroundColor: 'whitesmoke'
        }}>
            <Popover>
                <Target>
                    <button>Click me!</button>
                </Target>
                <Content>
                    <div>Hello, how you doing?</div>
                </Content>

            </Popover>

        </div>
    );
}

export default App;
