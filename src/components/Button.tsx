function Button({ onClick, children }: any) {
    return (
        <button
            type="button"
            className="w-full mx-auto block px-4 py-3 mt-8 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-stone-600 hover:bg-stone-700"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
