import react from "react";
import { Wrapper } from './Title.styles'
const Title = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Title;