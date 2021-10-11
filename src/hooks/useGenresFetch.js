import { useState, useEffect } from "react";

//API
import API from '../API';

//Helpers
import { isLocalPersistedState } from "../helpers";

const initialState = {
    genres: []
};

export const useGenresFetch = () => {
    const [movieState, setMovieState] = useState(initialState);
    const [tvState, setTVState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchGenres = async (type)=>{
        try{
            setError(false);
            setLoading(true);

            const result = await API.fetchGenres(type);
            if(type ==='movie')
                setMovieState(prev=>({
                    ...movieState,
                    genres: result.genres
                }));
            if (type === 'tv')
                setTVState(prev=>({
                    ...tvState,
                    genres: result.genres
                }));

        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(()=> {
        const localMovieGenres = isLocalPersistedState(`movieGenresState`);
        const localTVGenres = isLocalPersistedState(`tvGenresState`);

        if (localMovieGenres && localTVGenres && localMovieGenres.genres.length > 0) {
            setMovieState(localMovieGenres);
            setTVState(localTVGenres);
            setLoading(false);
            return;
        }
        fetchGenres('movie');
        fetchGenres('tv');
    },[]);

    //Write to localStorage
    useEffect(()=>{
        localStorage.setItem(`movieGenresState`,JSON.stringify(movieState));
        localStorage.setItem(`tvGenresState`,JSON.stringify(tvState));
    },[movieState, tvState]);

    return { movieState, tvState, loading, error };
}