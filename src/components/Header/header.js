import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';

import FILogo from '../../images/filmsinfo.png';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, Form } from './header.styles';
//Context
import { Context } from '../../context';
//Import from Mui
import { Button, Menu, MenuItem } from '@mui/material';

const Header = ()=> {
    const [user] = useContext(Context);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [search, setSearch] = useState('');
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    }
    const scrollTop = ()=>{
        window.scrollTo(0,0);
    }

    return (
        <>
        <Wrapper id="navbar">
            <Content>
                <div className="logo">
                    <Link to='/'>
                        <LogoImg src={FILogo} alt='filmsinfo-logo' />
                    </Link>
                </div>
                <div className="movies-page isPC">
                    <Link to='/movies'>
                        Movies
                    </Link>
                </div>
                <div className="tv-page isPC">
                    <Link to='/tvshows'>
                        TV & Shows
                    </Link>
                </div>
                <div className="people-page isPC">
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
                <div className="menu">
                    <Button
                        id="menu-button"
                        aria-controls="menu-button"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby':'menu-button',
                        }}
                    >
                        {user
                        ? <MenuItem onClick={handleClose}>Log Out</MenuItem> 
                        : <MenuItem onClick={handleClose}><Link to='/login'>Log In</Link></MenuItem> }
                        <MenuItem onClick={handleClose} className="isMobile">Movies</MenuItem>
                        <MenuItem onClick={handleClose} className="isMobile">TV & Shows</MenuItem>
                        <MenuItem onClick={handleClose} className="isMobile">People</MenuItem>
                        <MenuItem onClick={scrollTop}>Search 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </MenuItem>
                    </Menu>
                </div>
            </Content>
        </Wrapper>
        <Form>
            <input type="text" placeholder="Search Movies, TVShows, People..." value={search} onChange={setSearch}/>
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </Form>
        </>
    );
};

export default Header;
