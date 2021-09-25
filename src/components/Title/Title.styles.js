import styled from "styled-components";

export const Wrapper= styled.div`
    max-width: var(--maxWidth);
    margin: auto;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--white);
    text-decoration: none;
    span{
        padding-left: 10px;
        padding-right: 10px;
    }
    a{
        &.active{
            color: var(--purple);
            &:hover{
                color: var(--purple) !important;
            }
        }
        text-decoration: none;
        color: var(--white);
        transition: all ease 0.3s;
        font-size: var(--fontSuperBig);
        font-weight: 600;
        :hover{
            color: var(--medGrey) !important; 
            cursor: pointer;
        }
    }
`;