"use client";
import Form from "@/components/form/Form";
import GenerateUI from "@/components/GenerateUI";
import OrBorder from "@/components/OrBorder";
import SocialLogin from "@/components/SocialLogin";
import {
  SignInFormFields,
  SignInFormValues,
  SignInTitle,
  SignInToSignUp,
} from "@/constants/auth";
import { useApi } from "@/hooks/useAPI";
// import { redirect } from "next/navigation";

export default function SignInForm() {
  const { handleLogin } = useApi();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-[500px] bg-white  p-5 rounded-2xl  shadow-lg">
        {/* <GoBack/> */}
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <GenerateUI
              UIComponents={SignInTitle}
              wrapperComponent={"div"}
              wrapperClassName="mb-5 sm:mb-8"
            />
            <div>
              <SocialLogin />
              <OrBorder />

              <Form<SignInFormValues>
                fields={SignInFormFields}
                onSubmit={handleLogin}
                submitText="Sign In"
              />

              <GenerateUI
                UIComponents={SignInToSignUp}
                wrapperComponent={"div"}
                wrapperClassName="my-1 flex items-center justify-center gap-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
