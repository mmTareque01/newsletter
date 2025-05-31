"use client";
import Form from "@/components/form/Form";
import GenerateUI from "@/components/GenerateUI";
import OrBorder from "@/components/OrBorder";
import SocialLogin from "@/components/SocialLogin";
import {
  SignUpFormFields,
  SignUpTitle,
  SignUptoSignIn,
} from "@/constants/auth";
import { useAuthApi } from "@/hooks/callAPI.tsx/useAuthAPI";

export default function RegisterForm() {
  const { handleRegister } = useAuthApi();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-[500px] bg-white  p-5 rounded-2xl  shadow-lg">
        {/* <GoBack/> */}
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <GenerateUI
              UIComponents={SignUpTitle}
              wrapperComponent={"div"}
              wrapperClassName="mb-5 sm:mb-8"
            />
            <div>
              <SocialLogin />
              <OrBorder />

              <Form
                fields={SignUpFormFields}
                onSubmit={handleRegister}
                submitText="Sign Up"
              />

              <GenerateUI
                UIComponents={SignUptoSignIn}
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
