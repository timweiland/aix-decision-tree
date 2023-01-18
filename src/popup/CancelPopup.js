export default function CancelPopup({ title, closeCallback, cancelCallback, children }) {
    return (
        <div className="flex absolute h-screen justify-center items-center w-screen">
            <div className="bg-gray-400 opacity-80 z-50 w-full h-full absolute" />
            <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden m-auto z-50 p-4 md:inset-0 w-1/2">
                <div className="relative w-full h-full">
                    <div className="relative rounded-lg shadow bg-gray-700">
                        <div className="pt-20 pb-20 pl-24 pr-24">
                            <div className="text-center mb-12 text-5xl font-bold text-white">{title}</div>
                            <div className="mb-12 text-3xl font-normal text-center text-white">
                                {children}
                            </div>
                            <div className="text-center">
                                <button data-modal-toggle="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-3xl inline-flex items-center px-20 py-5 text-center mr-5" onClick={closeCallback}>
                                    Ja
                                </button>
                                <button data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-3xl inline-flex items-center px-20 py-5 text-center" onClick={cancelCallback}>
                                    Abbruch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}