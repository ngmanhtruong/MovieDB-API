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
        position: relative;
        .vote-average{
            position: absolute;
            left: 10px;
            bottom: 10px;
            z-index: 2;
            background: var(--darkGrey);
            font-size: var(--fontMed);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--white);
            .green{
                color: var(--lightGreen);
            }
            .yellow{
                color: var(--lightYellow);
            }
        }
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
            text-align:center;
            box-shadow: 0 2px 8px black;
        
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
    border-radius: 10px;
    border: solid 5px white;
    animation: animateThumb 0.5s;
    box-shadow: 0 2px 8px black;
    :hover{
        opacity: 0.7;
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
