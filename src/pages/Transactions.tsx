function Transactions() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border shadow">
      <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
        <thead className="hidden border-b lg:table-header-group">
          <tr className="">
            <td
              width="50%"
              className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
            >
              Invoice
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Date
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Amount
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Status
            </td>
          </tr>
        </thead>

        <tbody className="lg:border-gray-300">
          <tr className="">
            <td
              width="50%"
              className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
            >
              Standard Plan - Feb 2022
              <div className="mt-1 lg:hidden">
                <p className="font-normal text-gray-500">07 February, 2022</p>
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              07 February, 2022
            </td>

            <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $59.00
              <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                Complete
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                Complete
              </div>
            </td>
          </tr>

          <tr className="">
            <td
              width="50%"
              className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
            >
              Standard Plan - Jan 2022
              <div className="mt-1 lg:hidden">
                <p className="font-normal text-gray-500">09 January, 2022</p>
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              09 January, 2022
            </td>

            <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $59.00
              <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-red-200 py-1 px-2 text-left font-medium text-red-500 lg:hidden">
                Canceled
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              <div className="inline-flex items-center rounded-full bg-red-200 py-1 px-2 text-red-500">
                Canceled
              </div>
            </td>
          </tr>

          <tr className="">
            <td
              width="50%"
              className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
            >
              Basic Plan - Dec 2021
              <div className="mt-1 lg:hidden">
                <p className="font-normal text-gray-500">15 December, 2021</p>
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              15 December, 2021
            </td>

            <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $29.00
              <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                Complete
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                Complete
              </div>
            </td>
          </tr>

          <tr className="">
            <td
              width="50%"
              className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
            >
              Basic Plan - Nov 2021
              <div className="mt-1 lg:hidden">
                <p className="font-normal text-gray-500">14 November, 2021</p>
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              14 November, 2021
            </td>

            <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $29.00
              <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-200 py-1 px-2 text-left font-medium text-blue-500 lg:hidden">
                Pending
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              <div className="inline-flex items-center rounded-full bg-blue-200 py-1 px-2 text-blue-500">
                Pending
              </div>
            </td>
          </tr>

          <tr className="">
            <td
              width="50%"
              className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
            >
              Basic Plan - Oct 2021
              <div className="mt-1 lg:hidden">
                <p className="font-normal text-gray-500">15 October, 2021</p>
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              15 October, 2021
            </td>

            <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $29.00
              <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                Complete
              </div>
            </td>

            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
              <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                Complete
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
