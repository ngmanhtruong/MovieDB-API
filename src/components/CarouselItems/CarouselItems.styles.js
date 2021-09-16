import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0 20px;
    padding-bottom: 40px;
    width: 200px;
    a{
        height: 100%;
        width: 100%;
    }
    .image-wrapper{
        width: 100%;
        position: relative;
        .vote-average{
            position: absolute;
            left: -15px;
            bottom: -20px;
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
    .text{
        margin-top: 15px;
        p{
            margin: 0;
            padding: 0;
            width: 170px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &.release_date{
                font-style: italic;
            }
        }
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 240px;
    max-width: 200px;
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
