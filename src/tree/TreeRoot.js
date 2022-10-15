import TreeNode from './TreeNode';
import Xarrow from "react-xarrows";

export default function TreeRoot({ structure, id, index }) {
    if (structure === {} || structure === null) {
        return null;
    }
    const rootID = `${id}-${index}`;
    return <div style={{ width: '100%', height: '100%' }}>
        <TreeNode id={rootID} />
        <div style={{ width: '100%', marginTop: '5rem', display: 'flex' }}>
            {
                structure.children &&
                structure.children.map((child, childidx) => {
                    return <div style={{ flex: '1' }}>
                        <TreeRoot structure={child} id={rootID} index={childidx} key={`${rootID}-${childidx}`} />
                    </div>
                })
            }
            {
                structure.children &&
                structure.children.map((child, childidx) => {
                    console.log(`Arrow from ${rootID} to ${rootID}-${childidx}`)
                    return <Xarrow
                        start={`${rootID}`}
                        end={`${rootID}-${childidx}`}
                        key={`${rootID}-${childidx}`}
                    />
                })
            }
        </div>
    </div>
}