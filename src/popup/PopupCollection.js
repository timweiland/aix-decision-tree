import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Popup from "./Popup";

export default function PopupCollection({ screenState, setScreenState, setContinueHandler, orchestrateComparison }) {
    return <>
        {
            (screenState === "userTreeCompleted") &&
            <Popup closeCallback={() => {
                setScreenState("showAITree")
                setContinueHandler({ handler: () => setScreenState("initiateAnimatedComparison") });
                //setTimeout(() => setScreenState("initiateAnimatedComparison"), 10 * 1000);
            }} icon={<FontAwesomeIcon icon={faCheck} className="w-full h-full ring-2 ring-black rounded-full p-2 bg-gray-300 text-green-400" />}>
                <p>Super! Dann siehst du jetzt den Entscheidungsbaum der KI.</p>
            </Popup>
        }
        {
            (screenState === "initiateAnimatedComparison") &&
            <Popup closeCallback={() => {
                setScreenState("animatedComparison");
                orchestrateComparison();
                //setTimeout(() => setScreenState("animatedComparison"), 10 * 1000);
            }} icon={<FontAwesomeIcon icon={faCheck} className="w-full h-full ring-2 ring-black rounded-full p-2 bg-gray-300 text-green-400" />}>
                <p>Jetzt hast du deinen Baum und den Baum der KI gesehen - und erste Ähnlichkeiten und Unterschiede bemerkt.</p>
                <p>Wie gut schätzen sie die Mieten?</p>
                <p>Schauen wir es uns einmal an - zuerst beispielhaft für einige Zimmer.</p>
            </Popup>
        }
        {
            (screenState === "initiateQuantitativeComparison") &&
            <Popup closeCallback={() => {
                setScreenState("quantitativeComparison");
            }} icon={<FontAwesomeIcon icon={faCheck} className="w-full h-full ring-2 ring-black rounded-full p-2 bg-gray-300 text-green-400" />}>
                <p>... und jetzt schauen wir uns an, wie sich die beiden Bäume insgesamt im Durchschnitt verhalten.</p>
            </Popup>
        }
    </>
}