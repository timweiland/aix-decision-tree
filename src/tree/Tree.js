import './Tree.css'
import TreeRoot from './TreeRoot';
import { ArcherContainer } from 'react-archer';
import { AnimateSharedLayout } from 'framer-motion';

export default function Tree({ structure, colors }) {
    return <AnimateSharedLayout>
        <ArcherContainer strokeColor="black" noCurves={true} className="archer-container" >
            <TreeRoot structure={structure} colors={colors} />
        </ArcherContainer>
    </AnimateSharedLayout>;
}