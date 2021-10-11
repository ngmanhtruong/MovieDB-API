import React, { useContext, useState } from "react";
import PropTypes, { bool, number } from 'prop-types';
//API
import API from '../../API';
//Components
import Thumb from "../Thumb/Thumb";
//Config
import {IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Image
import NoImage from '../../images/no_image.jpg';
//Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';
import Rate from "../Rate/Rate";
//Context
import { Context } from '../../context';

const initialRate = {
    success: bool,
    status_code: number,
    status_message: "",
}
const MovieInfo = ({ movie })=> {
    const [user] = useContext(Context);
    const [rate, setRate] = useState(initialRate);

    const handleRating = async (value)=>{
        setRate(initialRate);
        const rate = await API.rateMovie(user.sessionId, movie.id,value);
        setRate(rate);
    }

    if (movie){
        return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb
                    image={
                        movie.poster_path 
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                    }
                    clickable={false}
                    alt='Movie Thumb'
                />
                <Text>
                    <h1 className='movie-title'>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        {movie.directors &&
                        <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                            {movie.directors.map(director=>(
                                <p key={director.credit_id}>{director.name}</p>
                            ))}
                        </div>
                        }
                        <div className='status'>
                            <h3>STATUS</h3>
                            <p>{movie.status}</p>
                        </div>
                    </div>
                    {movie.tagline &&
                    <div className='tagline'>
                        <p>"{movie.tagline}"</p>
                    </div>}
                    {movie.belongs_to_collection && 
                    <div className ='belong-to'>
                        <h3>BELONGS TO COLLECTION:</h3>
                        <p>{movie.belongs_to_collection.name}</p>
                    </div>}

                    {movie.external_ids &&
                    <div className='social-tag'>
                        {movie.external_ids.facebook_id && 
                        <a  
                            key='facebook_id'
                            href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}
                            target='_blank'
                            // ref='noreferee'
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        }
                        {movie.external_ids.instagram_id && 
                        <a 
                            key = 'instagram_id'
                            href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}
                            target='_blank'
                            // ref='noreferee'
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        }
                        {movie.external_ids.twitter_id && 
                        <a  
                            key= 'twitter_id'
                            href={`https://www.twitter.com/${movie.external_ids.twitter_id}`}
                            target='_blank'
                            // ref='noreferee'
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        }
                    </div>}
                    <div className='genres'>
                        <h3>GENRES</h3>
                        {movie.genres && movie.genres.map(genre=>(
                            <p key={genre.name}>{genre.name}</p>
                        ))}
                    </div>
                    {user && 
                        <div>
                            <p>Rate Movie</p>
                            <Rate callback={handleRating}/>
                            {rate.status_code == 1 && (
                                <p>Your rating has been sent!</p>
                            )}
                            {rate.status_code == 12 && (
                                <p>Your rating has been updated!</p>
                            )}
                        </div>
                    }
                </Text>
            </Content>
        </Wrapper>
        );
    } else{
        return '';
    }
};

export default MovieInfo;