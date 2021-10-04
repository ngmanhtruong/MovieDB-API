import styled  from 'styled-components';

export const Tr = styled.tr`
    a{
        color: var(--white);
        font-weight: 600;
        text-decoration: none;
        transition: all ease .5s;
        &:hover{
            color: var(--purple);
        }
    }
    .year{
        width: 65px;
        font-weight: 400;
        text-align:center;
        color: var(--white);
    }
    .as{
        font-style: italic;
        padding: 0 20px;
    }
    .seperator{
        padding: 0;
        width: 25px;
        color: var(--white);
    }
    .group{
        color: var(--lightGrey);
    }
    .character{
        color: var(--silver);
    }
`;