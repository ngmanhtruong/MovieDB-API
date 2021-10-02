import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    width: 100%;
    margin: 0 auto;
    padding-bottom: 50px;

    h1{
        margin: 0;
        padding: 0px 20px;
        padding-bottom: 20px;
    }
`;

export const Content = styled.div`
    display: flex;
    white-space: nowrap;
    overflow: auto;
    margin: 0 20px;
    padding-bottom: 20px;
    div:first-child{
        padding-left: 15px;
    }
`;