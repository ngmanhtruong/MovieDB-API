import { createGlobalStyle } from 'styled-components';

export const GlobalStyle =  createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --silver: #CCCCCC;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --lightGreen: #21d07a;
        --lightYellow: #d2d531;
        --purple: #FF00FF;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }
    ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-track{
        background-color: #1c1c1c;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 20px;
        border: solid #1c1c1c;
        background-color: #aaa;
    }

    ::-webkit-scrollbar-thumb:hover{
        background-color: #717171;
    }

    * {
        box-sizing: border-box;
        font-family: 'Poppins', san-serif;
    }

    body {
        margin: 0;
        padding: 0;
        padding-top: 70px;
        background-color: var(--darkGrey);
        h1{
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
        }

        h3{
            font-size: 1.1rem;
            font-weight: 600;
        }

        p{
            font-size: 1rem;
            color: var(--white);
        }
        @media screen and (max-width: 550px){
            padding-top: 70px;
        }
    }

    .isPC{
        @media screen and (max-width: 768px){
            display: none;
        }
    }
    .isMobile{
        display: none !important;
        @media screen and (max-width: 768px){
            display: block !important;
        }
    }
    svg{
        padding-left: 5px;
    }
    .css-6hp17o-MuiList-root-MuiMenu-list li{
        font-size: var(--fontMed);
        font-weight: 400;
        color: var(--darkGrey);
    }
    .css-6hp17o-MuiList-root-MuiMenu-list li a{
        text-decoration: none;
        font-size: var(--fontMed);
        font-weight: 400;
        color: var(--darkGrey);
    }
    .modal-video{
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.5);
        
        iframe{
            width: 80%;
            height: 80%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .modal-video-close-btn{
            display: none;
        }
        .modal-video-body, .modal-video-inner, .modal-video-movie-wrap{
            padding-left: 0px;
        }
    }
    h1.text-center{
        padding: 0 20px;
        padding-top: 20px;
        color: var(--purple);
    }
    .something-wrong{
        padding: 50px 20px;
        text-align: center;
        p{
            font-size: var(--fontBig);
            font-weight: 600;
        }
        a{
            font-size: var(--fontBig);
            text-decoration: none;
            color: var(--purple);
            transition: all ease .3s;
            &:hover{
                color: var(--medGrey);
            }
        }
    }
`;