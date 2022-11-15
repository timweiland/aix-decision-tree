import './TreeNode.css';
import classNames from 'classnames';

export default function TreeNode({ id, avgRent, color, isSelected }) {
    let backgroundColor = 'lightgray';
    if(color) {
        backgroundColor = color.hex();
    }
    let nodeCaption = "???";
    if(avgRent !== "?") {
        nodeCaption = avgRent.toFixed(0) + "€";
    }
    return <div className={classNames("tree-node hover:ring-8 hover:ring-red-500 shadow-2xl", {
        'ring-8': isSelected,
        'ring-red-500': isSelected
    })} id={id} style={{backgroundColor: backgroundColor}}>
         <div style={{position: "relative", top: `${15}%` }}>{`${nodeCaption}`}</div> </div>
}