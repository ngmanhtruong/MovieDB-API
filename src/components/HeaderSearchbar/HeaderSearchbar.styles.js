import styled from 'styled-components';

export const Form = styled.form`
    padding-top: 10px;
    position: relative;
    max-width: var(--maxWidth);
    margin: 0 auto;
    input{
        width: 100%;
        height: 40px;
        :focus{
            outline: none;
        }
    }
    button{
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-style: none;  
        background-color: transparent;
        width: 35px;
        img{
            width: 100%;
            filter: drop-shadow(2px 4px 6px black);
        }
    }
    .anchor{
        position: relative;
        bottom: 0;
        left: 0;
    }
`;  