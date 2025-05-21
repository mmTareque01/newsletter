import React from "react";

import { FieldError, UseFormRegister } from "react-hook-form";
import Box from "../Box";
import Label from "../Label";
import Button from "../Button";
import { IoEyeOutline } from "react-icons/io5";



interface FieldProps {
  name: string;
  type?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | readonly string[]; // Removed boolean
  options?: { value: string; label: string }[];
  component?: React.ElementType;
  validation?: Record<string, any>;
  error?: FieldError;
  showPasswordToggle?: boolean;
}

interface FormProps {
  fields: FieldProps[];
  onSubmit: (data: Record<string, any>) => void;
  register?: UseFormRegister<any>;
  loading?: boolean;
  submitText?: string;
  className?: string;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function Form({
  fields,
  onSubmit,
  register,
  loading = false,
  submitText = "Submit",
  className = "",
  formRef,
}: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    // Handle both FormData and react-hook-form cases
    if (!register) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data: Record<string, any> = {};

      // Process all form elements
      Array.from(formData.entries()).forEach(([name, value]) => {
        // Handle checkboxes and multiple values
        if (formData.getAll(name).length > 1) {
          data[name] = formData.getAll(name);
        } else {
          data[name] = value;
        }
      });

      console.log("Form data:", data);
      onSubmit(data);
    }
  };

  // Enhanced field renderer with proper value handling
  const renderField = (field: FieldProps) => {
    const commonProps_x = {
      id: field.name,
      required: field.required,
      className: "w-full p-2 border rounded",
      placeholder: field.placeholder,
      ...(register
        ? register(field.name, field.validation)
        : {
            name: field.name,
            defaultValue: field.defaultValue,
          }),
    };

    const commonProps = {
      id: field.name,
      required: field.required,
      className: "w-full p-2 border rounded",
      placeholder: field.placeholder,
      ...(register
        ? register(field.name, field.validation)
        : {
            name: field.name,
          }),
    };

    switch (field.type) {
      case "select":
        return (
          <Box as="select" {...commonProps}>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Box>
        );

      //   case "textarea":
      //     return <Box as="textarea" rows={4} {...commonProps} />;

      case "textarea":
        return (
          <Box
            as="textarea"
            rows={4}
            {...commonProps}
            defaultValue={field.defaultValue as string | undefined}
          />
        );

      case "checkbox":
        return (
          <Box
            as="input"
            type="checkbox"
            {...commonProps}
            defaultChecked={Boolean(field.defaultValue)}
            value="true" // Important for FormData
            className="mr-2"
          />
        );

      case "password":
        return (
          <div className="relative">
            <Box
              as="input"
              type={field.showPasswordToggle ? "text" : "password"}
              {...commonProps}
            />
            {field.showPasswordToggle && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-900"
                onClick={() => {
                  /* Toggle logic */
                }}
              >
                <IoEyeOutline/>
              </button>
            )}
          </div>
        );

      default:
        return (
          <Box
            as={field.component || "input"}
            type={field.type || "text"}
            {...commonProps}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      ref={formRef}
    >
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          {field.label && (
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-error-500">*</span>}
            </Label>
          )}

          {renderField(field)}

          {field.error && (
            <p className="mt-1 text-sm text-error-500">{field.error.message}</p>
          )}
        </div>
      ))}

      <Button
        // type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Processing..." : submitText}
      </Button>
    </form>
  );
}
