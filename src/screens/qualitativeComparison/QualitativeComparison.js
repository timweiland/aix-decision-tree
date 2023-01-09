import { useState } from 'react';
import BobExplains from './BobExplains';

import NoExplanation from './NoExplanation';
import Popup from '../../popup/Popup';

export default function QualitativeComparison({ mietdaten, userTree, setUserTree, aiTree, setAITree, setContinueHandler, onComplete }) {
    const [screenState, setScreenState] = useState("bobExplains");
    const [isDone, setIsDone] = useState(false);

    const testPoints = [mietdaten[0], mietdaten[1], mietdaten[2]];

    return (
        <>
            {screenState === "bobExplains" &&
                <BobExplains mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[0]} setContinueHandler={setContinueHandler} onComplete={() => setScreenState("noExplanation0")}/>
            }
            {screenState === "noExplanation0" &&
                <NoExplanation mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[1]} setContinueHandler={setContinueHandler} onComplete={() => setScreenState("noExplanation1")} />
            }
            {screenState === "noExplanation1" &&
                <NoExplanation mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[2]} setContinueHandler={setContinueHandler} onComplete={() => setIsDone(true)} />
            }
            {
            (isDone) &&
            <Popup closeCallback={onComplete} icon="check">
                <p>Zuerst hast du die Stadt in Bereiche mit ähnlich hohen Mieten unterteilt und so deinen Entscheidungsbaum erstellt.</p>
                <p>Dann hast du die Lösung der KI gesehen.</p>
                <p>Jetzt möchten wir beide Lösungen vergleichen. Welcher Entscheidungsbaum schätzt die Mieten besser?</p>
                <p>Schauen wir uns die Schätzungen für drei verschiedene WG-Zimmer an.</p>
            </Popup>
            }
        </>
    );
}