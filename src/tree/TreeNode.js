import './TreeNode.css';

export default function TreeNode({ id, avgRent }) {
    return <div className="tree-node" id={id}> {avgRent}</div>
}