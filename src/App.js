import './App.css';
import { useState } from 'react';

import Map from './map/Map';
import  Tree  from './tree/Tree';
import Point from './points/Point';
import { useXarrow } from 'react-xarrows';

const treeStructureA = {
  name: 'root',
  children: [
    {
      name: 'left child',
      children: [
        {
          name: 'left grandchild'
        },
        {
          name: 'right grandchild'
        }
      ]
    },
    {
      name: 'right child',
      children: [
        {
          name: 'left grandchild'
        },
        {
          name: 'right grandchild'
        }
      ]
    }
  ]
}

const treeStructureB = {
  name: 'root',
  children: [
    {
      name: 'left child',
    },
    {
      name: 'right child',
    }
  ]
}

const coordinates = [[10,15],[11,16],[95,95],[20,15],[11,45],[5,95]];

const treeStructures = [treeStructureA, treeStructureB];

function App() {
  const [useThreeColumns, setUseThreeColumns] = useState(false);
  const [treeStructureIdx, setTreeStructureIdx] = useState(0);
  const updateXarrow = useXarrow();

  return (
    <div className="column-container">
      <div className="column" style={{position:"relative",backgroundColor: 'white' }}>
        <Map/>
        <Point coordinates={coordinates}/>
      </div>
      <div className="column" style={{ backgroundColor: 'red' }} onClick={() => {
        setUseThreeColumns(!useThreeColumns);
        setTimeout(updateXarrow, 10);
      }}>
        <Tree structure={treeStructures[treeStructureIdx]} id={'userTree'} key={`userTree`}/>
      </div>
      {
        useThreeColumns &&
        <div className="column" style={{ backgroundColor: 'green' }} onClick={() => {
          setTreeStructureIdx((treeStructureIdx + 1) % treeStructures.length);
          setTimeout(updateXarrow, 10);
        }}>
          Column C
        </div>
      }
    </div >
  );
}

export default App;
