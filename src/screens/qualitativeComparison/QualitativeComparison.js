import { useState } from 'react';
import BobExplains from './BobExplains';

import NoExplanation from './NoExplanation';

export default function QualitativeComparison({ mietdaten, userTree, setUserTree, aiTree, setAITree, setContinueHandler, onComplete }) {
    const [screenState, setScreenState] = useState("bobExplains");

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
                <NoExplanation mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} testPoint={testPoints[2]} setContinueHandler={setContinueHandler} onComplete={onComplete} />
            }
        </>
    );
}