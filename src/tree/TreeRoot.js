import TreeNode from './TreeNode';
import { ArcherElement } from 'react-archer';
import React from 'react';

export default function TreeRoot({ structure, id, index }) {
    if (structure === {} || structure === null) {
        return null;
    }
    const rootID = `${id}-${index}`;
    const avgRent = structure.avgRent;
    const threshold = structure.threshold;
    return <div style={{ width: '100%', height: '100%' }}>
        <ArcherElement id={`archer-${rootID}`}
            relations={
                structure.children ? structure.children.map((child, childidx) => {
                    return {
                        targetId: `archer-${rootID}-${childidx}`,
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom'
                    }
                }) : []
            }>
            <div><TreeNode id={rootID} avgRent={avgRent} threshold={threshold}/></div>
        </ArcherElement>
        <div style={{ width: '100%', marginTop: '5rem', display: 'flex' }}>
            {
                structure.children &&
                structure.children.map((child, childidx) => {
                    return <div style={{ flex: '1' }}>
                        <TreeRoot structure={child} id={rootID} index={childidx} key={`${rootID}-${childidx}`} />
                    </div>
                })
            }
        </div>
    </div>
}