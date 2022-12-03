import './App.css';
import { useState } from 'react';


import create from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

import { sampleSize } from 'lodash';

import Taskbar from './taskbar/taskbar';
import Map from './map/Map';
import Tree from './tree/Tree';
import PopupCollection from './popup/PopupCollection';

import { TreeStructure, convertPythonTree } from './tree/TreeStructure';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

import './taskbar/taskbar.css';

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten);
const aiTreeStructure = convertPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"));

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

  const [showUserRentEstimate, setShowUserRentEstimate] = useState(false);
  const [showAIRentEstimate, setShowAIRentEstimate] = useState(false);
  const [userRentEstimate, setUserRentEstimate] = useState(undefined);
  const [aiRentEstimate, setAIRentEstimate] = useState(undefined);

  const [continueHandler, setContinueHandler] = useState(undefined);


  const comparisonScreenStates = ["showAITree", "initiateAnimatedComparison", "animatedComparison", "initiateQuantitativeComparison", "quantitativeComparison"];

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

  const propagateTestpoint = (x, y, doneCallback) => {
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
          doneCallback();
        }
      })
    }, maxDelay + 1000);
  }

  const orchestrateComparison = () => {
    const numPoints = 3;
    const randomPoints = sampleSize(mietdaten, numPoints);
    let thirdCallback = () => setScreenState("initiateQuantitativeComparison");
    let secondCallback = () => propagateTestpoint(randomPoints[2][0], randomPoints[2][1], thirdCallback);
    let firstCallback = () => propagateTestpoint(randomPoints[1][0], randomPoints[1][1], secondCallback);
    propagateTestpoint(randomPoints[0][0], randomPoints[0][1], firstCallback);
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

  return (
    <div className="column-container">
      <PopupCollection screenState={screenState} setScreenState={setScreenState} setContinueHandler={setContinueHandler} orchestrateComparison={orchestrateComparison} />
      <div className="column-static" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
        <div class="headers" style={{ position: "absolute", left: `${20}%` }}>
          WG-Zimmer in Tübingen
        </div>
        {screenState === "initialScreen" &&
          <Taskbar cleanUp={cleanUp}
            complete={() => {
              setScreenState("userTreeCompleted");
            }}
            undo={undo} />
        }
        <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={((screenState === "initialScreen"))} />
      </div>

      <div className="column flex flex-col justify-between" style={{ backgroundColor: 'white' }}>
        <div>
          <div class="headers">
            Dein Entscheidungsbaum<br />
            {(screenState === "quantitativeComparison") &&
              <div>
                Durchschnittsdifferenz +/-: {`${overall_avg_difference(userTree.structure)}€`}
              </div>}
          </div>
          <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
          {showUserRentEstimate &&
            <p>Dein Baum schätzt: {userRentEstimate.toFixed(1)}€</p>
          }
        </div>
        {
          (comparisonScreenStates.includes(screenState)) &&
          <div>
            <div class="headers">
              KI Entscheidungsbaum<br />
              {(screenState === "quantitativeComparison") &&
                <div>
                  Durchschnittsdifferenz +/-: {`${overall_avg_difference(aiTree.structure)}€`}
                </div>}
            </div>
            <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} />
            {showAIRentEstimate &&
              <p>Der KI-Baum schätzt: {aiRentEstimate.toFixed(1)}€</p>
            }
          </div>
        }
      </div>

      {
        (comparisonScreenStates.includes(screenState)) &&
        <div className="column-static">
          <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} />
        </div>
      }

      {
        (continueHandler !== undefined) &&
        <div className="absolute hover:cursor-pointer bg-green-700 rounded-3xl top-3/4 left-3/4 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white" style={{ fontSize: "100px" }} onClick={
          () => {
            continueHandler.handler();
            setContinueHandler(undefined);
          }
        }>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      }
    </div>

  );
}

export default App;
