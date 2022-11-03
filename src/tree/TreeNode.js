import './TreeNode.css';

export default function TreeNode({ id, avgRent, threshold }) {
    return <div className="tree-node" id={id}> {`${avgRent}$`} {`${threshold}%`}</div>
}