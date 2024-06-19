import { userRequest } from "../../requestMethods";
import { requestCart, cartSuccess, cartError } from "./cartSlice";

export const cartfeatures =
  ({ data, type }) =>
  async (dispatch) => {
    console.log("From Thunk", userRequest);
    console.log("Type", typeof data._id);
    const newData = {
      userId: data.userId,
      products: [
        {
          productId: data._id,
          quantity: data.quantity,
        },
      ],
    };
    dispatch(requestCart());
    console.log("requset cart", newData);

    try {
      const response = await userRequest.post(`/cart/${type}`, newData);
      const newresponse = await userRequest.get(`/cart/single/${newData.userId}`);
      console.log("response", newresponse.data);
      dispatch(cartSuccess(newresponse.data));
      console.log("rsuccess", response);
    } catch (error) {
      dispatch(cartError(error.message));
      console.log("error", newData);
    }
  };
