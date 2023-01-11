import "./Tutorial.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import create from "zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

import { sampleSize } from "lodash";

import Taskbar from "../taskbar/taskbar";
import Map from "../map/Map";
import Tree from "../tree/Tree";
import PopupCollection from "../popup/PopupCollection";

import bob from "../assets/bob.png";
// import hand from "../assets/hand_emoji.png";
import Xarrow from "react-xarrows";

import {
  TreeStructure,
  convertPythonTree,
  clipPythonTree,
} from "../tree/TreeStructure";
import mietdatenJSON from "../python/mietdaten.json";

import "../taskbar/taskbar.css";
import classNames from "classnames";

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten);

const userSplitStore = create((set) => ({
  stack: [],
  push: (val) => set((state) => ({ stack: [...state.stack, val] })),
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clean: () => set(() => ({ stack: [] })),
}));

function Tutorial() {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [userTree, setUserTreeState] = useState({
    structure: initialStructure,
    toggle: false,
  });
  const [screenState, setScreenState] = useState("initialScreen");

  const [continueHandler, setContinueHandler] = useState(undefined);

  const setUserTree = (tree) => {
    setUserTreeState({ structure: tree, toggle: !userTree.toggle });
  };

  const userSplitStack = userSplitStore((state) => state.stack);
  const popUserSplit = userSplitStore((state) => state.pop);
  const cleanUserSplit = userSplitStore((state) => state.clean);
  const pushUserSplit = userSplitStore((state) => state.push);

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
    setUserTree(userTree);
    cleanUserSplit();
  };

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

  const [Counter, setCounter] = useState(0);

  const NoOfUserLines = userTree.structure.get_lines().length;

  const [ShowArrow, setShowArrow] = useState(true);

  console.log("Screen state:");
  console.log(screenState);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div
      id="columncontainer"
      className="column-container relative"
      data-theme="light"
    >
      <PopupCollection
        screenState={screenState}
        setScreenState={setScreenState}
        setContinueHandler={setContinueHandler}
      />
      <div
        className="column-static"
        style={{
          position: "relative",
          display: "inline-block",
          backgroundColor: "white",
        }}
      >
        <Map
          coordinates={mietdaten}
          tree={userTree.structure}
          splitTree={splitTree}
          highlightNode={highlightNode}
          unhighlightAll={unhighlightAll}
          enableInteraction={Counter === 1 || Counter === 2}
        />

        {/* {Counter === 1 && (
          <img
            src={hand}
            alt="hand"
            style={{ position: "fixed", zIndex: 100 }}
          />
        )} */}

        {screenState === "initialScreen" && (
          <Taskbar
            cleanUp={cleanUp}
            complete={() => {
              setScreenState("userTreeCompleted");
            }}
            undo={undo}
          />
        )}
      </div>

      <div
        id="rightcolumn"
        className="column flex flex-col relative justify-between"
      >
        <div>
          <div className="imgbobsmall">
            <img id="bob" src={bob} alt="bob" />
          </div>

          {Counter >= 3 && (
            <Tree
              structure={userTree.structure}
              colors={userTree.structure.get_colors()}
            />
          )}
        </div>
        {Counter === 0 &&
          setTimeout(() => {
            setShowArrow(false);
          }, 5000) && (
            <div>
              <div id="box" class="box_dialogue_middle sbbob">
                Hier ist eine Karte von Tübingen. Ein Punkt steht jeweils für
                ein Zimmer. Je größer der Punkt desto höher die Miete.
              </div>
              {ShowArrow && (
                <Xarrow
                  start="box" //can be react ref
                  end="taskbar20" //or an id
                  color="white"
                  startAnchor="bottom"
                  endAnchor="top"
                  path="smooth"
                  strokeWidth={10}
                  animateDrawing={2}
                />
              )}
            </div>
          )}
        {Counter === 1 && (
          <div class="box_dialogue_middle sbbob">
            Du kannst horizontale oder vertikale Striche zeichnen, um die Karte
            zu unterteilen. Probiere es gerne aus!
          </div>
        )}
        {Counter === 2 && (
          <div>
            <div id="box" className="box_dialogue_small sbbob">
              Hier kannst du einen Strich rückgängig machen...
            </div>
            <Xarrow
              start="box" //can be react ref
              end="rotateleft" //or an id
              color="black"
              endAnchor="top"
              path="smooth"
              curveness={1}
              animateDrawing
              strokeWidth={10}
            />
          </div>
        )}
        {Counter === 3 && (
          <div class="box_dialogue_small sbbob">
            Parallel entsteht ein sogenannter Entscheidungsbaum, der deine
            Unterteilungen in der Karte darstellt. Jeder Kreis steht für einen
            Bereich in der Karte.
          </div>
        )}
        {Counter === 4 && (
          <div class="box_dialogue_small sbbob">
            Die Zahl im Kreis gibt den Durchschnittspreis der Mieten in diesem
            Bereich an.
          </div>
        )}
        {Counter === 5 && (
          <div class="box_dialogue_small sbbob">
            Versuche die Striche so zu ziehen, dass die beiden Bereiche
            möglichst unterschiedliche Durchschnittspreise haben. Für deinen
            Baum kannst du 5 Striche ziehen.
          </div>
        )}
        {Counter === 6 && (
          <div class="box_dialogue_small sbbob">Bereit? Los geht's!</div>
        )}
        {/* ++++++++++++++++ LEFT ARROW ++++++++++++++++ */}
        {Counter !== 0 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        )}
        {Counter === 0 && (
          <Link to="/Dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
              style={{ fontSize: "50pt" }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
          </Link>
        )}
        {/* ++++++++++++++++ RIGHT ARROW ++++++++++++++++ */}
        {Counter <= 5 && Counter !== 1 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines < 1 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-50 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines >= 1 && NoOfUserLines <= 4 && (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        )}
        {Counter === 1 && NoOfUserLines === 4 && setCounter(Counter + 1)}
        {Counter === 2 && NoOfUserLines >= 5 && setCounter(Counter + 1)}
        {Counter > 5 && (
          <Link to="/App">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
              onClick={() => {
                setCounter(Counter + 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Tutorial;
