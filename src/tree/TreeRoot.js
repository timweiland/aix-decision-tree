import TreeNode from './TreeNode';
import { ArcherElement } from 'react-archer';
import React from 'react';

export default function TreeRoot({ structure, colors}) {
    if (structure === {} || structure === null) {
        return null;
    }
    const avgRent = structure.avgRent;
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
            <div><TreeNode id={structure.idx} avgRent={avgRent} color={colors[structure.idx]} isSelected={structure.isSelected} hasTestPoint={structure.hasTestPoint} /></div>
        </ArcherElement>
        <div style={{ width: '100%', marginTop: '3rem', display: 'flex' }}>
            {
                structure.children &&
                structure.children.map((child, childidx) => {
                    return <div style={{ flex: '1' }} key={child.idx}>
                        <TreeRoot structure={child} id={child.idx} key={child.idx} colors={colors} />
                    </div>
                })
            }
        </div>
    </div>
}