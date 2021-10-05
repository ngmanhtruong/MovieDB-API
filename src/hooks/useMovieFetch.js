import {useState,useEffect} from 'react';

//Helpers
import { isPersistedState } from '../helpers';
//API
import API from '../API';

export const useMovieFetch = movieId =>{
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const fetchMovie = async () =>{
            try{
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                //Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors, //directors : directors
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

        fetchMovie();
    },[movieId]);

    //WRITE TO sessionStorage

    useEffect(()=>{
        sessionStorage.setItem(movieId,JSON.stringify(state));
    },[movieId,state])

    return { state, loading, error };

};