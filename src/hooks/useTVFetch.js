import {useState,useEffect} from 'react';

//Helpers
import { isPersistedState } from '../helpers';
//API
import API from '../API';

export const useTVFetch = movieId =>{
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const fetchSingleTV = async () =>{
            try{
                setLoading(true);
                setError(false);

                const movie = await API.fetchTV(movieId);
                const credits = await API.fetchTVCredits(movieId);

                setState({
                    ...movie,
                    actors: credits.cast,
                })

                setLoading(false);
            }
            catch(error){
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);

        if(sessionState){
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchSingleTV();
    },[movieId]);

    //WRITE TO sessionStorage

    useEffect(()=>{
        sessionStorage.setItem(movieId,JSON.stringify(state));
    },[movieId,state])

    return { state, loading, error };

};