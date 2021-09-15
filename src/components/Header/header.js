import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import FILogo from '../../images/filmsinfo.png';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './header.styles';
//Context
import { Context } from '../../context';


const Header = ()=> {
    const [user] = useContext(Context);
    //const userStorage = window.localStorage.getItem(JSON.parse('user'));
    //console.log(userStorage);

    return (
    <Wrapper>
        <Content>
            <Link to='/'>
                <LogoImg src={FILogo} alt='filmsinfo-logo' />
            </Link>
            <div>
                <Link to='/movies'>
                    Movies
                </Link>
            </div>
            <div>
                <Link to='/tvshows'>
                    TV & Shows
                </Link>
            </div>
            <div>
                <Link to='/people'>
                    People
                </Link>
            </div>
            {user? (
                <span className='loggedIn'> Logged in as: {user.username} </span>
            ):(
            <Link to='/login'>
                <span className='login'>Log in</span>
            </Link>
            )}
            <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo' />
        </Content>
    </Wrapper>
    );
};

export default Header;
