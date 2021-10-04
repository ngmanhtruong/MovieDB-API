import { Wrapper, Content, Title} from './CarouselTrailers.styles';
import { useState } from 'react';

const CarouselTrailers = ({ background, children, setTrailer, trailer }) => {

    const handleTrailer = (type) =>{
        if (type === 'movie')
            setTrailer(true);
        else 
            setTrailer(false)
    }

    return (
        <Wrapper background={background}>
            <h1>Latest Trailers</h1>
            <Title>
                <a className={trailer ? 'active' : undefined} onClick={()=> setTrailer(true)}>
                    On Theater
                </a>
                <span>|</span>
                <a className={!trailer ? 'active' : undefined} onClick={()=> setTrailer(false)}>
                    On TV
                </a>
            </Title>
            <Content>
                {children}
            </Content>
        </Wrapper>
    );
}

export default CarouselTrailers;