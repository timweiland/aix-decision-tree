import { useState, useEffect } from "react";
import Lottie from "lottie-react";

import PredictionComparison from "./PredictionComparison";
import ColumnContainer from "../../columns/ColumnContainer";
import MapColumn from "../../columns/MapColumn";
import TreeColumn from "../../columns/TreeColumn";

import Map from "../../map/Map";
import Tree from "../../tree/Tree";

import Alice from "../../mascots/Alice";
import Bob from "../../mascots/Bob";

import confettiAnimation from "../../assets/confetti_anim.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function displayedRent(rent) {
  return Number(rent).toFixed(1).replace(".", ",");
}

export default function NoExplanation({
  mietdaten,
  userTree,
  setUserTree,
  aiTree,
  setAITree,
  testPoint,
  onComplete,
}) {
  const x = testPoint[0];
  const y = testPoint[1];
  const [screenState, setScreenState] = useState("intro");
  const [showTrueRent, setShowTrueRent] = useState(false);
  const [showUserRentEstimate, setShowUserRentEstimate] = useState(false);
  const [showAIRentEstimate, setShowAIRentEstimate] = useState(false);
  const [userRentEstimate, setUserRentEstimate] = useState(undefined);
  const [aiRentEstimate, setAIRentEstimate] = useState(undefined);
  const [bobMessage, setBobMessage] = useState(undefined);
  const [bobExcited, setBobExcited] = useState(false);
  const [aliceMessage, setAliceMessage] = useState(undefined);
  const [aliceExcited, setAliceExcited] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [continueHandler, setContinueHandler] = useState(undefined);
  const [skipHandler, setSkipHandler] = useState(undefined);

  const aiPath = aiTree.structure.get_path(x, y);
  const userPath = userTree.structure.get_path(x, y);

  const delay = 2000;

  const computeEstimates = () => {
    const userNode = userTree.structure.find(x, y);
    userNode.hasTestPoint = true;
    setUserRentEstimate(userNode.avgRent);
    setUserTree(userTree.structure);
    setShowUserRentEstimate(true);

    const aiNode = aiTree.structure.find(x, y);
    aiNode.hasTestPoint = true;
    setAIRentEstimate(aiNode.avgRent);
    setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
    setShowAIRentEstimate(true);
  };

  const cleanTestpoints = () => {
    userTree.structure.removeTestPoints();
    setUserTree(userTree.structure);
    aiTree.structure.removeTestPoints();
    setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
  };

  useEffect(() => {
    if (screenState === "intro") {
      setBobMessage(
        "Jetzt wollen wir den Mietpreis für diese Wohnung (gelber Punkt) wissen."
      );
      setContinueHandler({
        handler: () => {
          setScreenState("followUserPath");
          setSkipHandler(undefined);
        },
      });
      setSkipHandler({
        handler: () => {
          computeEstimates();
          setScreenState("final");
        },
      });
    } else if (screenState === "followUserPath") {
      setBobMessage(undefined);
      setSkipHandler(undefined);
      userPath.forEach((node, node_idx) => {
        setTimeout(() => {
          userTree.structure.removeTestPoints();
          userTree.structure.find_idx(node.idx).hasTestPoint = true;
          setUserTree(userTree.structure);
          if (node_idx === userPath.length - 1) {
            setTimeout(() => {
              setUserRentEstimate(node.avgRent);
              setShowUserRentEstimate(true);
              setBobMessage(
                `Unser Baum schätzt eine Miete von ${displayedRent(
                  node.avgRent
                )}€.`
              );
              setAliceMessage("Mal sehen, was mein KI-Baum schätzt.");
              setContinueHandler({
                handler: () => setScreenState("followAlicePath"),
              });
            }, 1000);
          }
        }, delay * node_idx);
      });
    } else if (screenState === "followAlicePath") {
      setBobMessage(undefined);
      setAliceMessage(undefined);
      setSkipHandler(undefined);
      aiPath.forEach((node, node_idx) => {
        setTimeout(() => {
          aiTree.structure.removeTestPoints();
          aiTree.structure.find_idx(node.idx).hasTestPoint = true;
          setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
          if (node_idx === aiPath.length - 1) {
            setTimeout(() => {
              setAIRentEstimate(node.avgRent);
              setShowAIRentEstimate(true);
              setBobMessage("Und welche Schätzung ist jetzt genauer?");
              setAliceMessage(
                `Mein KI-Baum schätzt eine Miete von ${displayedRent(
                  node.avgRent
                )}€.`
              );
              setContinueHandler({
                handler: () => {
                  cleanTestpoints();
                  setScreenState("final");
                },
              });
            }, 1000);
          }
        }, delay * node_idx);
      });
    } else if (screenState === "final") {
      const trueRent = testPoint[2];
      setShowTrueRent(true);
      const userError = (userRentEstimate - trueRent) ** 2;
      const aiError = (aiRentEstimate - trueRent) ** 2;
      if (userError < aiError) {
        setConfetti(true);
        setBobMessage("Super! Diese Miete haben wir genauer vorhergesagt!");
        setBobExcited(true);
        setAliceMessage("Oh, da hast du meine KI wohl geschlagen!");
      } else if (userError > aiError) {
        setBobMessage(
          "Da sind wir ein bisschen ungenauer. Aber das muss nichts heißen!"
        );
        setAliceMessage(
          "Bei dieser Miete liegt meine KI ein bisschen näher dran."
        );
        setAliceExcited(true);
      } else {
        setBobMessage("Erstaunlich!");
        setAliceMessage("Hier treffen beide Bäume die gleiche Schätzung!");
      }
      setSkipHandler(undefined);
      setContinueHandler({
        handler: () => {
          cleanTestpoints();
          onComplete();
        },
      });
    }
  }, [screenState]);

  return (
    <ColumnContainer>
      {confetti && (
        <Lottie
          className="absolute h-screen w-screen z-40"
          animationData={confettiAnimation}
          loop={false}
        />
      )}
      <MapColumn>
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          enableInteraction={false}
          testPoint={testPoint}
          hide={screenState === "followAlicePath"}
        />
        {bobMessage && <Bob message={bobMessage} excited={bobExcited} />}
      </MapColumn>

      <TreeColumn>
        <div className="mt-4">
          <Tree
            structure={userTree.structure}
            colors={userTree.structure.get_colors()}
            hide={screenState === "followAlicePath"}
            arrow="left"
          />
        </div>
        <PredictionComparison
          showUserRentEstimate={showUserRentEstimate}
          userRentEstimate={userRentEstimate}
          testPoint={testPoint}
          showTrueRent={showTrueRent}
          showAIRentEstimate={showAIRentEstimate}
          aiRentEstimate={aiRentEstimate}
          highlightAll={screenState === "final"}
          highlightUser={
            screenState === "followUserPath" && showUserRentEstimate
          }
          highlightAI={screenState === "followAlicePath" && showAIRentEstimate}
        />
        <div className="mt-2">
          <Tree
            structure={aiTree.structure}
            colors={aiTree.structure.get_colors()}
            arrow="right"
            hide={screenState === "followUserPath" || screenState === "intro"}
          />
        </div>
      </TreeColumn>

      <MapColumn>
        <Map
          coordinates={mietdaten}
          tree={aiTree.structure}
          enableInteraction={false}
          testPoint={testPoint}
          hide={screenState === "followUserPath" || screenState === "intro"}
        />
        {aliceMessage && (
          <Alice message={aliceMessage} excited={aliceExcited} />
        )}
      </MapColumn>

      <div className="flex absolute bottom-10 right-10 flex-col">
        {skipHandler !== undefined && (
          <div
            className="hover:cursor-pointer bg-yellow-500 rounded-2xl pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white font-medium h-25 z-50 border-transparent mb-4 text-center"
            style={{ fontSize: "60px" }}
            onClick={() => {
              skipHandler.handler();
              setSkipHandler(undefined);
            }}
          >
            Direkt zur Auflösung
          </div>
        )}
        {continueHandler !== undefined && screenState === "intro" && (
          <div
            className="hover:cursor-pointer bg-green-700 rounded-2xl pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white font-medium h-25 z-50 border-transparent text-center"
            style={{ fontSize: "60px" }}
            onClick={() => {
              continueHandler.handler();
              setContinueHandler(undefined);
            }}
          >
            Schritt für Schritt
          </div>
        )}
        {continueHandler !== undefined && screenState !== "intro" && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-0 right-0 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
            onClick={() => {
              continueHandler.handler();
              setContinueHandler(undefined);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
      </div>
    </ColumnContainer>
  );
}
