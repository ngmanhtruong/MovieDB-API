import { useState, useEffect } from "react";
//API
import API from '../API';
//Helpers
import { isPersistedState } from "../helpers";


export const usePersonFetch = id => {
    const [state, setState] = useState();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchPerson = async ()=>{
        try{
            setError(false);
            setLoading(true);

            const person = await API.fetchPerson(id);
            let imdbId = person.imdb_id;
            const imdb = await API.fetchIMDB(imdbId);
            setState({
                ...person,
                person_results: imdb.person_results
            });
        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial and search
    useEffect(() => {
        const sessionState = isPersistedState(`person${id}State`);

        if (sessionState && sessionState.page > 0) {
            setState(sessionState);
            return;
        }
        fetchPerson();
    }, [id]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem(`person${id}State`,JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}; 