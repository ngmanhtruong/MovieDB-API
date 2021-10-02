import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 0 20px;
    padding-bottom: 50px;
    h1{
        color: var(--white);
        padding-bottom: 10px;
        @media screen and (max-width: 720px){
            font-size: var(--fontBig);
        }
    }

`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: ${({ home }) => home ? "2rem" : "1rem"};
    row-gap: ${({ home }) => home ? "3rem" : "2rem"};
    justify-content:${({ home }) => home ? "unset" : 'space-between'};
`;

