import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faRobot, faHouse } from '@fortawesome/free-solid-svg-icons';

function displayedRent(rent) {
    return Number(rent).toFixed(1).replace(".", ",");
}

export default function PredictionComparison({showUserRentEstimate, userRentEstimate, testPoint, showTrueRent, showAIRentEstimate, aiRentEstimate, highlightAll, highlightUser, highlightAI}) {
    return (
        <div className="relative stats shadow-md bg-gray-50">
            {highlightAll && <div className="absolute h-full w-full rounded-lg border-8 border-red-500 animate-pulse"/> }
            <div className="stat relative">
                {highlightUser && <div className="absolute h-full w-full rounded-lg border-8 border-red-500 animate-pulse"/>}
                <div className="stat-title">Deine Schätzung</div>
                <div class="stat-value text-3xl">{showUserRentEstimate ? displayedRent(userRentEstimate) + "€" : "..."}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Echter Mietpreis</div>
                <div class="stat-value text-3xl">{(testPoint && showTrueRent) ? displayedRent(testPoint[2]) + "€" : "?"}</div>
            </div>
            <div className="stat relative">
                {highlightAI && <div className="absolute h-full w-full rounded-lg border-8 border-red-500 animate-pulse"/>}
                <div className="stat-title">KI-Schätzung</div>
                <div class="stat-value text-3xl">{showAIRentEstimate ? displayedRent(aiRentEstimate) + "€" : "..."}</div>
            </div>
        </div>
    )
}