import React, { useContext } from "react";
import { Link } from "react-router-dom";
//styles
import { Wrapper, Content, LogoImg } from './Footer.styles';

import FILogo from '../../images/filmsinfo_logo.png';

import { Context } from "../../context";

const Footer = () => {
    const [user] = useContext(Context);

    return (
        <Wrapper>
            <Content>
                <div className="column">
                    <Link to='/'>
                        <LogoImg src={FILogo} alt='filmsinfo-logo' />
                    </Link>
                    <span className="hi-user">
                        Hi {user ? user.username : "Guest"}
                        <br/>Welcome, be free to explore
                    </span>
                </div>
                <div className="column">
                    <h2>ABOUT ME</h2>
                    <a href="https://truongnguyen.netlify.app/" target="_blank" rel="noreferrer">My Page</a>
                    <a href="mailto:ng.manhtruong1996@gmail.com" rel="noreferrer">My email</a>
                    <a href="https://github.com/ngmanhtruong" target="_blank" rel="noreferrer">My Projects</a>
                </div>
                <div className="column">
                    <h2>MOVIEDB</h2>
                    <a href="https://developers.themoviedb.org/3" target="_blank" rel="noreferrer">API</a>
                    <a href="https://developers.themoviedb.org/4" target="_blank" rel="noreferrer">API v4</a>
                </div>
            </Content>
        </Wrapper>
    )
}

export default Footer;