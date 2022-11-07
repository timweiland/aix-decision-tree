import TreeNode from './TreeNode';
import { ArcherElement } from 'react-archer';
import React from 'react';

export default function TreeRoot({ structure, colors }) {
    if (structure === {} || structure === null) {
        return null;
    }
    const avgRent = structure.avgRent;
    const threshold = structure.threshold;
    return <div style={{ width: '100%', height: '100%' }}>
        <ArcherElement id={`archer-${structure.idx}`}
            relations={
                structure.children ? structure.children.map((child, childidx) => {
                    return {
                        targetId: `archer-${child.idx}`,
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom'
                    }
                }) : []
            }>
            <div><TreeNode id={structure.idx} avgRent={avgRent} threshold={threshold} color={colors[structure.idx]}/></div>
        </ArcherElement>
        <div style={{ width: '100%', marginTop: '5rem', display: 'flex' }}>
            {
                structure.children &&
                structure.children.map((child, childidx) => {
                    return <div style={{ flex: '1' }}>
                        <TreeRoot structure={child} id={child.idx} key={child.idx} colors={colors} />
                    </div>
                })
            }
        </div>
    </div>
}