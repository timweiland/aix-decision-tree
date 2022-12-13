import classNames from "classnames";
import bobImg from "../assets/bob.png";

export default function Bob({ message, excited }) {
    return (
        <div className="absolute bottom-10 left-10 flex flex-row">
            <img src={bobImg} alt="Bob" className={classNames({"animate-bounce": excited}, "w-48 p-0")}/>
            { message &&
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                        {message}
                    </div>
                </div>
            }
        </div>
    );
}