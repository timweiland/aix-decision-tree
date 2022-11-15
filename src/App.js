import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";


import Map from './map/Map';
import Tree from './tree/Tree';
import { TreeStructure, convertPythonTree } from './tree/TreeStructure';
import './map/button.css';
import aiPythonTree from './python/aiPythonTree.json';
import mietdatenJSON from './python/mietdaten.json';

const mietdaten = mietdatenJSON.data;

const initialStructure = new TreeStructure([0, 0, 100, 100], mietdaten);
const aiTree = convertPythonTree(aiPythonTree, new TreeStructure([0, 0, 100, 100], mietdaten, "ai-root"));


function App() {
  const [useThreeColumns, setUseThreeColumns] = useState(false);
  const [userTreeState, setUserTreeState] = useState({ treeStructure: initialStructure, toggle: false });
  const [userSplitStack, setUserSplitStack] = useState([]);
  const [colors, setColors] = useState({});

  const splitTree = (idx, axis, pos, line) => {
    const node = userTreeState.treeStructure.find_idx(idx);
    node.split(axis, pos);
    setUserTreeState({ treeStructure: userTreeState.treeStructure, toggle: !userTreeState.toggle });
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
    setColors(userTreeState.treeStructure.get_colors());
  }

  return (
    <div className="column-container">
      <div className="column" style={{ position: "relative", display: "inline-block", backgroundColor: 'white' }}>
        <div class="headers" style={{ position: "absolute", left: `${20}%` }}> WG-Zimmer in Tübingen
        </div>

        <div class="help" style={{ position: "absolute", top: `${1}%`, left: `${71}%` }}>
          <div class="button">?</div>
          <div class="popup">
            <h3>But wait what exactely is AI and how will it kill my family?</h3>
          </div>
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${75}%` }} onClick={undo}>
          ↺
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${79}%` }} onClick={() => {
          setUseThreeColumns(!useThreeColumns);
        }}>
          <Link to="/byebye" style={{ textDecoration: 'none' }} >
            ✓
          </Link>
        </div>

        <div class="button" style={{ position: "absolute", top: `${1}%`, left: `${83}%` }} onClick={undo}>
          <Link to="/" style={{ textDecoration: 'none' }} >
            X
          </Link>
        </div>

        <Map coordinates={mietdaten} treeState={userTreeState} splitTree={splitTree} />
      </div>

      <div className="column" style={{ backgroundColor: 'white' }} onClick={() => {
        setUseThreeColumns(!useThreeColumns);
      }}>
        <div class="headers">
          Dein Entscheidungsbaum<br /><br />
        </div>
        <Tree structure={userTreeState.treeStructure} colors={colors} />
      </div>

      {
        useThreeColumns &&
        <div className="column" style={{ backgroundColor: 'grey' }}>
          <div class="headers">
            KI Entscheidungsbaum<br /><br />

          </div>
          <Tree structure={aiTree} id={'aiTree'} key={`aiTree`} colors={{}} />
        </div>
      }
    </div >
  );
}

export default App;
