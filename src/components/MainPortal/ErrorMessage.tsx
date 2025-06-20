import { XMarkIcon } from "@heroicons/react/20/solid";

interface IProps {
  setError: (e: any) => void;
  children: any;
}

function ErrorMessage({ setError, children }: IProps) {
  return (
    <div className="w-full ">
      <div className="text-center md:absolute z-20 md:top-[98px] md:right-20 max-w-md pt-0 py-4 lg:px-4 space-x-4 rounded-lg">
        <div
          className="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span
            onClick={() => setError(null)}
            className="flex rounded-full bg-red-500 uppercase p2 text-xs font-bold mr-3"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-semibold mr-2 text-left flex-auto py-2">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
