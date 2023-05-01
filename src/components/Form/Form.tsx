export const Form = ({children, ...props} : any) => {

  return (
    <form className="bg-gray-100/[.8] shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-2 flex justify-center items-center flex-col" {...props} noValidate>
      {children}
    </form>
  );
};
