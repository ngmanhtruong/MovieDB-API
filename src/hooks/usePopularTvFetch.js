import { useState, useEffect } from "react";

//API
import API from '../API';

//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const usePopularTvFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchPopularTV = async (page)=>{
        try{
            setError(false);
            setLoading(true);

            const nowPlaying = await API.fetchPopularTV(page);

            setState(prev=>({
                ...nowPlaying,
                results:
                    page > 1 ? [...prev.results, ...nowPlaying.results] : [...nowPlaying.results]
            }));

        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(()=> {
        const sessionState = isPersistedState('popularTVState');

        if (sessionState && sessionState.page > 0) {
            setState(sessionState);
            console.log("GRAB FROM POPULAR TV STORAGE");
            setLoading(false);
            return;
        }
        console.log("GRAB FROM API");
        fetchPopularTV(1);
    },[]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('popularTVState',JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}