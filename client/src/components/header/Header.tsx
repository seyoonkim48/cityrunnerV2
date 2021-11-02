import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FlexEvenly } from '../../theme/flex';


const Header = () => {
const history = useHistory();


    return (
        <Container>
        <LeftContainer>
         <Item onClick={()=> history.push('/')}>CityRunner</Item>
        </LeftContainer>
         <RightContainer>
        <Item onClick={()=> history.push('/matchin')}>매칭페이지</Item>
        <Item onClick={()=> history.push('/community')}>커뮤니티</Item>
        <Item onClick={()=> history.push('/signin')}>로그인</Item>
        <Item onClick={()=> history.push('/signup')}>회원가입</Item>
         </RightContainer>
        </Container>
    )
}

const Container = styled.header`
    border-bottom: solid 1px #e9ecef;
    ${FlexEvenly}
    position: sticky;
    width: 100vw;
    height: 80px;
    font-weight: 650;
`;

const RightContainer = styled.section`
`;

const Item = styled.span`
    cursor: pointer;
    margin-right: 5rem;
`;

const LeftContainer = styled.section`
    margin-right: 4rem;
`;



export default Header;