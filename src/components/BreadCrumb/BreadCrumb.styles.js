import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    background: var(--medGrey);
    color: var(--white);

`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: var(--maxWidth);
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
        font-size: var(--fontBig);
        color: var(--white);
        padding-right: 10px;
    }
    a {
        font-size: var(--fontBig);
        font-weight: 600;
        text-decoration: none;
    }

`;