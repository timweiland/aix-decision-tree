import './App.css';
import { useState } from 'react';


import create from 'zustand';

import Taskbar from './taskbar/Taskbar';
import Map from './map/Map';
import Tree from './tree/Tree';
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
  const [compareTrees, setCompareTrees] = useState(false);

  const setUserTree = (tree) => {
    setUserTreeState({ structure: tree, toggle: !userTree.toggle });
  }

  const [aiTree, setAITree] = useState({ structure: aiTreeStructure, toggle: false });
  /*const compareTrees = compareAITreeStore((state) => state.show);*/
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
        setAITree({ structure: aiTree.structure, toggle: !aiTree.toggle });
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

  const overall_avg_deviation = (tree) => {
    const leaves = tree.get_leaves();
    let deviation = 0;
    let numNonEmpty = 0;
    leaves.forEach((leaf) => {
      if (leaf.avgDeviation !== "?") {
        deviation += leaf.avgDeviation
        numNonEmpty += 1;
      }
    });
    
    return Number((deviation / numNonEmpty).toFixed(1));
  }

  return (
    <div className="column-container">
      <div className="column-static" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
        <div class="headers" style={{ position: "absolute", left: `${20}%` }}> 
        WG-Zimmer in Tübingen
        </div>
        <Taskbar cleanUp={cleanUp} toggleAITree={toggleAITree} undo={undo}/>
        <Map coordinates={mietdaten} tree={userTree.structure} splitTree={splitTree} highlightNode={highlightNode} unhighlightAll={unhighlightAll} enableInteraction={!showAITree} />
      </div>

      <div className="column flex flex-col justify-between" style={{ backgroundColor: 'white' }}>
        <div>
          <div class="headers">
            Dein Entscheidungsbaum<br />
            {compareTrees &&
              <div> 
              Durchschnittsabweichung +/-: {`${overall_avg_deviation(userTree.structure)}€`} 
              </div>}
          </div>
          <Tree structure={userTree.structure} colors={userTree.structure.get_colors()} />
          
        </div>
        {
          showAITree &&
          <div>
          <div onClick={propagateTestpoint}>
            
            <div class="headers">
            KI Entscheidungsbaum<br />
            {compareTrees &&
            <div> 
            Durchschnittsabweichung +/-: {`${overall_avg_deviation(aiTree.structure)}€`} 
            </div>}
            </div>
            <Tree structure={aiTree.structure} colors={aiTree.structure.get_colors()} />
          </div>
          <button style={{color: "red", position: "absolute", top: `${50}%`, left: `${40}%` }} onClick={() => {
            setCompareTrees(!compareTrees);}}>
          Compare my tree to the AI tree
          </button>
          </div>
        }
      </div>

      {
        showAITree &&
        <div className="column-static">
          <Map coordinates={mietdaten} tree={aiTree.structure} enableInteraction={false} />
        </div>
      }
    </div>
    
  );
}

export default App;
