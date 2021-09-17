import React, { useState } from "react";
//styles
import { Wrapper } from './Popular.styles';
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";
import { usePopularTvFetch } from "../../hooks/usePopularTvFetch";

const PopularTV = () => {
  const {state,loading,error} = usePopularTvFetch();
  if(error) return <div>Something went wrong...</div>;
    
  //console.log(state);

  return (
    <Wrapper>
        {loading && <Spinner />}
        <Carousel header="Popular TV shows">
            {state.results.map(movie=>(
                <CarouselItems 
                key={movie.id}
                clickable
                image={
                    movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movieId={movie.id}
                title={movie.name}
                vote_average={movie.vote_average}
                first_air_date={movie.first_air_date}
                />
            ))}
        </Carousel>
    </Wrapper>
  )
}

export default PopularTV;