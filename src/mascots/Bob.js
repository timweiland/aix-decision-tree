import classNames from "classnames";
import { useEffect, useState } from "react";
import bobImg from "../assets/bob.png";

export default function Bob({ message, excited }) {
  const [prevMessage, setPrevMessage] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [renderedMessage, setRenderedMessage] = useState(undefined);

  useEffect(() => {
      let timeout = undefined;
      if(!prevMessage) {
          setRenderedMessage(message);
      }
      if (prevMessage && prevMessage !== message) {
          setAnimating(true);
          timeout = setTimeout(() => {
              setPrevMessage(message);
              setAnimating(false);
          }, 1000);
      }

      return () => {
          setPrevMessage(message);
          if (timeout) {
              clearTimeout(timeout);
          }
      }
  }, [message]);

  useEffect(() => {
      if(animating) {
          setRenderedMessage(message);
      }
  }, [animating, message])

  return (
    <div className="absolute bottom-10 left-10 flex flex-row z-30">
      <img
        src={bobImg}
        alt="Bob"
        className={classNames({ "animate-excite": excited }, "w-32 p-0")}
      />
      {message && (
        <div className="chat chat-start relative">
          <div className={classNames("chat-bubble chat-bubble-error text-2xl shadow-2xl", {"fading-in": animating})}>
          {renderedMessage ? renderedMessage: message}
          </div>
          <div className={classNames("chat-bubble chat-bubble-error text-2xl shadow-2xl absolute w-full", {"fading-out": animating && prevMessage, "hidden": !animating})}>
            {prevMessage}
          </div>
        </div>
      )}
    </div>
  );
}
