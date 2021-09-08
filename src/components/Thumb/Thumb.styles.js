import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    a{
        height: 100%;
        width: 100%;
    }

    .image-wrapper{
        height: 90%;
        width: 100%;
    }

    .title{
        height: 10%;
        width: 100%;
    
        p{
            margin-top: 5px;
            font-size: var(--fontBig);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 0px;
            color: var(--darkGrey);
            text-align:center;
        
            @media screen and (max-width: 720px){
                font-size: var(--fontMed);
            }
        }
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    max-width: 720px;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;
    animation: animateThumb 0.5s;
    
    :hover{
        opacity: 0.8;
    }

    @keyframes animateThumb{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`;
