import styled from 'styled-components';


export const Wrapper = styled.div`
    padding: 0 20px;
    position: relative;
`;


export const Image = styled.div`
    min-width: 300px;
    width: 300px;
    height: calc(300px / 1.78);
    position: relative;
    transition: all ease .3s;
    &:hover{
        img{
            transform: scale(1.1);
        }
        .fas.fa-play{
            font-size: 70px;
        }
    }
    img{
        border-radius: 20px;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        object-fit: cover;
        transition: all ease .3s;
    }
    .fas.fa-play{
        font-size: 50px; 
        display: inline-block;
        z-index: 3;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--white);
        transition: all ease 0.3s;
        &:hover{
            cursor: pointer;
        }
    }
`;


export const Title = styled.div`
    text-overflow: ellipsis;
    width: 300px;
    padding-left: 20px;
    padding-top: 10px;
    color: var(--white);
    text-align: center;
    h3{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;