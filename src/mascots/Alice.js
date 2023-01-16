import classNames from "classnames";
import aliceImg from "../assets/alice.png";

export default function Alice({ message, excited }) {
  return (
    <div className="absolute bottom-28 right-10 flex flex-row z-30">
      {message && (
        <div className="chat chat-end" style={{ placeItems: "start" }}>
          <div className="chat-bubble chat-bubble-info text-2xl ml-3 mr-0 shadow-2xl">
            {message}
          </div>
        </div>
      )}
      <img
        src={aliceImg}
        alt="Alice"
        className={classNames({ "animate-excite": excited }, "w-28", "p-0")}
      />
    </div>
  );
}
