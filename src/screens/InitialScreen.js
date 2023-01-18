import { useEffect, useState } from "react";
import Taskbar from "../taskbar/taskbar";

import ColumnContainer from "../columns/ColumnContainer";
import MapColumn from "../columns/MapColumn";
import TreeColumn from "../columns/TreeColumn";

import Map from "../map/Map";
import Tree from "../tree/Tree";
import Popup from "../popup/Popup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";

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
  console.log(userTree);

  const NoOfUserLines = userTree.structure.get_lines().length;


    useEffect(() => {
        if (NoOfUserLines === 5) {
            setShowPopUp(true);
            setIsDone(true);
            
        }
    }, [NoOfUserLines])

  return (
    <ColumnContainer>
      <MapColumn>
      {(!isDone) &&
        <Taskbar
          cleanUp={cleanUp}
          complete={() => setIsDone(true)}
          undo={undo}
          openTutorial={openTutorial}
        />
      }
        {(!isDone) &&
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          enableInteraction={true}
        />
        }
        {(isDone) &&
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          enableInteraction={false}
        />
        }
      </MapColumn>

      <TreeColumn>
        <div className="mt-4">
          <Tree
            structure={userTree.structure}
            colors={userTree.structure.get_colors()}
          />
        </div>
      </TreeColumn>


            {
                (isDone) && (showPopUp) &&
                <Popup closeCallback={() => {setShowPopUp(false)}} icon="check">
                    <p style={{ textAlign: "center" }}>
                        Super! <br />
                        Du hast deinen Entscheidungsbaum fertig gestellt.
                    </p>
                    <br />
                    <p style={{ textAlign: "center" }}>
                       Jetzt schauen wir uns an, wie die KI es macht.
                    </p>
                </Popup>
            }

            {
                (isDone) && 
                <div>
                <div
                  className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-14 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                  style={{ fontSize: "50pt" }}
                  onClick={() => {
                    onComplete();
                    
                  }}>
                     <FontAwesomeIcon icon={faArrowRightLong} />
                    
                     
                </div>
                <div
                className="absolute  bottom-5 right-10 text-black text-2xl"
                >Zur Lösung der KI</div>
                </div>
            }
            
        </ColumnContainer>

    );
}
