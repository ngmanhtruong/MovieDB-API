import styled from 'styled-components';

export const Wrapper = styled.div`
    background: linear-gradient(
        to bottom, rgba(0,0,0,0) 41%,
        rgba(0,0,0,0.65) 100%), 
    url(${({ image }) => image}), var(--lightGrey);
    background-size: 100% , cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 800px;
    position: relative;
    animation: animateHeroImage 1s;

    @keyframes animateHeroImage {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @media screen and (max-width: 1600px){
        height: 600px;
    }
`;

export const Content = styled.div`
    padding: 20px;
    max-width: var(--maxWidth);
    margin: 0 auto;
    h2{
        position: absolute;
        bottom: 20px;
        left: 20px;
        font-size: var(--fontSuperBig);
        font-weight: 600;
        z-index: 2;
        color: var(--white);
        text-shadow: 5px 5px 8px #5500ff;
    }
`;

export const Text = styled.div`
    z-index: 97;
    max-width: 700px;
    position: absolute;
    bottom: 40px;
    margin-right: 20px;
    min-height: 100px;
    color: var(--white);

    h1{
        font-size: var(--fontSuperBig);

        @media screen and (max-wdith: 720px){
            font-size: var(--fontBig);
        }
    }

    p{
        font-size: var(--fontMed);
        @media screen and (max-width: 720px){
            font-size: var(--fontSmall);
        }
    }

    @media screen and (max-width: 720px){
        max-width: 100%;
    }
`;