type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ ...props }: InputProps) {
  return (
    <input
      className="shadow-xs flex h-10 w-full rounded-lg border border-gray-200 bg-white p-2 text-base text-gray-900 placeholder:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
      {...props}
    />
  );
}

export default Input;
