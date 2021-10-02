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

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [latestMovie, setLatestMovie] = useState(initialState);
    const [latestTV, setLatestTV] = useState(initialState);
    const [trending, setTrending] = useState(initialState);

    const fetchMovies = async (page, searchTerm="")=>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            const latestTV = await API.fetchPopularTV();
            const trending = await API.fetchTrendingSearch();
            const latestMovie = await API.fetchMovies('', 1);

            const tvArr = await Promise.all(latestTV.results.map(async (value, index) => {
                const trailers = await API.fetchTV(value.id);
                return latestTV.results[index].trailers = trailers.videos;
            }));

            const movieArr = await Promise.all(latestMovie.results.map(async (value, index) => {
                const trailers = await API.fetchMovie(value.id);
                return latestMovie.results[index].trailers = trailers.videos;
            }));

            // console.log(tvArr, movieArr);

            setState(prev=>({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results] 
            }));
            setLatestMovie(prev=>({
                ...latestMovie,
                results:
                    page > 1 ? [...prev.results, ...latestMovie.results] : [...latestMovie.results],
                // trailers: movieArr
            }));
            setLatestTV(prev=>({
                ...latestTV,
                results:
                    page > 1 ? [...prev.results, ...latestTV.results] : [...latestTV.results],
                // trailers: tvArr
            }));
            setTrending(prev=>({
                ...trending,
                results:
                    page > 1 ? [...prev.results, ...trending.results] : [...trending.results],

            }));
        } catch (error){
            setError(true);
        }
        setLoading(false);
    }

    //Initial and search
    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');
            const latestMovieState = isPersistedState('latestMovieState');
            const latestTVState = isPersistedState('latestTVState');
            const trendingState = isPersistedState('trendingState');

            if (sessionState && latestMovieState && latestTVState && trendingState) {
                // console.log("GRABBING FROM HOMESTATE");
                setLatestMovie(latestMovieState);
                setLatestTV(latestTVState);
                setState(sessionState);
                setTrending(trendingState);
                return;
            }
        }
        // console.log("GRABBING FROM API");
        fetchMovies(1, searchTerm);

    }, [searchTerm]);

    //Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, searchTerm, state.page]);

    //Write to sessionStorage
    useEffect(()=>{
        if(!searchTerm){
            sessionStorage.setItem('homeState',JSON.stringify(state));
            sessionStorage.setItem('latestMovieState',JSON.stringify(latestMovie));
            sessionStorage.setItem('latestTVState',JSON.stringify(latestTV));
            sessionStorage.setItem('trendingState',JSON.stringify(trending));
        } 
    },[searchTerm, state, latestMovie, latestTV, trending]);

    return { 
        state, 
        loading, 
        error, 
        setSearchTerm, 
        searchTerm, 
        setIsLoadingMore, 
        latestMovie, 
        latestTV,
        trending 
    };
};