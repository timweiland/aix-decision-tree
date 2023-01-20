import { useEffect, useState } from 'react';
import BobExplains from './BobExplains';

import NoExplanation from './NoExplanation';
import Popup from '../../popup/Popup';

export default function QualitativeComparison({ mietdaten, userTree, setUserTree, aiTree, setAITree, setContinueHandler, onComplete }) {
    const [screenState, setScreenState] = useState("bobExplains");
    const [isDone, setIsDone] = useState(false);

    const testPoints = [mietdaten[30], mietdaten[59], mietdaten[86]];

    useEffect(() => {
        if(screenState === "noExplanation0") {
            setContinueHandler(undefined);
        }
    }, [screenState]);
    return (
        <>
            {screenState === "bobExplains" &&
                <BobExplains mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[0]} setContinueHandler={setContinueHandler} onComplete={() => {
                    setScreenState("noExplanation0")
                    setContinueHandler(undefined)
                }} />
            }
            {screenState === "noExplanation0" &&
                <NoExplanation mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[1]} onComplete={() => setScreenState("noExplanation1")} />
            }
            {screenState === "noExplanation1" &&
                <NoExplanation mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[2]} onComplete={() => {
                    setIsDone(true);
                    setContinueHandler(undefined);
                }} />
            }
            {
                (isDone) &&
                <Popup closeCallback={onComplete} icon="check">
                    <p className="text-center">Welcher Entscheidungsbaum hat dich bisher mehr überzeugt?</p>
                    <br/>
                    <p className="text-center">Jetzt schauen wir uns an, wie sehr die Schätzungen beider Entscheidungsbäume im Durchschnitt von den echten Mieten abweichen.</p>
                </Popup>
            }
        </>
    );
}