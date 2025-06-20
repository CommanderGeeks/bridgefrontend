function AlertBox({ children }: any) {
  return (
  
    <div
    id="toast-simple"
    className="mt-4 flex items-center w-full max-w-md p-4 mb-4 space-x-4 text-gray-600 divide-x divide-gray-500 rounded-lg dark:text-gray-500 "
    role="alert"
  >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="pl-4 text-sm font-500">{children}</div>
      </div>

  );
}

export default AlertBox;
