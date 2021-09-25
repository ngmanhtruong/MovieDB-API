import React from "react";
import { useState, useEffect } from "react";

import API from '../API';
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results : [],
    total_pages: 0,
    total_results: 0
};

export const useTrendingSearchFetch = () => {
    const [list, setList] = useState();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchTrendingSearch = async () =>{
        try{
            setError(false);
            setLoading(true);

            const trendingSearch = await API.fetchTrendingSearch();

            setList(prev=>({
                ...trendingSearch,
                results: [...trendingSearch.results]
            }))
        } catch (error){
            setError(true);
        }
        setLoading(false);
    }
    
    //Initial State
    useEffect(()=>{
        const sessionState = isPersistedState('trendingSearch');

        if (sessionState && sessionState.page > 0){
            setList(sessionState);
            setLoading(false);
            return;
        }
        fetchTrendingSearch();
    },[])

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('trendingSearch',JSON.stringify(list));
    },[list]);

    return { list, loading, error };
};