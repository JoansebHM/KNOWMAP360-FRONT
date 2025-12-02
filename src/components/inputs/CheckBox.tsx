type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

function CheckBox({ ...props }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      {...props}
    />
  );
}

export default CheckBox;
