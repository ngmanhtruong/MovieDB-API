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

export const useTrendingFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [time, setTime] = useState('day');
    const [type, setType] = useState('movie');

    const fetchTrending = async (time, type)=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchTrending(time, type);

            setState(prev=>({
                ...movies,
                results: [...movies.results]
            }));
        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(() => {
        const sessionState = isPersistedState(`trending${type}State`);

        if (sessionState) {
            console.log("GRABBING FROM SESSIONSTORAGE");
            setState(sessionState);
            return;
        }
        console.log("GRABBING FROM TRENDING");
        fetchTrending(time, type);
    }, [time,type]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem(`trending${type}State`,JSON.stringify(state));
    },[state,type]);

    return { state, loading, error, setTime, setType };
};