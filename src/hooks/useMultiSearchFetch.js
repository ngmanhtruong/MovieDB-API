import { useState, useEffect } from "react";
//API
import API from '../API';
//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results : [],
    total_results: 0,
    total_pages: 0
};

export const useMultiSearchFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMulti= async (searchTerm="") => {
        if (searchTerm){
            try{
                setError(false);
                setLoading(true);
    
                const allres = await API.fetchMultiSearch(searchTerm);
                const results = allres.results.map(item=>{
                    return item;
                })
                setState({
                    ...allres,
                    results : results
                });
            } catch (error){
                setError(true);
            }
            setLoading(false);
        }
    }

    //Initial and search
    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersistedState('multiSearchState');

            if (sessionState) {
                // console.log("GRABBING FROM SESSIONSTORAGE");
                setState(sessionState);
                return;
            }
        }
        // console.log("GRABBING FROM API");
        fetchMulti(searchTerm);
    }, [searchTerm]);


    //Load more
    useEffect(() => {
        fetchMulti(searchTerm);
    },[searchTerm]);


    //Write to sessionStorage
    useEffect(()=>{
        if(!searchTerm) sessionStorage.setItem('multiSearchState',JSON.stringify(state));
    },[searchTerm,state]);

    return { state, loading, error, setSearchTerm, searchTerm };
};