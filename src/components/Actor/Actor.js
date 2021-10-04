import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Styles
import { Wrapper, Image } from './Actor.styles';

const Actor = ({ name, character, imageUrl, personId }) => (
    <Wrapper>
        <Link to={`/person/${personId}`}>
            <Image src={imageUrl} alt='actor-thumb' />
        </Link>
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
);

Actor.propTypes = {
    name: PropTypes.string,
    character: PropTypes.string,
    imageUrl: PropTypes.string,
}

export default Actor;
