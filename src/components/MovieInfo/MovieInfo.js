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
                    <h1>{movie.title}</h1>
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