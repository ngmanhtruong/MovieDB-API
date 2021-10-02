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
        font-size: var(--fontSuperBig);
    }
    a{
        &.active{
            color: var(--purple);
        }
        text-decoration: none;
        color: var(--white);
        transition: all ease 0.3s;
        font-size: var(--fontSuperBig);
        font-weight: 600;
        &:hover:not(.active){
            cursor: pointer;
            color: var(--medGrey) !important;
        }
    }
    @media screen and (max-width: 768px){
        span{
            font-size: var(--fontBig);
            display: block;
        }
        a{
            font-size: var(--fontBig);
            display: block;
        }
    }
`;