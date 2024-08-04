import React from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest,userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { cartfeatures } from "../state/cart/cartThunk";


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    flexDirection: "column",
    padding: "10px",
  })}
`;
const ImageContainer = styled.div`
  flex: 1;
  ${mobile({
    textAlign: "center",
  })}
`;
const Image = styled.img`
  width: 90%;
  height: 80vh;
  object-fit: contain;
  ${mobile({
    height: "40vh",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({
    padding: "10px",
  })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0 15px;
  ${mobile({
    width: "100%",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: 0.5px solid lightgray;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  ${mobile({
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-bottom: 15px;
  ${mobile({
    margin: 0,
  })}
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #b8f2e3;
  }
`;

function Product() {
  const location = useLocation();
  const [resposnsing , setResposnsing] = useState({});
  const userId =  useSelector(state=>state.user.current._id);
  // console.log(typeouserId, "userId")
  const id = location.pathname.split("/").at(-1);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  // console.log("cart Before ",cart)
  useEffect(() => {

    const getProduct = async () => {
      try {
        const resp = await publicRequest.get(`/product/single/${id}`);
        setProduct(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  const handleClick = () => {
    // console.log("Product",product);
      dispatch(
        cartfeatures({
          data: { ...product, userId, quantity, color, size },
          type: "",
        })
      );
  };
  // cart = useSelector(state=>state.cart);
  // console.log( "cart After ",cart)
  return (
    <>
      {/* <div>Product</div> */}
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImageContainer>
            <Image src={product.img} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Description>{product.desc}</Description>
            <Price>₹ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((col) => (
                  <FilterColor
                    color={col.toLowerCase()}
                    key={col}
                    onClick={() => setColor(col)}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((sz) => (
                    <FilterSizeOption>{sz}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  sx={{ cursor: "pointer" }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ cursor: "pointer" }}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
}

export default Product;
