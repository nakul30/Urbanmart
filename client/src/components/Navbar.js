import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch ,fabadge,faShoppingCart, prefix, faMarsAndVenus, faHamburger, faHammer} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { UNSAFE_ErrorResponseImpl } from "react-router-dom";
// import { Search, ShoppingCartOutlined } from '@mui/icons-material';
// import { Badge, Avatar, Box, IconButton, Menu } from '@mui/material';

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    padding: "10px 0",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({
    textAlign: "right",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & a {
    text-decoration: none;
    color: inherit;
  }
  ${mobile({
    justifyContent: "center",
    flex: 2,
  })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ${mobile({
    width: "50px",
  })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({
    fontSize: "24px",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;

const Logout = styled.div`
  cursor: pointer;
  padding: 5px 10px;
`;

function Navbar() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {/* <div>Navbar</div> */}
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "gray", fontSize: "16px" }}
              />
            </SearchContainer>
          </Left>
          <Center>
            <Logo>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Urbanmart
              </Link>
            </Logo>
          </Center>
          <Right>
            {user ? (
              <>
                <>
                <Logout
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >
                  Sign Out
                </Logout>
                </>
              </>
            ) : (
              <>
                <Link to="/register">
                  <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
              </>
            )}
            <MenuItem>
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: "primary" }} />
            </Link>
          </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
}

export default Navbar;
