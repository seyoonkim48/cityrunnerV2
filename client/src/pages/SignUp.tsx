import { AxiosResponse } from 'axios';
import React from 'react';
import styled from 'styled-components';
import { FlexColum } from '../theme/flex';
import { theme } from '../theme/theme';

const SignUp = () => {
const responseBody = (response: AxiosResponse) => response.data

    return (
        <Container>
            <Title>회원가입</Title>
            <InputContainer>
            <h5>이메일 주소*</h5>
            <input name="email" type="email" placeholder="예) kimRunner@CityRunner.com" />
            <h5>닉네임*</h5>
            <input name="nickname" type="nickname" placeholder="닉네임을 입력해주세요." />
            <h5>비밀번호*</h5>
            <input name="password" type="password" placeholder="비밀번호를 입력해주세요." />
            </InputContainer>
            <SubmitContainer>
            <button>가입하기</button>
            </SubmitContainer>
        </Container>
    )
}

export const Container = styled.div`
    ${FlexColum}
    margin-top: 6rem;
`;

export const Title = styled.h1`
    font-size: 35px;
    margin-bottom: 3rem;
`;

export const InputContainer = styled.div`
    ${FlexColum}
    input{
        border-bottom: solid 1px ${theme.color.placeholder};
        height: 3rem;
        width: 350px;
    ::placeholder{
        color: ${theme.color.placeholder}
        }
    }
    h5 {
        margin-right: 18rem;
        margin-bottom: 0rem;
        }
`;

export const SubmitContainer = styled.div`
    margin-top: 4rem;
    button{
        width: 350px;
        height: 3rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        background-color: ${theme.color.violet};
    :hover{
        color: black;
        background-color: ${theme.color.violet};
        transition: 0.35s;
        }
    }
`;

export default SignUp;