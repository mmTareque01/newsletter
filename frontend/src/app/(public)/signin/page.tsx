"use client";
import Form from "@/components/form/Form";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";

const loginFields = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    required: true,
    placeholder: "your@email.com",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    placeholder: "Enter your password",
    showPasswordToggle: true,
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
  },
];
export default function SignInForm() {
  const handleSubmit = (data: Record<string, any>) => {
    const loginData = {
      email: data.email as string,
      password: data.password as string,
    };
    console.log(loginData);
    // onLogin(loginData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-[500px] bg-white  p-5 rounded-2xl  shadow-lg">
        {/* <GoBack/> */}
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 ">
                Enter your email and password to sign in!
              </p>
            </div>
            <div>
              <SocialLogin />
              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 "></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="p-2 text-gray-400 bg-white  sm:px-5 sm:py-2">
                    Or
                  </span>
                </div>
              </div>

              <Form fields={loginFields} onSubmit={handleSubmit} />

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700  sm:text-start">
                  Don&apos;t have an account? {""}
                  <Link
                    href="/signup"
                    className="text-brand-500 hover:text-brand-600 "
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
