import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login as authLogin } from "../Store/Authslice";

import { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Logo from "../Components/Logo";
import authServies from "../Appwrite/auth";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const color = "#000000";

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authServies.Login(data);

      if (session) {
        const userdata = await authServies.getCurrentUser();

        if (userdata) {
          dispatch(authLogin(userdata));
          const notify = () => toast.success("Login  success fully !");
          navigate("/");
          notify();
        }
      }
    } catch (e) {
      setError(e.message);
      console.log("login", e.message);

      const notify = () => toast.warn(e.message);
      notify();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-8">
        {loading && (
          <ClipLoader
            color={color}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <div className="flex items-center justify-center w-full">
          <div className="mx-auto w-full  max-w-lg bg-gray-100  rounded-xl  p-10 border  border-black/10">
            <div className=" mb-2 flex justify-center ">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sing in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account ?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>{" "}
            </p>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className="space-y-5">
                <Input
                  label="Email :"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    validate: {
                      matchPattern: (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-center">
                    {errors.email.message}
                  </p>
                )}
                <Input
                  label="Password :"
                  placeholder="Enter your Password"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-center">
                    {errors.password.message}
                  </p>
                )}
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
