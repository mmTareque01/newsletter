import { UIComponent } from "@/types/generateUI";
import Link from "next/link";

export const SignUpFormFields = [
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

export const SignUpTitle: UIComponent[] = [
  {
    component: "h1",
    className:
      "mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md",
    children: "Sign Up",
  },
  {
    component: "p",
    className: "text-sm text-gray-500",
    children: "Enter your information to sign up!",
  },
  //   { component: MyCustomComponent, title: 'Custom Component' }
];

export const SignUptoSignIn: UIComponent[] = [
  {
    component: "p",
    className: "text-sm font-normal text-center text-gray-700  sm:text-start",
    children: "Already have an account?",
  },
  {
    component: Link,
    className: "text-brand-500 hover:text-brand-600",
    children: "Sign in",
    href: "/signin",
  },
];

export const SignInFormFields = [
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

export const SignInTitle: UIComponent[] = [
  {
    component: "h1",
    className:
      "mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md",
    children: "Sign In",
  },
  {
    component: "p",
    className: "text-sm text-gray-500",
    children: "Enter your email and password to sign in!",
  },
  //   { component: MyCustomComponent, title: 'Custom Component' }
];

export const SignInToSignUp: UIComponent[] = [
  {
    component: "p",
    className: "text-sm font-normal text-center text-gray-700  sm:text-start",
    children: `Don't have an account?`,
  },
  {
    component: Link,
    className: "text-brand-500 hover:text-brand-600",
    children: "Sign Up",
    href: "/signup",
  },
];
