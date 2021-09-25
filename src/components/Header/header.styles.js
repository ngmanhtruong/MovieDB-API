import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
    position: fixed;
    top: 0;
    width: 100%;
    transition: top 0.3s;
    z-index: 999;
    border-shad
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto;
    color: var(--purple);
    position: relative;
    a{
        color: var(--white);
        text-shadow: 5px 5px 8px var(--purple);
        text-decoration: none;
        font-weight: 600;
    }

`;

export const LogoImg = styled.img`
    width: 200px;

    @media screen and (max-width: 768px){
        width: 150px
    }
    @media screen and (max-width: 550px){
        width: 100px;
    }
`;

export const UL = styled.ul`
    max-width: var(--maxWidth);
    max-height: 100vh;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 98;
    width: 100%;
    li{
        z-index: 98;
        padding: 10px 20px;
        padding-left: 60px;
        position: relative;
        a{
            font-size: var(--fontMed);
            text-decoration: none;
            color: var(--darkGrey);
            display: flex;
            justify-content: space-between;
            img{
                position: absolute;
                left: 10px;
                top: 2px;
                height: 40px;
                width: 40px;
                object-fit: cover;
            }
            p{
                color: var(--darkGrey);
                margin-bottom: 0;
                &.name{
                    text-transform: capitalize;
                }
                &.media-type{
                    text-transform: uppercase;
                }
            }
        }
    }
`;

export const Spinner = styled.div`
    border: 5px solid var(--lightGrey);
    border-top: 5px solid var(--medGrey);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;

    @keyframes spin{
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }

`;
