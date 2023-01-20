import classNames from "classnames";
import { useEffect, useState } from "react";
import aliceImg from "../assets/alice.png";

export default function Alice({ message, excited }) {
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
    <div className="absolute bottom-28 right-10 flex flex-row z-30">
      {message && (
        <div className="chat chat-end relative" style={{ placeItems: "start" }}>
          <div className={classNames("chat-bubble chat-bubble-info text-2xl ml-3 mr-0 shadow-2xl", {"fading-in": animating})}>
          {renderedMessage ? renderedMessage: message}
          </div>
          <div className={classNames("chat-bubble chat-bubble-info text-2xl ml-3 mr-0 shadow-2xl absolute w-full", {"fading-out": animating, "hidden": !animating})}>
            {prevMessage}
          </div>
        </div>
      )}
      <img
        src={aliceImg}
        alt="Alice"
        className={classNames({ "animate-excite": excited }, "w-32", "p-0")}
      />
    </div>
  );
}
