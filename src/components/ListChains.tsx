import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import supportedChains from '../config/chains';
import { INetwork } from '../config/types'; 

interface ListChainProps {
    chain: INetwork
    toggleChain: (val: number) => void
    tokenKey?: string;
    chainList: any[]
}

function ListChains({ chain, tokenKey, toggleChain, chainList }: ListChainProps) {

    return (
        <Combobox value={chain} onChange={(e: INetwork) => toggleChain(Number(e.chainId))}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md sm:text-sm">
                    <Combobox.Button className="flex relative w-full cursor-default rounded-lg py-1 px-4 text-left shadow-md sm:text-sm bg-dark">
                        <img src={`/chains/${chain.chainId}.png`} alt="asset" className="h-6 w-6 mt-2 flex-shrink-0 rounded-full" />

                        <Combobox.Input
                            className="w-full border-none py-3 pr-10 text-sm font-bold leading-5 text-gray-300 bg-dark focus:ring-0"
                            displayValue={(chain: INetwork) => chain.name}
                            onChange={(event) => { }}
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
                    afterLeave={() => { }}
                >
                    <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {chainList.map((chainId: any, index) => (
                            <Combobox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-dark text-gray-300' : 'text-gray-300'
                                    }`
                                }
                                value={supportedChains[Number(chainId)]}
                            >
                                {({ selected, active }) => (
                                    <div className="flex items-center">
                                        <img src={`/chains/${chainId}.png`} alt="asset" className="h-6 w-6 mr-2 flex-shrink-0 rounded-full" />

                                        <span
                                            className={`block truncate ${selected ? 'font-bold' : 'font-bold'
                                                }`}
                                        >
                                            {supportedChains[Number(chainId)].name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute bg-dark inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-gray-300' : 'text-stone-500'
                                                    }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </div>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}

export default ListChains;
