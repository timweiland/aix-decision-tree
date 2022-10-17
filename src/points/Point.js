import "./Point.css";

export default function Point({x,y}) {
  return <div className="point" style = {{width: '5%', marginLeft:`${x}%`, marginTop:`${y}%`, display: 'flex' }}/>
}