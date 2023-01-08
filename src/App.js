import './App.css';
import { useState } from 'react';

import { Link } from "react-router-dom";
import create from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

import { TreeStructure, convertPythonTree, clipPythonTree } from './tree/TreeStructure';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

import './taskbar/taskbar.css';
import InitialScreen from './screens/InitialScreen';
import { ShowAITree } from './screens/ShowAITree';
import QualitativeComparison from './screens/qualitativeComparison/QualitativeComparison';
import { QuantitativeComparison } from './screens/QuantitativeComparison';

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

  const [continueHandler, setContinueHandler] = useState(undefined);

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

  const cleanUp = () => {
    userTree.structure.reset()
    setUserTree(userTree);
    cleanUserSplit();
    toggleAITree(false);
  }


  console.log("Screen state:");
  console.log(screenState);

  return (
    <div className="h-screen flex">
      {/* <PopupCollection screenState={screenState} setScreenState={setScreenState} setContinueHandler={setContinueHandler} orchestrateComparison={orchestrateComparison} /> */}

      { screenState === "initialScreen" &&
      <InitialScreen cleanUp={cleanUp} userTree={userTree} mietdaten={mietdaten} undo={undo} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} onComplete={() => setScreenState("showAITree")} />}
      { screenState === "showAITree" &&
      <ShowAITree mietdaten={mietdaten} userTree={userTree} aiTree={aiTree} continueHandler={continueHandler} setContinueHandler={setContinueHandler} aiTreeClipped0={aiTreeClipped0} aiTreeClipped1={aiTreeClipped1} aiTreeClipped2={aiTreeClipped2} onComplete={() => setScreenState("qualitativeComparison")}/>}
      { screenState === "qualitativeComparison" &&
      <QualitativeComparison mietdaten={mietdaten} userTree={userTree} setUserTree={setUserTree} aiTree={aiTree} setAITree={setAITree} setContinueHandler={setContinueHandler} onComplete={() => setScreenState("quantitativeComparison")} />}
      { screenState === "quantitativeComparison" &&
      <QuantitativeComparison mietdaten={mietdaten} userTree={userTree} aiTree={aiTree} />}
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
