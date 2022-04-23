import React from 'react';
import Button  from '@mui/material/Button';
import maniac from './maniac.png';

import './Login.css';
import {auth, provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {  
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                localStorage.setItem("userDetails", JSON.stringify(result.user));
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
           <div className="login_container">
               <img src={maniac} alt="Maniac"/> 
                <div className="login_text">
                    <h1> CHAT$MANIA </h1>
                </div>
                <Button type="submit" onClick={signIn}> LOGIN with GOOGLE </Button>
           </div>
        </div>
    );
}

export default Login
