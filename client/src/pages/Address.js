import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
// import Razorpay from "react-razorpay";
import { userRequest } from "../requestMethods";
import { currency } from "../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const RAZOR_KEY = process.env.REACT_APP_RAZOR;
const RAZOR_SECRET = process.env.REACT_APP_RAZOR_SECRET;

const Container = styled.div``;
const Nav = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    height: "50px",
  })}
`;
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({
    fontSize: "24px",
  })}
`;
const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #f7fcf9;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: black;
  margin: 20px 0;
`;
const FormInput = styled.input`
  flex: 1;
  width: 50%;
  height: 20px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: none;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
`;
const FormContainer = styled.div`
  width: 40vw;
  max-height: 80vh;
  background-color: #2a2e2b;
  ${mobile({
    width: "80vw",
  })}
`;
const Button = styled.button`
  min-width: 30%;
  max-width: 60%;
  padding: 15px 20px;
  border: none;
  color: white;
  background-color: #2f6b70;
  cursor: pointer;
  margin: 10px 0;
`;

function Address() {
  console.log(window)
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log("user from cart page ",user.current._id);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const order = useRef();
  // const Razorpay = useRazorpay();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("Form Data", formData);
    e.preventDefault();
    handlePayment();
  };

  const handlePayment = async () => {
    const createOrder = async () => {
      try {
        const respRazor = await userRequest.post("/checkout/order", {
          amount: cart.totalPrice * 100,
        });
        return respRazor.data;
        // {-----------------Response-----------------}
        //   "id": "order_HmtYjJks02nUpz", // this is orde id 
        //   "entity": "order",
        //   "amount": 5000,
        //   "amount_paid": 0,
        //   "amount_due": 5000,
        //   "currency": "INR",
        //   "receipt": null,
        //   "offer_id": null,
        //   "status": "created",
        //   "attempts": 0,
        //   "notes": [],
        //   "created_at": 1627381738
        // }
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    order.current = await createOrder();

    const options = {
      key: RAZOR_KEY,
      amount: cart.totalPrice * 100,
      currency,
      name: "Urbanmart Shopping",
      description: `Your total amount is ₹ ${cart.totalPrice}`,
      image: "/logo.png",
      order_id: order.current.id,
      handler: async (res) => {
        try {
          const resp = await userRequest.post("/checkout/payment", {
            paymentId: res.razorpay_payment_id,
            orderId: res.razorpay_order_id,
            signature: res.razorpay_signature,
            amount: cart.totalPrice * 100,
          });
          await userRequest.post("/order", {
            userId: user.current._id,
            razorOrderId: order.current.id,
            razorPaymentId: res.razorpay_payment_id,
            products: cart.products.map((prod) => ({
              productId: prod._id,
              quantity: prod.quantity,
            })),
            amount: cart.totalPrice,
            address: formData,
          });
          await userRequest.delete(`/cart/${user.current._id}`);
          navigate("/success", { state: { data: resp.data } });
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new window.Razorpay(options);
    rzpay.open();
  };

  return (
    <>
      {/* <div>Address</div> */}
      <Container>
        <Nav>
          <Logo>Urbanmart</Logo>
        </Nav>
        <Wrapper>
          <Title>Select Address</Title>
          <FormContainer>
            <Form>
              <FormInput
                name="address1"
                type="text"
                placeholder="Address Line 1"
                onChange={handleChange}
                value={formData.address1}
                required
              />
              <FormInput
                name="address2"
                type="text"
                placeholder="Address Line 2"
                onChange={handleChange}
                value={formData.address2}
              />
              <FormInput
                name="city"
                type="text"
                placeholder="City"
                onChange={handleChange}
                value={formData.city}
                required
              />
              <FormInput
                name="state"
                type="text"
                placeholder="State"
                onChange={handleChange}
                value={formData.state}
                required
              />
              <FormInput
                name="pincode"
                type="text"
                placeholder="Pin"
                onChange={handleChange}
                value={formData.pincode}
                required
              />
              <Button onClick={handleSubmit}>PLACE ORDER</Button>
            </Form>
          </FormContainer>
        </Wrapper>
      </Container>
    </>
  );
}

export default Address;
