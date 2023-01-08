import { useState, useEffect } from 'react';

import PredictionComparison from './PredictionComparison';

import ColumnContainer from '../../columns/ColumnContainer';
import MapColumn from '../../columns/MapColumn';
import TreeColumn from '../../columns/TreeColumn';

import Map from '../../map/Map';
import Tree from '../../tree/Tree';

import Alice from '../../mascots/Alice';
import Bob from '../../mascots/Bob';

function displayedRent(rent) {
    return Number(rent).toFixed(1).replace(".", ",");
}

export default function BobExplains({ mietdaten, userTree, setUserTree, aiTree, setAITree, testPoint, setContinueHandler, onComplete }) {
    const deepMessages = ["Wir verfeinern unsere Schätzung weiter.", "Wir springen zum nächsten Teilbereich."]
    const x = testPoint[0];
    const y = testPoint[1];
    const [screenState, setScreenState] = useState("intro0");
    const [curPathIdx, setCurPathIdx] = useState(0);
    const [showTrueRent, setShowTrueRent] = useState(false);
    const [showUserRentEstimate, setShowUserRentEstimate] = useState(false);
    const [showAIRentEstimate, setShowAIRentEstimate] = useState(false);
    const [userRentEstimate, setUserRentEstimate] = useState(undefined);
    const [aiRentEstimate, setAiRentEstimate] = useState(undefined);
    const [bobMessage, setBobMessage] = useState(undefined);
    const [aliceMessage, setAliceMessage] = useState(undefined);

    const userPath = userTree.structure.get_path(x, y);
    const curNode = userPath[curPathIdx];
    const aiTreePath = aiTree.structure.get_path(x, y);
    const curNodeAi = aiTreePath[curPathIdx];

    const hideUserScreens = ["followAlicePath"];
    const hideAIScreens = ["intro0", "intro1", "followPath"];

    useEffect(() => {
        if (screenState === "intro0") {
            setBobMessage("Ich habe eine coole Wohnung gefunden! Sie ist in der Karte gelb markiert. Schauen wir mal, was unser Baum über die Miete sagt.")
            setContinueHandler({ handler: () => setScreenState("intro1") });
        }
        else if (screenState === "intro1") {
            setBobMessage("Der Entscheidungsbaum schaut jetzt in jedem Schritt, in welchem Teilbereich sich die Wohnung befindet.");
            setContinueHandler({ handler: () => setScreenState("followPath") });
        }
        else if (screenState === "followPath") {
            userTree.structure.removeTestPoints();
            userTree.structure.find_idx(curNode.idx).hasTestPoint = true;
            setUserTree(userTree.structure);
            if (curPathIdx === userPath.length - 1) {
                setBobMessage(`Fertig! Die Vorhersage liegt bei ${displayedRent(curNode.avgRent)}€.`)
                setUserRentEstimate(curNode.avgRent);
                setShowUserRentEstimate(true);
                setContinueHandler({
                    handler: () => {
                        setCurPathIdx(0);
                        setScreenState("followAlicePath");
                    }
                })
            }
            else if (curPathIdx === 0) {
                setBobMessage(`Im ersten Schritt betrachten wir die ganze Karte. Hier liegt der Durchschnittspreis bei ${displayedRent(curNode.avgRent)}€. Die gelbe Linie trennt die Karte in zwei Teilbereiche.`);
                setContinueHandler({ handler: () => setCurPathIdx(curPathIdx + 1) })
            }
            else if (curPathIdx === 1) {
                setBobMessage(`Jetzt geht's weiter mit dem Teilbereich, in dem die Wohnung liegt. Der Durchschnittspreis liegt hier bei ${displayedRent(curNode.avgRent)}€.`)
                setContinueHandler({ handler: () => setCurPathIdx(curPathIdx + 1) })
            }
            else {
                const msg = deepMessages.pop();
                setBobMessage(msg + ` Der Durchschnittspreis liegt bei ${displayedRent(curNode.avgRent)}€.`);
                setContinueHandler({ handler: () => setCurPathIdx(curPathIdx + 1) });
            }
        }
        else if (screenState === "followAlicePath") {
            setBobMessage(undefined);
            aiTree.structure.removeTestPoints();
            aiTree.structure.find_idx(curNodeAi.idx).hasTestPoint = true;
            setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
            if (curPathIdx === aiTreePath.length - 1) {
                setAliceMessage(`Tada! Die Vorhersage liegt bei ${displayedRent(curNodeAi.avgRent)}€. Jetzt wollen wir mal sehen, was der echte Mietpreis ist...`);
                setAiRentEstimate(curNodeAi.avgRent);
                setShowAIRentEstimate(true);
                setContinueHandler({ handler: () => setScreenState("revealTrueRent") });
            }
            else if (curPathIdx === 0) {
                setAliceMessage("Das Gleiche machen wir jetzt auch für den Baum, den meine KI erstellt hat.");
                setContinueHandler({ handler: () => setCurPathIdx(curPathIdx + 1) });
            }
            else {
                setAliceMessage("Wir verfeinern Schritt für Schritt unsere Schätzung...");
                setContinueHandler({ handler: () => setCurPathIdx(curPathIdx + 1) });
            }
        }
        else if (screenState === "revealTrueRent") {
            setShowTrueRent(true);
            const trueRent = testPoint[2];
            const userError = Math.abs(userRentEstimate - trueRent);
            const aiError = Math.abs(aiRentEstimate - trueRent);
            if (userError < aiError) {
                setBobMessage("Spitze! Wir haben die Miete genauer vorhergesagt!")
                //bobExcited = true;
                //aliceMessage = "Oh, da hast du meine KI wohl geschlagen!";
                setAliceMessage("Besser als die KI - gut gemacht!");
            }
            else if (userError > aiError) {
                if (userError < 5) {
                    setBobMessage("Aber unsere Schätzung ist auch nicht schlecht!");
                }
                else {
                    setBobMessage("Unsere Schätzung ist ein bisschen ungenauer. Aber das war ja nur eine Wohnung!")
                }
                setAliceMessage("Die KI hat den Mietpreis ein wenig genauer geschätzt.")
            }
            else {
                setBobMessage("Wow!");
                setAliceMessage("Beide Bäume schätzen die gleiche Miete!");
            }
            setContinueHandler({ handler: () => setScreenState("final") });
        }
        else if (screenState === "final") {
            setBobMessage("Das ganze machen wir jetzt im Schnelldurchlauf noch für zwei weitere Wohnungen.")
            setAliceMessage("Mal sehen, wer die Mieten besser schätzt!")
            userTree.structure.removeTestPoints();
            setUserTree(userTree.structure);
            aiTree.structure.removeTestPoints();
            setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
            setContinueHandler({ handler: onComplete });
        }
    }, [screenState, setContinueHandler, onComplete, curPathIdx]);

    return (
        <ColumnContainer>
            <MapColumn>
                <Map coordinates={mietdaten} tree={userTree.structure} enableInteraction={false} testPoint={testPoint} hide={hideUserScreens.includes(screenState)} />
                {
                    bobMessage &&
                    <Bob message={bobMessage} excited={false} />
                }
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} arrow="left" hide={hideUserScreens.includes(screenState)} />
                </div>
                <PredictionComparison showUserRentEstimate={showUserRentEstimate} userRentEstimate={userRentEstimate} testPoint={testPoint}
                    showTrueRent={showTrueRent} showAIRentEstimate={showAIRentEstimate} aiRentEstimate={aiRentEstimate}
                    highlightAll={screenState === "revealTrueRent"} highlightUser={screenState==="followPath" && curPathIdx === userPath.length - 1} 
                    highlightAI={screenState==="followAlicePath" && curPathIdx === aiTreePath.length - 1}/>
                <div className="mt-2">
                    <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} arrow="right" hide={hideAIScreens.includes(screenState)} />
                </div>
            </TreeColumn>

            <MapColumn>
                <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} testPoint={testPoint} hide={hideAIScreens.includes(screenState)} />
                {
                    aliceMessage &&
                    <Alice message={aliceMessage} excited={false} />
                }
            </MapColumn>
        </ColumnContainer>
    );
}