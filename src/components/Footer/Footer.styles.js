import styled from "styled-components";

export const Wrapper = styled.div`
    display: block;
    background-color: var(--medGrey);

    padding: 50px 0;
    padding-left: 20px;
    box-shadow: 0px -5px 10px 0px black;
`;

export const Content = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    color: var(--white);

    @media screen and (max-width: 768px){
        grid-template-columns: repeat(1, 1fr);
    }

    div{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-bottom: 20px;
        a{
            text-align: left;
            margin: 0;
            font-size: var(--fontSmall);
            text-decoration: none;
            color: var(--white);
            transition: all ease 0.3s;

            &:hover{
                color: var(--purple);
                text-shadow: 5px 5px 8px var(--darkGrey);
            }
        }
        h2{
            font-weight: 600;
            margin: 0;
            padding-bottom: 20px;
            text-shadow: 5px 5px 8px var(--purple);
        }
    }

    .hi-user{
        color: var(--white);
        font-size: var(--fontBig);
        font-weight: 600;
    }
`;

export const LogoImg = styled.img`
    width: 100px;
`;