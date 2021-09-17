import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
    position: fixed;
    top: 0;
    width: 100%;
    transition: top 0.3s;
    z-index: 999;
    border-shad
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto;
    color: var(--purple);

    a{
        color: var(--white);
        text-shadow: 5px 5px 8px var(--purple);
        text-decoration: none;
        font-weight: 600;
    }

`;

export const LogoImg = styled.img`
    width: 200px;

    @media screen and (max-width: 768px){
        width: 150px
    }
    @media screen and (max-width: 550px){
        width: 100px;
    }
`;

export const Form = styled.form`
    padding-top: 10px;
    position: relative;
    max-width: var(--maxWidth);
    margin: 0 auto;
    input{
        width: 100%;
        height: 40px;
    }
    button{
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-style: none;  
        background-color: transparent;
        width: 30px;
    }
`;  
