import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    width: 100%;
    margin: 0 auto;
    padding-bottom: 50px;

    h1{
        margin: 0;
        padding-bottom: 40px;
        padding-left: 20px;
    }
`;

export const Content = styled.div`
    display: flex;
    white-space: nowrap;
    overflow: auto;
`;