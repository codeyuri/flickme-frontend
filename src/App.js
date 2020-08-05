import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import Home from './components/Home';
import Login from './components/Login';
import Chatroom from './components/Chatroom';

const socket = io('http://localhost:7575', {
    transports: ['websocket'],
    jsonp: false,
    forceNew: true,
});

const App = () => {
    
    let isOnline = localStorage.getItem('isOnline')

    return (
        <div className="chat_con">
            <Switch>
                <Route path="/" exact render={(props) => <Home socket={socket} />} />
                <Route path="/login" render={(props) => <Login socket={socket} />} />
                <Route exact path="/chat" render={() => isOnline ? <Chatroom socket={socket} /> : <Redirect to="/login" /> } />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </div>
    )
}
 
export default App;