import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext, useMemo, useState } from "react";
import { StateContext } from "../context/state";
import { IToken } from "../config/types";
import { getChainTokens } from "../utils/tokenHelpers";

interface ListAssetsProps {
  token: IToken;
  chainId: number;
}

function ListAssets({ token, chainId }: ListAssetsProps) {
  const { setTokenKey } = useContext(StateContext);
  const [query, setQuery] = useState("");

  const tokens = useMemo(() => getChainTokens(chainId), [chainId]);
  const filteredTokens = useMemo(() => {
    return query === ""
      ? tokens
      : tokens.filter((token) =>
          token.symbol
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  }, [tokens, query]);

  return (
    <div className="w-full z-20 bg-dark rounded-lg">
      <Combobox value={token} onChange={(e) => setTokenKey(e.key)}>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md sm:text-sm">
          <Combobox.Button className="flex relative w-full cursor-default rounded-lg py-1 pl-3 text-left  sm:text-sm">
            <img
              src={`/assets/${token.symbol.toLowerCase()}.png`}
              alt="asset"
              className="h-6 w-6 mt-2 flex-shrink-0 rounded-full"
            />
            <Combobox.Input
              className="w-full border-none pl-3 pr-10 text-sm font-medium leading-5 text-white bg-dark focus:ring-0"
              displayValue={(token: IToken) => token.symbol}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 bg-black-200">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-500 bg-black-200"
                aria-hidden="true"
              />
            </span>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-auto pr-4 overflow-auto rounded-md bg-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTokens.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 font-medium text-gray-500">
                Nothing found.
              </div>
            ) : (
              filteredTokens.map((cToken: IToken, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-dark text-white" : "text-white"
                    }`
                  }
                  value={cToken}
                >
                  {({ selected, active }) => (
                    <div className="flex items-center">
                      <img
                        src={`/assets/${cToken.symbol.toLowerCase()}.png`}
                        alt="asset"
                        className="h-6 w-6 flex-shrink-0 rounded-full mr-2"
                      />
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {cToken.symbol}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute bg-dark inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-stone-500"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}

export default ListAssets;
