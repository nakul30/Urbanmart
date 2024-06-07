import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user.current?<Navigate to="/"/>:<Login />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
