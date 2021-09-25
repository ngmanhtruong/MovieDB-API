import react, { useState, useEffect } from "react";
import MoviesCarousel from "./Carousel/Carousel";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";

//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
//Image
import NoImage from '../images/no_image.jpg';
//Components
import Trending from "./Trending/Trending";
import NowPlaying from "./NowPlaying/NowPlaying";
import TopRating from "./TopRating/TopRating";
import Genres from "./Genres/Genres";
import { useMultiSearchFetch } from "../hooks/useMultiSearchFetch";
import { Link } from "react-router-dom";


const Testing = () => {
    const { state, loading, error, setSearchTerm, searchTerm } = useMultiSearchFetch();
    console.log(state);
    return (
        <>  
            <input
                onChange={e=>setSearchTerm(e.currentTarget.value)}
                value={searchTerm}
            />
            <p>TESTING PAGE</p>
            <ul className = "list-group">
                {state.results.map(item=>{
                    if(item.media_type === "person"){
                        return (
                            <li className="list-group-item">
                                <Link path='person/:personId'>
                                    <p className="name">{item.name}</p>
                                    <p className="media_type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                    if(item.media_type === "movie"){
                        return (
                            <li className="list-group-item">
                                <Link path='movie/:movieId'>
                                    {item.name ? 
                                    <p className="name">{item.name}</p>
                                    :
                                    <p className="name">{item.title}</p>
                                    }
                                    <p className="media_type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                    if(item.media_type === "tv"){
                        return (
                            <li className="list-group-item">
                                <Link path='tv/:movieId'>
                                    <p className="name">{item.name}</p>
                                    <p className="media_type">{item.media_type}</p>
                                </Link>
                            </li>
                        )
                    }
                })}
            </ul>
        </>
    )
}

export default Testing;