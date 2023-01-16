import "./TreeNode.css";
import classNames from "classnames";
import { motion } from "framer-motion";

const transition = {
  type: "tween",
  duration: 1,
};

export default function TreeNode({
  id,
  avgRent,
  color,
  isSelected,
  hasTestPoint,
  isSmall,
}) {
  let backgroundColor = "lightgray";
  if (color) {
    backgroundColor = color;
  }
  let nodeCaption = "???";
  if (avgRent !== "?") {
    nodeCaption = avgRent.toFixed(0) + "€";
  }
  return (
    <div
      className={classNames("tree-node relative shadow-2xl flex items-center", {
        "ring-8": isSelected,
        "ring-red-500": isSelected,
      })}
      id={id}
      style={{
        backgroundColor: backgroundColor,
        height: isSmall ? "45px" : "60px",
        width: isSmall ? "45px" : "60px",
      }}
    >
      <div
        style={{ position: "relative" }}
        className={classNames("text-white", "mx-auto", "z-10", {
          "text-2xl": isSmall,
          "text-3xl": !isSmall,
        })}
      >{`${nodeCaption}`}</div>
      {hasTestPoint && (
        <motion.div
          className="absolute top-0 left-0  rounded-full bg-yellow-300"
          style={{
            height: isSmall ? "45px" : "60px",
            width: isSmall ? "45px" : "60px",
            borderColor: "red",
            borderWidth: "2px",
          }}
          layoutId="test-anim"
          transition={transition}
        ></motion.div>
      )}
    </div>
  );
}
