import React from "react";
import { 
  FieldError, 
  UseFormRegister, 
  FieldValues, 
  Path, 
  RegisterOptions
} from "react-hook-form";
import Box from "../Box";
import Label from "../Label";
import Button from "../Button";
import { IoEyeOutline } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}

export interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  type?: "text" | "email" | "password" | "select" | "textarea" | "checkbox" | "number";
  label?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
  options?: Option[];
  component?: React.ElementType;
  validation?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  showPasswordToggle?: boolean;
}

export interface FormProps<T extends FieldValues> {
  fields: FieldProps<T>[];
  onSubmit: (data: T) => void;
  register?: UseFormRegister<T>;
  loading?: boolean;
  submitText?: string;
  className?: string;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function Form<T extends FieldValues = Record<string, string | string[] | boolean | number>>({
  fields,
  onSubmit,
  register,
  loading = false,
  submitText = "Submit",
  className = "",
  formRef,
}: FormProps<T>) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!register) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data: Record<string, string | string[] | boolean | number> = {};

      Array.from(formData.entries()).forEach(([name, value]) => {
        if (formData.getAll(name).length > 1) {
          data[name] = formData.getAll(name) as string[];
        } else {
          data[name] = value as string;
        }
      });

      onSubmit(data as T);
    }
  };

  const renderField = (field: FieldProps<T>) => {
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
            value="true"
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
             defaultValue={field.defaultValue as string | undefined}
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
        <div key={field.name as string} className="mb-4">
          {field.label && (
            <Label htmlFor={field.name as string}>
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