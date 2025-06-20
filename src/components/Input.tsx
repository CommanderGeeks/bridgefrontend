function Input({ ...rest }: any) {
  return (
    <input
      {...rest}
      className="block py-3 w-full shadow-lg rounded-lg bg-dark border-0 text-white font-medium sm:text-sm"
    />
  );
}

export default Input;
