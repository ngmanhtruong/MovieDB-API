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
import { Wrapper, Content, Text } from './TVInfo.styles';
import Rate from "../Rate/Rate";
//Context
import { Context } from '../../context';

const initialRate = {
    success: bool,
    status_code: number,
    status_message: "",
}
const TVInfo = ({ movie })=> {
    const [user] = useContext(Context);
    const [rate, setRate] = useState(initialRate);

    const handleRating = async (value)=>{
        setRate(initialRate);
        const rate = await API.rateMovie(user.sessionId, movie.id,value);
        setRate(rate);
        console.log(rate);
    }

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
                <h1>{movie.name}</h1>
                <h3>Overview</h3>
                {movie.overview ?
                <p>{movie.overview}</p>
                : <p>This movie doesn't have overview yet!</p>}
                <div className="rating-actors">
                    <div>
                        <h3>RATING</h3>
                        <div className="score">{movie.vote_average}</div>
                    </div>
                    {movie.actors &&
                    <div className="actors">
                        <h3>ACTOR{movie.actors.length > 1 ? 'S' : ''}</h3>
                        {movie.actors.map(( actor, index )=>{
                            if (index < 5)
                            return (
                                <p key={actor.credit_id}>{actor.name}</p>
                            );
                        })}
                    </div>
                    }
                    {movie.actors &&
                    <div className="created-by">
                        <h3>CREATED BY</h3>
                        {movie.created_by.map(( actor, index )=>{
                            if (index < 5)
                            return (
                                <p key={actor.credit_id}>{actor.name}</p>
                            );
                        })}
                    </div>
                    }
                </div>
                {user && 
                    <div>
                        <p>Rate This TV Show</p>
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
};


export default TVInfo;