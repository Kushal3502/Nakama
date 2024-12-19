import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FormData, useAuth } from "@/context/userContext";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const { loading, signup } = useAuth();

  async function handleRegister(data: FormData) {
    const response = await signup(data);
    console.log(response);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-gray-800/80 p-8 rounded-xl shadow-2xl backdrop-blur-lg border border-gray-700/50 w-full max-w-md ">
        <div className="space-y-2 mb-8">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-center">
            Welcome back
          </h3>
          <p className="text-gray-400 text-center text-sm">
            Create new account
          </p>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300 font-medium">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              className="bg-gray-700/30 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <div className="text-red-400 text-sm">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-700/30 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-400 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Please wait...</span>
              </div>
            ) : (
              "Register"
            )}
          </Button>
          <p className="text-center text-gray-400 text-sm">
            Already have an account?
            <Link
              to="/auth/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
