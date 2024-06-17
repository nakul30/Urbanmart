// state/user/userThunks.js

import { publicRequest } from "../../requestMethods";
import { requestAuth, authSuccess, authError } from "./userSlice";

export const authenticate =
  ({ data, type }) =>
  async (dispatch) => {
    dispatch(requestAuth());
    console.log("reqyes auth", data);
    try {
      const response = await publicRequest.post(`/auth/${type}`, data);
      console.log("response", response.data.accessToken);
      dispatch(authSuccess(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log("rsuccess", response);
    } catch (error) {
      dispatch(authError(error.message));
      console.log("error", data);
    }
  };
// export const authenticate = createAsyncThunk(
//   'user/authenticate',
//   async ({ data, type }, { rejectWithValue }) => {
//     console.log("data",data);
//     console.log("type",type);
//     try {
//       const response = await publicRequest.post(`/auth/${type}`, data);
//       console.log("response",response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
//  BEHAVE AS AACTION CREATORS
// import { publicRequest } from '../requestMethods';

// const authenticate = async (dispatch, data, type) => {
//   dispatch({ type: 'REQUEST_AUTH' });
//   try {
//     const resp = await publicRequest.post(`/auth/${type}`, data);
//     dispatch({ type: 'AUTH_SUCCESS', payload: resp.data });
//   } catch (err) {
//     dispatch({ type: 'AUTH_ERROR', payload: err.message });
//   }
// };

// export default authenticate;
