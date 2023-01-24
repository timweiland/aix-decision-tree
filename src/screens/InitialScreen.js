import { useEffect, useState } from "react";
import Taskbar from "../taskbar/taskbar";

import ColumnContainer from "../columns/ColumnContainer";
import MapColumn from "../columns/MapColumn";
import TreeColumn from "../columns/TreeColumn";

import BobMirrored from "../mascots/BobMirrored";
import Map from "../map/Map";
import Tree from "../tree/Tree";
import Popup from "../popup/Popup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [bobMessage, setBobMessage] = useState(undefined);
  console.log(userTree);

  const NoOfUserLines = userTree.structure.get_lines().length;

  useEffect(() => {
    if (NoOfUserLines < 3 && NoOfUserLines != 0) {
      setBobMessage(undefined);
    } else if (NoOfUserLines === 0) {
      setBobMessage(`Zeichne deine erste Linie.`);
    } else if (NoOfUserLines === 4) {
      setBobMessage(`Super, weiter so! Es fehlt nur noch eine Linie.`);
    } else {
      setBobMessage(
        `Super, weiter so! Es fehlen noch ${5 - NoOfUserLines} Linien.`
      );
    }

    if (NoOfUserLines === 5) {
      setShowPopUp(true);
      setIsDone(true);
    }
  }, [NoOfUserLines]);

  return (
    <ColumnContainer>
      <MapColumn>
        {!isDone && (
          <Taskbar
            cleanUp={cleanUp}
            complete={() => setIsDone(true)}
            undo={undo}
            openTutorial={openTutorial}
          />
        )}
        {!isDone && (
          <Map
            coordinates={mietdaten}
            tree={userTree.structure}
            splitTree={splitTree}
            highlightNode={highlightNode}
            unhighlightAll={unhighlightAll}
            enableInteraction={true}
          />
        )}
        {isDone && (
          <Map
            coordinates={mietdaten}
            tree={userTree.structure}
            enableInteraction={false}
          />
        )}
      </MapColumn>

      <TreeColumn>
        <div className="mt-4">
          <Tree
            structure={userTree.structure}
            colors={userTree.structure.get_colors()}
          />
        </div>
        {bobMessage && !isDone && <BobMirrored message={bobMessage} />}
      </TreeColumn>

      {isDone && showPopUp && (
        <Popup
          closeCallback={() => {
            setShowPopUp(false);
          }}
          icon="check"
        >
          <p style={{ textAlign: "center" }}>
            Super! <br />
            Du hast deinen Entscheidungsbaum fertig gestellt.
          </p>
          <br />
          <p style={{ textAlign: "center" }}>
            Wenn du möchtest, kannst du ihn jetzt nochmal in Ruhe betrachten
            bevor es weiter geht.
          </p>
        </Popup>
      )}

      {isDone && (
        <div>
          <div
            className="absolute hover:bg-green-700 bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
            onClick={() => {
              onComplete();
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
          <div className="absolute bottom-12 right-48 text-2xl font-extralight">
            Zur Lösung der KI
          </div>
        </div>
      )}
    </ColumnContainer>
  );
}
