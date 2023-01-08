import "./Tutorial.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import create from "zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import { sampleSize } from "lodash";

import Taskbar from "../taskbar/taskbar";
import Map from "../map/Map";
import Tree from "../tree/Tree";
import PopupCollection from "../popup/PopupCollection";

import bob from "../assets/bob.png";

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

  const [Counter, setCounter] = useState(1);

  console.log("Screen state:");
  console.log(screenState);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="column-container relative" data-theme="light">
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
          enableInteraction={screenState === "initialScreen"}
        />
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

      <div className="column flex flex-col relative justify-between">
        <div className="imgbob">
          <img src={bob} alt="bob" />
        </div>

        {Counter === 0 && (
          <div class="box_dialogue sbalice">
            Hier ist eine Karte von Tübingen. Ein Punkt steht jeweils für ein
            Zimmer. Je größer der Punkt desto höher die Miete.
          </div>
        )}

        {Counter === 1 && <div class="box_dialogue sbalice">blablabla1</div>}
        {Counter === 2 && <div class="box_dialogue sbalice">blablabla2</div>}
        {/* {(() => {
          switch (Counter) {
            case 1:
              <div class="box_dialogue sbalice">
                {" "}
                Hier ist eine Karte von Tübingen. Ein Punkt steht jeweils für
                ein Zimmer. Je größer der Punkt desto höher die Miete.
              </div>;
            case 2:
              <div class="box_dialogue sbalice"> blablabla</div>;
          }
        })()} */}

        {Counter <= 3 && (
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
        {Counter > 3 && (
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
