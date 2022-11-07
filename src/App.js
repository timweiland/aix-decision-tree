import './App.css';
import { useState } from 'react';


import Map from './map/Map';
import  Tree  from './tree/Tree';
import './map/button_q.css';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';


class TreeStructure {
  constructor(rect, avgRent='-1', threshold='-1', idx="root") {
    this.rect = rect;
    this.avgRent = avgRent;
    this.threshold = threshold;
    this.idx = idx;
    this.children = [];
  }

  split(axis, axis_pos) {
    const [x0, y0, x1, y1] = this.rect;
    let [rectA, rectB] = [undefined, undefined];
    if(axis === 0) {
      rectA = [x0, y0, axis_pos, y1];
      rectB = [axis_pos, y0, x1, y1];
    }
    else {
      rectA = [x0, y0, x1, axis_pos];
      rectB = [x0, axis_pos, x1, y1];
    }
    const treeA = new TreeStructure(rectA, '-1', '-1', this.idx + "-L");
    const treeB = new TreeStructure(rectB, '-1', '-1', this.idx + "-R");
    this.children = [treeA, treeB];
  }

  delete_children() {
    this.children = []
  }

  contains(x, y) {
    const [x0, y0, x1, y1] = this.rect;
    return (x >= x0) && (x <= x1) && (y >= y0) && (y <= y1);
  }

  find(x, y) {
    if(this.contains(x, y) && this.children.length === 0) {
      return this;
    }
    for(let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find(x, y);
      if(findResult) {
        return findResult;
      }
    }
    return null;
  }

  find_idx(idx) {
    if(this.idx === idx) {
      return this;
    }
    for(let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find_idx(idx);
      if(findResult) {
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

const mietdaten = mietdatenJSON.data;

function App() {
  const [useThreeColumns, setUseThreeColumns] = useState(false);
  const [userTreeState, setUserTreeState] = useState({treeStructure: new TreeStructure([0, 0, 100, 100]), toggle: false});
  const [userSplitStack, setUserSplitStack] = useState([]);
  const [userLines, setUserLines] = useState([]);

  const splitTree = (idx, axis, pos, line) => {
    const node = userTreeState.treeStructure.find_idx(idx);
    node.split(axis, pos);
    setUserTreeState({treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle});
    setUserLines([...userLines, line]);
    setUserSplitStack([...userSplitStack, idx]);
  }

  const undo = () => {
    if(userSplitStack.length === 0) {
      return;
    }
    const last_split = userSplitStack[userSplitStack.length - 1]
    const node = userTreeState.treeStructure.find_idx(last_split);
    node.delete_children();
    setUserTreeState({treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle});
    setUserSplitStack(userSplitStack.slice(0, -1));
    setUserLines(userLines.slice(0, -1));
  }

  return (
    <div className="column-container">
      <div className="column" style={{position:"relative", display: "inline-block", backgroundColor: 'white' }}>
        <div class="help" style = {{position: "absolute", top:`${5}%`, left:`${50}%`}}>
          <div class="button">?</div>
            <div class="popup">
              <h3>But wait what exactely is AI and how will it kill my family?</h3>
            </div>
        </div>
        <div class="button" style={{position: "absolute", top:`${5}%`, left:`${90}%`}} onClick={undo}>
          U
        </div>
        
        <Map coordinates={mietdaten} lines={userLines} treeState={userTreeState} splitTree={splitTree}/>
      </div>
      <div className="column" style={{ backgroundColor: 'white' }} onClick={() => {
        setUseThreeColumns(!useThreeColumns);
      }}>
        <Tree structure={userTreeState.treeStructure} id={'userTree'} key={`userTree`}/>
      </div>
      {
        useThreeColumns &&
        <div className="column" style={{ backgroundColor: 'green' }}>
          <Tree structure={aiPythonTree} id={'aiTree'} key={`aiTree`}/>
        </div>
      }
    </div >
  );
}

export default App;
