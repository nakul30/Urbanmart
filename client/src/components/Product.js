import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart,faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Container = styled.div`
  flex: 1 0 21%;
  margin: 5px;
  min-width: 300px;
  max-width: 380px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
`;
const Image = styled.img`
  height: 75%;
  width: 100%;
  object-fit: contain;
  z-index: 2;
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: white;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

function Products({item}) {
  // console.log(item)
  return (
    <>
      {/* <div>Products</div> */}
      <Container>
      <Circle />
      <Image src={item.img } />
      <Info>
        
        <Icon>
        <Link to={''}>
          <FontAwesomeIcon icon={faShoppingCart}/>
        </Link>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </Icon>
        <Icon>
          <FontAwesomeIcon icon={faHeart} />
        </Icon>
      </Info>
    </Container>
    </>
  );
}

export default Products;
