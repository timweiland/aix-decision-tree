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
                <p>Super!</p>
                <p>Jetzt siehst du, wie die KI die Stadt in Bereiche mit unterschiedlich hohen Mieten unterteilt.</p>
            </Popup>
        }
        {
            (screenState === "initiateAnimatedComparison") &&
            <Popup closeCallback={() => {
                setScreenState("animatedComparison");
                orchestrateComparison();
                //setTimeout(() => setScreenState("animatedComparison"), 10 * 1000);
            }} icon={<FontAwesomeIcon icon={faCheck} className="w-full h-full ring-2 ring-black rounded-full p-2 bg-gray-300 text-green-400" />}>
                <p>Zuerst hast du die Stadt in Bereiche mit ähnlich hohen Mieten unterteilt und so deinen Entscheidungsbaum erstellt.</p>
                <p>Dann hast du die Lösung der KI gesehen.</p>
                <p>Jetzt möchten wir beide Lösungen vergleichen. Welcher Entscheidungsbaum schätzt die Mieten besser?</p>
                <p>Schauen wir uns die Schätzungen für drei verschiedene WG-Zimmer an.</p>
            </Popup>
        }
        {
            (screenState === "initiateQuantitativeComparison") &&
            <Popup closeCallback={() => {
                setScreenState("quantitativeComparison");
            }} icon={<FontAwesomeIcon icon={faCheck} className="w-full h-full ring-2 ring-black rounded-full p-2 bg-gray-300 text-green-400" />}>
                <p>Welcher Entscheidungsbaum hat dich bisher mehr überzeugt?</p>
                <p>Jetzt schauen wir uns an, wie sehr die Schätzungen beider Entscheidungsbäume im Durchschnitt von den echten Mieten abweichen.</p>
            </Popup>
        }
    </>
}