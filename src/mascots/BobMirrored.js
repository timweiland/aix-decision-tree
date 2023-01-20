import classNames from "classnames";
import { useEffect, useState } from "react";
import bobMirroredImg from "../assets/bob_mirrored.png";

export default function BobMirrored({ message, excited }) {
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
        <div className="absolute bottom-10 left-1/3 flex flex-row z-30">
            {renderedMessage && (
                <div className="chat chat-end" style={{ placeItems: "start" }}>
                    <div className={classNames("chat-bubble chat-bubble-error text-2xl shadow-2xl", { "fading-in": animating })}>
                    {renderedMessage ? renderedMessage: message}
                    </div>
                    <div className={classNames("chat-bubble chat-bubble-error text-2xl shadow-2xl absolute", { "fading-out": animating, "hidden": !animating })}>
                        {prevMessage}
                    </div>
                </div>
            )}
            <img
                src={bobMirroredImg}
                alt="Bob"
                className={classNames({ "animate-excite": excited }, "w-1/5 p-0")}
            />
        </div>
    );
}
