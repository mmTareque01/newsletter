"use client";
import Form from "@/components/form/Form";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";

const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter your first name",
    validation: { required: "First name is required" },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter your last name",
    validation: { required: "Last name is required" },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Enter a valid email",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    showPasswordToggle: true,
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    placeholder: "Confirm your password",
    showPasswordToggle: true,
    validation: {
      required: "Please confirm your password",
      validate: (value: string, formValues: any) =>
        value === formValues.password || "Passwords do not match",
    },
  },
];

export default function SignUpForm() {
  const handleSubmit = (data: Record<string, any>) => {
    // const loginData = {
    //   email: data.email as string,
    //   password: data.password as string,
    // };
    console.log(data);
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

              <Form fields={fields} onSubmit={handleSubmit} />

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700  sm:text-start">
                  Already have an account? {""}
                  <Link
                    href="/signin"
                    className="text-brand-500 hover:text-brand-600 "
                  >
                    Sign In
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
