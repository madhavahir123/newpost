import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../Store/Authslice";
import Logo from "../Components/Logo";
import Input from "../Components/Input";
import Button from "../Components/Button";
import authServies from "../Appwrite/auth";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const color = "#ffffff";

  const signup = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authServies.CreateAccount(data);

      if (userData) {
        const currentUser = await authServies.getCurrentUser();

        if (currentUser) {
          dispatch(login(currentUser));
          toast.success("Signup successful!");
          navigate("/");
        }
      }
    } catch (e) {
      if (e.message.includes("email")) {
        setError("Email already exists");
      } else {
        setError(e.message || "An error occurred, please try again.");
      }

      toast.warn(e.message);
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
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create an account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
              <div className="space-y-5">
                <Input
                  label="Name :"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-center">
                    {errors.name.message}
                  </p>
                )}
                <Input
                  label="Email :"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
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
                    required: "Password is required ",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-center">
                    {errors.password.message}
                  </p>
                )}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
