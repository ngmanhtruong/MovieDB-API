import React, { useState } from "react";
//styles
import { Wrapper, Content } from './NowPlaying.styles';
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";
import { useNowPlayingFetch } from "../../hooks/useNowPlayingFetch";

const NowPlaying = () => {
  const {state,loading,error} = useNowPlayingFetch();
  if(error) return <div>Something went wrong...</div>;
    
  console.log(state);

  return (
    <Wrapper>
        {loading && <Spinner />}
        <Carousel header="Now Playing">
            {state.results.map(movie=>(
                <CarouselItems 
                key={movie.id}
                clickable
                image={
                    movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movieId={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                />
            ))}
        </Carousel>
    </Wrapper>
  )
}

export default NowPlaying;
