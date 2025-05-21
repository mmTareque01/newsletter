// types/form.ts
export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'checkbox' 
  | 'submit';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | boolean;
  options?: {
    label: string;
    value: string;
  }[];
}

export interface FormConfig {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  className?: string;
}