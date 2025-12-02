import React from "react";
import Input from "../inputs/Input";

type InputFieldProps = {
  label: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
};

function InputField({ label, props }: InputFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor={label} className="text-sm">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <Input id={label} {...props} />
    </div>
  );
}

export default InputField;
