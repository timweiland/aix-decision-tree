import "./Point.css";

export default function Point({coordinates}) {
  return coordinates.map((c) => {
                        return <div className="point" 
                                    style = {{position: "absolute", top:`${c[0]}%`, left:`${c[1]}%`}}/>
                             });
}
