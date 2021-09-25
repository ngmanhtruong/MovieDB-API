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

export const useTopRatingFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [type, setType] = useState('movie');

    const fetchTopRating = async (type, page)=>{
        try{
            setError(false);
            setLoading(true);

            const nowPlaying = await API.fetchTopRated(type, page);

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
        const sessionState = isPersistedState(`topRating${type}State`);
        if (sessionState && sessionState.page > 0){
            setState(sessionState);
            console.log("GRAB FROM toprating" + type + "storage");
            setLoading(false);
            return;
        }

        fetchTopRating(type, 1);
    },[type]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem(`topRating${type}State`,JSON.stringify(state));
    },[state,type]);

    return { state, loading, error, setType };
}