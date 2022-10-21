import './Tree.css'
import TreeRoot from './TreeRoot';
import { ArcherContainer } from 'react-archer';

export default function Tree({ structure, id }) {
    return <ArcherContainer strokeColor="black" noCurves={true} className="archer-container" >
        <TreeRoot structure={structure} id={id} index={'root'} />
    </ArcherContainer>;
}