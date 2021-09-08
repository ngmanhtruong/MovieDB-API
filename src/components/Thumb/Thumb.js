// import react from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
//styles
import { Image, Wrapper } from './Thumb.styles';

const Thumb = ({ image, movieId, clickable, title, titleDisplay})=>(
    <Wrapper>
        {titleDisplay ? (
        <>
            <div className="image-wrapper">
                {clickable? (
                    <Link to={`/movie/${movieId}`}>
                        <Image src={image} alt='movie-thumb' />
                    </Link>
                ) : (
                    <Image src={image} alt='movie-thumb' />
                )}
            </div>
            <div className="title">
                <p title={title}>{title}</p>
            </div>
        </>
        ):(
            <>
                {clickable? (
                    <Link to={`/movie/${movieId}`}>
                        <Image src={image} alt='movie-thumb' />
                    </Link>
                ) : (
                    <Image src={image} alt='movie-thumb' />
                )}
            </>
        )}
    </Wrapper>
);

Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool,
    title: PropTypes.string,
    titleDisplay: PropTypes.bool,
}

export default Thumb;