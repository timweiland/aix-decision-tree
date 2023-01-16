import { useEffect, useState } from "react";
import Taskbar from "../taskbar/taskbar";

import ColumnContainer from "../columns/ColumnContainer";
import MapColumn from "../columns/MapColumn";
import TreeColumn from "../columns/TreeColumn";

import Map from "../map/Map";
import Tree from "../tree/Tree";
import Popup from "../popup/Popup";

export default function InitialScreen({
  cleanUp,
  userTree,
  mietdaten,
  undo,
  splitTree,
  highlightNode,
  unhighlightAll,
  onComplete,
  openTutorial,
}) {
  const [isDone, setIsDone] = useState(false);
  console.log(userTree);

  const NoOfUserLines = userTree.structure.get_lines().length;

  useEffect(() => {
    if (NoOfUserLines === 5) {
      setIsDone(true);
    }
  }, [NoOfUserLines]);

  return (
    <ColumnContainer>
      <MapColumn>
        <Taskbar
          cleanUp={cleanUp}
          complete={() => setIsDone(true)}
          undo={undo}
          openTutorial={openTutorial}
        />
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          enableInteraction={true}
        />
      </MapColumn>

      <TreeColumn>
        <div className="mt-4">
          <Tree
            structure={userTree.structure}
            colors={userTree.structure.get_colors()}
          />
        </div>
      </TreeColumn>

      {isDone && (
        <Popup closeCallback={onComplete} icon="check">
          <p style={{ textAlign: "center" }}>
            Super! <br />
            Du hast deinen Entscheidungsbaum fertig gestellt.
          </p>
          <br />
          <p style={{ textAlign: "center" }}>
            Jetzt schauen wir uns an, wie die KI es macht.
          </p>
        </Popup>
      )}
    </ColumnContainer>
  );
}
