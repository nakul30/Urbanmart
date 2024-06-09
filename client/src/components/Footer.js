import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { mobile } from '../responsive'
import { faEnvelope, faPhoneFlip, faShop } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons'
const Container = styled.div`
  display: flex;
  ${mobile({
    flexDirection: 'column',
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    display: 'none',
  })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    backgroundColor: '#fff8f8',
  })}
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  height: 15%;
  width: 80%;
`;
function Footer() {
  return (
    <>
    {/* <div>Footer</div> */}
    <Container>
      <Left>
        <Logo>Urbanmart</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolores nam, eum fugit sunt
          magnam exercitationem sint praesentium. Ut ipsum reprehenderit voluptas dolores sapiente,
          pariatur inventore natus minima fugit voluptates.
        </Description>
        <SocialContainer>
          <SocialIcon color="#3b5999">
            <FontAwesomeIcon icon={faFacebook} />
          </SocialIcon>
          <SocialIcon color="#E4405F">
            <FontAwesomeIcon icon={faInstagram} />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <FontAwesomeIcon icon={faTwitter} />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms & Cond.</ListItem>
          <ListItem>Privacy & Policy</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contacts</Title>
        <ContactItem>
          <FontAwesomeIcon icon={faShop} /> &nbsp;ABC City, ABC State, ABC Country
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faPhoneFlip} /> &nbsp;+XX XXXXXXXXXX
        </ContactItem>
        <ContactItem>
          < FontAwesomeIcon icon={faEnvelope}/> &nbsp;contact@urbanmart.com
        </ContactItem>
        {/* <Payment src="." /> */}
        <SocialContainer>
          <SocialIcon color='black'>
            <FontAwesomeIcon icon={faCcVisa} />
          </SocialIcon>
          <SocialIcon color="black">
            <FontAwesomeIcon icon={faCcMastercard} />
          </SocialIcon>
          <SocialIcon color="black">
            <FontAwesomeIcon icon={faCcAmex} />
          </SocialIcon>
          <SocialIcon color="black">
            <FontAwesomeIcon icon={faCcDiscover} />
          </SocialIcon>
        </SocialContainer>
      </Right>
    </Container>
    </>
    
  )
}

export default Footer