import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServies from "./Appwrite/auth";
import { login, logout } from "./Store/Authslice";
import { Footer, Header } from "./Components/Index";
import { Outlet } from "react-router-dom";

function App() {
  const [loding, setLoding] = useState(true);
  const dispacth = useDispatch();

  useEffect(() => {
    authServies
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispacth(login(userdata));
        } else {
          dispacth(logout());
        }
      })
      .finally(() => setLoding(false));
  }, []);

  return !loding ? (
    <div
      className=" flex flex-wrap
     bg-white"
    >
      <div className="w-full block">
        <Header />
        <main>
          {" "}
          <Outlet />{" "}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <h3>Loding....</h3>
  );
}

export default App;
