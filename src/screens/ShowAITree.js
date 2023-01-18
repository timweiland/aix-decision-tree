import { useEffect, useState } from "react";

import ColumnContainer from "../columns/ColumnContainer";
import MapColumn from "../columns/MapColumn";
import TreeColumn from "../columns/TreeColumn";

import Map from "../map/Map";
import Tree from "../tree/Tree";
import Popup from "../popup/Popup";

import Alice from "../mascots/Alice";

export function ShowAITree({
  mietdaten,
  userTree,
  aiTree,
  setContinueHandler,
  aiTreeClipped0,
  aiTreeClipped1,
  aiTreeClipped2,
  onComplete,
}) {
  const [screenState, setScreenState] = useState("showAITree0");
  const [aliceMessage, setAliceMessage] = useState("undefined");
  const [curTree, setTree] = useState(aiTreeClipped0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      setContinueHandler(undefined);
    } else if (screenState === "showAITree0") {
      setAliceMessage(
        "Die KI wird nun wie du gerade Schritt für Schritt Linien in die Karte einzeichnen. Wie sie auf die Linien kommt, erfährst du zu einem späteren Zeitpunkt."
      );
      setContinueHandler({ handler: () => setScreenState("showAITree1") });
    } else if (screenState === "showAITree1") {
      setAliceMessage(
        "Zunächst unterteilt die KI das Stadtgebiet mit einer vertikalen Linie. "
      );
      setContinueHandler({ handler: () => setScreenState("showAITree2") });
      setTree(aiTreeClipped1);
    } else if (screenState === "showAITree2") {
      setAliceMessage(
        "Als nächstes zieht Sie eine horizontale Linie. Auf dieselbe Art wird die KI auch die verbleibenden 3 Linien wählen. Das Endergebnis wirst du nach dem nächsten Click sehen."
      );
      setContinueHandler({ handler: () => setScreenState("showAITree3") });
      setTree(aiTreeClipped2);
    } else if (screenState === "showAITree3") {
      setAliceMessage(
        "Meine KI ist fertig! Bob, jetzt wollen wir mal sehen, welcher Entscheidungsbaum die besseren Schätzungen liefert #teamKI"
      );
      setContinueHandler({
        handler: () => {
          setIsDone(true);
        },
      });
      setTree(aiTree.structure);
    }
  }, [
    screenState,
    setContinueHandler,
    onComplete,
    aiTree,
    aiTreeClipped1,
    aiTreeClipped2,
    isDone,
  ]);

  return (
    <ColumnContainer>
      <MapColumn>
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          enableInteraction={false}
          hide={true}
        />
      </MapColumn>

      <TreeColumn>
        <div className="mt-4">
          <Tree
            structure={userTree.structure}
            colors={userTree.structure.get_colors()}
            hide={true}
            arrow="left"
          />
        </div>
        <div className="mt-2">
          <Tree
            structure={curTree}
            colors={curTree.get_colors()}
            arrow="right"
          />
        </div>
      </TreeColumn>

      <MapColumn>
        <Map coordinates={mietdaten} tree={curTree} enableInteraction={false} />
        {aliceMessage && <Alice message={aliceMessage} excited={false} />}
      </MapColumn>

      {isDone && (
        <Popup closeCallback={onComplete} icon="check">
          <p style={{ textAlign: "center" }}>
            Zuerst hast du deinen Entscheidungsbaum erstellt, und danach die KI.
          </p>
          <br />
          <p style={{ textAlign: "center" }}>
            Jetzt wollen wir beide miteinander vergleichen. <br /> Dazu schauen
            wir uns an, welcher Entscheidungsbaum den Preis für ein WG-Zimmer
            besser schätzen kann.
          </p>
        </Popup>
      )}
    </ColumnContainer>
  );
}
