import styled from "styled-components";

export const Wrapper= styled.h1`
    max-width: var(--maxWidth);
    margin: auto;
    padding-left: 20px;
    color: var(--white);
    text-decoration: none;
    span{
        padding-left: 10px;
        padding-right: 10px;
    }
    a{
        text-decoration: none;
        color: var(--white);
        transition: all ease 0.3s;
        :hover{
            color: var(--medGrey);
        }
    }
`;