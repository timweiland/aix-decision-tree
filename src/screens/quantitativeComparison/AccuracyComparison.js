import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faRobot } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames";

export default function AccuracyComparison({avgDiffUser, avgDiffAI}) {
    const isUserBetter = avgDiffUser < avgDiffAI;
    const isAIBetter = avgDiffUser > avgDiffAI;
    return (
        <div className="stats shadow-md bg-gray-50">
            <div className="stat">
                <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faPerson} /></div>
                <div className="stat-title">Deine Genauigkeit</div>
                <div className={classNames("stat-value", { "text-green-700": isUserBetter, "text-orange-700": isAIBetter })}>{"+/- " + avgDiffUser + "€"}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faRobot} /></div>
                <div className="stat-title">KI-Genauigkeit</div>
                <div className={classNames("stat-value", { "text-green-700": isAIBetter, "text-orange-700": isUserBetter })}>{"+/- " + avgDiffAI + "€"}</div>
            </div>
        </div>
    )
}