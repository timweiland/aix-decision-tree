import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faBook, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function FinalScreen({restartWithoutTutorial, exitApp}) {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-1 flex-col items-center m-2">
                <div className="text-center mb-2">
                    <span className="text-3xl">Nochmal</span>
                </div>
                <button className="bg-blue-500 w-full rounded-full p-4 h-80" onClick={restartWithoutTutorial}>
                    <FontAwesomeIcon icon={faSync} size="10x" />
                </button>
            </div>
            <div className="flex flex-1 flex-col items-center m-2">
                <div className="text-center mb-2">
                    <span className="text-3xl">Erklärung</span>
                </div>
                <Link to="/explanation" className="w-full">
                    <button className="bg-yellow-500 w-full rounded-full p-4 h-80">
                        <FontAwesomeIcon icon={faBook} size="10x" />
                    </button>
                </Link>
            </div>
            <div className="flex flex-1 flex-col items-center m-2">
                <div className="text-center mb-2">
                    <span className="text-3xl">Beenden</span>
                </div>
                <button className="bg-red-500 w-full rounded-full p-4 h-80" onClick={exitApp}>
                    <FontAwesomeIcon icon={faXmark} size="10x" />
                </button>
            </div>
        </div>
    );
};