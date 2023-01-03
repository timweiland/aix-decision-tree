import classNames from "classnames";
import aliceImg from "../assets/alice.png";

export default function Alice({ message, excited }) {
    return (
        <div className="absolute bottom-10 right-48 flex flex-row">
            { message &&
                <div className="chat chat-end" style={{placeItems: "start"}}>
                    <div className="chat-bubble chat-bubble-secondary text-2xl">
                        {message}
                    </div>
                </div>
            }
            <img src={aliceImg} alt="Alice" className={classNames({animateBounce: excited}, "w-48", "p-0")}/>
        </div>
    );
}