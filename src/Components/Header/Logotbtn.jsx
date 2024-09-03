import { useDispatch } from "react-redux";
import { logout } from "../../Store/Authslice";
import authServies from "../../Appwrite/auth";
import { useNavigate } from "react-router-dom";

function Logotbtn() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const logouthandler = () => {
    authServies.logout().then(() => {
      dispacth(logout());
      navigate("/Login");
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default Logotbtn;
