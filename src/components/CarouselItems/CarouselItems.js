import React from "react";
import { Link } from "react-router-dom";

import { Wrapper, Image } from './CarouselItems.styles';

const CarouselItems = ({ 
    image, 
    title, 
    vote_average, 
    clickable, 
    movieId, 
    release_date, 
    first_air_date,
    isCarousel=true }) =>{

    return(
        <Wrapper isCarousel = {isCarousel}>
            <div className="image-wrapper">
                {!clickable && <Image src={image} alt="carousel-items" />}
                {clickable && release_date &&
                <Link to={`/movie/${movieId}`}>
                    <Image src={image} alt="carousel-items" isCarousel = {isCarousel}/>
                </Link>
                }
                {clickable && first_air_date &&
                <Link to={`/tv/${movieId}`}>
                    <Image src={image} alt="carousel-items" isCarousel = {isCarousel}/>
                </Link>
                }
                {vote_average &&
                <div className="vote-average">
                    {vote_average > 7  
                    ? <span className="green" title={`IMDB ratings: ${vote_average}`}>{vote_average.toFixed(1)}</span>
                    : <span className="yellow" title={`IMDB ratings: ${vote_average}`}>{vote_average.toFixed(1)}</span>
                    }
                </div>
                }
                {vote_average === 0 &&
                <div className="vote-average">
                    <span className="yellow" title={`IMDB ratings: Not Updated`}>0</span>
                </div>
                }
            </div>
            <div className="text">
                <p title={title}>{title}</p>
                {release_date &&
                <p className="release_date">Release: {release_date}</p>
                }
                {first_air_date &&
                <p className="release_date">First air: {first_air_date}</p>
                }
            </div>
        </Wrapper>
    )
}

export default CarouselItems;