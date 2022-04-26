import './App.css';
import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import { actionTypes } from './reducer';
import DummyWelcomeText from './DummyWelcomeText';

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if(localStorage.getItem("userDetails")){
        dispatch({
            type: actionTypes.SET_USER,
            user: JSON.parse(localStorage.getItem("userDetails")),
        });
    }
},[]);

  return (
    <div className="App">
        {!user ? (
          <Login/>
        ):(
          <div className="app_body">
            <Router>
              <Sidebar/>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>
                <Route path="/" exact>
                  <DummyWelcomeText />
                </Route>
              </Switch>            
            </Router>
          </div>
        )}
        
    </div>
  );
}

export default App;
