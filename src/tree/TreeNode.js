import './TreeNode.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const transition = {
    type: "tween",
    duration: 1
  };

  
export default function TreeNode({ id, avgRent, color, isSelected, hasTestPoint }) {
    let backgroundColor = 'lightgray';
    if (color) {
        backgroundColor = color.hex();
    }
    let nodeCaption = "???";
    if (avgRent !== "?") {
        nodeCaption = avgRent.toFixed(0) + "€";
    }
    return <div className={classNames("tree-node hover:ring-8 hover:ring-red-500 shadow-2xl", {
        'ring-8': isSelected,
        'ring-red-500': isSelected
    })} id={id} style={{ backgroundColor: backgroundColor }}>
        <div style={{ position: "relative", top: `${15}%` }}>{`${nodeCaption}`}</div>
        {hasTestPoint &&
            <motion.div className="rounded-full w-16 h-16 bg-yellow-300 -mt-14 ml-2" layoutId="test-anim" transition={transition}></motion.div>
        }
    </div>
}