import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FlexColum } from '../theme/flex';
import { theme } from '../theme/theme';
import workingout from '../utils/landingImage/workingout.svg'


const LandingPage = () => {
const history = useHistory()
    return (
        <>
        <Intro>
        <img src={workingout} alt=""></img>
        <TextContainer>
        <h1>나만의 런닝크루와<br/>함께 달려 보세요!</h1>
        <h3>오늘하루 같이 달릴 사람을 찾고 있다면 <br/><br/> 가벼운 마음으로 참가하고 싶은 런닝크루를 찾고있다면 </h3>
        <button onClick={()=>history.push('/matching')}>시작하기</button>
        </TextContainer>
        </Intro>
        </>
    )
}

const Intro = styled.div`
display: flex;
padding-top: 10rem;
padding-left: 8rem;
    img{
        width: 50%;
    }
    h1{
        font-size: 55px;
        padding-left: 5rem;
    }
`;

const TextContainer = styled.div`
    ${FlexColum}
    h3{
        margin-left: 6rem;
    }
    button{
        background-color: ${theme.color.violet};
        border-radius: 14px;
        width: 300px;
        height: 50px;
        font-size: 20px;
        margin-left: 6rem;
        margin-top: 2rem;
        font-weight: bolder;
        color: white;
        :hover{
            transition: 0.3s;
            color: black;
        } 
    }
`;

export default LandingPage;
