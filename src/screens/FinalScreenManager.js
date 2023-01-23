import { useState } from 'react';

import Appl from "../pages/Appl";
import Complex from "../pages/ComplexData";
import Interpret from "../pages/Interpret";
import Rents from "../pages/Rents";
import FinalScreen from "./FinalScreen2";

export default function FinalScreenManager({ restartWithoutTutorial, exitApp }) {
    const [screenState, setScreenState] = useState("final");

    return (
        <>
            {screenState === "final" && <FinalScreen restartWithoutTutorial={restartWithoutTutorial} exitApp={exitApp}
                switchToAppl={() => setScreenState("appl")} switchToInterpret={() => setScreenState("interpret")}
                switchToComplex={() => setScreenState("complex")} switchToRents={() => setScreenState("rents")} />}
            {screenState === "appl" && <Appl onComplete={() => setScreenState("final")} />}
            {screenState === "interpret" && <Interpret onComplete={() => setScreenState("final")} />}
            {screenState === "complex" && <Complex onComplete={() => setScreenState("final")} />}
            {screenState === "rents" && <Rents onComplete={() => setScreenState("final")} />}
        </>
    )
}