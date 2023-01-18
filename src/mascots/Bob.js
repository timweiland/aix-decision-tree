import classNames from "classnames";
import bobImg from "../assets/bob.png";

export default function Bob({ message, excited }) {
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
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
