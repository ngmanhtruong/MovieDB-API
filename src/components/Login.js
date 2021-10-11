import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from '../API';

//Components
import Button from "./Button/Button";
//Styles
import { Wrapper, Title } from './Login.styles';
//Context
import { Context } from "../context";

const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    const [_user, setUser] = useContext(Context);

    const handleSubmit = async () =>{
        setError(false);
        try{
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                username,
                password
            );
            // console.log(sessionId);
            window.localStorage.setItem('user',JSON.stringify(sessionId));
            setUser({ sessionId: sessionId.session_id, username });
            
            history.push('/');
        } catch(error){
            setError(true);
        }
    };

    const handleInput = e =>{
        let name = e.currentTarget.name;
        let value = e.currentTarget.value;

        if (name ==='username') setUsername(value);
        if (name ==='password') setPassword(value);
    };


    return (
        <>
        <Title>Login with TMDB account</Title>
        <Wrapper>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                name='username'
                onChange={handleInput}
            />
            <label>Password:</label>
            <input
                type='password'
                value={password}
                name='password'
                onChange={handleInput}
            />
            {error && <div className='error'>There was an error! Please check your username or password</div>}

            <Button text='Login' callback={handleSubmit} />
        </Wrapper>
        </>
    )
}

export default Login;