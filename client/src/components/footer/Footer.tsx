import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const Footer = () => {
    return (
        <Container>
        <About>
        <h3>About</h3>
        <li>Repository</li>
        <li>Wiki</li>
        </About>
        <Since>2021 © CityRunnerVer2</Since>
        <Contact>
        <h3>Contact</h3>
        <li>BE-JaeWon</li>
        <li>BE-Seyun</li>
        <li>FE-JAEMiN</li>
        </Contact>
        </Container>
    )
}

const Container = styled.footer`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${theme.color.violet};
    color: white;
    height: 200px;
    width: 100%;
    margin-top: 30%;
    margin-bottom: 0px;
`;

const About = styled.ul`
    margin-left: 400px;
    li{
        cursor: pointer;
        padding-bottom: 0.5rem;
        :hover{
            color: ${theme.color.placeholder};
            transition: 0.3s;
        }
    }
`;

const Since = styled.ul`
    font-size: 0.7rem;
    margin-top: 12rem;
`;

const Contact = styled.ul`
    margin-right: 400px;
    li{
        cursor: pointer;
        padding-bottom: 0.5rem;
        :hover{
            color:${theme.color.placeholder};
            transition: 0.3s;
        }
    }
`;

export default Footer;