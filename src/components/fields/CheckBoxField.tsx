import React from "react";
import CheckBox from "../inputs/CheckBox";

type CheckBoxFieldProps = {
  label: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
};

function CheckBoxField({ label, props }: CheckBoxFieldProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <CheckBox id={label} {...props} />
      <label htmlFor={label} className="text-sm">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
    </div>
  );
}

export default CheckBoxField;
