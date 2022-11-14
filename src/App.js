import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import distinctColors from 'distinct-colors';


import Map from './map/Map';
import Tree from './tree/Tree';
import './map/button.css';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

let colorPalette = distinctColors({ count: 15 });

class TreeStructure {
  constructor(rect, avgRent = '-1', idx = "root") {
    this.rect = rect;
    this.avgRent = avgRent;
    this.idx = idx;
    this.children = [];
    this.colorPalette = colorPalette;
    this.color = colorPalette.pop();
  }

  split(axis, axis_pos) {
    const [x0, y0, x1, y1] = this.rect;
    let [rectA, rectB] = [undefined, undefined];
    if (axis === 0) {
      rectA = [x0, y0, axis_pos, y1];
      rectB = [axis_pos, y0, x1, y1];
    }
    else {
      rectA = [x0, y0, x1, axis_pos];
      rectB = [x0, axis_pos, x1, y1];
    }
    const treeA = new TreeStructure(rectA, '-1', this.idx + "-L");
    const treeB = new TreeStructure(rectB, '-1', this.idx + "-R");
    colorPalette.push(this.color);
    this.children = [treeA, treeB];
    this.color = undefined;
  }

  delete_children() {
    this.children.forEach((child) => {
      if (child.children.length === 0) {
        colorPalette.push(child.color);
      }
    })
    this.color = colorPalette.pop();
    this.children = []
  }

  get_leaves() {
    if (this.children.length === 0) {
      return [this];
    }
    let leaves = []
    this.children.forEach((child) => {
      leaves = [...leaves, ...child.get_leaves()]
    })
    return leaves;
  }

  get_colors() {
    const leaves = this.get_leaves();
    let colors = {}
    leaves.forEach((leaf) => {
      colors[leaf.idx] = leaf.color;
    })
    return colors;
  }

  contains(x, y) {
    const [x0, y0, x1, y1] = this.rect;
    return (x >= x0) && (x <= x1) && (y >= y0) && (y <= y1);
  }

  find(x, y) {
    if (this.contains(x, y) && this.children.length === 0) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find(x, y);
      if (findResult) {
        return findResult;
      }
    }
    return null;
  }

  find_idx(idx) {
    if (this.idx === idx) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find_idx(idx);
      if (findResult) {
        return findResult;
      }
    }
    return null;
  }

  to_object() {
    const child_objs = this.children.map((child) => {
      return child.to_object();
    });
    return {
      rect: this.rect,
      children: child_objs
    }
  }
}

function convertPythonTree(pythonTree, node) {
  node.avgRent = pythonTree.avgRent;
  if (pythonTree.children !== undefined && pythonTree.children.length > 0) {
    node.split(pythonTree.feature, pythonTree.threshold);
    node.children.forEach((child, childidx) => {
      convertPythonTree(pythonTree.children[childidx], child);
    })
  }
  return node;
}

const aiTree = convertPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], "", "ai-root"));

const initialStructure = new TreeStructure([0, 0, 100, 100]);

const mietdaten = mietdatenJSON.data;

function App() {
  const [useThreeColumns, setUseThreeColumns] = useState(false);
  const [userTreeState, setUserTreeState] = useState({ treeStructure: initialStructure, toggle: false });
  const [userSplitStack, setUserSplitStack] = useState([]);
  const [userLines, setUserLines] = useState([]);
  const [colors, setColors] = useState({});

  const splitTree = (idx, axis, pos, line) => {
    const node = userTreeState.treeStructure.find_idx(idx);
    node.split(axis, pos);
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
    setUserLines([...userLines, line]);
    setUserSplitStack([...userSplitStack, idx]);
    setColors(userTreeState.treeStructure.get_colors());
  }

  const undo = () => {
    if (userSplitStack.length === 0) {
      return;
    }
    const last_split = userSplitStack[userSplitStack.length - 1]
    const node = userTreeState.treeStructure.find_idx(last_split);
    node.delete_children();
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
    setUserSplitStack(userSplitStack.slice(0, -1));
    setUserLines(userLines.slice(0, -1));
    setColors(userTreeState.treeStructure.get_colors());
  }

  return (
    <div className="column-container">
      <div className="column" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
      <div class="help" style={{ position: "absolute", top: `${1}%`, left: `${71}%` }}>
          <div class="button">?</div>
          <div class="popup">
            <h3>But wait what exactely is AI and how will it kill my family?</h3>
          </div>
        </div>
        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${75}%` }} onClick={undo}>
          ↺
        </div>
        <div class="button" style={{position: "absolute", top: `${1}%`, left: `${79}%`}} onClick={() => {
        setUseThreeColumns(!useThreeColumns);}}>
          <Link to="/byebye"style={{textDecoration: 'none'}} >
          ✓
          </Link>
        </div>
        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${83}%` }} onClick={undo}>
          X
        </div>
        <Map coordinates={mietdaten} lines={userLines} treeState={userTreeState} splitTree={splitTree} />
      </div>

      <div className="column" style={{ backgroundColor: 'white' }} onClick={() => {
        setUseThreeColumns(!useThreeColumns);
      }}>
        <div class="headers">
            Dein Entscheidungsbaum<br/><br/>
          </div>
        <Tree structure={userTreeState.treeStructure} colors={colors} />
      </div>

      {
        useThreeColumns &&
        <div className="column" style={{ backgroundColor: 'grey' }}>
          <div class="headers">
            KI Entscheidungsbaum<br/><br/>
            
          </div>
          <Tree structure={aiTree} id={'aiTree'} key={`aiTree`} colors={{}} />
        </div>
      }
    </div >
  );
}

export default App;
