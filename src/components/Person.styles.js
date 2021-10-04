import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px;
    color: var(--white);
    h2{
        font-weight: 600;
        padding-top: 10px;
        text-transform: uppercase;
    }
    .info{
        padding-top: 20px;
        h4{
            font-weight: normal;
            font-style: italic;
        }
        p{
            margin-bottom: 0px;
            color: var(--silver);
        }
    }
    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`;

export const Left = styled.div`
    width: 30%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

export const Right = styled.div`
    width: 70%;
    padding-left: 20px;

    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 0px;
    }
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 20px;
`;

export const Table = styled.table`
    width: 100%;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    border-top: 1px solid #dedede;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    box-shadow: 0 2px 8px rgba(0,0,0,1);
    tbody{
        border: 1px solid rgba(var(--silver), 1);
        border-bottom: none;
    }
`;