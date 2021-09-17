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

export const useAiringTodayFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchAiring = async (page)=>{
        try{
            setError(false);
            setLoading(true);

            const nowPlaying = await API.fetchTVAiring(page);

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
        const sessionState = isPersistedState('airingTodayState');

        if (sessionState && sessionState.page > 0) {
            setState(sessionState);
            console.log("GRAB FROM USE AIRING STORAGE");
            setLoading(false);
            return;
        }
        console.log("GRAB FROM API");
        fetchAiring(1);
    },[]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('airingTodayState',JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}