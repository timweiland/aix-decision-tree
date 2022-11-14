import './TreeNode.css';

export default function TreeNode({ id, avgRent, color }) {
    let backgroundColor = 'lightgray';
    if(color) {
        backgroundColor = color.hex();
    }
    return <div className="tree-node" id={id} style={{backgroundColor: backgroundColor}}>
         <div style={{position: "relative", top: `${15}%` }}>{`${avgRent}$`}</div> </div>
}