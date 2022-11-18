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
import { faQuestion, faCheck, faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten);
const aiTree = convertPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"));

const showAITreeStore = create((set) => ({
  show: false,
  toggle: (val) => set((state) => ({show: val}))
}));

const userSplitStore = create((set) => ({
  stack: [],
  push: (val) => set((state) => ({stack: [...state.stack, val]})),
  pop: () => set((state) => ({stack: state.stack.slice(0, -1)}))
}));

function App() {
  const [userTreeState, setUserTreeState] = useState({ treeStructure: initialStructure, toggle: false });
  const [aiTreeState, setAITreeState] = useState({treeStructure: aiTree, toggle: false});

  const showAITree = showAITreeStore((state) => state.show);
  const toggleAITree = showAITreeStore((state) => state.toggle);
  const userSplitStack = userSplitStore((state) => state.stack);
  const pushUserSplit = userSplitStore((state) => state.push);
  const popUserSplit = userSplitStore((state) => state.pop);

  const splitTree = (idx, axis, pos, line) => {
    const node = userTreeState.treeStructure.find_idx(idx);
    node.split(axis, pos);
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
    pushUserSplit(idx);
  }

  const highlightNode = (node) => {
    const idx = node.idx;
    userTreeState.treeStructure.find_idx(idx).isSelected = true;
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
  }

  const unhighlightAll = () => {
    userTreeState.treeStructure.unhighlightAll();
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
  }

  const undo = () => {
    if (userSplitStack.length === 0) {
      return;
    }
    const last_split = userSplitStack[userSplitStack.length - 1]
    const node = userTreeState.treeStructure.find_idx(last_split);
    node.delete_children();
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
    popUserSplit();
  }

  const propagateTestpoint = () => {
    const [x, y] = [70, 40]
    const path = aiTree.get_path(x, y);
    const delay = 2000;
    path.forEach((node, node_idx) => {
      setTimeout(() => {
        aiTreeState.treeStructure.removeTestPoints();
        aiTreeState.treeStructure.find_idx(node.idx).hasTestPoint = true;
        setAITreeState({treeStructure: aiTreeState.treeStructure, toggle: !aiTreeState.toggle});
      }, delay * node_idx);
    });
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

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${83}%` }} onClick={undo}>
          <Link to="/" style={{ textDecoration: 'none' }} >
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>

        <Map coordinates={mietdaten} treeState={userTreeState} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} />
      </div>

      <div className="column" style={{ backgroundColor: 'white' }} onClick={() => {
        toggleAITree(!showAITree);
      }}>
        <div class="headers">
          Dein Entscheidungsbaum<br /><br />
        </div>
        <Tree structure={userTreeState.treeStructure} colors={userTreeState.treeStructure.get_colors()} />
      </div>

      {
        showAITree &&
        <div className="column" style={{ backgroundColor: 'grey' }} onClick={propagateTestpoint}>
          <div class="headers">
            KI Entscheidungsbaum<br /><br />

          </div>
          <Tree structure={aiTree} id={'aiTree'} key={`aiTree`} colors={aiTree.get_colors()} />
        </div>
      }
    </div >
  );
}

export default App;
