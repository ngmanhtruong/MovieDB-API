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

export const useUpcomingFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchUpcoming = async (page, searchTerm="")=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchUpcoming(searchTerm, page);

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
        if(!searchTerm){
            const sessionState = isPersistedState('upcomingState');

            if (sessionState) {
                console.log("GRABBING FROM SESSIONSTORAGE");
                setState(sessionState);
                return;
            }
        }
        console.log("GRABBING FROM API");
        fetchUpcoming(1, searchTerm);
    }, [searchTerm]);

    //Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchUpcoming(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, searchTerm, state.page]);

    //Write to sessionStorage
    useEffect(()=>{
        if(!searchTerm) sessionStorage.setItem('upcomingState',JSON.stringify(state));
    },[searchTerm,state]);

    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};