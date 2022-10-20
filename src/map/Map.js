import './Map.css';
import Point from '../points/Point.js';
import MapImage from '../assets/map_sketch.jpg';

export default function Map({coordinates}) {
    return  <div style={{position:"relative", display: "inline-block"}}>
                <img src={MapImage} alt="Map" className="map" style={{opacity:0.6}} />
                <div> <Point coordinates={coordinates}/> </div>
            </div>
} 