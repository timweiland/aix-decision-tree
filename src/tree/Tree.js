import './Tree.css'
import TreeRoot from './TreeRoot';
import { ArcherContainer } from 'react-archer';
import { AnimateSharedLayout } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft, faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

export default function Tree({ structure, colors, hide, arrow }) {

    return <div className={classNames({ "opacity-10": hide })}>
        {arrow === "left" &&
            <div className="text-black text-lg absolute left-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faHandPointLeft} className="align-middle w-20 h-20" /></div>
        }
        {arrow === "right" &&
            <div className="text-black text-lg absolute right-5 rounded-full p-2 text-center"><FontAwesomeIcon icon={faHandPointRight} className="align-middle w-20 h-20" /></div>
        }
        <AnimateSharedLayout>
            <ArcherContainer strokeColor="black" noCurves={true} className="archer-container" >
                <TreeRoot structure={structure} colors={colors} />
            </ArcherContainer>
        </AnimateSharedLayout>
    </div>;
}