import TreeNode from './TreeNode';

export default function TreeRoot({structure}) {
    if(structure === {} || structure === null) {
        return null;
    }
    return <div style={{width: '100%', height: '100%'}}>
        <TreeNode id={''}/>
        <div style={{width: '100%', marginTop: '5rem', display: 'flex'}}>
            {
                structure.children && 
                structure.children.map((child) => {
                    return <div style={{flex: '1'}}>
                        <TreeRoot structure={child}/>
                    </div>
                })
            }
        </div>
    </div>
}