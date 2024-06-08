import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Box,IconButton,Avatar,Menu} from "@mui/material";


const Container = styled.div`
  height: 70px;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
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
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function Navbar() {
  const user = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
            {user.current ? (
              <Box>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    {...stringAvatar(
                      `${user.current.firstName} ${user.current.lastName}`
                    )}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Logout
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Sign Out
                  </Logout>
                </Menu>
              </Box>
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
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ color: "primary" }}
                />
              </Link>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
}

export default Navbar;
