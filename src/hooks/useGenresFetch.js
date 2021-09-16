import { useState, useEffect } from "react";

//API
import API from '../API';

//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    genres: []
};

export const useGenresFetch = ({ type }) => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchGenres = async (type="movie")=>{
        try{
            setError(false);
            setLoading(true);

            const genres = await API.fetchGenres(type);

            setState(genres);

        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(()=> {
        const sessionState = isPersistedState('genresState');

        if (sessionState) {
            setState(sessionState);
            console.log("GRAB FROM GENRES STORAGE");
            setLoading(false);
            return;
        }
        console.log("GRAB FROM API");
        fetchGenres(type);
    },[]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('genresState',JSON.stringify(state));
    },[state]);

    return { state, loading, error, setState };
}