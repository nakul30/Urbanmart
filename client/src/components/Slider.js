import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    display: "none",
  })}
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(195, 201, 200, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  ${(props) => props.direction}:10px;
  cursor: pointer;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.index * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.bg};
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  margin: 2% 0 0 8%;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
function IndSlide({ bg, title, desc, img }) {
  return (
    <Slide bg={bg}>
      <ImageContainer>
        <Image src={img} />
      </ImageContainer>
      <InfoContainer>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <Link to={"/products/"}>
          <Button>SHOW NOW</Button>
        </Link>
      </InfoContainer>
    </Slide>
  );
}

function Slider() {
  const [index, setIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setIndex(index > 0 ? index - 1 : 2);
    } else {
      setIndex(index < 2 ? index + 1 : 0);
    }
  };
  return (
    <>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </Arrow>
        <Wrapper index={index}>
          {sliderItems.map((item, i) => (
            <IndSlide
              key={i}
              bg={item.bg}
              title={item.title}
              desc={item.desc}
              img={item.img}
            />
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </Arrow>
      </Container>
    </>
  );
}

export default Slider;
