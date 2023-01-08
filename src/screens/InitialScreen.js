import Taskbar from '../taskbar/taskbar';

import ColumnContainer from '../columns/ColumnContainer';
import MapColumn from '../columns/MapColumn';
import TreeColumn from '../columns/TreeColumn';

import Map from '../map/Map';
import Tree from '../tree/Tree';

export default function InitialScreen({ cleanUp, userTree, mietdaten, undo, splitTree, highlightNode, unhighlightAll, onComplete }) {
    const NoOfUserLines = userTree.structure.get_lines().length;

    if (NoOfUserLines === 5) {
        onComplete();
    }

    return (
        <ColumnContainer>
            <MapColumn>
                <Taskbar cleanUp={cleanUp}
                    complete={onComplete}
                    undo={undo} />
                <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={true} />
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
                </div>
            </TreeColumn>
        </ColumnContainer>

    );
}