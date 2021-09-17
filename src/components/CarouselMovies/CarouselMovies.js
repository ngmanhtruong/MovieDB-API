import React from "react";
import { Link } from "react-router-dom";

//styles
import { Wrapper , Image } from './CarouselMovies.styles';


const CarouselMovies = ({ image, title, vote_average, clickable, movieId }) =>{
    vote_average = vote_average.toFixed(1);
    return(
        <Wrapper>
            <div className="image-wrapper">
                {clickable ?
                <Link to={`/movie/${movieId}`}>
                    <Image src={image} alt="carousel-movies" />
                </Link>
                :   <Image src={image} alt="carousel-movies" />
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
            </div>
        </Wrapper>
    )
}

export default CarouselMovies;