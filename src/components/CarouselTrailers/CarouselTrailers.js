import { Wrapper, Content, Title, H1} from './CarouselTrailers.styles';
// import { useState } from 'react';

const CarouselTrailers = ({ background, children, setTrailer, trailer, header, notHomePage }) => {

    const handleTrailer = (type) =>{
        if (type === 'movie')
            setTrailer(true);
        else 
            setTrailer(false)
    }

    return (
        <>
            <H1>{header}</H1>
            <Wrapper background={background}>
                {!notHomePage &&
                <Title>
                    <button className={trailer ? 'active' : undefined} onClick={()=> setTrailer(true)}>
                        On Theater
                    </button>
                    <span>|</span>
                    <button className={!trailer ? 'active' : undefined} onClick={()=> setTrailer(false)}>
                        On TV
                    </button>
                </Title>
                }
                <Content>
                    {children}
                </Content>
            </Wrapper>
        </>
    );
}

export default CarouselTrailers;