import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';

import checkAnimation from '../assets/check_anim.json';

export default function Popup({ icon, closeCallback, children }) {
    return (
        <div className="flex absolute h-screen justify-center items-center w-screen">
            <div className="bg-gray-400 opacity-80 z-50 w-full h-full absolute" />
            <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden m-auto z-50 p-4 md:inset-0 w-1/2 w-1/2">
                <div className="relative w-full h-full">
                    <div className="relative rounded-lg shadow bg-gray-700">
                        <div className="pt-20 pb-20 pl-24 pr-24">
                            <div className="mx-auto mb-12 w-40 h-40 ">
                                {icon === "check" && <Lottie className="w-full h-full mx-auto" animationData={checkAnimation} loop={false} />}
                            </div>
                            <div className="mb-12 text-3xl font-normal text-white">
                                {children}
                            </div>
                            <div className="text-center">
                            <button data-modal-toggle="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-3xl inline-flex items-center px-10 py-5 text-center mr-2" onClick={closeCallback}>
                                OK
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}