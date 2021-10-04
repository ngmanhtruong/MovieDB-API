import React from 'react';
import Carousel from '../Carousel/Carousel';
import CarouselMovies from '../CarouselMovies/CarouselMovies';
//styles
import { Wrapper } from './KnownFor.styles';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

//images
import NoImage from '../../images/no_image.jpg';

const KnownFor = ({ state, header, movie_cast, movie_crew, tv_cast, tv_crew }) =>{
    const uniqueArr = [];
    state.map(item => {
        if (!uniqueArr.includes(item.id))
            uniqueArr.push(item.id);
    })
    return (
        <>
        <Wrapper>
            <Carousel header={header}>
                {state.map(item=>(
                    <CarouselMovies
                        key={item.id}
                        clickable
                        image={
                            item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                            : NoImage
                        }
                        movieId={item.id}
                        title={item.title ? item.title : item.name}
                        vote_average={item.vote_average}
                        media_type={item.media_type}
                    />
                ))}
                {movie_cast.map(item=>{
                    if((item.popularity > 100 || item.vote_average > 7) && !uniqueArr.includes(item.id)){
                        uniqueArr.push(item.id);
                        return(
                            <CarouselMovies
                                key={item.id}
                                clickable
                                image={
                                    item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                    : NoImage
                                }
                                movieId={item.id}
                                title={item.title ? item.title : item.name}
                                vote_average={item.vote_average}
                                media_type='movie'
                            />
                        )
                    }
                })}
                {movie_crew.map(item=>{
                    if(item.popularity > 100 && !uniqueArr.includes(item.id)){
                        uniqueArr.push(item.id);
                        return(
                            <CarouselMovies
                                key={item.id}
                                clickable
                                image={
                                    item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                    : NoImage
                                }
                                movieId={item.id}
                                title={item.title ? item.title : item.name}
                                vote_average={item.vote_average}
                                media_type='movie'
                            />
                        )
                    }
                })}
                {tv_cast.map(item=>{
                    if(item.popularity > 100 && !uniqueArr.includes(item.id)){
                        uniqueArr.push(item.id);
                        return(
                            <CarouselMovies
                                key={item.id}
                                clickable
                                image={
                                    item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                    : NoImage
                                }
                                movieId={item.id}
                                title={item.title ? item.title : item.name}
                                vote_average={item.vote_average}
                                media_type='tv'
                            />
                        )
                    }
                })}
                {tv_crew.map(item=>{
                    if(item.popularity > 100 && !uniqueArr.includes(item.id)){
                        uniqueArr.push(item.id);
                        return(
                            <CarouselMovies
                                key={item.id}
                                clickable
                                image={
                                    item.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path 
                                    : NoImage
                                }
                                movieId={item.id}
                                title={item.title ? item.title : item.name}
                                vote_average={item.vote_average}
                                media_type='tv'
                            />
                        )
                    }
                })}
            </Carousel>
        </Wrapper>
        </>
    )
}

export default KnownFor;