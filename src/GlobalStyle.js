import { createGlobalStyle } from 'styled-components';

export const GlobalStyle =  createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --lightGreen: #21d07a;
        --lightYellow: #d2d531;
        --purple: #5500ff;
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


`;