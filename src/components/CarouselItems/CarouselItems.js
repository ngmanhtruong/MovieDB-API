import React from "react";
import { Link } from "react-router-dom";

import { Wrapper, Image } from './CarouselItems.styles';

const CarouselItems = ({ image, title, vote_average, clickable, movieId, release_date }) =>{

    return(
        <Wrapper>
            <div className="image-wrapper">
                {clickable ?
                <Link to={`/movie/${movieId}`}>
                    <Image src={image} alt="carousel-items" />
                </Link>
                :   <Image src={image} alt="carousel-items" />
                }
                <div className="vote-average">
                    {vote_average > 7  
                    ? <span className="green" title={`IMDB ratings: ${vote_average}`}>{vote_average}</span>
                    : <span className="yellow" title={`IMDB ratings: ${vote_average}`}>{vote_average}</span>
                    }
                </div>
            </div>
            <div className="text">
                <p title={title}>{title}</p>
                <p className="release_date">Release: {release_date}</p>
            </div>
        </Wrapper>
    )
}

export default CarouselItems;