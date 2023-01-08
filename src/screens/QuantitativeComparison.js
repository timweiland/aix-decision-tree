import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faRobot, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

import ColumnContainer from '../columns/ColumnContainer';
import MapColumn from '../columns/MapColumn';
import TreeColumn from '../columns/TreeColumn';

import Map from '../map/Map';
import Tree from '../tree/Tree';

import Bob from '../mascots/Bob';
import Alice from '../mascots/Alice';

import classNames from 'classnames';

const overall_avg_difference = (tree) => {
    const leaves = tree.get_leaves();
    let difference = 0;
    let numNonEmpty = 0;
    leaves.forEach((leaf) => {
        if (leaf.avgDiff !== "?") {
            difference += leaf.points.length * leaf.avgDiff;
            numNonEmpty += leaf.points.length;
        }
    });

    return Number((difference / numNonEmpty).toFixed(1));
}

export function QuantitativeComparison({ mietdaten, userTree, aiTree }) {
    let bobMessage = undefined;
    let aliceMessage = undefined;
    let bobExcited = false;
    let aliceExcited = false;

    let avgDiffUser = 0;
    let avgDiffAI = 0;
    let isUserBetter = false;
    let isAIBetter = false;

    avgDiffUser = overall_avg_difference(userTree.structure);
    avgDiffAI = overall_avg_difference(aiTree.structure);
    if (avgDiffUser < avgDiffAI) {
        bobMessage = "Juhu! Wir haben die KI geschlagen! Toll gemacht!";
        bobExcited = true;
        aliceMessage = "Wow, du bist echt gut!";
        isUserBetter = true;
    }
    else if (avgDiffUser > avgDiffAI) {
        bobMessage = "Guter Versuch! Wollen wir es nochmal probieren?";
        aliceMessage = "Nicht schlecht! Aber meine KI ist ein bisschen genauer.";
        isAIBetter = true;
    }
    else {
        bobMessage = "Hey, die beiden Bäume sind gleich gut!";
        aliceMessage = "Was ein Zufall!";
    }

    return (
        <ColumnContainer>
            <MapColumn>
                <Map coordinates={mietdaten} tree={userTree.structure} enableInteraction={false} />
                {
                    bobMessage &&
                    <Bob message={bobMessage} excited={bobExcited} />
                }
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <div className="text-black text-lg absolute left-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faArrowsLeftRight} className="align-middle w-20 h-20" /></div>
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
                </div>
                <div className="stats shadow-md bg-gray-50">
                    <div className="stat">
                        <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faPerson} /></div>
                        <div className="stat-title">Deine Genauigkeit</div>
                        <div className={classNames("stat-value", { "text-green-700": isUserBetter, "text-orange-700": isAIBetter })}>{"+/- " + overall_avg_difference(userTree.structure) + "€"}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faRobot} /></div>
                        <div className="stat-title">KI-Genauigkeit</div>
                        <div className={classNames("stat-value", { "text-green-700": isAIBetter, "text-orange-700": isUserBetter })}>{"+/- " + overall_avg_difference(aiTree.structure) + "€"}</div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-black text-lg absolute right-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faArrowsLeftRight} className="align-middle w-20 h-20" /></div>
                    <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} />
                </div>
            </TreeColumn>
            <MapColumn>
                <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} />
                {
                    aliceMessage &&
                    <Alice message={aliceMessage} excited={aliceExcited} />
                }
            </MapColumn>
        </ColumnContainer>
    )
}