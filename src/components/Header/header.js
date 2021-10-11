import React from 'react';
import { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
//Image
import FILogo from '../../images/filmsinfo.png';
import NoImage from '../../images/no_image.jpg';
import NoPersonImage from '../../images/no-image.svg';
//Component
import HeaderSearchbar from '../HeaderSearchbar/HeaderSearchbar';
//Styles
import { Wrapper, Content, LogoImg, UL, Spinner } from './header.styles';
//Context
import { Context } from '../../context';
//Import from Mui
import { Button, Menu, MenuItem } from '@mui/material';
//use Hook
import { useTrendingSearchFetch } from '../../hooks/useTrendingSearchFetch';
import { useMultiSearchFetch } from '../../hooks/useMultiSearchFetch';

const Header = ()=> {
    const { state, loading, error, setSearchTerm, searchTerm } = useMultiSearchFetch();
    const [user] = useContext(Context);
    const [search, setSearch] = useState(true);

    //mui settings
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    }
    const showSearch = () => {
        if (search){
            setSearch(false);
            setAnchorEl(null);
        } else {
            setSearch(true);
            setAnchorEl(null);
            window.scrollTo(0,0);
        }
    }
    const onClick = () => {
        setSearch(false);
        setSearchTerm('');
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
                    <span className='login isPC'>Log in</span>
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
                        : <MenuItem onClick={handleClose} className="isMobile"><Link to='/login'>Log In</Link></MenuItem> }
                        <MenuItem onClick={handleClose} className="isMobile"><Link to='/movies'>Movies</Link></MenuItem>
                        <MenuItem onClick={handleClose} className="isMobile"><Link to='/tvshows'>TV & Shows</Link></MenuItem>
                        <MenuItem onClick={handleClose} className="isMobile"><Link to='/people'>People</Link></MenuItem>
                        <MenuItem onClick={showSearch} id="search-button">Search 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/searchpage'>Search Genres</Link></MenuItem>
                    </Menu>
                </div>
            </Content>
        </Wrapper>
        {search &&
        <HeaderSearchbar setSearchTerm = {setSearchTerm} setSearch = {setSearch}>
            <UL className = "list-group">
                {loading && 
                <li className='list-group-item'>
                    <Spinner />
                </li>
                }
                {state.results.map(item=>{
                    if(item.media_type === "person"){
                        return (
                            <li className="list-group-item" key ={item.id}>
                                <Link to={`/person/${item.id}`} onClick={onClick}>
                                    <img 
                                        src={item.profile_path ? IMAGE_BASE_URL + POSTER_SIZE + item.profile_path 
                                            : NoPersonImage}
                                        alt={item.name ? item.name : item.title}
                                    />
                                    <p className="name">{item.name}</p>
                                    <p className="media-type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                    if(item.media_type === "movie"){
                        return (
                            <li className="list-group-item" key ={item.id}>
                                <Link to={`/movie/${item.id}`} onClick={onClick}>
                                    <img 
                                        src={item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                            : NoImage}
                                        alt={item.name ? item.name : item.title}
                                    />
                                    {item.name ? 
                                    <p className="name">{item.name}</p>
                                    :
                                    <p className="name">{item.title}</p>
                                    }
                                    <p className="media-type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                    if(item.media_type === "tv"){
                        return (
                            <li className="list-group-item" key ={item.id}>
                                <Link to={`/tv/${item.id}`} onClick={onClick}>
                                    <img 
                                        src={item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                            : NoImage}
                                        alt={item.name ? item.name : item.title}
                                    />
                                    <p className="name">{item.name}</p>
                                    <p className="media-type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                })}
            </UL>
        </HeaderSearchbar>
        }
        </>
    );
};

export default Header;
