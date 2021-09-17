import React from "react";

//styles
import { Wrapper, Content } from './Carousel.styles';

const Carousel = ({ header, children }) => {
    return (
        <Wrapper>
            <h1>{header}</h1>
            <Content>
                {children}
            </Content>
        </Wrapper>
    )
    
}

export default Carousel;