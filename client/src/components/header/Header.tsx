import React from 'react';
import styled from 'styled-components';


const Header = () => {
    return (
        <Container>
            헤더입니다.
        </Container>
    )
}

const Container = styled.header`
    border-bottom: solid 1px;
`;

export default Header;