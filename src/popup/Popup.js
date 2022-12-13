export default function Popup({ icon, closeCallback, children }) {
    return (
        <div className="flex absolute h-screen justify-center items-center w-screen">
            <div className="bg-gray-400 opacity-80 z-50 w-full h-full absolute" />
            <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden m-auto z-50 p-4 md:inset-0 w-1/2 w-1/2">
                <div className="relative w-full h-full">
                    <div className="relative rounded-lg shadow bg-gray-700">
                        <div className="pt-40 pb-40 pl-24 pr-24 text-center">
                            <div className="mx-auto mb-8 w-14 h-14 ">
                                {icon}
                            </div>
                            <div className="mb-5 text-lg font-normal text-white">
                                {children}
                            </div>
                            <button data-modal-toggle="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={closeCallback}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}