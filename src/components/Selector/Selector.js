import React from "react";
import { Wrapper } from './Selector.styles';


const Selector = ({text1, text2, callback1, callback2}) => {
    return (
        <Wrapper>
            <button onClick={callback1}>{text1}</button>
            <button onClick={callback2}>{text2}</button>
        </Wrapper>
    )
}

export default Selector;