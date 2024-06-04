import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useAuth = () => {
  const navigate = useNavigate();

  // Register
  const registerUser = (data) => {
    const url = "http://localhost:8080/users";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // login
  const loginUser = (data) => {
    const url = "http://localhost:8080/users/login";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response?.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Credenciales inválidas");
      });
  };

  return { registerUser, loginUser };
};

export default useAuth;
