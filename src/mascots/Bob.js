import classNames from "classnames";
import { useEffect, useState } from "react";
import bobImg from "../assets/bob.png";

export default function Bob({ message, excited }) {
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    setHasNewMessage(true);
    const timerID = setTimeout(() => setHasNewMessage(false), 5000);
    return () => {
      clearTimeout(timerID);
    }
  }, [message]);

  return (
    <div className="absolute bottom-10 left-10 flex flex-row z-30">
      <img
        src={bobImg}
        alt="Bob"
        className={classNames({ "animate-excite": excited }, "w-32 p-0")}
      />
      {message && (
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-error text-2xl shadow-2xl">
            {hasNewMessage &&
              <span class="flex absolute h-6 w-6 top-0 right-0 -mt-1 -mr-1">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-6 w-6 bg-red-500"></span>
              </span>
            }
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
