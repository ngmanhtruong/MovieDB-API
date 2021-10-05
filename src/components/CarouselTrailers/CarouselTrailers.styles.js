import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    width: 100%;
    margin: 0px auto;
    margin-bottom: 20px;
    padding: 0 20px;
    padding-top: 40px;
    background: 
    linear-gradient(to bottom,rgba(0,0,0,0.5) 41%, rgba(0,0,0,0.9) 100%), 
    url(${({background}) => background}), 
    var(--purple);
    background-size: cover;
    h1{
        font-weight: 600;
        font-size: var(--fontSuperBig);
    }
`;

export const Title = styled.div`
    color: var(--white);
    padding-bottom: 40px;
    a{
        text-decoration: none;
        font-size: var(--fontBig);
        font-weight: 600;
        transition: all ease .3s;
        &:hover:not(.active){
            cursor: pointer;
            color: var(--medGrey) !important;
        }
        
    }
    button{
        color: var(--darkGrey);
        border-radius: 20px;
        background: var(--lightGrey);
        border: 1px solid var(--lightGrey);
        &.active{
            color: var(--purple);
        }
        &:hover:not(.active){
            background: var(--medGrey);
            color: var(--purple);
            border: 1px solid var(--medGrey);
        }
    }
    span{
        padding: 0 10px;
        color: var(--white);
    }
    .active{
        color: var(--white);
        text-shadow: 5px 5px 8px var(--purple);
    }
`;

export const Content = styled.div`
    display: flex;
    white-space: nowrap;
    overflow: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    div:first-child{
        padding-left: 0px;
    }
`;

export const H1 = styled.h1`
    padding: 0px 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    font-size: var(--fontSuperBig);
    font-weight: 600;
    color: var(--purple);
    margin: 0;
`;