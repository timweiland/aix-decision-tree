import './App.css';
import { useState } from 'react';

import { Link } from "react-router-dom";
import create from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong, faPerson, faRobot, faHouse, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

import { sampleSize } from 'lodash';

import Taskbar from './taskbar/taskbar';
import Map from './map/Map';
import Tree from './tree/Tree';
import PopupCollection from './popup/PopupCollection';

import Bob from './mascots/Bob';
import Alice from './mascots/Alice';

import { TreeStructure, convertPythonTree,clipPythonTree } from './tree/TreeStructure';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

import './taskbar/taskbar.css';
import classNames from 'classnames';

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten);
const aiTreeStructure = convertPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"));
const aiTreeClipped2 = clipPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"), 2);
const aiTreeClipped1 = clipPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"), 1);
const aiTreeClipped0 = clipPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"), 0);


const showAITreeStore = create((set) => ({
  show: false,
  toggle: (val) => set((state) => ({ show: val }))
}));

const userSplitStore = create((set) => ({
  stack: [],
  push: (val) => set((state) => ({ stack: [...state.stack, val] })),
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clean: () => set((state) => ({ stack: [] }))
}));


function App() {
  const [userTree, setUserTreeState] = useState({ structure: initialStructure, toggle: false });
  const [screenState, setScreenState] = useState("initialScreen");

  const [testPoint, setTestPoint] = useState(undefined);
  const [showUserRentEstimate, setShowUserRentEstimate] = useState(false);
  const [showAIRentEstimate, setShowAIRentEstimate] = useState(false);
  const [userRentEstimate, setUserRentEstimate] = useState(undefined);
  const [aiRentEstimate, setAIRentEstimate] = useState(undefined);

  const [continueHandler, setContinueHandler] = useState(undefined);


  const comparisonScreenStates = ["showAITree0","showAITree1","showAITree2","showAITree3", "qualitativeComparison", "initiateQuantitativeComparison", "quantitativeComparison"];

  const setUserTree = (tree) => {
    setUserTreeState({ structure: tree, toggle: !userTree.toggle });
  }

  const [aiTree, setAITree] = useState({ structure: aiTreeStructure, toggle: false });
  /*const compareTrees = compareAITreeStore((state) => state.show);*/
  const toggleAITree = showAITreeStore((state) => state.toggle);
  const userSplitStack = userSplitStore((state) => state.stack);
  const pushUserSplit = userSplitStore((state) => state.push);
  const popUserSplit = userSplitStore((state) => state.pop);
  const cleanUserSplit = userSplitStore((state) => state.clean);


  const splitTree = (idx, axis, pos, line) => {
    const node = userTree.structure.find_idx(idx);
    node.split(axis, pos);
    setUserTree(userTree.structure);
    pushUserSplit(idx);
  }

  const highlightNode = (node) => {
    const idx = node.idx;
    userTree.structure.find_idx(idx).isSelected = true;
    setUserTree(userTree.structure);
  }

  const unhighlightAll = () => {
    userTree.structure.unhighlightAll();
    setUserTree(userTree.structure);
  }

  const undo = () => {
    if (userSplitStack.length === 0) {
      return;
    }
    const last_split = userSplitStack[userSplitStack.length - 1]
    const node = userTree.structure.find_idx(last_split);
    node.delete_children();
    setUserTree(userTree.structure);
    popUserSplit();
  }

  const propagateTestpoint = (x, y, rent, doneCallback) => {
    setTestPoint([x, y, rent]);
    const aiPath = aiTree.structure.get_path(x, y);
    const delay = 2000;
    aiPath.forEach((node, node_idx) => {
      setTimeout(() => {
        aiTree.structure.removeTestPoints();
        aiTree.structure.find_idx(node.idx).hasTestPoint = true;
        setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
        if (node_idx === aiPath.length - 1) {
          setTimeout(() => {
            setAIRentEstimate(node.avgRent);
            setShowAIRentEstimate(true);
          }, 1000);
        }
      }, delay * node_idx);
    });

    const userPath = userTree.structure.get_path(x, y);
    userPath.forEach((node, node_idx) => {
      setTimeout(() => {
        userTree.structure.removeTestPoints();
        userTree.structure.find_idx(node.idx).hasTestPoint = true;
        setUserTree(userTree.structure);
        if (node_idx === userPath.length - 1) {
          setTimeout(() => {
            setUserRentEstimate(node.avgRent);
            setShowUserRentEstimate(true);
          }, 1000);
        }
      }, delay * node_idx);
    })

    const maxDelay = (Math.max(aiPath.length, userPath.length) - 1) * delay;
    setTimeout(() => {
      setContinueHandler({
        handler: () => {
          userTree.structure.removeTestPoints();
          aiTree.structure.removeTestPoints();
          setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
          setUserTree(userTree.structure);
          setShowAIRentEstimate(false);
          setShowUserRentEstimate(false);
          setTestPoint(undefined);
          doneCallback();
        }
      });
    }, maxDelay + 1000);
  }

  const orchestrateComparison = () => {
    setScreenState("qualitativeComparison");
    const numPoints = 3;
    const randomLeaves = sampleSize(aiTree.structure.get_leaves(), numPoints);
    //const randomPoints = sampleSize(mietdaten, numPoints);
    const randomPoints = [];
    randomLeaves.forEach((leaf) => {
      const point = sampleSize(leaf.points, 1)[0];
      randomPoints.push(point);
    })
    let thirdCallback = () => setScreenState("initiateQuantitativeComparison");
    let secondCallback = () => propagateTestpoint(randomPoints[2][0], randomPoints[2][1], randomPoints[2][2], thirdCallback);
    let firstCallback = () => propagateTestpoint(randomPoints[1][0], randomPoints[1][1], randomPoints[1][2], secondCallback);
    propagateTestpoint(randomPoints[0][0], randomPoints[0][1], randomPoints[0][2], firstCallback);
  }

  const cleanUp = () => {
    userTree.structure.reset()
    setUserTree(userTree);
    cleanUserSplit();
    toggleAITree(false);
  }

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

  const NoOfUserLines = userTree.structure.get_lines().length;

  let bobMessage = undefined;
  let aliceMessage = undefined;
  let bobExcited = false;
  let aliceExcited = false;

  let avgDiffUser = 0;
  let avgDiffAI = 0;
  let isUserBetter = false;
  let isAIBetter = false;

  if (screenState === "showAITree0") {
    aliceMessage = "Die KI hat dieselbe Ausgangssituation wie du gerade eben. Sie wird nun auch Schritt für Schritt Linien in die Karte einzeichnen. Den Ort der Linie wählt Sie aufgrund eines Kriteriums, welches wir später genauer betrachten werden"
  }

  if (screenState === "showAITree1") {
    aliceMessage = "Zunächst unterteilt die KI das Stadtgebiet mit einer vertikalen Linie. "
  }

  if (screenState === "showAITree2") {
    aliceMessage = "Als nächstes zieht Sie eine horizontale Linie."
  }

  if (screenState === "showAITree3") {
    aliceMessage = "Dies macht die KI auch für die restlichen drei Linien. Auf diesem Screen siehst du die fertige Einteilung der KI."
  }

  if (screenState === "quantitativeComparison") {
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
  }
  else if (showUserRentEstimate && showAIRentEstimate) {
    const trueRent = testPoint[2];
    const userError = (userRentEstimate - trueRent) ** 2;
    const aiError = (aiRentEstimate - trueRent) ** 2;
    if (userError < aiError) {
      bobMessage = "Super! Diese Miete haben wir genauer vorhergesagt!";
      bobExcited = true;
      aliceMessage = "Oh, da hast du meine KI wohl geschlagen!";
    }
    else if (userError > aiError) {
      bobMessage = "Da sind wir ein bisschen ungenauer. Aber das muss nichts heißen!";
      aliceMessage = "Bei dieser Miete liegt meine KI ein bisschen näher dran.";
      aliceExcited = true;
    }
    else {
      bobMessage = "Erstaunlich!";
      aliceMessage = "Hier treffen beide Bäume die gleiche Vorhersage!";
    }
  }

  console.log("Screen state:");
  console.log(screenState);

  return (
    <div className="column-container relative" data-theme="light" >
      <PopupCollection screenState={screenState} setScreenState={setScreenState} setContinueHandler={setContinueHandler} orchestrateComparison={orchestrateComparison} />
      <div className="column-static" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
        {screenState === "initialScreen" &&
          <Taskbar cleanUp={cleanUp}
            complete={() => {
              setScreenState("userTreeCompleted");
            }}
            undo={undo} />
        }
        {(screenState === "initialScreen") && (NoOfUserLines === 5) && setScreenState("userTreeCompleted")}
        <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={((screenState === "initialScreen"))} testPoint={testPoint} />
        {/*
          comparisonScreenStates.includes(screenState) &&
          <div className="text-primary text-6xl absolute top-10 right-10 bg-gray-50 rounded-full p-4 text-center opacity-90 shadow-lg"><FontAwesomeIcon icon={faArrowsLeftRight} className="align-middle w-16 h-16" /></div>
      */}
        {
          bobMessage &&
          <Bob message={bobMessage} excited={bobExcited} />
        }
      </div>

      <div className="column flex flex-col relative justify-between">
        <div className="mt-4">
          {
            (comparisonScreenStates.includes(screenState)) &&
            <div className="text-black text-lg absolute left-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faArrowsLeftRight} className="align-middle w-20 h-20" /></div>
          }
          <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
        </div>
        {
          (screenState === "qualitativeComparison") &&
          <div className="stats shadow-md bg-gray-50">
            <div className="stat">
              <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faPerson} /></div>
              <div className="stat-title">Deine Vorhersage</div>
              <div class="stat-value">{showUserRentEstimate ? Number(userRentEstimate).toFixed(1) + "€" : "..."}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faHouse} /></div>
              <div className="stat-title">Echter Mietpreis</div>
              <div class="stat-value">{testPoint ? Number(testPoint[2]).toFixed(1) + "€" : "?"}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary text-4xl"><FontAwesomeIcon icon={faRobot} /></div>
              <div className="stat-title">KI-Vorhersage</div>
              <div class="stat-value">{showAIRentEstimate ? Number(aiRentEstimate).toFixed(1) + "€" : "..."}</div>
            </div>
          </div>
        }
        {
          (screenState === "quantitativeComparison") &&
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
        }
        {
          (comparisonScreenStates.includes(screenState)) &&
          <div className="mt-2">
            <div className="text-black text-lg absolute right-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faArrowsLeftRight} className="align-middle w-20 h-20" /></div>
            
            {(screenState === "showAITree0") && <Tree structure={aiTreeClipped0} colors={aiTreeClipped0.get_colors()} />}
            {(screenState === "showAITree1") && <Tree structure={aiTreeClipped1} colors={aiTreeClipped1.get_colors()} />}
            {(continueHandler === undefined) && screenState === "showAITree1" && setContinueHandler({ handler: () => setScreenState("showAITree2") })}
            {(screenState === "showAITree2")&& <Tree structure={aiTreeClipped2} colors={aiTreeClipped2.get_colors()} />}
            {(continueHandler === undefined) && screenState === "showAITree2" && setContinueHandler({ handler: () => setScreenState("showAITree3") })}
            {(screenState !== "showAITree0") && (screenState !== "showAITree1") && (screenState !== "showAITree2") &&
              <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} />}
            {(continueHandler === undefined) && screenState === "showAITree3" && setContinueHandler({ handler: () => setScreenState("initiateAnimatedComparison") })}
          </div>
        }
      </div>

      {
        (comparisonScreenStates.includes(screenState)) &&
        <div className="column-static relative">
          {(screenState === "showAITree0") &&  <Map coordinates={mietdaten} tree={aiTreeClipped0} enableInteraction={false} testPoint={testPoint} />}
          {(screenState === "showAITree1") &&  <Map coordinates={mietdaten} tree={aiTreeClipped1} enableInteraction={false} testPoint={testPoint} />}
          {(screenState === "showAITree2") &&  <Map coordinates={mietdaten} tree={aiTreeClipped2} enableInteraction={false} testPoint={testPoint} />}
          {(screenState !== "showAITree1") && (screenState !== "showAITree2") &&
            <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} testPoint={testPoint} />}
          {/*<div className="text-primary text-6xl absolute top-10 left-10 bg-gray-50 rounded-full p-4 text-center opacity-90 shadow-lg"><FontAwesomeIcon icon={faRobot} className="align-middle w-16 h-16" /></div>*/}
          {
            aliceMessage &&
            <Alice message={aliceMessage} excited={aliceExcited} />
          }
        </div>
      }

      {
        (continueHandler !== undefined) &&
        <div className="absolute hover:cursor-pointer bg-green-700 bottom-20 right-20 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-32" style={{ fontSize: "100px" }} onClick={
          () => {
            continueHandler.handler();
            setContinueHandler(undefined);
          }
        }>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      }
      {
        (continueHandler !== undefined || screenState === "quantitativeComparison") &&
        <div className="absolute hover:cursor-pointer bg-red-700 rounded-3xl top-20 right-20 pl-16 pr-16 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-40" style={{ fontSize: "100px" }}>
          <Link to="/" style={{ textDecoration: 'none' }} onClick={cleanUp}>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
      }
    </div>

  );
}

export default App;
