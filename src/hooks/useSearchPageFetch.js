import { useState, useEffect } from "react";
//API
import API from '../API';
//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results : [],
    total_pages: 0,
    total_results: 0
};

export const useSearchPageFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [genreforURL, setGenreforURL] = useState('');
    const [type, setType] = useState('movie');

    const fetchMoviesWithGenres = async (type='movie', page, genreforURL='')=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMoviesWithGenres(type, page, genreforURL);
            setState(prev=>({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results] 
            }));
        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial and search
    useEffect(() => {
        if(!genreforURL){
            const sessionState = isPersistedState(`searchPage${type}State`);

            if (sessionState) {
                setState(sessionState);
                return;
            }
        }
        // console.log("GRABBING FROM API");
        fetchMoviesWithGenres(type, 1, genreforURL);

    }, [genreforURL, type]);

    //Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMoviesWithGenres(type, state.page + 1, genreforURL);
        setIsLoadingMore(false);
    },[isLoadingMore, genreforURL, state.page, type]);

    //Write to sessionStorage
    useEffect(()=>{
        if(!genreforURL){
            sessionStorage.setItem(`searchPage${type}State`,JSON.stringify(state));
        } 
    },[genreforURL, state]);

    return { 
        state, 
        loading, 
        error, 
        setGenreforURL, 
        genreforURL, 
        setIsLoadingMore,
        setType
    };
};