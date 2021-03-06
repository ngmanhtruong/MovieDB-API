import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 320px;
    padding: 20px;
    color: var(--darkGrey);

    label{
        font-size: var(--fontSmall);
        font-weight: 600;
    }

    input {
        width: 100%;
        height: 30px;
        border: 1px solid var(--darkGrey);
        border-radius: 20px;
        margin: 10px 0;
        padding: 10px;
        
    }

    .error{
        color: red;
        text-align: center;
    }
`;

export const Title = styled.h1`
    padding-top: 20px;
    text-align: center;
`;