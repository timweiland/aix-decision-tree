import { useEffect, useState } from 'react';

import ColumnContainer from '../columns/ColumnContainer';
import MapColumn from '../columns/MapColumn';
import TreeColumn from '../columns/TreeColumn';

import Map from '../map/Map';
import Tree from '../tree/Tree';
import Popup from '../popup/Popup';

import Alice from '../mascots/Alice';

export function ShowAITree({ mietdaten, userTree, aiTree, setContinueHandler, aiTreeClipped0, aiTreeClipped1, aiTreeClipped2, onComplete }) {
    const [screenState, setScreenState] = useState("showAITree0");
    const [aliceMessage, setAliceMessage] = useState("undefined");
    const [curTree, setTree] = useState(aiTreeClipped0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if(isDone) {
            setContinueHandler(undefined);
        }
        else if (screenState === "showAITree0") {
            setAliceMessage("Die KI hat dieselbe Ausgangssituation wie du gerade eben. Sie wird nun auch Schritt für Schritt Linien in die Karte einzeichnen. Den Ort der Linie wählt Sie aufgrund eines mathematischen Kriteriums, welches wir später genauer betrachten werden");
            setContinueHandler({ handler: () => setScreenState("showAITree1") })
        }
        else if (screenState === "showAITree1") {
            setAliceMessage("Zunächst unterteilt die KI das Stadtgebiet mit einer vertikalen Linie. ");
            setContinueHandler({ handler: () => setScreenState("showAITree2") })
            setTree(aiTreeClipped1);
        }
        else if (screenState === "showAITree2") {
            setAliceMessage("Als nächstes zieht Sie eine horizontale Linie. Auf dieselbe Art wird die KI auch für die verbleibenden drei Linien wählen. Das Endergebnis wirst du nach dem nächsten Click sehen.");
            setContinueHandler({ handler: () => setScreenState("showAITree3") })
            setTree(aiTreeClipped2);
        }
        else if (screenState === "showAITree3") {
            setAliceMessage("Meine KI ist fertig! Bob, jetzt wollen wir mal sehen, welcher Entscheidungsbaum die besseren Vorhersagen liefert #teamKI");
            setContinueHandler({
                handler: () => {
                    setIsDone(true);
                }
            })
            setTree(aiTree.structure);
        }
    }, [screenState, setContinueHandler, onComplete, aiTree, aiTreeClipped1, aiTreeClipped2, isDone])

    return (
        <ColumnContainer>
            <MapColumn>
                <Map coordinates={mietdaten} tree={userTree.structure} enableInteraction={false} hide={true} />
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} hide={true} arrow="left" />
                </div>
                <div className="mt-2">
                    <Tree structure={curTree} colors={curTree.get_colors()} arrow="right" />
                </div>
            </TreeColumn>

            <MapColumn>
                <Map coordinates={mietdaten} tree={curTree} enableInteraction={false} />
                {
                    aliceMessage &&
                    <Alice message={aliceMessage} excited={false} />
                }
            </MapColumn>

            {
                (isDone) &&
                <Popup closeCallback={onComplete} icon="check">
                    <p>Zuerst hast du die Stadt in Bereiche mit ähnlich hohen Mieten unterteilt und so deinen Entscheidungsbaum erstellt.</p>
                    <p>Dann hast du die Lösung der KI gesehen.</p>
                    <p>Jetzt möchten wir beide Lösungen vergleichen. Welcher Entscheidungsbaum schätzt die Mieten besser?</p>
                    <p>Schauen wir uns die Schätzungen für drei verschiedene WG-Zimmer an.</p>
                </Popup>
            }
        </ColumnContainer>

    );
}