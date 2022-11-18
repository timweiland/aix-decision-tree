import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

import create from 'zustand';


import Map from './map/Map';
import Tree from './tree/Tree';
import { TreeStructure, convertPythonTree } from './tree/TreeStructure';
import './map/button.css';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faCheck, faRotateLeft, faXmark, faLeaf } from '@fortawesome/free-solid-svg-icons'

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
  clean: () => set((state) => ({stack: []}))
}));


function App() {
  const [userTree, setUserTreeState] = useState({structure: initialStructure, toggle: false});

  const setUserTree = (tree) => {
    setUserTreeState({structure: tree, toggle: !userTree.toggle});
  }

  const [aiTree, setAITree] = useState({structure: aiTreeStructure, toggle: false});

  const showAITree = showAITreeStore((state) => state.show);
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

  const propagateTestpoint = () => {
    const [x, y] = [70, 40]
    const aiPath = aiTree.structure.get_path(x, y);
    const delay = 2000;
    aiPath.forEach((node, node_idx) => {
      setTimeout(() => {
        aiTree.structure.removeTestPoints();
        aiTree.structure.find_idx(node.idx).hasTestPoint = true;
        setAITree({structure: aiTree.structure, toggle: !aiTree.toggle});
      }, delay * node_idx);
    });

    const userPath = userTree.structure.get_path(x, y);
    userPath.forEach((node, node_idx) => {
      setTimeout(() => {
        userTree.structure.removeTestPoints();
        userTree.structure.find_idx(node.idx).hasTestPoint = true;
        setUserTree(userTree.structure);
      }, delay * node_idx);
    })
  }

  const cleanUp = () => {
    userTree.structure.reset()
    setUserTree(userTree);
    cleanUserSplit();
    toggleAITree(false);
  }

  const overall_deviation = (tree) => {
    const leaves = tree.get_leaves();
    let deviation = 0;
    leaves.forEach((leaf) => {
      deviation += leaf.avgDeviation});
    return deviation / leaves.length
  }

  return (
    <div className="column-container">
      <div className="column" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
        <div class="headers" style={{ position: "absolute", left: `${20}%` }}> WG-Zimmer in Tübingen
        </div>

        <div class="help" style={{ position: "absolute", top: `${1}%`, left: `${71}%` }}>
          <div class="button"><FontAwesomeIcon icon={faQuestion} /></div>
          <div class="popup">
            <h3>But wait what exactely is AI and how will it kill my family?</h3>
          </div>
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${75}%` }} onClick={undo}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${79}%` }}>
          <Link to="/byebye" style={{ textDecoration: 'none' }} onClick={() => {
            toggleAITree(true);
          }}>
            <FontAwesomeIcon icon={faCheck} />
          </Link>
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${83}%` }}>
          <Link to="/" style={{ textDecoration: 'none' }} onClick={cleanUp}>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>

        <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={true} />
      </div>

      <div className="column flex flex-col justify-between" style={{ backgroundColor: 'white' }}>
        <div>
          <div class="headers">
            Dein Entscheidungsbaum<br /><br />
            {
            overall_deviation(userTree.structure)
            }
          </div>
          <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
        </div>
        {
          showAITree &&
          <div onClick={propagateTestpoint}>
            <div class="headers">
              KI Entscheidungsbaum<br /><br />
              Aktueller Fehler: {overall_deviation(aiTree.structure)}
            </div>
            <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} />
          </div>
        }
      </div>

      {
        showAITree &&
        <div className="column">
          <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} />
        </div>
      }
    </div >
  );
}

export default App;
