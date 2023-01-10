import { useState } from 'react';
import Taskbar from '../taskbar/taskbar';

import ColumnContainer from '../columns/ColumnContainer';
import MapColumn from '../columns/MapColumn';
import TreeColumn from '../columns/TreeColumn';

import Map from '../map/Map';
import Tree from '../tree/Tree';
import Popup from '../popup/Popup';

export default function InitialScreen({ cleanUp, userTree, mietdaten, undo, splitTree, highlightNode, unhighlightAll, onComplete }) {
    const [isDone, setIsDone] = useState(false);
    const NoOfUserLines = userTree.structure.get_lines().length;

    if (NoOfUserLines === 5) {
        if (isDone === false) {
            setIsDone(true);
        }
        {/*onComplete()*/}
        
        
    }

    return (
        <ColumnContainer>
            <MapColumn>
                <Taskbar cleanUp={cleanUp}
                    complete={() => setIsDone(true)}
                    undo={undo} />
                <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={true} />
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
                </div>
            </TreeColumn>

            {
            (isDone) &&
            <Popup closeCallback={onComplete} icon="check">
                <p>Super! Du hast deinen Entscheidungsbaum fertig gestellt.</p>
                <p>Jetzt wird auf der rechten Seite erscheinen, wie die KI die Stadt in Bereiche mit unterschiedlich hohen Mieten unterteilt.</p>
            </Popup>
            }
        </ColumnContainer>

    );
}