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

export const usePeopleFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchPeople = async (page, searchTerm="")=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchPeople(searchTerm, page);

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
            const sessionState = isPersistedState('peopleState');

            if (sessionState && sessionState.page > 0) {
                setState(sessionState);
                return;
            }
        }
        fetchPeople(1, searchTerm);
    }, [searchTerm]);

    //Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchPeople(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, searchTerm, state.page]);

    //Write to sessionStorage
    useEffect(()=>{
        if(!searchTerm) sessionStorage.setItem('peopleState',JSON.stringify(state));
    },[searchTerm,state]);

    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};