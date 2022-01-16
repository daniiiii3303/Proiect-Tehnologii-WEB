import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = (props) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return <div>Home page</div>;
};

export default Homepage;
