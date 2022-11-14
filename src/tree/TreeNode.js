import './TreeNode.css';

export default function TreeNode({ id, avgRent, color }) {
    let backgroundColor = 'lightgray';
    if(color) {
        backgroundColor = color.hex();
    }
    let nodeCaption = "???";
    if(avgRent !== "?") {
        nodeCaption = avgRent.toFixed(0) + "€";
    }
    return <div className="tree-node" id={id} style={{backgroundColor: backgroundColor}}>
         <div style={{position: "relative", top: `${15}%` }}>{`${nodeCaption}`}</div> </div>
}