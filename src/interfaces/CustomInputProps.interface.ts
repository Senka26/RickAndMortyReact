export interface CustomInputProps {
  type?: string;
  name: string;
  rules: {
    required?: boolean;
    message: string;
    pattern?: RegExp;
  }[];
  prefix?: JSX.Element;
  placeholder: string;
  value: string | null;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}