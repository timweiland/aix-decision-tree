import "./App.css";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import create from "zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import {
  TreeStructure,
  convertPythonTree,
  clipPythonTree,
} from "./tree/TreeStructure";
import aiPythonTree from "./python/aiPythonTree.json";
import mietdatenJSON from "./python/mietdaten.json";

import "./taskbar/taskbar.css";
import Tutorial from "./screens/Tutorial";
import InitialScreen from "./screens/InitialScreen";
import { ShowAITree } from "./screens/ShowAITree";
import QualitativeComparison from "./screens/qualitativeComparison/QualitativeComparison";
import { QuantitativeComparison } from "./screens/quantitativeComparison/QuantitativeComparison";
import FinalScreen from "./screens/FinalScreen2";

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten, "user");
const aiTreeStructure = convertPythonTree(
  aiPythonTree,
  new TreeStructure([0, 0, 100, 100], mietdaten, "ai", "ai-root")
);
const aiTreeClipped2 = convertPythonTree(
  aiPythonTree,
  new TreeStructure([0, 0, 100, 100], mietdaten, "ai", "ai-root"),
  2
);
const aiTreeClipped1 = convertPythonTree(
  aiPythonTree,
  new TreeStructure([0, 0, 100, 100], mietdaten, "ai", "ai-root"),
  1
);
const aiTreeClipped0 = convertPythonTree(
  aiPythonTree,
  new TreeStructure([0, 0, 100, 100], mietdaten, "ai", "ai-root"),
  0
);

const showAITreeStore = create((set) => ({
  show: false,
  toggle: (val) => set((state) => ({ show: val })),
}));

const userSplitStore = create((set) => ({
  stack: [],
  push: (val) => set((state) => ({ stack: [...state.stack, val] })),
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clean: () => set((state) => ({ stack: [] })),
}));

function App() {
  const [userTree, setUserTreeState] = useState({
    structure: initialStructure,
    toggle: false,
  });
  const [screenState, setScreenState] = useState("tutorial");

  const [continueHandler, setContinueHandler] = useState(undefined);
  const [inactivityTime, setInactivityTime] = useState(0);

  const setUserTree = (tree) => {
    setUserTreeState({ structure: tree, toggle: !userTree.toggle });
  };

  const [aiTree, setAITree] = useState({
    structure: aiTreeStructure,
    toggle: false,
  });
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
  };

  const highlightNode = (node) => {
    const idx = node.idx;
    userTree.structure.find_idx(idx).isSelected = true;
    setUserTree(userTree.structure);
  };

  const unhighlightAll = () => {
    userTree.structure.unhighlightAll();
    setUserTree(userTree.structure);
  };

  const undo = () => {
    if (userSplitStack.length === 0) {
      return;
    }
    const last_split = userSplitStack[userSplitStack.length - 1];
    const node = userTree.structure.find_idx(last_split);
    node.delete_children();
    setUserTree(userTree.structure);
    popUserSplit();
  };

  const cleanUp = () => {
    userTree.structure.reset();
    setUserTree(userTree.structure);
    cleanUserSplit();
    toggleAITree(false);
  };

  const openTutorial = () => {
    cleanUp();
    setScreenState("tutorial");
  };

  const restartWithoutTutorial = () => {
    cleanUp();
    setScreenState("initialScreen");
  };

  const exitApp = () => {
    window.location.replace("/");
  };

  const resetTime = 150; // seconds
  useEffect(() => {
    const inactivityInterval = setInterval(() => {
      setInactivityTime((inactivityTime) => inactivityTime + 1);
    }, 1000);

    const resetTimer = () => {
      setInactivityTime(0);
    };

    document.addEventListener("click", resetTimer);

    return () => {
      clearInterval(inactivityInterval);
      document.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    if (inactivityTime > resetTime) {
      exitApp();
    }
  }, [inactivityTime]);

  return (
    <div className="h-screen flex">
      {screenState === "tutorial" && (
        <Tutorial
          cleanUp={cleanUp}
          userTree={userTree}
          mietdaten={mietdaten}
          undo={undo}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          onComplete={() => setScreenState("initialScreen")}
        />
      )}
      {screenState === "initialScreen" && (
        <InitialScreen
          cleanUp={cleanUp}
          userTree={userTree}
          mietdaten={mietdaten}
          undo={undo}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          onComplete={() => setScreenState("showAITree")}
          openTutorial={openTutorial}
        />
      )}
      {screenState === "showAITree" && (
        <ShowAITree
          mietdaten={mietdaten}
          userTree={userTree}
          aiTree={aiTree}
          continueHandler={continueHandler}
          setContinueHandler={setContinueHandler}
          aiTreeClipped0={aiTreeClipped0}
          aiTreeClipped1={aiTreeClipped1}
          aiTreeClipped2={aiTreeClipped2}
          onComplete={() => setScreenState("qualitativeComparison")}
        />
      )}
      {screenState === "qualitativeComparison" && (
        <QualitativeComparison
          mietdaten={mietdaten}
          userTree={userTree}
          setUserTree={setUserTree}
          aiTree={aiTree}
          setAITree={setAITree}
          setContinueHandler={setContinueHandler}
          onComplete={() => setScreenState("quantitativeComparison")}
        />
      )}
      {screenState === "quantitativeComparison" && (
        <QuantitativeComparison
          mietdaten={mietdaten}
          userTree={userTree}
          aiTree={aiTree}
          setContinueHandler={setContinueHandler}
          onComplete={() => setScreenState("finalScreen")}
        />
      )}
      {screenState === "finalScreen" && (
        <FinalScreen
          restartWithoutTutorial={restartWithoutTutorial}
          exitApp={exitApp}
        />
      )}
      {continueHandler !== undefined && (
        <div
          className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
          style={{ fontSize: "60px" }}
          onClick={() => {
            continueHandler.handler();
            setContinueHandler(undefined);
          }}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      )}
      {(continueHandler !== undefined ||
        screenState === "quantitativeComparison") && (
        <div
          className="absolute hover:cursor-pointer bg-red-700 rounded-2xl top-10 right-10 pl-8 pr-8 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <Link to="/" style={{ textDecoration: "none" }} onClick={cleanUp}>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default App;
