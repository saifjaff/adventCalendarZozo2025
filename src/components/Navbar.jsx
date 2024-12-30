import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  color: white;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  color: white;
  text-decoration: none;
  text-align: center;
  
  h1 {
    margin: 0;
    font-size: 1.8rem;
  }
  
  &:hover {
    color: #ddd;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <Title to="/">
          <h1>ZOYA'S ADVENT CALENDAR</h1>
        </Title>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 