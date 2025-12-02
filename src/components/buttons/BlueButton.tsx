type BlueButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function BlueButton({ ...props }: BlueButtonProps) {
  return (
    <button
      className="text-sm w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300"
      {...props}
    />
  );
}

export default BlueButton;
