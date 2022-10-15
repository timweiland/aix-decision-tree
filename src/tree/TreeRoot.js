import "./TreeRoot.css";

import TreeNode from './TreeNode';
import Xarrow, { Xwrapper } from "react-xarrows";
import React from 'react';

export default function TreeRoot({ structure, id, index }) {
    if (structure === {} || structure === null) {
        return null;
    }
    const rootID = `${id}-${index}`;
    return <div style={{ width: '100%', height: '100%' }}>
        <TreeNode id={rootID} />
        <div style={{ width: '100%', marginTop: '5rem', display: 'flex' }}>
            <Xwrapper>
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
                        return <div className="arrow-container">
                            <Xarrow
                                start={`${rootID}`}
                                end={`${rootID}-${childidx}`}
                                key={`${rootID}-${childidx}`}
                                animateDrawing={0.4}
                            />
                        </div>;

                    })
                }
            </Xwrapper>
        </div>
    </div>
}