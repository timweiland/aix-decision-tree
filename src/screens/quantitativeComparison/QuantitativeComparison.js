import { useEffect, useState, useRef } from 'react';
import Lottie from "lottie-react";

import ColumnContainer from '../../columns/ColumnContainer';
import MapColumn from '../../columns/MapColumn';
import TreeColumn from '../../columns/TreeColumn';

import Map from '../../map/Map';
import Tree from '../../tree/Tree';

import Bob from '../../mascots/Bob';
import Alice from '../../mascots/Alice';

import AccuracyComparison from './AccuracyComparison';

import drumrollAnimation from '../../assets/drumroll_anim.json';

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

export function QuantitativeComparison({ mietdaten, userTree, aiTree, setContinueHandler, onComplete }) {
    const [screenState, setScreenState] = useState("drumroll");
    const [cancelDrumroll, setCancelDrumroll] = useState(false);
    const [bobMessage, setBobMessage] = useState(undefined);
    const [bobExcited, setBobExcited] = useState(false);
    const [aliceMessage, setAliceMessage] = useState(undefined);
    const [aliceExcited, setAliceExcited] = useState(false);

    const lottieRef = useRef();

    let avgDiffUser = 0;
    let avgDiffAI = 0;

    avgDiffUser = overall_avg_difference(userTree.structure);
    avgDiffAI = overall_avg_difference(aiTree.structure);

    let isUserBetter = avgDiffUser < avgDiffAI;
    let isAIBetter = avgDiffUser > avgDiffAI;

    useEffect(() => {
        if (screenState === "drumroll") {
            setTimeout(() => {
                if (!cancelDrumroll) {
                    setCancelDrumroll(true)
                    setScreenState("revealComparison");
                }
            }, 1000 * 3);
            setBobMessage(undefined);
            setAliceMessage(undefined);
        }
        else if (screenState === "revealComparison") {
            if (isUserBetter) {
                setBobMessage("Juhu! Wir haben die KI geschlagen! Toll gemacht!");
                setBobExcited(true);
                setAliceMessage("Wow, du bist echt gut!");
            }
            else if (isAIBetter) {
                setBobMessage("Guter Versuch! Wollen wir es nochmal probieren?");
                setAliceMessage("Nicht schlecht! Aber meine KI ist ein bisschen genauer.");
            }
            else {
                setBobMessage("Hey, die beiden Bäume sind gleich gut!");
                setAliceMessage("Bravo!");
            }
            setContinueHandler({ handler: onComplete });
        }
    }, [screenState, cancelDrumroll, lottieRef]);

    if(lottieRef.current) {
        lottieRef.current.setSpeed(3);
    }
    return (
        <ColumnContainer>
            {screenState === "drumroll" && <div className="absolute h-screen w-screen bg-gray-400 opacity-60 z-20" />}
            <MapColumn>
                <Map coordinates={mietdaten} tree={userTree.structure} enableInteraction={false} hide={screenState==="revealComparison"} />
                <Bob message={bobMessage} excited={bobExcited} />
            </MapColumn>

            <TreeColumn>
                <div className="mt-4">
                    <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} arrow="left" hide={screenState==="revealComparison"} />
                </div>
                {screenState === "drumroll" && !cancelDrumroll && <Lottie className="absolute z-50 h-80 w-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" animationData={drumrollAnimation} loop={true} lottieRef={lottieRef}/>}
                {screenState === "revealComparison" && <AccuracyComparison avgDiffUser={avgDiffUser} avgDiffAI={avgDiffAI} />}
                <div className="mt-2">
                    <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} arrow="right" hide={screenState==="revealComparison"} />
                </div>
            </TreeColumn>
            <MapColumn>
                <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} hide={screenState==="revealComparison"} />
                <Alice message={aliceMessage} excited={aliceExcited} />
            </MapColumn>
        </ColumnContainer>
    )
}