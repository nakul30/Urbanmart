import Home from "./pages/Home";
import Login from "./pages/Login";
import Succcess from "./pages/Success";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Address from "./pages/Address";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user.current?<Navigate to="/"/>:<Login />}/>
        <Route path="/register" element={user.current ? <Navigate to="/" /> : <Register />} />
        <Route path="/success" element={<Succcess />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
