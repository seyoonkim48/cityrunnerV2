import React from 'react';
import styled from 'styled-components';
import { Container, Title, InputContainer, SubmitContainer } from './SignUp';



const SignIn = () => {
    return (
        <SignInContainer>
        <SignInTitle>로그인</SignInTitle>
        <SignInputContainer>
        <h5>이메일 주소</h5>
        <input name="email" type="email" placeholder="예) kimRunner@CityRunner.com"></input>
        <h5>비밀번호</h5>
        <input name="password" type="password" placeholder="비밀번호를 입력해주세요."></input>
        </SignInputContainer>
        <SignInSubmit>
        <button>로그인</button>
        </SignInSubmit>
        </SignInContainer>
    )
};
const SignInContainer = styled(Container)``;

const SignInTitle = styled(Title)``;

const SignInputContainer = styled(InputContainer)``;

const SignInSubmit = styled(SubmitContainer)``;



export default SignIn;