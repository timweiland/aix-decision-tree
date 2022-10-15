import './App.css';
import { useState } from 'react';

import Map from './map/Map';
import  Tree  from './tree/Tree';

const treeStructure = {
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
      ]
    }
  ]
}

function App() {
  const [useThreeColumns, setUseThreeColumns] = useState(false);

  return (
    <div className="column-container">
      <div className="column" style={{ backgroundColor: 'white' }}>
        <Map/>
      </div>
      <div className="column" style={{ backgroundColor: 'red' }} onClick={() => {
        setUseThreeColumns(!useThreeColumns);
      }}>
        <Tree structure={treeStructure} id={'userTree'} key={`userTree-${useThreeColumns}`}/>
      </div>
      {
        useThreeColumns &&
        <div className="column" style={{ backgroundColor: 'green' }}>
          Column C
        </div>
      }
    </div >
  );
}

export default App;
