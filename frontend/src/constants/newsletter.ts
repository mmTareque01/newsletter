import { FieldProps } from "@/components/form/Form";
import { NewsletterType } from "@/types/newsletter";

export const NewsletterTypeFields: FieldProps<NewsletterType>[] = [
  {
    name: "title",
    type: "text",
    label: "Newsletter Name",
    required: true,
    placeholder: "Technology",
    validation: {
      required: "Title is required",
    //   pattern: {
    //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //     message: "Invalid email address",
    //   },
    },
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    // required: true,
    placeholder: "Enter description",
    // showPasswordToggle: true,
    // validation: {
    //   required: "Password is required",
    //   minLength: {
    //     value: 8,
    //     message: "Password must be at least 8 characters",
    //   },
    // },
  },
];