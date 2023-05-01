export const PrimaryButton = ({ children, ...props }: any) => {

  return (
    <button className='w-full bg-blue-500 hover:text-gray-900 hover:bg-blue-600' type="submit"
      {...props}
    >
      {children}
    </button>
  );
};
