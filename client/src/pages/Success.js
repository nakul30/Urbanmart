import { useLocation } from "react-router-dom";
import{ userRequest }from "../requestMethods";

function Success() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div>Success</div>
    </>
  );
}

export default Success;
