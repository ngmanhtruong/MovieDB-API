import React, { useEffect, useState } from "react";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import Spinner from './Spinner/Spinner';
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import Title from "./Title/Title";
import Carousel from "./Carousel/Carousel";
import CarouselItems from "./CarouselItems/CarouselItems";
import CarouselTrailers from "./CarouselTrailers/CarouselTrailers";
import TrailersItem from "./TrailersItem/TrailersItem";
//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
import { useUpcomingFetch } from "../hooks/useUpcomingFetch";
//Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const {
        state, 
        loading, 
        error, 
        setSearchTerm, 
        searchTerm, 
        setIsLoadingMore,
        latestMovie,
        latestTV,
        trending
    } = useHomeFetch();

    const { 
        state : upcomingState, 
        loading : upcomingLoading, 
        error : upcomingError, 
        setIsLoadingMore : upSetIsLoadingMore, 
        searchTerm : upSearchTerm,
        setSearchTerm : upSetSearchTerm 
    } = useUpcomingFetch();

    const [popular, setPopular] = useState(true);
    const [heroImage, setHeroImage] = useState([]);
    const [trailer, setTrailer] = useState('movie');
    const [background, setBackGround] = useState('');
    const random = Math.floor(Math.random() * 10);

    const handleMovies = (type) =>{
        if (type === 'upcoming'){
            setPopular(false);
        } else {
            setPopular(true);
        }
    }
    //setHeroImage
    useEffect(()=>{
        setHeroImage(state.results[random]);
    },[setHeroImage, state])

    //setBackgroundTrailers
    useEffect(()=>{
        if(trailer && latestMovie.page > 0)
            setBackGround(`${IMAGE_BASE_URL}original${latestMovie.results[0].backdrop_path}`);
        if(!trailer && latestTV.page > 0)
            setBackGround(`${IMAGE_BASE_URL}original${latestTV.results[0].backdrop_path}`);
    },[trailer, latestMovie, latestTV])

    const onMouseEnterHandler = (path) => {
        setBackGround(`${IMAGE_BASE_URL}original${path}`);
        // console.log("clicked");
    }

    if(error) return <div>Did Something went wrong ...</div>;
    if(upcomingError) return <div>Did Something went wrong ...</div>;

    return (
        <>
            {!searchTerm && heroImage ?
            <HeroImage
                image={`${IMAGE_BASE_URL}original${heroImage.backdrop_path}`}
                title={heroImage.original_title}
                text={heroImage.overview}
            />
            : null}

            {trailer && latestTV && latestMovie
            ?
                <CarouselTrailers 
                    background = {background}
                    setTrailer = {setTrailer}
                    trailer = {trailer}
                    header='Latest Trailers'
                >
                    {latestMovie.results.map((movie, index) => {
                        if(movie.trailers.results[0]){
                            return (
                                <TrailersItem 
                                    key = {movie.id}
                                    image= {
                                        `https://img.youtube.com/vi/${movie.trailers.results[0].key}/hqdefault.jpg`
                                    }
                                    title = {movie.trailers.results[0].name}
                                    backgroundLink = {`https://img.youtube.com/vi/${movie.trailers.results[0].key}/hqdefault.jpg`}
                                    videoId = {movie.trailers.results[0].key}
                                />
                    )}})}
                </CarouselTrailers>
            :
                <CarouselTrailers
                    background = {background}
                    setTrailer = {setTrailer}
                    trailer = {trailer}
                    header='Latest Trailers'
                >
                    {latestTV.results.map((movie,index) => {
                        if(movie.trailers.results[0])
                        return (
                        <TrailersItem 
                            key = {movie.id}
                            image= {
                                `https://img.youtube.com/vi/${movie.trailers.results[0].key}/hqdefault.jpg`
                            }
                            title = {movie.trailers.results[0].name}
                            backgroundLink = {`https://img.youtube.com/vi/${movie.trailers.results[0].key}/hqdefault.jpg`}
                            videoId = {movie.trailers.results[0].key}
                        />
                    )
                    })}
                </CarouselTrailers>
            }
            {popular ?
            <SearchBar setSearchTerm={setSearchTerm} text="Search Popular"/>
            : <SearchBar setSearchTerm={upSetSearchTerm} text="Search Upcoming"/>
            }
            {!searchTerm && popular 
            ?
            <Title>
                <a 
                    className="active"
                    onClick= {()=>handleMovies('popular')}
                    >
                    Popular Movies
                </a>
                <span>|</span>
                <a onClick={()=>handleMovies('upcoming')}>
                    Upcoming Movies
                </a>
            </Title>
            :
            <Title>
                <a 
                    onClick= {()=>handleMovies('popular')}
                    >
                    Popular Movies
                </a>
                <span>|</span>
                <a 
                    className="active"
                    onClick={()=>handleMovies('upcoming')}
                >
                    Upcoming Movies
                </a>
            </Title>
            }
            {popular ?
            <>
                <Grid header={searchTerm && 'Search Result'}>
                    {state.results.map(movie=>(
                        <Thumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                                : NoImage
                            }
                            movieId={movie.id}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            titleDisplay
                        />
                    ))}
                </Grid>
                {loading && <Spinner />}
                {state.page < state.total_pages && !loading && (
                    <Button text='Load More' callback={()=> setIsLoadingMore(true)}/>
                )}
            </>
            : 
            <>
                <Grid header={upSearchTerm && 'Search Result'}>
                    {upcomingState.results.map(movie=>(
                        <Thumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                                : NoImage
                            }
                            movieId={movie.id}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            titleDisplay
                        />
                    ))}
                </Grid>
                {upcomingLoading && <Spinner />}
                {upcomingState.page < upcomingState.total_pages && !upcomingLoading && (
                    <Button text='Load More' callback={()=> upSetIsLoadingMore(true)}/>
                )}
            </>
            }
            <Carousel header='Top Searching This Week'>
                {trending.results.map(trending =>(
                    <CarouselItems 
                        key={trending.id}
                        clickable
                        image={
                            trending.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + trending.poster_path
                            : NoImage
                        }
                        movieId={trending.id}
                        title={trending.name ? trending.name : trending.title}
                        release_date = {trending.release_date}
                        first_air_date = {trending.first_air_date}
                        isCarousel={true}
                    />
                ))}
            </Carousel>

        </>
    )
}

export default Home;
