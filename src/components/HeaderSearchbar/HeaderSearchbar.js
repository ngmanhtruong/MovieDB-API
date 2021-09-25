import React, { useRef, useState, useEffect } from "react";
//styles
import { Form } from './HeaderSearchbar.styles';
//Image
import searchIcon from '../../images/search-icon.svg';
import closeIcon from '../../images/close.svg';
import { POSTER_SIZE } from "../../config";

const HeaderSearchbar = ({ setSearchTerm, children, setSearch }) =>{
    const [state, setState] = useState();
    const initial = useRef(true);
    const [click, setClick] = useState(false);

    useEffect(()=>{
        if (initial.current){
            initial.current = false;
            return;
        }

        const timer = setTimeout(()=>{
            setSearchTerm(state);
        },500)

        return ()=>{
            clearTimeout(timer);
        }
    },[setSearchTerm, state])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleClick = (e) => {
        e.preventDefault();
        if(click){
            setClick(false);
        } else {
            setClick(true);
        }
    }
    const handleClose = (e) => {
        e.preventDefault();
        setSearch(false);
    }
    return (
        <Form>
            <input 
                type="text" 
                placeholder="Search Movies, TVShows, People..." 
                value={state} 
                onChange={e => setState(e.currentTarget.value)}
                onClick ={(e)=> handleClick(e)}
            />
            <button onClick = {e => handleClose(e)}>
                <img src={closeIcon} alt='close-icon' />
            </button>
            <div className = 'anchor'>
                {children}
            </div>
            
        </Form>
    )
}

export default HeaderSearchbar;
