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
                <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faPerson} /></div>
                <div className="stat-title">Deine Vorhersage</div>
                <div class="stat-value">{showUserRentEstimate ? displayedRent(userRentEstimate) + "€" : "..."}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faHouse} /></div>
                <div className="stat-title">Echter Mietpreis</div>
                <div class="stat-value">{(testPoint && showTrueRent) ? displayedRent(testPoint[2]) + "€" : "?"}</div>
            </div>
            <div className="stat relative">
                {highlightAI && <div className="absolute h-full w-full rounded-lg border-8 border-red-500 animate-pulse"/>}
                <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faRobot} /></div>
                <div className="stat-title">KI-Vorhersage</div>
                <div class="stat-value">{showAIRentEstimate ? displayedRent(aiRentEstimate) + "€" : "..."}</div>
            </div>
        </div>
    )
}