import styled from "styled-components";

export const Wrapper = styled.div`
    color: var(--white);
    background: var(--darkGrey);
    border-radius: 20px;
    padding: 5px;
    text-align: center;

    h3{
        margin: 10px 0 0 0;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    p{
        margin: 5px 0;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

export const Image = styled.img`
    display: block;
    width: 200px;
    height: 240px;
    object-fit: cover;
    border-radius: 15px;
`;

