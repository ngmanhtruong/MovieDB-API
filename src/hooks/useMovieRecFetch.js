import {useState, useEffect} from 'react';
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

export const useMovieRecFetch = movieId =>{
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovieRecs = async (movieId, page)=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovieRecommendations(movieId, page);

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

    //Initial
    useEffect(() => {
        const sessionState = isPersistedState('movieRecommendsState');

        if (sessionState && sessionState.page > 0) {
            setState(sessionState);
            return;
        }
        fetchMovieRecs(movieId, 1);
    }, [movieId]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('movieRecommendsState',JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}