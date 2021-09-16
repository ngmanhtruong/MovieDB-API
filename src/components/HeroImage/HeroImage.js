import React from 'react';
import PropTypes from 'prop-types';

//Styles
import { Wrapper, Content, Text } from './HeroImage.styles';

const HeroImage = ({ image, title, text, bigtext }) =>(
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
                <p>{text}</p>
            </Text>
            <h2>{bigtext}</h2>
        </Content>
    </Wrapper>
);

HeroImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
}

export default HeroImage;

